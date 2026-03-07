import { DownloaderService, DownloadResult } from "@/types";

const ALLOWED_HOSTS = ["www.pinterest.com", "pinterest.com", "pin.it", "in.pinterest.com", "br.pinterest.com", "de.pinterest.com", "fr.pinterest.com", "es.pinterest.com", "it.pinterest.com", "jp.pinterest.com", "kr.pinterest.com", "nl.pinterest.com", "pt.pinterest.com", "ru.pinterest.com", "co.pinterest.com", "mx.pinterest.com", "ar.pinterest.com", "uk.pinterest.com", "au.pinterest.com"];

function isAllowedPinterestHost(urlStr: string): boolean {
    try {
        const parsed = new URL(urlStr);
        if (parsed.protocol !== "https:") return false;
        const host = parsed.hostname.toLowerCase();
        return ALLOWED_HOSTS.includes(host) || host.endsWith(".pinterest.com");
    } catch {
        return false;
    }
}

function fetchWithTimeout(url: string, options: RequestInit = {}, timeoutMs = 15000): Promise<Response> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    return fetch(url, { ...options, signal: controller.signal }).finally(() => clearTimeout(timer));
}

async function scrapePinterestPage(url: string): Promise<DownloadResult> {
    if (!isAllowedPinterestHost(url)) {
        throw new Error("Invalid Pinterest URL");
    }

    const response = await fetchWithTimeout(url, {
        headers: {
            "User-Agent": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
            "Accept": "text/html,application/xhtml+xml",
            "Accept-Language": "en-US,en;q=0.9",
        },
        redirect: "follow",
    });

    if (!response.ok) {
        throw new Error(`Pinterest returned HTTP ${response.status}`);
    }

    const html = await response.text();

    const getMeta = (property: string): string | null => {
        const patterns = [
            new RegExp(`<meta\\s[^>]*property=["']${property}["'][^>]*content=["']([^"']+)["']`, "i"),
            new RegExp(`<meta\\s[^>]*content=["']([^"']+)["'][^>]*property=["']${property}["']`, "i"),
            new RegExp(`<meta\\s[^>]*name=["']${property}["'][^>]*content=["']([^"']+)["']`, "i"),
            new RegExp(`<meta\\s[^>]*content=["']([^"']+)["'][^>]*name=["']${property}["']`, "i"),
        ];
        for (const p of patterns) {
            const m = html.match(p);
            if (m) return m[1];
        }
        return null;
    };

    const ogImage = getMeta("og:image");
    const ogTitle = getMeta("og:title") || getMeta("title") || "Pinterest Pin";
    const ogVideo = getMeta("og:video") || getMeta("og:video:url") || getMeta("og:video:secure_url");

    let videoUrl: string | null = null;
    const videoMatches = html.match(/https?:[^\s"'<>]*\.pinimg\.com[^\s"'<>]*\/videos\/[^\s"'<>]*\.mp4/g);
    if (videoMatches && videoMatches.length > 0) {
        const cleaned = videoMatches.map(u => u.replace(/\\u002F/g, "/").replace(/\\\//g, "/"));
        videoUrl = cleaned.find(u => u.includes("/720p/")) || cleaned.find(u => u.includes("/480p/")) || cleaned[0];
    }
    if (!videoUrl && ogVideo) {
        videoUrl = ogVideo;
    }

    if (videoUrl) {
        return {
            url: videoUrl,
            thumbnail: ogImage || videoUrl,
            title: cleanTitle(ogTitle),
            platform: "pinterest",
            type: "video",
            filename: `pinterest_${Date.now()}.mp4`,
        };
    }

    let imageUrl = ogImage;
    if (!imageUrl) {
        const originals = html.match(/https?:\/\/i\.pinimg\.com\/originals\/[^\s"'<>]+\.(jpg|jpeg|png|gif|webp)/gi);
        if (originals && originals.length > 0) {
            imageUrl = originals[0];
        }
    }

    if (!imageUrl) {
        const highRes = html.match(/https?:\/\/i\.pinimg\.com\/736x\/[^\s"'<>]+\.(jpg|jpeg|png|gif|webp)/gi);
        if (highRes && highRes.length > 0) {
            imageUrl = highRes[0];
        }
    }

    if (!imageUrl) {
        throw new Error("No media found on this Pinterest page.");
    }

    imageUrl = upgradeToOriginal(imageUrl);

    const ext = imageUrl.match(/\.(png|gif|webp)/i) ? imageUrl.match(/\.(png|gif|webp)/i)![1].toLowerCase() : "jpg";

    return {
        url: imageUrl,
        thumbnail: ogImage || imageUrl,
        title: cleanTitle(ogTitle),
        platform: "pinterest",
        type: "image",
        filename: `pinterest_${Date.now()}.${ext}`,
    };
}

function upgradeToOriginal(url: string): string {
    return url.replace(/\/236x\/|\/474x\/|\/564x\/|\/736x\//, "/originals/");
}

function cleanTitle(title: string): string {
    return title
        .replace(/\s*\|\s*Pinterest\s*$/i, "")
        .replace(/\s*-\s*Pinterest\s*$/i, "")
        .replace(/Pin de .+ em .+\s*\|/i, "")
        .trim()
        .substring(0, 100) || "Pinterest Pin";
}

export const pinterestService: DownloaderService = {
    canHandle: (url: string) => {
        try {
            const parsed = new URL(url);
            const host = parsed.hostname.toLowerCase();
            return host === "pin.it" || host.endsWith("pinterest.com");
        } catch {
            return false;
        }
    },
    extract: async (url: string): Promise<DownloadResult> => {
        try {
            if (!isAllowedPinterestHost(url)) {
                throw new Error("Invalid Pinterest URL");
            }

            let formattedUrl = url;

            if (new URL(url).hostname === "pin.it") {
                try {
                    const response = await fetchWithTimeout(
                        url,
                        { method: "HEAD", redirect: "follow" },
                        10000
                    );
                    formattedUrl = response.url;
                    if (!isAllowedPinterestHost(formattedUrl)) {
                        throw new Error("Shortlink resolved to non-Pinterest URL");
                    }
                    console.log(`[Pinterest] Resolved pin.it to: ${formattedUrl}`);
                } catch (e: any) {
                    if (e.message.includes("non-Pinterest")) throw e;
                    console.error("[Pinterest] Failed to resolve shortlink", e);
                }
            }

            const match = formattedUrl.match(/(?:\/pin\/|\/ideas\/[^\/]+\/|\/p\/)(\d+)/);
            if (match && match[1]) {
                formattedUrl = `https://www.pinterest.com/pin/${match[1]}/`;
                console.log(`[Pinterest] Normalized URL to: ${formattedUrl}`);
            }

            console.log(`[Pinterest] Scraping page: ${formattedUrl}`);
            const result = await scrapePinterestPage(formattedUrl);
            console.log(`[Pinterest] Success: ${result.type} - ${result.title}`);
            return result;
        } catch (e: any) {
            console.error("[Pinterest Extraction Error]:", e);
            throw new Error(`Failed to download Pinterest media: ${e.message || 'Unknown error'}`);
        }
    }
};
