import { DownloaderService, DownloadResult } from "@/types";
import { execFile } from "child_process";
import { promisify } from "util";

const execFileAsync = promisify(execFile);

interface QualityOption {
    label: string;
    url: string;
    quality: string;
    ext: string;
}

function extractVideoId(url: string): string | null {
    const patterns = [
        /[?&]v=([a-zA-Z0-9_-]{11})/,
        /youtu\.be\/([a-zA-Z0-9_-]{11})/,
        /\/embed\/([a-zA-Z0-9_-]{11})/,
        /\/shorts\/([a-zA-Z0-9_-]{11})/,
        /\/live\/([a-zA-Z0-9_-]{11})/,
        /\/v\/([a-zA-Z0-9_-]{11})/,
    ];
    for (const p of patterns) {
        const m = url.match(p);
        if (m) return m[1];
    }
    return null;
}

function isYouTubeUrl(url: string): boolean {
    try {
        const parsed = new URL(url);
        const host = parsed.hostname.replace(/^www\./, "").replace(/^m\./, "");
        return host === "youtube.com" || host === "youtu.be" || host === "music.youtube.com";
    } catch {
        return false;
    }
}

async function fetchViaYtDlp(videoId: string): Promise<DownloadResult> {
    console.log("[YouTube] Using yt-dlp for: " + videoId);

    const url = "https://www.youtube.com/watch?v=" + videoId;

    let stdout: string;
    let stderr: string;
    try {
        const result = await execFileAsync("python3", [
            "-m", "yt_dlp",
            "--dump-json",
            "--no-download",
            "--no-check-certificates",
            "--js-runtimes", "node",
            "--remote-components", "ejs:github",
            url,
        ], {
            timeout: 45000,
            maxBuffer: 20 * 1024 * 1024,
            env: { ...process.env, PYTHONUNBUFFERED: "1" },
        });
        stdout = result.stdout;
        stderr = result.stderr;
    } catch (execErr: any) {
        const errMsg = (execErr.stderr || execErr.message || "").substring(0, 300);
        if (errMsg.includes("Private video") || errMsg.includes("Sign in")) {
            throw new Error("This video is private or requires sign-in.");
        }
        if (errMsg.includes("age") || errMsg.includes("Age")) {
            throw new Error("This video is age-restricted and cannot be downloaded.");
        }
        if (errMsg.includes("unavailable") || errMsg.includes("not available")) {
            throw new Error("This video is unavailable.");
        }
        if (errMsg.includes("copyright") || errMsg.includes("blocked")) {
            throw new Error("This video is blocked due to copyright restrictions.");
        }
        console.error("[YouTube] yt-dlp stderr:", errMsg);
        throw new Error("yt-dlp extraction failed: " + errMsg.split("\n")[0]);
    }

    if (stderr) {
        console.warn("[YouTube] yt-dlp warnings:", stderr.substring(0, 200));
    }

    if (!stdout || stdout.trim().length === 0) {
        throw new Error("yt-dlp returned empty output");
    }

    const data = JSON.parse(stdout.trim());

    const title = data.title || "YouTube Video";
    const uploader = data.uploader || data.channel || "";
    const duration = data.duration || 0;
    const thumbnail = data.thumbnail ||
        "https://i.ytimg.com/vi/" + videoId + "/hqdefault.jpg";

    const allFormats = data.formats || [];

    const mp4Combined = allFormats.filter(function(f: any) {
        return f.ext === "mp4" &&
            f.vcodec && f.vcodec !== "none" &&
            f.acodec && f.acodec !== "none" &&
            f.url;
    }).sort(function(a: any, b: any) {
        return (b.height || 0) - (a.height || 0);
    });

    if (mp4Combined.length === 0) {
        throw new Error("No combined video+audio MP4 formats available");
    }

    const bestUrl = mp4Combined[0].url;

    const qualityOptions: QualityOption[] = [];
    const seen = new Set<string>();

    for (const fmt of mp4Combined) {
        const quality = fmt.format_note || (fmt.height + "p");
        if (!seen.has(quality)) {
            seen.add(quality);
            qualityOptions.push({
                label: "MP4 " + quality,
                url: fmt.url,
                quality: quality,
                ext: "mp4",
            });
        }
    }

    const audioFormats = allFormats.filter(function(f: any) {
        return f.vcodec === "none" &&
            f.acodec && f.acodec !== "none" &&
            f.url;
    }).sort(function(a: any, b: any) {
        return (b.abr || 0) - (a.abr || 0);
    });

    if (audioFormats.length > 0) {
        const best = audioFormats[0];
        const bitrate = best.abr || 128;
        const ext = best.ext || "m4a";
        qualityOptions.push({
            label: "Audio Only (" + Math.round(bitrate) + "kbps)",
            url: best.url,
            quality: "audio",
            ext: ext,
        });
    }

    console.log("[YouTube] yt-dlp success: \"" + title + "\" by " + uploader + ", " + qualityOptions.length + " quality options");

    return {
        url: bestUrl,
        thumbnail: thumbnail,
        title: title,
        platform: "youtube",
        type: "video",
        filename: "youtube_" + videoId + ".mp4",
        metadata: {
            qualityOptions: qualityOptions,
            duration: duration,
            uploader: uploader,
        },
    };
}

