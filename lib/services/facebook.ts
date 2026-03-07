import { DownloaderService, DownloadResult } from "@/types";
import { fetchMediaMetadata } from "@/lib/ytdlp";

function normalizeUrl(url: string): string {
    return url
        .replace(/\/(share\/v|share\/r|reel)\//, "/reel/")
        .replace(/\/share\/p\//, "/posts/");
}

async function scrapeFacebookMobile(url: string): Promise<{ mediaUrl: string; type: "video" | "image"; title: string } | null> {
    const mobileUrl = url
        .replace("www.facebook.com", "m.facebook.com")
        .replace("web.facebook.com", "m.facebook.com");

    const userAgents = [
        "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)",
        "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
    ];

    for (const ua of userAgents) {
        try {
            const res = await fetch(mobileUrl, {
                headers: {
                    "User-Agent": ua,
                    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                    "Accept-Language": "en-US,en;q=0.9",
                    "Sec-Fetch-Dest": "document",
                    "Sec-Fetch-Mode": "navigate",
                    "Sec-Fetch-Site": "none",
                },
                redirect: "follow",
            });

            if (!res.ok) continue;
            const html = await res.text();

            if (html.includes("Log in or sign up to view") || html.includes("login/?next=")) {
                console.log("[Facebook] Page requires login (UA: " + ua.substring(0, 30) + ")");
                continue;
            }

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

            const imagePatterns = [
                /<meta\s+property="og:image"\s+content="([^"]+)"/i,
                /<meta\s+content="([^"]+)"\s+property="og:image"/i,
                /"(https:\/\/scontent[^"]+?\.(?:jpg|jpeg|png|webp)[^"]*?)"/i,
                /(https:\/\/(?:scontent|external)[^"'\s]+fbcdn\.net[^"'\s]+)/i,
                /"image":\s*\{[^}]*"uri":\s*"(https?:[^"]+)"/i,
            ];

            for (const pattern of imagePatterns) {
                const match = html.match(pattern);
                if (match?.[1]) {
                    let imageUrl = match[1]
                        .replace(/\\u0025/g, "%")
                        .replace(/\\\//g, "/")
                        .replace(/&amp;/g, "&");

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
        } catch (e: any) {
            console.error("[Facebook] Scrape error with UA " + ua.substring(0, 20) + ":", e.message);
        }
    }

    return null;
}

function extractTitle(html: string): string | null {
    const titleMatch = html.match(/<meta\s+property="og:title"\s+content="([^"]+)"/i)
        || html.match(/<meta\s+content="([^"]+)"\s+property="og:title"/i)
        || html.match(/<title[^>]*>([^<]+)<\/title>/i);
    const title = titleMatch?.[1]?.replace(/\s*\|\s*Facebook$/, "") || null;
    if (title === "Log in or sign up to view") return null;
    return title;
}

function requiresLogin(url: string): boolean {
    return url.includes("/login/") || url.includes("login/?next=");
}

export const facebookService: DownloaderService = {
    canHandle: (url: string) => {
        try {
            const parsed = new URL(url);
            const host = parsed.hostname.replace(/^www\./, "").replace(/^m\./, "").replace(/^web\./, "");
            return host === "facebook.com" || host === "fb.watch" || host === "fb.com";
        } catch {
            return false;
        }
    },

    extract: async (url: string): Promise<DownloadResult> => {
        const isPhotoUrl = url.includes("/photo") || url.includes("fbid=");
        const isShareUrl = url.includes("/share/");
        const normalized = normalizeUrl(url);

        if (isPhotoUrl) {
            console.log("[Facebook] Photo URL detected, using scraping");
            const result = await scrapeFacebookMobile(url);
            if (result) {
                const ext = result.type === "video" ? "mp4" : "jpg";
                return {
                    url: result.mediaUrl,
                    thumbnail: result.type === "image" ? result.mediaUrl : undefined,
                    title: result.title,
                    platform: "facebook",
                    type: result.type,
                    filename: "facebook_photo_" + Date.now() + "." + ext,
                };
            }
            throw new Error("Could not extract this Facebook photo. The post may be private or require login.");
        }

        try {
            const urlsToTry = [url];
            if (normalized !== url) urlsToTry.push(normalized);

            for (const tryUrl of urlsToTry) {
                try {
                    console.log("[Facebook] Trying yt-dlp with: " + tryUrl);
                    const metadata = await fetchMediaMetadata(tryUrl);

                    if (requiresLogin(metadata.url || "")) {
                        console.log("[Facebook] yt-dlp returned login redirect");
                        continue;
                    }

                    const mediaUrl = metadata.url || metadata.formats?.[metadata.formats.length - 1]?.url;
                    if (!mediaUrl) continue;

                    return {
                        url: mediaUrl,
                        thumbnail: metadata.thumbnail,
                        title: metadata.title || "Facebook Video",
                        platform: "facebook",
                        type: "video",
                        filename: "facebook_" + (metadata.id || Date.now()) + ".mp4",
                    };
                } catch (e: any) {
                    console.warn("[Facebook] yt-dlp failed for " + tryUrl + ":", e.message?.substring(0, 100));
                }
            }
        } catch (e: any) {
            console.warn("[Facebook] yt-dlp extraction failed:", e.message);
        }

        console.log("[Facebook] Falling back to scraping");
        const result = await scrapeFacebookMobile(url);
        if (result) {
            const ext = result.type === "video" ? "mp4" : "jpg";
            return {
                url: result.mediaUrl,
                thumbnail: result.type === "image" ? result.mediaUrl : undefined,
                title: result.title,
                platform: "facebook",
                type: result.type,
                filename: "facebook_" + Date.now() + "." + ext,
            };
        }

        if (isShareUrl) {
            throw new Error("Could not access this Facebook post. Share links often require login. Try using the direct post URL instead.");
        }
        throw new Error("Failed to download Facebook content. The post may be private or require login.");
    }
};
