import axios from "axios";
import * as cheerio from "cheerio";
import { MediaItem } from "@/types";

export interface InstagramImageData {
    thumbnail_url: string;
    author_name: string;
    title: string;
    carouselItems?: MediaItem[];
}

/**
 * Forceful Instagram Extraction
 * Simulates a real browser request to bypass bot detection and "login required" redirects.
 */
export async function extractInstagramImage(url: string): Promise<InstagramImageData> {
    const cleanUrl = url.split('?')[0];
    let errorLog: string[] = [];

    // Browser Fingerprint Headers
    // Matches Mozilla/5.0 Chrome Safari fingerprint
    const BROWSER_HEADERS = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Sec-Fetch-Site': 'none',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-User': '?1',
        'Sec-Fetch-Dest': 'document',
        'Upgrade-Insecure-Requests': '1',
        'Connection': 'keep-alive'
    };

    // --- STRATEGY 1: Standard HTML Scraping ---
    try {
        console.log(`[Strategy 1] Browser-Simulated Scrape for ${cleanUrl}`);
        const response = await axios.get(cleanUrl, {
            headers: BROWSER_HEADERS,
            timeout: 10000,
            maxRedirects: 5,
            validateStatus: (status) => status < 500 // Handle 404/403 manually
        });

        // Analytics Logging
        console.log(`[Response] Status: ${response.status}, Size: ${response.data.length} bytes`);

        if (response.status === 403) {
            throw new Error("PRIVATE_POST_DETECTED"); // Specific 403 flag
        }

        if (response.status === 200) {
            const html = response.data;
            const result = tryParseHtml(html, errorLog);
            if (result) {
                console.log("✓ Strategy 1 (HTML Parse) Succeeded");
                return result;
            }
        }
    } catch (e: any) {
        if (e.message === "PRIVATE_POST_DETECTED") {
            throw new Error("This post is Private. We cannot access it without login.");
        }
        errorLog.push(`HTML Scrape failed: ${e.message}`);
    }

    // --- STRATEGY 2: API Fallback (?__a=1&__d=dis) ---
    try {
        console.log(`[Strategy 2] API Fallback for ${cleanUrl}`);
        const apiUrl = `${cleanUrl}?__a=1&__d=dis`;
        const response = await axios.get(apiUrl, {
            headers: {
                ...BROWSER_HEADERS,
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest' // Sometimes helps with API
            },
            timeout: 10000,
            validateStatus: (status) => status < 500
        });

        console.log(`[API Response] Status: ${response.status}`);

        if (response.status === 200) {
            const data = response.data;
            // Analytics
            if (typeof data === 'object') {
                console.log(`[API Keys] ${Object.keys(data).join(', ')}`);
            }

            const result = processGraphqlData(data, "API_FALLBACK");
            if (result) {
                console.log("✓ Strategy 2 (API Fallback) Succeeded");
                return result;
            }
        } else if (response.status === 403) {
            throw new Error("This post is confirmed Private (API 403).");
        }
    } catch (e: any) {
        errorLog.push(`API Fallback failed: ${e.message}`);
    }

    // --- FINAL REPORT ---
    console.error("All extraction strategies failed.", errorLog);
    throw new Error("Could not find media. The post might be private, or Instagram is blocking requests.");
}

/**
 * Attempts to find and parse JSON blobs within the HTML string
 */
