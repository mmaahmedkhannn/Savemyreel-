import { NextRequest, NextResponse } from "next/server";

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

        // Strategy 1: Direct GraphQL API (no external dependencies)
        if (media.length === 0) {
            try {
                console.log("[Server] Strategy 1: Direct GraphQL...");
                const result = await directGraphQL(shortcode);
                media = result.media;
                author = result.author;
                if (media.length > 0) {
                    console.log("[Server] GraphQL succeeded:", media.length, "items");
                }
            } catch (e: any) {
                console.warn("[Server] GraphQL failed:", e.message);
            }
        }

        // Strategy 2: Main page scraper with Googlebot UA (best for carousels)
        if (media.length === 0) {
            try {
                console.log("[Server] Strategy 2: Main page scraper...");
                const result = await scrapeMainPage(shortcode, cleanUrl);
                media = result.media;
                if (result.author !== "Instagram User") author = result.author;
                if (media.length > 0) {
                    console.log("[Server] Main page scraper succeeded:", media.length, "items");
                }
            } catch (e: any) {
                console.warn("[Server] Main page scraper failed:", e.message);
            }
        }

        // Strategy 3: Instagram Embed Page scraping
        if (media.length === 0) {
            try {
                console.log("[Server] Strategy 3: Embed scraper...");
                const result = await scrapeEmbed(shortcode);
                media = result.media;
                author = result.author;
                if (media.length > 0) {
                    console.log("[Server] Embed scraper succeeded:", media.length, "items");
                }
            } catch (e: any) {
                console.warn("[Server] Embed scraper failed:", e.message);
            }
        }

        // Strategy 4: Instagram oEmbed API (gets thumbnail at least)
        if (media.length === 0) {
            try {
                console.log("[Server] Strategy 4: oEmbed API...");
                const result = await oEmbedExtract(cleanUrl, shortcode);
                media = result.media;
                author = result.author;
                if (media.length > 0) {
                    console.log("[Server] oEmbed succeeded:", media.length, "items");
                }
            } catch (e: any) {
                console.warn("[Server] oEmbed failed:", e.message);
            }
        }

        // Strategy 5: yt-dlp binary
        if (media.length === 0) {
            try {
                console.log("[Server] Strategy 5: yt-dlp binary...");
                const { fetchMediaMetadata } = require('@/lib/ytdlp');
                const metadata = await fetchMediaMetadata(cleanUrl);

                if (metadata && !metadata.error && metadata._type !== 'image-only') {
                    author = metadata.uploader || metadata.channel || metadata.title || "Instagram User";

                    if (metadata.entries && metadata.entries.length > 0) {
                        media = metadata.entries.map((entry: any, index: number) => {
                            const isVideo = entry.ext === 'mp4' || (entry.formats && entry.formats.some((f: any) => f.ext === 'mp4'));
                            const bestUrl = entry.url || (entry.formats && entry.formats[entry.formats.length - 1]?.url);
                            return {
                                url: bestUrl,
                                thumbnail: entry.thumbnail || "",
                                type: isVideo ? 'video' as const : 'image' as const,
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
                        console.log("[Server] yt-dlp succeeded:", media.length, "items");
                    }
                }
            } catch (e: any) {
                console.warn("[Server] yt-dlp failed:", e.message);
            }
        }

        // Strategy 6: instagram-url-direct library
        if (media.length === 0) {
            try {
                console.log("[Server] Strategy 6: instagram-url-direct...");
                const igGet = require('instagram-url-direct');
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
                            type: isVideo ? 'video' as const : 'image' as const,
                            filename: `instagram_${shortcode}_${index + 1}.${isVideo ? 'mp4' : 'jpg'}`,
                            width: result.media_details?.[index]?.dimensions?.width,
                            height: result.media_details?.[index]?.dimensions?.height
                        };
                    });
                    if (media.length > 0) {
                        console.log("[Server] instagram-url-direct succeeded:", media.length, "items");
                    }
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

async function directGraphQL(shortcode: string): Promise<ExtractionResult> {
    const csrfToken = await getCSRFToken();

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
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
            'Referer': 'https://www.instagram.com/',
            'X-Requested-With': 'XMLHttpRequest',
            'X-IG-App-ID': '936619743392459',
            'X-ASBD-ID': '129477',
            'Origin': 'https://www.instagram.com',
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
    const response = await fetch("https://www.instagram.com/web/search/topsearch/?query=test", {
        method: "GET",
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        },
        signal: AbortSignal.timeout(8000),
    });

    const cookies = response.headers.getSetCookie?.() || [];
    for (const cookie of cookies) {
        if (cookie.startsWith("csrftoken=")) {
            return cookie.split(";")[0].replace("csrftoken=", "");
        }
    }

    const response2 = await fetch("https://www.instagram.com/", {
        method: "GET",
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        },
        signal: AbortSignal.timeout(8000),
    });

    const cookies2 = response2.headers.getSetCookie?.() || [];
    for (const cookie of cookies2) {
        if (cookie.startsWith("csrftoken=")) {
            return cookie.split(";")[0].replace("csrftoken=", "");
        }
    }

    const text = await response2.text();
    const csrfMatch = text.match(/"csrf_token":"([^"]+)"/);
    if (csrfMatch) return csrfMatch[1];

    const randomToken = [...Array(32)].map(() => Math.random().toString(36)[2]).join('');
    return randomToken;
}

