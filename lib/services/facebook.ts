import { DownloaderService, DownloadResult } from "@/types";
import { fetchMediaMetadata } from "@/lib/ytdlp";

/**
 * Extract Facebook media by scraping the mobile site (m.facebook.com).
 * Mobile Facebook returns lighter HTML and is more likely to include
 * direct CDN image/video URLs without requiring JS rendering.
 */
async function scrapeFacebookMobile(url: string): Promise<{ mediaUrl: string; type: "video" | "image"; title: string } | null> {
    // Convert to mobile URL
    const mobileUrl = url
        .replace("www.facebook.com", "m.facebook.com")
        .replace("web.facebook.com", "m.facebook.com");

    try {
        const res = await fetch(mobileUrl, {
            headers: {
                "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                "Accept-Language": "en-US,en;q=0.9",
                "Sec-Fetch-Dest": "document",
                "Sec-Fetch-Mode": "navigate",
                "Sec-Fetch-Site": "none",
            },
            redirect: "follow",
        });

        if (!res.ok) return null;
        const html = await res.text();

        // --- Try to find video URLs first ---
        // Facebook CDN video URLs
        const videoPatterns = [
            /(?:hd_src|sd_src|playable_url|browser_native_hd_url|browser_native_sd_url)\s*:\s*"(https?:[^"]+)"/i,
            /data-video-source="(https?:[^"]+)"/i,
            /<meta\s+property="og:video(?::url)?"\s+content="([^"]+)"/i,
            /<meta\s+content="([^"]+)"\s+property="og:video(?::url)?"/i,
        ];

        for (const pattern of videoPatterns) {
            const match = html.match(pattern);
            if (match?.[1]) {
                const videoUrl = match[1].replace(/\\u0025/g, "%").replace(/\\\//g, "/").replace(/&amp;/g, "&");
                console.log("[Facebook] Found video URL via pattern");
                return {
                    mediaUrl: videoUrl,
                    type: "video",
                    title: extractTitle(html) || "Facebook Video",
                };
            }
        }

        // --- Try to find photo/image URLs ---
        // Look for high-res Facebook CDN image URLs (scontent-*.fbcdn.net)
        const imagePatterns = [
            // OG image tags
            /<meta\s+property="og:image"\s+content="([^"]+)"/i,
            /<meta\s+content="([^"]+)"\s+property="og:image"/i,
            // Direct CDN image links in the page
            /"(https:\/\/scontent[^"]+?\.(?:jpg|jpeg|png|webp)[^"]*?)"/i,
            // Facebook photo CDN pattern
            /(https:\/\/(?:scontent|external)[^"'\s]+fbcdn\.net[^"'\s]+)/i,
            // data-store with image url
            /data-store="[^"]*?(?:src|url)":\s*"(https?:[^"]+)"/i,
            // Image viewer pattern
            /"image":\s*\{[^}]*"uri":\s*"(https?:[^"]+)"/i,
        ];

        for (const pattern of imagePatterns) {
            const match = html.match(pattern);
            if (match?.[1]) {
                let imageUrl = match[1]
                    .replace(/\\u0025/g, "%")
                    .replace(/\\\//g, "/")
                    .replace(/&amp;/g, "&");

                // Skip tiny thumbnails and tracking pixels
                if (imageUrl.includes("safe_image.php") || imageUrl.includes("rsrc.php") ||
                    imageUrl.includes("/static/") || imageUrl.includes("emoji")) {
                    continue;
                }

                console.log("[Facebook] Found image URL via pattern");
                return {
                    mediaUrl: imageUrl,
                    type: "image",
                    title: extractTitle(html) || "Facebook Photo",
                };
            }
        }

        return null;
    } catch (e: any) {
        console.error("[Facebook] Mobile scrape error:", e.message);
        return null;
    }
}

/**
 * Extract title from Facebook HTML
 */
function extractTitle(html: string): string | null {
    const titleMatch = html.match(/<meta\s+property="og:title"\s+content="([^"]+)"/i)
        || html.match(/<meta\s+content="([^"]+)"\s+property="og:title"/i)
        || html.match(/<title[^>]*>([^<]+)<\/title>/i);
    return titleMatch?.[1]?.replace(/\s*\|\s*Facebook$/, "") || null;
}


export const facebookService: DownloaderService = {
    canHandle: (url: string) => url.includes("facebook.com") || url.includes("fb.watch"),

    extract: async (url: string): Promise<DownloadResult> => {
        const isPhotoUrl = url.includes("/photo") || url.includes("fbid=");

        // ──────── Photo URLs: scrape directly (yt-dlp can't handle photos) ────────
        if (isPhotoUrl) {
            console.log("[Facebook] Photo URL detected, using mobile scraping");

            const result = await scrapeFacebookMobile(url);
            if (result) {
                const ext = result.type === "video" ? "mp4" : "jpg";
                return {
                    url: result.mediaUrl,
                    thumbnail: result.type === "image" ? result.mediaUrl : undefined,
                    title: result.title,
                    platform: "facebook",
                    type: result.type,
                    filename: `facebook_photo_${Date.now()}.${ext}`,
                };
            }
            throw new Error("Could not extract this Facebook photo. The post may be private or require login.");
        }

        // ──────── Video URLs: yt-dlp first → mobile scraping fallback ────────
        try {
            console.log("[Facebook] Video URL, trying yt-dlp");
            const metadata = await fetchMediaMetadata(url);

            const mediaUrl = metadata.url || metadata.formats?.[metadata.formats.length - 1]?.url;
            if (!mediaUrl) throw new Error("No media URL in yt-dlp output");

            return {
                url: mediaUrl,
                thumbnail: metadata.thumbnail,
                title: metadata.title || "Facebook Video",
                platform: "facebook",
                type: "video",
                filename: `facebook_${metadata.id || Date.now()}.mp4`,
            };
        } catch (ytdlpError: any) {
            console.warn("[Facebook] yt-dlp failed, trying mobile scraping:", ytdlpError.message);

            const result = await scrapeFacebookMobile(url);
            if (result) {
                const ext = result.type === "video" ? "mp4" : "jpg";
                return {
                    url: result.mediaUrl,
                    thumbnail: result.type === "image" ? result.mediaUrl : undefined,
                    title: result.title,
                    platform: "facebook",
                    type: result.type,
                    filename: `facebook_${Date.now()}.${ext}`,
                };
            }

            throw new Error("Failed to download Facebook content. The post may be private or require login.");
        }
    }
};
