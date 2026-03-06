import { DownloaderService, DownloadResult } from "@/types";
import { fetchMediaMetadata } from "@/lib/ytdlp";

export const pinterestService: DownloaderService = {
    canHandle: (url: string) => url.includes("pinterest.com") || url.includes("pin.it"),
    extract: async (url: string): Promise<DownloadResult> => {
        try {
            let formattedUrl = url;

            // Step 1: Resolve pin.it shortlinks
            if (url.includes("pin.it")) {
                try {
                    const response = await fetch(url.startsWith("http") ? url : `https://${url}`, {
                        method: "HEAD",
                        redirect: "follow",
                    });
                    formattedUrl = response.url; // The final resolved URL
                    console.log(`[Pinterest] Resolved pin.it to: ${formattedUrl}`);
                } catch (e) {
                    console.error("[Pinterest] Failed to resolve shortlink", e);
                }
            }

            // Step 2: Normalize Pinterest URLs for yt-dlp (yt-dlp strictly expects /pin/ID format)
            const match = formattedUrl.match(/(?:\/pin\/|\/ideas\/[^\/]+\/|\/p\/)(\d+)/);
            if (match && match[1]) {
                formattedUrl = `https://www.pinterest.com/pin/${match[1]}/`;
                console.log(`[Pinterest] Normalized URL to: ${formattedUrl}`);
            }

            let metadata;
            try {
                metadata = await fetchMediaMetadata(formattedUrl) as any;
            } catch (err: any) {
                console.log(`[Pinterest] yt-dlp failed (${err.message}). Attempting SEO Meta Tags fallback...`);

                const fetch = require('cross-fetch');
                const response = await fetch(url, {
                    headers: {
                        "User-Agent": "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)",
                    },
                    cache: 'no-store', // CRITICAL: Stop Next.js from aggressively caching failed Pinterest states
                    redirect: 'follow'
                });

                if (!response.ok) throw new Error(`Failed to reach Pinterest servers (${response.status}).`);
                const html = await response.text();

                // Pinterest allows the Facebook bot to scrape SEO tags like og:image and og:video without blocking.
                const ogImageMatch = html.match(/<meta property="og:image" content="(https:\/\/[^"]+)"/i);
                const ogVideoMatch = html.match(/<meta property="og:video:url" content="(https:\/\/[^"]+)"/i) ||
                    html.match(/<meta property="og:video" content="(https:\/\/[^"]+)"/i);

                if (ogVideoMatch && ogVideoMatch[1]) {
                    // Extract video
                    return {
                        url: ogVideoMatch[1],
                        thumbnail: ogImageMatch ? ogImageMatch[1] : ogVideoMatch[1],
                        title: "Pinterest Video",
                        platform: "pinterest",
                        type: "video",
                        filename: `pinterest_${Date.now()}.mp4`
                    };
                }

                if (ogImageMatch && ogImageMatch[1]) {
                    // Extract image
                    return {
                        url: ogImageMatch[1],
                        thumbnail: ogImageMatch[1],
                        title: "Pinterest Image",
                        platform: "pinterest",
                        type: "image",
                        filename: `pinterest_${Date.now()}.jpg`
                    };
                }

                throw new Error("No media found on this Pinterest page.");
            } // end of catch block

            // Handle potential image-only pins or video pins for default yt-dlp successful payloads
            const isVideo = metadata.formats && metadata.formats.length > 0 && metadata.formats.some((f: any) => f.vcodec !== "none");

            const mediaUrl = metadata.url || (metadata.formats && metadata.formats.length > 0 ? metadata.formats[metadata.formats.length - 1].url : null);

            if (!mediaUrl && metadata.thumbnail) {
                // If it's just an image pin, yt-dlp might fail to find a "video" but could return thumbnail
                return {
                    url: metadata.thumbnail,
                    thumbnail: metadata.thumbnail,
                    title: metadata.title || "Pinterest Image",
                    platform: "pinterest",
                    type: "image",
                    filename: `pinterest_${metadata.id || Date.now()}.jpg`
                };
            }

            if (!mediaUrl) throw new Error("No media found.");

            return {
                url: mediaUrl,
                thumbnail: metadata.thumbnail,
                title: metadata.title || "Pinterest Media",
                platform: "pinterest",
                type: isVideo ? "video" : "image",
                filename: `pinterest_${metadata.id || Date.now()}.${isVideo ? 'mp4' : 'jpg'}`
            };
        } catch (e: any) {
            console.error("[Pinterest Extraction Error]:", e);
            throw new Error(`Failed to download Pinterest media: ${e.message || 'Unknown error'}`);
        }
    }
};
