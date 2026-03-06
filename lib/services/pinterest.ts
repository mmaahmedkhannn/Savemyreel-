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
                console.log(`[Pinterest] yt-dlp failed (${err.message}). Attempting Puppeteer Headless Fallback...`);

                // Pinterest has completely removed server-side og:image/og:video meta tags.
                // The ONLY native way to extract media is to render the page with a real browser
                // and read the video/image sources from the live DOM.
                const puppeteer = require('puppeteer');
                let browser;
                try {
                    browser = await puppeteer.launch({
                        headless: 'new',
                        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
                    });
                    const page = await browser.newPage();

                    // Set a realistic viewport and user agent
                    await page.setViewport({ width: 1280, height: 900 });

                    console.log(`[Pinterest] Navigating to: ${formattedUrl}`);
                    await page.goto(formattedUrl, { waitUntil: 'networkidle2', timeout: 30000 });

                    // Extract all video and image sources from the rendered DOM
                    const media = await page.evaluate(() => {
                        // Get video sources (for video pins)
                        const videos = Array.from(document.querySelectorAll('video')).map(v => {
                            const source = v.querySelector('source');
                            return v.src || (source ? source.src : '');
                        }).filter(Boolean);

                        // Get high-quality pinimg.com images (the actual pin content, not UI icons)
                        const images = Array.from(document.querySelectorAll('img'))
                            .map(i => i.src)
                            .filter(src => src.includes('pinimg.com') && (
                                src.includes('/originals/') || src.includes('/736x/') || src.includes('/564x/')
                            ));

                        // Get the page title for the pin
                        const titleEl = document.querySelector('h1') || document.querySelector('[data-test-id="pin-title"]');
                        const title = titleEl ? titleEl.textContent?.trim() : '';

                        return { videos, images, title };
                    });

                    await browser.close();
                    browser = null;

                    console.log(`[Pinterest] Puppeteer found: ${media.videos.length} videos, ${media.images.length} images`);

                    // Prefer video over image
                    if (media.videos.length > 0) {
                        return {
                            url: media.videos[0],
                            thumbnail: media.images.length > 0 ? media.images[0] : media.videos[0],
                            title: media.title || "Pinterest Video",
                            platform: "pinterest",
                            type: "video",
                            filename: `pinterest_${Date.now()}.mp4`
                        };
                    }

                    if (media.images.length > 0) {
                        // Return the highest quality image (originals > 736x > 564x)
                        const bestImage = media.images.find((u: string) => u.includes('/originals/')) || media.images[0];
                        return {
                            url: bestImage,
                            thumbnail: bestImage,
                            title: media.title || "Pinterest Image",
                            platform: "pinterest",
                            type: "image",
                            filename: `pinterest_${Date.now()}.${bestImage.includes('.png') ? 'png' : 'jpg'}`
                        };
                    }

                    throw new Error("No media found on this Pinterest page.");
                } catch (puppeteerErr: any) {
                    if (browser) await browser.close();
                    throw puppeteerErr;
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
