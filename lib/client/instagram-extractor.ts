import { MediaItem } from "@/types";

export interface ClientExtractionResult {
    success: boolean;
    carouselItems?: MediaItem[];
    thumbnail?: string;
    author?: string;
    title?: string;
    error?: string;
}

/**
 * Client-side Instagram media extractor.
 * Parses HTML received from proxy to extract media URLs.
 */
export function parseInstagramHtml(html: string): ClientExtractionResult {
    console.log("[Client Parser] Starting extraction...");

    // Strategy 1: Find window._sharedData
    let mediaNode = findSharedData(html);

    // Strategy 2: Find __additionalDataLoaded
    if (!mediaNode) {
        mediaNode = findAdditionalData(html);
    }

    // Strategy 3: Find embedded graphql object
    if (!mediaNode) {
        mediaNode = findEmbeddedGraphql(html);
    }

    // Strategy 4: Parse LD-JSON
    if (!mediaNode) {
        const ldResult = parseLdJson(html);
        if (ldResult) return ldResult;
    }

    if (!mediaNode) {
        console.error("[Client Parser] No media node found");
        return { success: false, error: "Could not find media data in page" };
    }

    // Process the media node
    return processMediaNode(mediaNode);
}

function findSharedData(html: string): any {
    const match = html.match(/window\._sharedData\s*=\s*({[\s\S]+?});<\/script>/);
    if (match) {
        try {
            const data = JSON.parse(match[1]);
            const media = data?.entry_data?.PostPage?.[0]?.graphql?.shortcode_media;
            if (media) {
                console.log("[Client] Found via _sharedData");
                return media;
            }
        } catch (e) { }
    }
    return null;
}

function findAdditionalData(html: string): any {
    const match = html.match(/window\.__additionalDataLoaded\s*\(\s*['"][^'"]+['"]\s*,\s*({[\s\S]+?})\s*\)\s*;/);
    if (match) {
        try {
            const data = JSON.parse(match[1]);
            if (data?.graphql?.shortcode_media) {
                console.log("[Client] Found via __additionalDataLoaded");
                return data.graphql.shortcode_media;
            }
        } catch (e) { }
    }
    return null;
}

function findEmbeddedGraphql(html: string): any {
    // Look for graphql object with shortcode_media
    const match = html.match(/"graphql"\s*:\s*{\s*"shortcode_media"\s*:\s*({[\s\S]+?})\s*}\s*[,}]/);
    if (match) {
        try {
            const media = JSON.parse(match[1]);
            console.log("[Client] Found via embedded graphql");
            return media;
        } catch (e) { }
    }
    return null;
}

function parseLdJson(html: string): ClientExtractionResult | null {
    const ldMatch = html.match(/<script type="application\/ld\+json">([\s\S]+?)<\/script>/g);
    if (!ldMatch) return null;

    for (const script of ldMatch) {
        const jsonStr = script.replace(/<\/?script[^>]*>/g, '');
        try {
            const j = JSON.parse(jsonStr);
            if (j['@type'] === 'ImageGallery' || j.contentUrl) {
                const items: MediaItem[] = [];
                const rawItems = j.associatedMedia || [j];

                rawItems.forEach((m: any, idx: number) => {
                    items.push({
                        url: m.contentUrl,
                        thumbnail: m.thumbnailUrl ?? m.contentUrl,
                        type: m['@type'] === 'VideoObject' ? 'video' : 'image',
                        filename: `insta_${Date.now()}_${idx}.${m['@type'] === 'VideoObject' ? 'mp4' : 'jpg'}`
                    });
                });

                console.log(`[Client] Found ${items.length} items via LD-JSON`);
                return {
                    success: true,
                    carouselItems: items,
                    thumbnail: items[0]?.url,
                    author: j.author?.name || "Instagram User",
                    title: j.caption || "Instagram Post"
                };
            }
        } catch (e) { }
    }
    return null;
}

function processMediaNode(node: any): ClientExtractionResult {
    const carouselItems: MediaItem[] = [];
    const authorName = node.owner?.full_name || node.owner?.username || "Instagram User";
    const title = node.edge_media_to_caption?.edges?.[0]?.node?.text || "Instagram Media";
    const shortcode = node.shortcode || "post";

    // Detect carousel
    const sidecar = node.edge_sidecar_to_children?.edges || node.carousel_media;

    if (sidecar && Array.isArray(sidecar) && sidecar.length > 0) {
        console.log(`[Client] Processing carousel with ${sidecar.length} items`);

        sidecar.forEach((item: any, index: number) => {
            const n = item.node || item;

            const isVideo = n.is_video || (n.video_versions && n.video_versions.length > 0);
            let videoUrl = n.video_url;
            if (!videoUrl && n.video_versions?.[0]) videoUrl = n.video_versions[0].url;

            let imageUrl = n.display_url;
            if (!imageUrl && n.image_versions2?.candidates?.[0]) {
                imageUrl = n.image_versions2.candidates[0].url;
            }

            if (isVideo && videoUrl) {
                carouselItems.push({
                    url: videoUrl,
                    thumbnail: imageUrl,
                    type: 'video',
                    filename: `insta_${shortcode}_${index}.mp4`
                });
            } else if (imageUrl) {
                carouselItems.push({
                    url: imageUrl,
                    thumbnail: imageUrl,
                    type: 'image',
                    filename: `insta_${shortcode}_${index}.jpg`
                });
            }
        });
    } else {
        // Single item
        console.log("[Client] Processing single item");
        const isVideo = node.is_video || (node.video_versions && node.video_versions.length > 0);
        let videoUrl = node.video_url;
        if (!videoUrl && node.video_versions?.[0]) videoUrl = node.video_versions[0].url;

        let imageUrl = node.display_url;
        if (!imageUrl && node.image_versions2?.candidates?.[0]) {
            imageUrl = node.image_versions2.candidates[0].url;
        }

        if (isVideo && videoUrl) {
            carouselItems.push({
                url: videoUrl,
                thumbnail: imageUrl,
                type: 'video',
                filename: `insta_${shortcode}.mp4`
            });
        } else if (imageUrl) {
            carouselItems.push({
                url: imageUrl,
                thumbnail: imageUrl,
                type: 'image',
                filename: `insta_${shortcode}.jpg`
            });
        }
    }

    if (carouselItems.length === 0) {
        return { success: false, error: "No media items extracted from node" };
    }

    return {
        success: true,
        carouselItems,
        thumbnail: carouselItems[0].url,
        author: authorName,
        title
    };
}