function tryParseHtml(html: string, log: string[]): InstagramImageData | null {
    const $ = cheerio.load(html);
    const scripts = $('script').toArray();

    for (const script of scripts) {
        const content = $(script).html();
        if (!content) continue;

        // 1. SharedData
        if (content.includes('window._sharedData =')) {
            try {
                const jsonStr = content.split('window._sharedData =')[1].split(';')[0];
                const data = JSON.parse(jsonStr);
                const result = processGraphqlData(data, "SHARED_DATA");
                if (result) return result;
            } catch (e) { log.push("Parse Error (_sharedData)"); }
        }

        // 2. AdditionalDataLoaded
        if (content.includes('__additionalDataLoaded')) {
            try {
                const match = content.match(/window\.__additionalDataLoaded\('[^']+',\s*({.*})\);/);
                if (match && match[1]) {
                    const data = JSON.parse(match[1]);
                    const result = processGraphqlData(data, "ADDITIONAL_DATA");
                    if (result) return result;
                }
            } catch (e) { log.push("Parse Error (__additionalDataLoaded)"); }
        }

        // 3. Embedded Graphql
        if (content.includes('graphql') && content.includes('shortcode_media')) {
            try {
                const match = content.match(/({.*"graphql":.*})/);
                if (match && match[1]) {
                    const data = JSON.parse(match[1]);
                    const result = processGraphqlData(data, "EMBEDDED_GRAPHQL");
                    if (result) return result;
                }
            } catch (e) { }
        }
    }

    // 4. LD-JSON (Last Resort)
    const ldJsonScripts = $('script[type="application/ld+json"]').toArray();
    for (const s of ldJsonScripts) {
        try {
            const j = JSON.parse($(s).html() || '{}');
            if (j['@type'] === 'ImageGallery' || j.contentUrl) {
                const items: MediaItem[] = [];
                const rawItems = j.associatedMedia || [j];

                rawItems.forEach((m: any, idx: number) => {
                    items.push({
                        url: m.contentUrl,
                        thumbnail: m.thumbnailUrl ?? m.contentUrl,
                        type: m['@type'] === 'VideoObject' ? 'video' : 'image',
                        filename: `insta_ld_${Date.now()}_${idx}.${m['@type'] === 'VideoObject' ? 'mp4' : 'jpg'}`
                    });
                });

                return {
                    thumbnail_url: items[0].url,
                    author_name: j.author?.name || "Instagram User",
                    title: j.caption || "Instagram Post",
                    carouselItems: items
                };
            }
        } catch (e) { }
    }

    return null;
}

/**
 * Universal Processor for Instagram JSON structures
 */
function processGraphqlData(data: any, sourceName: string): InstagramImageData | null {
    let mediaNode: any = null;

    // Normalizations
    if (data?.graphql?.shortcode_media) {
        mediaNode = data.graphql.shortcode_media;
    } else if (data?.entry_data?.PostPage?.[0]?.graphql?.shortcode_media) {
        mediaNode = data.entry_data.PostPage[0].graphql.shortcode_media;
    } else if (data?.items?.[0]) {
        mediaNode = data.items[0];
    }

    if (!mediaNode) return null;

    console.log(`[Success] Found media node via ${sourceName}`);

    const carouselItems: MediaItem[] = [];
    const authorName = mediaNode.owner?.full_name || mediaNode.owner?.username || "Instagram User";
    const title = mediaNode.edge_media_to_caption?.edges?.[0]?.node?.text || mediaNode.caption?.text || "Instagram Media";

    // Detect Carousel
    // Graph API: edge_sidecar_to_children.edges[].node
    // Rest API: carousel_media[]
    const sidecar = mediaNode.edge_sidecar_to_children?.edges || mediaNode.carousel_media;

    if (sidecar && Array.isArray(sidecar) && sidecar.length > 0) {
        sidecar.forEach((item: any, index: number) => {
            const node = item.node || item;

            // Extract Video
            const isVideo = node.is_video || (node.video_versions && node.video_versions.length > 0);
            let videoUrl = node.video_url;
            if (!videoUrl && node.video_versions?.[0]) videoUrl = node.video_versions[0].url;

            // Extract Image (High Res)
            let imageUrl = node.display_url;
            if (!imageUrl && node.image_versions2?.candidates?.[0]) imageUrl = node.image_versions2.candidates[0].url;

            if (isVideo && videoUrl) {
                carouselItems.push({
                    url: videoUrl,
                    thumbnail: imageUrl,
                    type: 'video',
                    filename: `insta_${index}_${mediaNode.shortcode}_vid.mp4`
                });
            } else if (imageUrl) {
                carouselItems.push({
                    url: imageUrl,
                    thumbnail: imageUrl,
                    type: 'image',
                    filename: `insta_${index}_${mediaNode.shortcode}.jpg`
                });
            }
        });
    }
    // Detect Single Item
    else {
        const isVideo = mediaNode.is_video || (mediaNode.video_versions && mediaNode.video_versions.length > 0);
        let videoUrl = mediaNode.video_url;
        if (!videoUrl && mediaNode.video_versions?.[0]) videoUrl = mediaNode.video_versions[0].url;

        let imageUrl = mediaNode.display_url;
        if (!imageUrl && mediaNode.image_versions2?.candidates?.[0]) imageUrl = mediaNode.image_versions2.candidates[0].url;

        if (isVideo && videoUrl) {
            carouselItems.push({
                url: videoUrl,
                thumbnail: imageUrl,
                type: 'video',
                filename: `insta_${mediaNode.shortcode}.mp4`
            });
        } else if (imageUrl) {
            carouselItems.push({
                url: imageUrl,
                thumbnail: imageUrl,
                type: 'image',
                filename: `insta_${mediaNode.shortcode}.jpg`
            });
        }
    }

    if (carouselItems.length === 0) return null;

    return {
        thumbnail_url: carouselItems[0].url,
        author_name: authorName,
        title: title,
        carouselItems: carouselItems
    };
}
