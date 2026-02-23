import { DownloaderService, DownloadResult } from "@/types";
import { fetchMediaMetadata } from "@/lib/ytdlp";

interface YouTubeFormat {
    url: string;
    ext: string;
    format_note?: string;
    height?: number;
    abr?: number;
    vcodec?: string;
    acodec?: string;
    filesize?: number;
    format_id?: string;
    resolution?: string;
}

function pickBestVideoUrl(formats: YouTubeFormat[]): string | undefined {
    // Prefer mp4 with both video+audio, sorted by resolution descending
    const videoFormats = formats
        .filter(f =>
            f.ext === "mp4" &&
            f.vcodec && f.vcodec !== "none" &&
            f.acodec && f.acodec !== "none" &&
            f.url
        )
        .sort((a, b) => (b.height || 0) - (a.height || 0));

    if (videoFormats.length > 0) return videoFormats[0].url;

    // Fallback: any format with a video stream
    const anyVideo = formats
        .filter(f => f.vcodec && f.vcodec !== "none" && f.url)
        .sort((a, b) => (b.height || 0) - (a.height || 0));

    return anyVideo[0]?.url;
}

function buildQualityOptions(formats: YouTubeFormat[]) {
    const seen = new Set<string>();
    const options: { label: string; url: string; quality: string; ext: string }[] = [];

    // Video qualities (mp4 with audio preferred)
    const videoFormats = formats
        .filter(f =>
            f.ext === "mp4" &&
            f.vcodec && f.vcodec !== "none" &&
            f.acodec && f.acodec !== "none" &&
            f.url &&
            f.height
        )
        .sort((a, b) => (b.height || 0) - (a.height || 0));

    for (const fmt of videoFormats) {
        const quality = `${fmt.height}p`;
        if (!seen.has(quality)) {
            seen.add(quality);
            options.push({
                label: `MP4 ${quality}`,
                url: fmt.url,
                quality,
                ext: "mp4",
            });
        }
    }

    // Audio-only option (best m4a/mp3)
    const audioFormats = formats
        .filter(f =>
            (f.ext === "m4a" || f.ext === "mp3" || f.ext === "webm") &&
            f.vcodec === "none" &&
            f.acodec && f.acodec !== "none" &&
            f.url
        )
        .sort((a, b) => (b.abr || 0) - (a.abr || 0));

    if (audioFormats.length > 0) {
        const best = audioFormats[0];
        options.push({
            label: `Audio Only (${best.abr || "128"}kbps)`,
            url: best.url,
            quality: "audio",
            ext: best.ext || "m4a",
        });
    }

    return options;
}

export const youtubeService: DownloaderService = {
    canHandle: (url: string) =>
        url.includes("youtube.com") ||
        url.includes("youtu.be") ||
        url.includes("m.youtube.com"),

    extract: async (url: string): Promise<DownloadResult> => {
        try {
            const metadata = await fetchMediaMetadata(url);

            const mediaUrl =
                pickBestVideoUrl(metadata.formats || []) ||
                metadata.url ||
                metadata.formats?.[metadata.formats.length - 1]?.url;

            if (!mediaUrl) throw new Error("No media found.");

            const qualityOptions = buildQualityOptions(
                (metadata.formats as unknown as YouTubeFormat[]) || []
            );

            return {
                url: mediaUrl,
                thumbnail: metadata.thumbnail,
                title: metadata.title || "YouTube Video",
                platform: "youtube",
                type: "video",
                filename: `youtube_${metadata.id}.mp4`,
                metadata: {
                    qualityOptions,
                    duration: (metadata as any).duration,
                    uploader: (metadata as any).uploader,
                },
            };
        } catch (e: any) {
            console.error("YouTube Download Error:", e.message);
            throw new Error("Failed to download YouTube video. Please check the URL and try again.");
        }
    },
};
