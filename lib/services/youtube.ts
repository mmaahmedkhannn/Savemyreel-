import { DownloaderService, DownloadResult } from "@/types";
import { fetchMediaMetadata } from "@/lib/ytdlp";

interface QualityOption {
    label: string;
    url: string;
    quality: string;
    ext: string;
}

function fetchWithTimeout(url: string, options: RequestInit = {}, timeoutMs = 15000): Promise<Response> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    return fetch(url, { ...options, signal: controller.signal }).finally(() => clearTimeout(timer));
}

function extractVideoId(url: string): string | null {
    const patterns = [
        /[?&]v=([a-zA-Z0-9_-]{11})/,
        /youtu\.be\/([a-zA-Z0-9_-]{11})/,
        /\/embed\/([a-zA-Z0-9_-]{11})/,
        /\/shorts\/([a-zA-Z0-9_-]{11})/,
    ];
    for (const p of patterns) {
        const m = url.match(p);
        if (m) return m[1];
    }
    return null;
}

async function scrapeYouTubePage(videoId: string): Promise<DownloadResult> {
    const pageUrl = `https://www.youtube.com/watch?v=${videoId}`;
    console.log(`[YouTube] Scraping page: ${pageUrl}`);

    const response = await fetchWithTimeout(pageUrl, {
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.9",
        },
        redirect: "follow",
    }, 20000);

    if (!response.ok) {
        throw new Error(`YouTube returned HTTP ${response.status}`);
    }

    const html = await response.text();

    const playerMatch = html.match(/ytInitialPlayerResponse\s*=\s*(\{[\s\S]+?\});\s*(?:var\s|<\/script>|;)/);
    if (!playerMatch) {
        if (html.includes("confirm you're not a bot") || html.includes("Sign in to confirm")) {
            throw new Error("YouTube bot detection triggered");
        }
        throw new Error("Could not find video data on YouTube page");
    }

    let playerData: any;
    try {
        playerData = JSON.parse(playerMatch[1]);
    } catch {
        throw new Error("Failed to parse YouTube player data");
    }

    const videoDetails = playerData.videoDetails;
    if (!videoDetails) {
        throw new Error("No video details found");
    }

    const title = videoDetails.title || "YouTube Video";
    const author = videoDetails.author || "";
    const duration = parseInt(videoDetails.lengthSeconds || "0", 10);
    const thumbnails = videoDetails.thumbnail?.thumbnails || [];
    const thumbnail = thumbnails.length > 0 ? thumbnails[thumbnails.length - 1].url : `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

    const streamingData = playerData.streamingData;
    if (!streamingData) {
        const status = playerData.playabilityStatus;
        if (status?.status === "LOGIN_REQUIRED") {
            throw new Error("This video requires sign-in to watch.");
        }
        if (status?.status === "UNPLAYABLE") {
            throw new Error(status.reason || "This video is not available.");
        }
        throw new Error("No streaming data available for this video.");
    }

    const combinedFormats: any[] = streamingData.formats || [];
    const adaptiveFormats: any[] = streamingData.adaptiveFormats || [];
    const allFormats = [...combinedFormats, ...adaptiveFormats];

    const directFormats = allFormats.filter((f: any) => f.url);

    if (directFormats.length === 0) {
        throw new Error("No direct download URLs available (video may use signature cipher).");
    }

    const mp4Combined = directFormats
        .filter((f: any) => f.mimeType?.startsWith("video/mp4") && f.audioQuality)
        .sort((a: any, b: any) => (b.height || 0) - (a.height || 0));

    const bestUrl = mp4Combined.length > 0
        ? mp4Combined[0].url
        : directFormats.find((f: any) => f.mimeType?.startsWith("video/"))?.url;

    if (!bestUrl) {
        throw new Error("No playable video format found.");
    }

    const qualityOptions: QualityOption[] = [];
    const seen = new Set<string>();

    for (const fmt of mp4Combined) {
        const quality = `${fmt.height}p`;
        if (!seen.has(quality) && fmt.url) {
            seen.add(quality);
            qualityOptions.push({
                label: `MP4 ${quality}`,
                url: fmt.url,
                quality,
                ext: "mp4",
            });
        }
    }

    const audioFormats = directFormats
        .filter((f: any) => f.mimeType?.startsWith("audio/") && f.url)
        .sort((a: any, b: any) => (b.averageBitrate || 0) - (a.averageBitrate || 0));

    if (audioFormats.length > 0) {
        const best = audioFormats[0];
        const bitrate = best.averageBitrate ? Math.round(best.averageBitrate / 1000) : 128;
        const ext = best.mimeType?.includes("mp4") ? "m4a" : "webm";
        qualityOptions.push({
            label: `Audio Only (${bitrate}kbps)`,
            url: best.url,
            quality: "audio",
            ext,
        });
    }

    console.log(`[YouTube] Scraped: "${title}" by ${author}, ${qualityOptions.length} quality options`);

    return {
        url: bestUrl,
        thumbnail,
        title,
        platform: "youtube",
        type: "video",
        filename: `youtube_${videoId}.mp4`,
        metadata: {
            qualityOptions,
            duration,
            uploader: author,
        },
    };
}

interface YtDlpFormat {
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

function pickBestVideoUrl(formats: YtDlpFormat[]): string | undefined {
    const videoFormats = formats
        .filter(f =>
            f.ext === "mp4" &&
            f.vcodec && f.vcodec !== "none" &&
            f.acodec && f.acodec !== "none" &&
            f.url
        )
        .sort((a, b) => (b.height || 0) - (a.height || 0));

    if (videoFormats.length > 0) return videoFormats[0].url;

    const anyVideo = formats
        .filter(f => f.vcodec && f.vcodec !== "none" && f.url)
        .sort((a, b) => (b.height || 0) - (a.height || 0));

    return anyVideo[0]?.url;
}

function buildQualityOptions(formats: YtDlpFormat[]): QualityOption[] {
    const seen = new Set<string>();
    const options: QualityOption[] = [];

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
            options.push({ label: `MP4 ${quality}`, url: fmt.url, quality, ext: "mp4" });
        }
    }

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
        const videoId = extractVideoId(url);

        console.log(`[YouTube] Strategy 1: Direct page scraping for ${videoId || url}`);
        try {
            if (!videoId) throw new Error("Could not extract video ID");
            const result = await scrapeYouTubePage(videoId);
            return result;
        } catch (e: any) {
            console.log(`[YouTube] Page scrape failed: ${e.message}`);
        }

        console.log(`[YouTube] Strategy 2: yt-dlp fallback`);
        try {
            const metadata = await fetchMediaMetadata(url);

            const mediaUrl =
                pickBestVideoUrl(metadata.formats || []) ||
                metadata.url ||
                metadata.formats?.[metadata.formats.length - 1]?.url;

            if (!mediaUrl) throw new Error("No media found.");

            const qualityOptions = buildQualityOptions(
                (metadata.formats as unknown as YtDlpFormat[]) || []
            );

            return {
                url: mediaUrl,
                thumbnail: metadata.thumbnail,
                title: metadata.title || "YouTube Video",
                platform: "youtube",
                type: "video",
                filename: `youtube_${metadata.id || videoId || Date.now()}.mp4`,
                metadata: {
                    qualityOptions,
                    duration: (metadata as any).duration,
                    uploader: (metadata as any).uploader,
                },
            };
        } catch (e: any) {
            console.error("[YouTube] yt-dlp also failed:", e.message);
        }

        throw new Error("Failed to download YouTube video. Please check the URL and try again.");
    },
};
