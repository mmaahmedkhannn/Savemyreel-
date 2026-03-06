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
                // FALLBACK: yt-dlp fails on Image-Only Idea Pins (Carousels) with 404 or extraction errors.
                // Pinterest strictly blocks Next.js/Vercel standard fetches even with headers.
                // We use puppeteer-core to spin up a headless browser to get the evaluated HTML.
                console.log(`[Pinterest] yt-dlp failed (${err.message}). Attempting Puppeteer browser fallback...`);

                const puppeteer = require('puppeteer-core');
                let chromium;
                try {
                    chromium = require('@sparticuz/chromium');
                } catch (e) {
                    console.error("Sparticuz Chromium missing, falling back to local chrome path if exists", e);
                }
                const isLocal = process.env.NODE_ENV === 'development' || process.platform === 'win32';

                let browser;
                let html = "";
                try {
                    const executablePath = isLocal
                        ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
                        : await chromium.executablePath();

                    const args = isLocal
                        ? ['--no-sandbox', '--disable-setuid-sandbox']
                        : chromium.args;

                    browser = await puppeteer.launch({
                        args: args,
                        defaultViewport: chromium ? chromium.defaultViewport : { width: 1280, height: 720 },
                        executablePath: executablePath,
                        headless: chromium ? chromium.headless : true,
                    });

                    const page = await browser.newPage();
                    await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36");

                    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });
                    html = await page.content();
                } catch (browserErr) {
                    console.error("[Pinterest Puppeteer Error]:", browserErr);
                    throw new Error("Failed to reach Pinterest via browser fallback.");
                } finally {
                    if (browser) await browser.close();
                }

                // Extract all high-res original images from the embedded React/Redux JSON blob
                const origUrlsMatch = html.match(/https:\/\/[A-Za-z0-9.-]+\.pinimg\.com\/originals\/[A-Za-z0-9.\/_%-]+\.jpg/g);

                if (!origUrlsMatch || origUrlsMatch.length === 0) {
                    throw new Error("No media found on this Pinterest page.");
                }

                // Deduplicate URLs
                const uniqueUrls = Array.from(new Set(origUrlsMatch));

                if (uniqueUrls.length === 1) {
                    return {
                        url: uniqueUrls[0],
                        thumbnail: uniqueUrls[0],
                        title: "Pinterest Image",
                        platform: "pinterest",
                        type: "image",
                        filename: `pinterest_${Date.now()}.jpg`
                    };
                } else {
                    // It's a carousel (Idea Pin)
                    const carouselItems = uniqueUrls.map((imgUrl, i) => ({
                        url: imgUrl,
                        thumbnail: imgUrl,
                        type: "image" as const,
                        filename: `pinterest_${Date.now()}_${i + 1}.jpg`
                    }));

                    return {
                        url: uniqueUrls[0],
                        thumbnail: uniqueUrls[0],
                        title: "Pinterest Idea Pin (Carousel)",
                        platform: "pinterest",
                        type: "image",
                        carouselItems: carouselItems,
                        filename: `pinterest_${Date.now()}_1.jpg`
                    };
                }

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
