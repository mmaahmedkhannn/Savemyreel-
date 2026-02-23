import { DownloaderService, DownloadResult } from "@/types";
import { fetchMediaMetadata } from "@/lib/ytdlp";

export const twitterService: DownloaderService = {
    canHandle: (url: string) => url.includes("twitter.com") || url.includes("x.com"),
    extract: async (url: string): Promise<DownloadResult> => {
        try {
            const metadata = await fetchMediaMetadata(url);

            const mediaUrl = metadata.url || metadata.formats?.[metadata.formats.length - 1]?.url;

            if (!mediaUrl) throw new Error("No media found.");

            return {
                url: mediaUrl,
                thumbnail: metadata.thumbnail,
                title: metadata.title || "X / Twitter Video",
                platform: "twitter",
                type: "video",
                filename: `twitter_${metadata.id}.mp4`
            };
        } catch (e: any) {
            console.error("Twitter Download Error:", e.message);
            throw new Error("Failed to download Twitter video.");
        }
    }
};
