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

let ytdlpInstalled = false;

async function ensureYtDlp(): Promise<void> {
    if (ytdlpInstalled) return;
    try {
        const { stdout } = await execFileAsync("python3", ["-m", "yt_dlp", "--version"], {
            timeout: 10000,
        });
        const ver = stdout.trim();
        console.log("[YouTube] yt-dlp version: " + ver);
        if (ver >= "2025") {
            ytdlpInstalled = true;
            return;
        }
        console.log("[YouTube] yt-dlp version too old (" + ver + "), installing latest...");
    } catch {
        console.log("[YouTube] yt-dlp not found via python3 -m, installing...");
    }
    try {
        await execFileAsync("python3", ["-m", "pip", "install", "--user", "--break-system-packages", "yt-dlp"], {
            timeout: 60000,
            env: { ...process.env, PIP_BREAK_SYSTEM_PACKAGES: "1" },
        });
        ytdlpInstalled = true;
        console.log("[YouTube] yt-dlp installed successfully");
    } catch (e: any) {
        console.error("[YouTube] Failed to install yt-dlp:", e.message?.substring(0, 200));
    }
}

let cachedPoToken: { token: string; visitorData: string; expiresAt: number } | null = null;

async function generatePoToken(): Promise<{ token: string; visitorData: string } | null> {
    if (cachedPoToken && Date.now() < cachedPoToken.expiresAt) {
        console.log("[YouTube] Using cached PO token");
        return { token: cachedPoToken.token, visitorData: cachedPoToken.visitorData };
    }

    try {
        console.log("[YouTube] Generating PO token...");
        const { BG } = await import("bgutils-js");
        const { JSDOM } = await import("jsdom");
        const { Innertube } = await import("youtubei.js");

        const youtube = await Innertube.create({ generate_session_locally: true });
        const visitorData = youtube.session.context.client.visitorData;

        if (!visitorData) {
            console.error("[YouTube] Failed to get visitor data");
            return null;
        }

        const dom = new JSDOM("<!DOCTYPE html><html><head></head><body></body></html>", {
            url: "https://www.youtube.com",
            pretendToBeVisual: true,
        });

        const prevWindow = (globalThis as any).window;
        const prevDocument = (globalThis as any).document;
        const prevLocation = (globalThis as any).location;
        const prevOrigin = (globalThis as any).origin;

        Object.assign(globalThis, {
            window: dom.window,
            document: dom.window.document,
            location: dom.window.location,
            origin: dom.window.origin,
        });

        try {
            const requestKey = "O43z0dpjhgX20SCx4KAo";

            const bgConfig = {
                fetch: (input: any, init: any) => fetch(input, init),
                globalObj: globalThis,
                identifier: visitorData,
                requestKey: requestKey,
            };

            const challenge = await BG.Challenge.create(bgConfig);
            if (!challenge) {
                console.error("[YouTube] Failed to create BotGuard challenge");
                return null;
            }

            const interpreterJs = challenge.interpreterJavascript?.privateDoNotAccessOrElseSafeScriptWrappedValue;
            if (interpreterJs) {
                new Function(interpreterJs)();
            }

            const poTokenResult = await BG.PoToken.generate({
                program: challenge.program,
                globalName: challenge.globalName,
                bgConfig,
            });

            const token = poTokenResult.poToken;
            if (!token) {
                console.error("[YouTube] PO token generation returned empty");
                return null;
            }

            cachedPoToken = {
                token: token,
                visitorData: visitorData,
                expiresAt: Date.now() + 6 * 60 * 60 * 1000,
            };

            console.log("[YouTube] PO token generated successfully (length: " + token.length + ")");
            return { token, visitorData };
        } finally {
            Object.assign(globalThis, {
                window: prevWindow,
                document: prevDocument,
                location: prevLocation,
                origin: prevOrigin,
            });
            dom.window.close();
        }
    } catch (e: any) {
        console.error("[YouTube] PO token generation failed:", e.message?.substring(0, 200));
        return null;
    }
}

async function fetchViaYtDlp(videoId: string): Promise<DownloadResult> {
    console.log("[YouTube] Using yt-dlp for: " + videoId);

    await ensureYtDlp();

    const poData = await generatePoToken();

    const url = "https://www.youtube.com/watch?v=" + videoId;

    const args = [
        "-m", "yt_dlp",
        "--dump-json",
        "--no-download",
        "--no-check-certificates",
        "--js-runtimes", "node",
        "--remote-components", "ejs:github",
    ];

    if (poData) {
        args.push("--extractor-args",
            "youtube:po_token=web.gvs+" + poData.token +
            ";visitor_data=" + poData.visitorData
        );
    }

    args.push(url);

    let stdout: string;
    let stderr: string;
    try {
        const result = await execFileAsync("python3", args, {
            timeout: 60000,
            maxBuffer: 20 * 1024 * 1024,
            env: { ...process.env, PYTHONUNBUFFERED: "1" },
        });
        stdout = result.stdout;
        stderr = result.stderr;
    } catch (execErr: any) {
        const errMsg = (execErr.stderr || execErr.message || "").substring(0, 500);
        console.error("[YouTube] yt-dlp stderr:", errMsg);
        if (errMsg.includes("Private video")) {
            throw new Error("This video is private.");
        }
        if (errMsg.includes("Sign in to confirm your age") || errMsg.includes("age-restricted")) {
            throw new Error("This video is age-restricted and cannot be downloaded.");
        }
        if (errMsg.includes("Video unavailable") || errMsg.includes("not available in your country")) {
            throw new Error("This video is unavailable.");
        }
        if (errMsg.includes("copyright") || errMsg.includes("blocked")) {
            throw new Error("This video is blocked due to copyright restrictions.");
        }
        throw new Error("yt-dlp failed: " + errMsg.split("\n").pop()?.trim());
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
            "This video is private",
            "age-restricted",
            "This video is unavailable",
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

        throw new Error("Failed to download YouTube video. Please check the URL and try again.");
    },
};
