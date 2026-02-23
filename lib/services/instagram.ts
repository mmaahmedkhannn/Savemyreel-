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

        const response = await fetch('/api/instagram/fetch', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: url.split('?')[0] })
        });

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.error || "Failed to extract Instagram media");
        }

        console.log("[Client] Received", data.media.length, "media items");
        return data.media;
    }
};