async function scrapeEmbed(shortcode: string): Promise<ExtractionResult> {
    const media: MediaItem[] = [];

    const embedUrls = [
        `https://www.instagram.com/p/${shortcode}/embed/captioned/`,
        `https://www.instagram.com/reel/${shortcode}/embed/`,
        `https://www.instagram.com/p/${shortcode}/embed/`,
    ];

    for (const embedUrl of embedUrls) {
        try {
            const response = await fetch(embedUrl, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                    'Accept-Language': 'en-US,en;q=0.5',
                    'Accept-Encoding': 'gzip, deflate, br',
                },
                signal: AbortSignal.timeout(10000)
            });

            if (!response.ok) continue;
            const html = await response.text();

            const normalized = html
                .replace(/\\\\\\\\/g, '/')
                .replace(/\\\\\//g, '/')
                .replace(/\\\//g, '/')
                .replace(/\\"/g, '"');

            let videoUrl: string | null = null;
            let imageUrl: string | null = null;

            const videoMatch = normalized.match(/video_url"\s*:\s*"(https?:\/\/[^"]+)"/);
            if (videoMatch) {
                videoUrl = decodeEmbedUrl(videoMatch[1]);
            }

            const displayMatch = normalized.match(/display_url"\s*:\s*"(https?:\/\/[^"]+)"/);
            if (displayMatch) {
                imageUrl = decodeEmbedUrl(displayMatch[1]);
            }

            if (!videoUrl) {
                const ogVideo = html.match(/property="og:video(?::secure_url)?"\s+content="([^"]+)"/);
                if (ogVideo) videoUrl = ogVideo[1];
            }
            if (!imageUrl) {
                const ogImage = html.match(/property="og:image"\s+content="([^"]+)"/);
                if (ogImage) imageUrl = ogImage[1];
            }

            if (videoUrl) {
                media.push({
                    url: videoUrl,
                    thumbnail: imageUrl || videoUrl,
                    type: 'video',
                    filename: `instagram_${shortcode}.mp4`
                });
                break;
            } else if (imageUrl && !imageUrl.includes('s150x150') && !imageUrl.includes('lookaside.instagram.com')) {
                media.push({
                    url: imageUrl,
                    thumbnail: imageUrl,
                    type: 'image',
                    filename: `instagram_${shortcode}.jpg`
                });
                break;
            }
        } catch (e: any) {
            console.warn(`[Server] Embed URL ${embedUrl} failed:`, e.message);
            continue;
        }
    }

    return { media, author: "Instagram User" };
}

async function scrapeMainPage(shortcode: string, originalUrl: string): Promise<ExtractionResult> {
    const media: MediaItem[] = [];
    let author = "Instagram User";

    const urls = [
        originalUrl,
        `https://www.instagram.com/p/${shortcode}/`,
        `https://www.instagram.com/reel/${shortcode}/`,
    ];

    for (const pageUrl of urls) {
        try {
            const response = await fetch(pageUrl, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                    'Accept-Language': 'en-US,en;q=0.5',
                },
                signal: AbortSignal.timeout(15000),
                redirect: 'follow',
            });

            if (!response.ok) continue;
            const html = await response.text();

            const parsed = extractFromPageJson(html, shortcode);
            if (parsed) {
                if (parsed.author) author = parsed.author;
                parsed.media.forEach(m => media.push(m));
                if (media.length > 0) {
                    console.log(`[Server] JSON parse succeeded: ${media.length} items`);
                    break;
                }
            }

            const fallbackResult = fallbackRegexExtract(html, shortcode);
            if (fallbackResult.media.length > 0) {
                fallbackResult.media.forEach(m => media.push(m));
                if (fallbackResult.author) author = fallbackResult.author;
                console.log(`[Server] Regex fallback succeeded: ${media.length} items`);
                break;
            }
        } catch (e: any) {
            console.warn(`[Server] Main page ${pageUrl} failed:`, e.message);
            continue;
        }
    }

    return { media, author };
}

function extractFromPageJson(html: string, shortcode: string): ExtractionResult | null {
    try {
        const marker = "xdt_api__v1__media__shortcode__web_info";
        const markerIdx = html.indexOf(marker);
        if (markerIdx === -1) return null;

        const itemsIdx = html.indexOf('"items":[', markerIdx);
        if (itemsIdx === -1) return null;

        const arrayStart = html.indexOf("[", itemsIdx);
        let depth = 0;
        let inStr = false;
        let esc = false;
        let pos;

        for (pos = arrayStart; pos < html.length && pos < arrayStart + 500000; pos++) {
            const ch = html[pos];
            if (esc) { esc = false; continue; }
            if (ch === '\\') { esc = true; continue; }
            if (ch === '"' && !inStr) { inStr = true; continue; }
            if (ch === '"' && inStr) { inStr = false; continue; }
            if (inStr) continue;
            if (ch === '[' || ch === '{') depth++;
            if (ch === ']' || ch === '}') depth--;
            if (depth === 0) break;
        }

        const items = JSON.parse(html.substring(arrayStart, pos + 1));
        if (!items || !items.length) return null;

        const item = items[0];
        const media: MediaItem[] = [];
        const author = item.user?.username || item.owner?.username || "Instagram User";

        if (item.carousel_media && item.carousel_media.length > 0) {
            item.carousel_media.forEach((slide: any, i: number) => {
                const imgUrl = slide.image_versions2?.candidates?.[0]?.url;
                const vidUrl = slide.video_versions?.[0]?.url;
                const isVideo = slide.media_type === 2 && vidUrl;

                if (isVideo) {
                    media.push({
                        url: vidUrl,
                        thumbnail: imgUrl || vidUrl,
                        type: 'video',
                        filename: `instagram_${shortcode}_${i + 1}.mp4`,
                        width: slide.original_width,
                        height: slide.original_height,
                    });
                } else if (imgUrl) {
                    media.push({
                        url: imgUrl,
                        thumbnail: imgUrl,
                        type: 'image',
                        filename: `instagram_${shortcode}_${i + 1}.jpg`,
                        width: slide.original_width,
                        height: slide.original_height,
                    });
                }
            });
        } else {
            const imgUrl = item.image_versions2?.candidates?.[0]?.url;
            const vidUrl = item.video_versions?.[0]?.url;
            const isVideo = item.media_type === 2 && vidUrl;

            if (isVideo) {
                media.push({
                    url: vidUrl,
                    thumbnail: imgUrl || vidUrl,
                    type: 'video',
                    filename: `instagram_${shortcode}.mp4`,
                    width: item.original_width,
                    height: item.original_height,
                });
            } else if (imgUrl) {
                media.push({
                    url: imgUrl,
                    thumbnail: imgUrl,
                    type: 'image',
                    filename: `instagram_${shortcode}.jpg`,
                    width: item.original_width,
                    height: item.original_height,
                });
            }
        }

        return { media, author };
    } catch (e: any) {
        console.warn("[Server] JSON parse failed:", e.message);
        return null;
    }
}

function fallbackRegexExtract(html: string, shortcode: string): ExtractionResult {
    const media: MediaItem[] = [];
    let author = "Instagram User";

    const usernameMatch = html.match(/\\?"username\\?"\s*:\\?\s*\\?"([^"\\]+)\\?"/);
    if (usernameMatch) author = usernameMatch[1];

    const videoVersionPattern = /video_versions\\?"\s*:\s*\\?\[[^\]]*?\\?"url\\?"\s*:\s*\\?"(https?:[^"\\]*(?:\\.[^"\\]*)*)\\?"/g;
    const videoUrls: string[] = [];
    let vvMatch;
    while ((vvMatch = videoVersionPattern.exec(html)) !== null) {
        const decoded = decodeEmbedUrl(vvMatch[1]);
        if (!videoUrls.includes(decoded)) videoUrls.push(decoded);
    }

    const imageVersionPattern = /image_versions2\\?"\s*:\s*\\?\{\\?"candidates\\?"\s*:\s*\\?\[\\?\{[^}]*\\?"url\\?"\s*:\s*\\?"(https?:[^"\\]*(?:\\.[^"\\]*)*)\\?"/g;
    const imageUrls: string[] = [];
    let ivMatch;
    while ((ivMatch = imageVersionPattern.exec(html)) !== null) {
        const decoded = decodeEmbedUrl(ivMatch[1]);
        if (!imageUrls.includes(decoded)) imageUrls.push(decoded);
    }

    if (videoUrls.length > 0) {
        videoUrls.forEach((vUrl, i) => {
            media.push({
                url: vUrl,
                thumbnail: imageUrls[i] || imageUrls[0] || vUrl,
                type: 'video',
                filename: videoUrls.length > 1 ? `instagram_${shortcode}_${i + 1}.mp4` : `instagram_${shortcode}.mp4`,
            });
        });
    } else if (imageUrls.length > 0) {
        const filtered = imageUrls.filter(u => !u.includes('s150x150') && !u.includes('s320x320') && !u.includes('lookaside.instagram.com'));
        filtered.forEach((imgUrl, i) => {
            media.push({
                url: imgUrl,
                thumbnail: imgUrl,
                type: 'image',
                filename: filtered.length > 1 ? `instagram_${shortcode}_${i + 1}.jpg` : `instagram_${shortcode}.jpg`,
            });
        });
    }

    if (media.length === 0) {
        const ogImg = html.match(/property="og:image"\s+content="([^"]+)"/);
        if (ogImg && !ogImg[1].includes('lookaside.instagram.com')) {
            media.push({
                url: ogImg[1],
                thumbnail: ogImg[1],
                type: 'image',
                filename: `instagram_${shortcode}.jpg`,
            });
        }
    }

    return { media, author };
}