async function fetchViaYoutubei(videoId: string): Promise<DownloadResult> {
    console.log("[YouTube] Using youtubei.js fallback for: " + videoId);

    const { Innertube } = await import("youtubei.js");
    const youtube = await Innertube.create({ generate_session_locally: true });
    const info = await youtube.getBasicInfo(videoId);

    const title = info.basic_info.title || "YouTube Video";
    const author = info.basic_info.author || "";
    const duration = info.basic_info.duration || 0;
    const thumbnails = info.basic_info.thumbnail || [];
    const thumbnail = thumbnails.length > 0
        ? thumbnails[thumbnails.length - 1].url
        : "https://i.ytimg.com/vi/" + videoId + "/hqdefault.jpg";

    const formats = info.streaming_data?.formats || [];
    const adaptiveFormats = info.streaming_data?.adaptive_formats || [];

    const directFormats = [...formats, ...adaptiveFormats].filter(function(f: any) {
        return !!f.url;
    });

    if (directFormats.length === 0) {
        throw new Error("No direct download URLs available");
    }

    const mp4Combined = directFormats.filter(function(f: any) {
        return f.mime_type && f.mime_type.startsWith("video/mp4") && f.has_audio;
    }).sort(function(a: any, b: any) {
        return (b.height || 0) - (a.height || 0);
    });

    if (mp4Combined.length === 0) {
        throw new Error("No combined video+audio formats available via youtubei.js");
    }

    const bestUrl: string = String(mp4Combined[0].url);

    const qualityOptions: QualityOption[] = [];
    const seen = new Set<string>();

    for (const fmt of mp4Combined) {
        const quality = (fmt as any).quality_label || ((fmt as any).height + "p");
        if (!seen.has(quality)) {
            seen.add(quality);
            qualityOptions.push({
                label: "MP4 " + quality,
                url: (fmt as any).url,
                quality: quality,
                ext: "mp4",
            });
        }
    }

    console.log("[YouTube] youtubei.js success: \"" + title + "\", " + qualityOptions.length + " quality options");

    return {
        url: bestUrl,
        thumbnail: thumbnail,
        title: title,
        platform: "youtube",
        type: "video",
        filename: "youtube_" + videoId + ".mp4",
        metadata: {
            qualityOptions: qualityOptions,
            duration: duration,
            uploader: author,
        },
    };
}

export const youtubeService: DownloaderService = {
    canHandle: function(url: string) {
        return isYouTubeUrl(url);
    },

    extract: async function(url: string): Promise<DownloadResult> {
        const videoId = extractVideoId(url);
        if (!videoId) {
            throw new Error("Could not extract YouTube video ID from URL.");
        }

        console.log("[YouTube] Extracting video: " + videoId);

        const noFallbackErrors = [
            "private or requires sign-in",
            "age-restricted",
            "unavailable",
            "blocked due to copyright",
        ];

        try {
            return await fetchViaYtDlp(videoId);
        } catch (e: any) {
            console.error("[YouTube] yt-dlp failed:", e.message);
            const isDeterministic = noFallbackErrors.some(function(msg) {
                return e.message.includes(msg);
            });
            if (isDeterministic) {
                throw e;
            }
        }

        try {
            return await fetchViaYoutubei(videoId);
        } catch (e: any) {
            console.error("[YouTube] youtubei.js fallback failed:", e.message);
        }

        throw new Error("Failed to download YouTube video. Please check the URL and try again.");
    },
};
