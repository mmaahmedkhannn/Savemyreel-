import { DownloaderService, DownloadResult } from "@/types";
import { fetchMediaMetadata } from "@/lib/ytdlp";

export const tiktokService: DownloaderService = {
    canHandle: (url: string) => url.includes("tiktok.com"),
    extract: async (url: string): Promise<DownloadResult> => {
        try {
            const metadata = await fetchMediaMetadata(url);

            const mediaUrl = metadata.url || metadata.formats?.[metadata.formats.length - 1]?.url;

            if (!mediaUrl) throw new Error("No media found.");

            return {
                url: mediaUrl,
                thumbnail: metadata.thumbnail,
                title: metadata.title || "TikTok Video",
                platform: "tiktok",
                type: "video",
                filename: `tiktok_${metadata.id}.mp4`
            };
        } catch (e: any) {
            console.error("TikTok Download Error:", e.message);
            throw new Error("Failed to download TikTok video.");
        }
    }
};
