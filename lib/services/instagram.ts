"use client";

import { DownloaderService, MediaItem } from "@/types";

/**
 * Instagram Service Implementation
 * 
 * Calls the server-side API which uses instagram-url-direct
 * to extract media. The client just passes the URL and receives
 * structured media data ready to display.
 */
export const instagramService: DownloaderService = {
    canHandle(url: string): boolean {
        return url.includes("instagram.com");
    },

    async extract(url: string): Promise<MediaItem[]> {
        console.log("[Client] Starting extraction for:", url);

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 25000); // 25s timeout before UI hangs

            const response = await fetch('/api/instagram/fetch', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: url.split('?')[0] }),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            // If the server crashed or timed out (Nginx 502/504), it returns HTML instead of JSON.
            // We must catch this before `.json()` throws a SyntaxError: Unexpected token '<'
            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                const text = await response.text();
                console.error("[Client] Server returned non-JSON response:", text.substring(0, 200));
                throw new Error("Server took too long to respond or Instagram blocked the extraction. Please try again.");
            }

            const data = await response.json();

            if (!data.success) {
                throw new Error(data.error || "Failed to extract Instagram media");
            }

            console.log("[Client] Received", data.media.length, "media items");
            return data.media;
        } catch (error: any) {
            if (error.name === 'AbortError') {
                throw new Error("Request timed out. Instagram may be temporarily blocking requests from this region.");
            }
            throw error;
        }
    }
};