async function oEmbedExtract(originalUrl: string, shortcode: string): Promise<ExtractionResult> {
    const media: MediaItem[] = [];

    const oembedUrl = `https://api.instagram.com/oembed/?url=${encodeURIComponent(originalUrl)}`;
    const response = await fetch(oembedUrl, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
        },
        signal: AbortSignal.timeout(8000)
    });

    if (!response.ok) {
        throw new Error(`oEmbed returned HTTP ${response.status}`);
    }

    const data = await response.json();

    if (data.thumbnail_url) {
        const imgUrl = data.thumbnail_url;

        const videoVersionUrl = imgUrl
            .replace('/s640x640/', '/s1080x1080/')
            .replace('_n.jpg', '_n.mp4');

        media.push({
            url: imgUrl,
            thumbnail: imgUrl,
            type: 'image',
            filename: `instagram_${shortcode}.jpg`,
            width: data.thumbnail_width,
            height: data.thumbnail_height
        });
    }

    return {
        media,
        author: data.author_name || "Instagram User"
    };
}

function extractFromGraphQL(mediaData: any): MediaItem[] {
    const items: MediaItem[] = [];
    const shortcode = mediaData.shortcode || 'post';
    const isSidecar = mediaData.__typename === "XDTGraphSidecar" || mediaData.__typename === "GraphSidecar";

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

function decodeEmbedUrl(raw: string): string {
    return raw
        .replace(/\\\\\//g, '/')
        .replace(/\\\//g, '/')
        .replace(/\\u0025/g, '%')
        .replace(/%253D/g, '=')
        .replace(/%25253D/g, '=')
        .replace(/\\u0026/g, '&')
        .replace(/\\\\u0026/g, '&')
        .replace(/&amp;/g, '&');
}

function extractShortcode(url: string): string | null {
    const parts = url.split("/");
    const postTags = ["p", "reel", "tv", "reels"];
    const tagIndex = parts.findIndex(part => postTags.includes(part));
    if (tagIndex !== -1 && parts[tagIndex + 1]) {
        return parts[tagIndex + 1];
    }
    return null;
}
