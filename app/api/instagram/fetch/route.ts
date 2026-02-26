import { NextRequest, NextResponse } from "next/server";

/**
 * Instagram Media Extraction API (POST)
 * 
 * Multi-strategy extraction:
 * 1. Direct Instagram GraphQL API (fastest, but can be rate-limited)
 * 2. Third-party API fallback (uses external service for reliability)
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const url = body.url;

        if (!url || typeof url !== 'string') {
            return NextResponse.json({
                success: false,
                error: "Missing or invalid 'url' in request body"
            }, { status: 400 });
        }

        if (!url.includes("instagram.com")) {
            return NextResponse.json({
                success: false,
                error: "URL must be from instagram.com"
            }, { status: 400 });
        }

        const cleanUrl = url.split('?')[0];
        const shortcode = extractShortcode(cleanUrl);

        if (!shortcode) {
            return NextResponse.json({
                success: false,
                error: "Could not extract post ID from URL. Make sure you're using a valid Instagram post/reel link."
            }, { status: 400 });
        }

        console.log("[Server] Extracting media for shortcode:", shortcode);

        let media: MediaItem[] = [];
        let author = "Instagram User";

        console.log(`[Server] Attempting native extraction for ${cleanUrl}`);



        // Strategy 1: Attempt native yt-dlp binary extraction
        try {
            console.log("[Server] Fetching via native yt-dlp binary...");
            const { fetchMediaMetadata } = require('@/lib/ytdlp');
            const metadata = await fetchMediaMetadata(cleanUrl);

            if (metadata && !metadata.error) {
                author = metadata.uploader || metadata.channel || metadata.title || "Instagram User";

                // Handle carousel (multiple items) or single item
                if (metadata.entries && metadata.entries.length > 0) {
                    media = metadata.entries.map((entry: any, index: number) => {
                        const isVideo = entry.ext === 'mp4' || (entry.formats && entry.formats.some((f: any) => f.ext === 'mp4'));
                        const bestUrl = entry.url || (entry.formats && entry.formats[entry.formats.length - 1]?.url);

                        return {
                            url: bestUrl,
                            thumbnail: entry.thumbnail || "",
                            type: isVideo ? 'video' : 'image',
                            filename: `instagram_${shortcode}_${index + 1}.${isVideo ? 'mp4' : 'jpg'}`,
                            width: entry.width,
                            height: entry.height
                        };
                    });
                } else {
                    const bestUrl = metadata.url || (metadata.formats && metadata.formats[metadata.formats.length - 1]?.url);
                    if (bestUrl) {
                        const isVideo = metadata.ext === 'mp4' || bestUrl.includes('.mp4');
                        media.push({
                            url: bestUrl,
                            thumbnail: metadata.thumbnail || "",
                            type: isVideo ? 'video' : 'image',
                            filename: `instagram_${shortcode}.${isVideo ? 'mp4' : 'jpg'}`,
                            width: metadata.width,
                            height: metadata.height
                        });
                    }
                }

                if (media.length > 0) {
                    console.log("[Server] yt-dlp Strategy succeeded:", media.length, "items");
                }
            }
        } catch (e: any) {
            console.warn("[Server] yt-dlp extraction failed:", e.message);
        }

        // Strategy 2: Scrape Instagram Embed Player (Bypasses Datacenter blocks natively)
        if (media.length === 0) {
            try {
                console.log("[Server] Fetching via native embed crawler...");
                const embedUrl = `https://www.instagram.com/p/${shortcode}/embed/captioned/`;
                const response = await fetch(embedUrl, {
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
                        'Accept-Language': 'en-US,en;q=0.5'
                    },
                    signal: AbortSignal.timeout(10000)
                });

                if (response.ok) {
                    const html = await response.text();

                    const videoMatch = html.match(/video_url(?:\"|\')?\s*:\s*(?:\"|\')(.*?)(?:\"|\')/i);
                    const imageMatch = html.match(/display_url(?:\"|\')?\s*:\s*(?:\"|\')(.*?)(?:\"|\')/i);

                    if (videoMatch) {
                        const extractedUrl = videoMatch[1].replace(/\\\\u0026/g, '&').replace(/\\u0026/g, '&');
                        const thumbUrl = imageMatch ? imageMatch[1].replace(/\\\\u0026/g, '&').replace(/\\u0026/g, '&') : extractedUrl;

                        media.push({
                            url: extractedUrl,
                            thumbnail: thumbUrl,
                            type: 'video',
                            filename: `instagram_${shortcode}.mp4`
                        });
                        console.log("[Server] Embed Strategy succeeded: 1 items");
                    }
                }
            } catch (e: any) {
                console.warn("[Server] Embed crawler failed:", e.message);
            }
        }

        // Strategy 3: Fallback to instagram-url-direct
        if (media.length === 0) {
            try {
                console.log("[Server] Fetching via instagram-url-direct fallback...");
                const igGet = require('instagram-url-direct');

                // Wrap in a Promise.race to enforce an 8-second timeout on the library
                const timeoutPromise = new Promise<any>((_, reject) =>
                    setTimeout(() => reject(new Error("instagram-url-direct timed out")), 8000)
                );

                const result = await Promise.race([
                    igGet.instagramGetUrl(cleanUrl),
                    timeoutPromise
                ]);

                if (result && result.results_number > 0 && result.url_list && result.url_list.length > 0) {
                    author = result.post_info?.owner_fullname || result.post_info?.owner_username || "Instagram User";

                    media = result.url_list.map((itemUrl: string, index: number) => {
                        const isVideo = itemUrl.includes('.mp4') || itemUrl.includes('video');
                        return {
                            url: itemUrl,
                            thumbnail: result.media_details?.[index]?.thumbnail || itemUrl,
                            type: isVideo ? 'video' : 'image',
                            filename: `instagram_${shortcode}_${index + 1}.${isVideo ? 'mp4' : 'jpg'}`,
                            width: result.media_details?.[index]?.dimensions?.width,
                            height: result.media_details?.[index]?.dimensions?.height
                        };
                    });

                    console.log("[Server] Strategy succeeded:", media.length, "items");
                }
            } catch (e: any) {
                console.warn("[Server] instagram-url-direct failed:", e.message);
            }
        }



        if (media.length === 0) {
            return NextResponse.json({
                success: false,
                error: "Could not extract media. The post may be private, or Instagram is blocking requests. Please try again in a minute."
            }, { status: 404 });
        }

        return NextResponse.json({ success: true, media, author });

    } catch (error: any) {
        console.error("[Server] Extraction error:", error.message);
        return NextResponse.json({
            success: false,
            error: error.message || "Failed to extract media from Instagram"
        }, { status: 500 });
    }
}

// ==================== TYPES ====================

interface MediaItem {
    url: string;
    thumbnail: string;
    type: 'video' | 'image';
    filename: string;
    width?: number;
    height?: number;
}

interface ExtractionResult {
    media: MediaItem[];
    author: string;
}

// ==================== STRATEGY 1: Direct GraphQL ====================

async function directGraphQL(shortcode: string): Promise<ExtractionResult> {
    // Step 1: Get CSRF token
    const csrfToken = await getCSRFToken();

    // Step 2: Query GraphQL
    const variables = JSON.stringify({
        shortcode,
        fetch_tagged_user_count: null,
        hoisted_comment_id: null,
        hoisted_reply_id: null,
    });

    const response = await fetch("https://www.instagram.com/graphql/query", {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-CSRFToken': csrfToken,
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Referer': 'https://www.instagram.com/',
            'X-Requested-With': 'XMLHttpRequest',
        },
        body: `variables=${encodeURIComponent(variables)}&doc_id=9510064595728286`,
        signal: AbortSignal.timeout(12000),
    });

    if (!response.ok) {
        throw new Error(`GraphQL returned HTTP ${response.status}`);
    }

    const data = await response.json();

    if (!data?.data?.xdt_shortcode_media) {
        throw new Error("No media data in GraphQL response");
    }

    const mediaData = data.data.xdt_shortcode_media;
    return {
        media: extractFromGraphQL(mediaData),
        author: mediaData.owner?.username || "Instagram User",
    };
}

async function getCSRFToken(): Promise<string> {
    const response = await fetch("https://www.instagram.com/", {
        method: "GET",
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        },
        signal: AbortSignal.timeout(8000),
    });

    const cookies = response.headers.getSetCookie?.() || [];
    for (const cookie of cookies) {
        if (cookie.startsWith("csrftoken=")) {
            return cookie.split(";")[0].replace("csrftoken=", "");
        }
    }

    const text = await response.text();
    const csrfMatch = text.match(/"csrf_token":"([^"]+)"/);
    if (csrfMatch) return csrfMatch[1];

    throw new Error("Could not obtain CSRF token");
}

function extractFromGraphQL(mediaData: any): MediaItem[] {
    const items: MediaItem[] = [];
    const shortcode = mediaData.shortcode || 'post';
    const isSidecar = mediaData.__typename === "XDTGraphSidecar";

    if (isSidecar && mediaData.edge_sidecar_to_children?.edges) {
        mediaData.edge_sidecar_to_children.edges.forEach((edge: any, i: number) => {
            const node = edge.node;
            items.push(node.is_video ? {
                url: node.video_url, thumbnail: node.display_url, type: 'video',
                filename: `instagram_${shortcode}_${i + 1}.mp4`,
                width: node.dimensions?.width, height: node.dimensions?.height,
            } : {
                url: node.display_url, thumbnail: node.display_url, type: 'image',
                filename: `instagram_${shortcode}_${i + 1}.jpg`,
                width: node.dimensions?.width, height: node.dimensions?.height,
            });
        });
    } else {
        items.push(mediaData.is_video ? {
            url: mediaData.video_url, thumbnail: mediaData.display_url, type: 'video',
            filename: `instagram_${shortcode}.mp4`,
            width: mediaData.dimensions?.width, height: mediaData.dimensions?.height,
        } : {
            url: mediaData.display_url, thumbnail: mediaData.display_url, type: 'image',
            filename: `instagram_${shortcode}.jpg`,
            width: mediaData.dimensions?.width, height: mediaData.dimensions?.height,
        });
    }

    return items;
}



// ==================== UTILITIES ====================

function extractShortcode(url: string): string | null {
    const parts = url.split("/");
    const postTags = ["p", "reel", "tv", "reels"];
    const tagIndex = parts.findIndex(part => postTags.includes(part));
    if (tagIndex !== -1 && parts[tagIndex + 1]) {
        return parts[tagIndex + 1];
    }
    return null;
}
