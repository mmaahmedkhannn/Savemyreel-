import { DownloaderService, DownloadResult } from "@/types";

export const tiktokService: DownloaderService = {
    canHandle: (url: string) => url.includes("tiktok.com"),
    extract: async (url: string): Promise<DownloadResult> => {
        try {
            const apiUrl = `https://www.tikwm.com/api/?url=${encodeURIComponent(url)}&hd=1`;
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                }
            });
            const data = await response.json();

            if (data.code !== 0 || !data.data) {
                console.error("TikWM API Error:", data.msg || "Unknown error");
                throw new Error("Failed to download TikTok video. Ensure the video is public and accessible.");
            }

            const videoDetails = data.data;

            // Handle image carousel posts if necessary
            if (videoDetails.images && videoDetails.images.length > 0) {
                return {
                    url: videoDetails.images[0],
                    thumbnail: videoDetails.cover || videoDetails.origin_cover,
                    title: videoDetails.title || "TikTok Image",
                    platform: "tiktok",
                    type: "image",
                    filename: `tiktok_${videoDetails.id}.jpg`
                };
            }

            const mediaUrl = videoDetails.hdplay || videoDetails.play;

            if (!mediaUrl) throw new Error("No media found from TikWM.");

            return {
                url: mediaUrl,
                thumbnail: videoDetails.cover || videoDetails.origin_cover,
                title: videoDetails.title || "TikTok Video",
                platform: "tiktok",
                type: "video",
                filename: `tiktok_${videoDetails.id}.mp4`
            };
        } catch (e: any) {
            console.error("TikTok Download Error:", e.message);
            throw new Error(e.message || "Failed to download TikTok video.");
        }
    }
};
