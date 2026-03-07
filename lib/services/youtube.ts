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

function extractPlayerResponse(html: string): any | null {
    const marker = "ytInitialPlayerResponse";
    const idx = html.indexOf(marker);
    if (idx === -1) return null;

    const eqIdx = html.indexOf("=", idx + marker.length);
    if (eqIdx === -1) return null;

    let startIdx = eqIdx + 1;
    while (startIdx < html.length && html[startIdx] === " ") startIdx++;

    if (html[startIdx] !== "{") return null;

    let depth = 0;
    let inString = false;
    let escaped = false;

    for (let i = startIdx; i < html.length; i++) {
        const ch = html[i];

        if (escaped) {
            escaped = false;
            continue;
        }

        if (ch === "\\") {
            escaped = true;
            continue;
        }

        if (ch === '"') {
            inString = !inString;
            continue;
        }

        if (inString) continue;

        if (ch === "{") depth++;
        else if (ch === "}") {
            depth--;
            if (depth === 0) {
                const jsonStr = html.substring(startIdx, i + 1);
                try {
                    return JSON.parse(jsonStr);
                } catch {
                    return null;
                }
            }
        }
    }
    return null;
}

function buildResultFromPlayerData(playerData: any, videoId: string): DownloadResult {
    const videoDetails = playerData.videoDetails;
    const title = videoDetails?.title || "YouTube Video";
    const author = videoDetails?.author || "";
    const duration = parseInt(videoDetails?.lengthSeconds || "0", 10);
    const thumbnails = videoDetails?.thumbnail?.thumbnails || [];
    const thumbnail = thumbnails.length > 0
        ? thumbnails[thumbnails.length - 1].url
        : "https://i.ytimg.com/vi/" + videoId + "/hqdefault.jpg";

    const streamingData = playerData.streamingData;
    if (!streamingData) {
        const status = playerData.playabilityStatus;
        if (status?.status === "LOGIN_REQUIRED") {
            throw new Error("This video requires sign-in to watch.");
        }
        if (status?.status === "UNPLAYABLE") {
            throw new Error(status.reason || "This video is not available.");
        }
        throw new Error("No streaming data available.");
    }

    const combinedFormats: any[] = streamingData.formats || [];
    const adaptiveFormats: any[] = streamingData.adaptiveFormats || [];
    const allFormats = [...combinedFormats, ...adaptiveFormats];
    const directFormats = allFormats.filter(function(f: any) { return !!f.url; });

    if (directFormats.length === 0) {
        throw new Error("No direct download URLs available.");
    }

    const mp4Combined = directFormats
        .filter(function(f: any) { return f.mimeType && f.mimeType.startsWith("video/mp4") && f.audioQuality; })
        .sort(function(a: any, b: any) { return (b.height || 0) - (a.height || 0); });

    const bestUrl = mp4Combined.length > 0
        ? mp4Combined[0].url
        : directFormats.find(function(f: any) { return f.mimeType && f.mimeType.startsWith("video/"); })?.url;

    if (!bestUrl) {
        throw new Error("No playable video format found.");
    }

    const qualityOptions: QualityOption[] = [];
    const seen = new Set<string>();

    for (const fmt of mp4Combined) {
        const quality = fmt.height + "p";
        if (!seen.has(quality) && fmt.url) {
            seen.add(quality);
            qualityOptions.push({
                label: "MP4 " + quality,
                url: fmt.url,
                quality: quality,
                ext: "mp4",
            });
        }
    }

    const audioFormats = directFormats
        .filter(function(f: any) { return f.mimeType && f.mimeType.startsWith("audio/") && f.url; })
        .sort(function(a: any, b: any) { return (b.averageBitrate || 0) - (a.averageBitrate || 0); });

    if (audioFormats.length > 0) {
        const best = audioFormats[0];
        const bitrate = best.averageBitrate ? Math.round(best.averageBitrate / 1000) : 128;
        const ext = best.mimeType && best.mimeType.includes("mp4") ? "m4a" : "webm";
        qualityOptions.push({
            label: "Audio Only (" + bitrate + "kbps)",
            url: best.url,
            quality: "audio",
            ext: ext,
        });
    }

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

async function scrapeYouTubePage(videoId: string): Promise<DownloadResult> {
    const pageUrl = "https://www.youtube.com/watch?v=" + videoId;
    console.log("[YouTube] Scraping page: " + pageUrl);

    const response = await fetchWithTimeout(pageUrl, {
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.9",
            "Cookie": "CONSENT=PENDING+987; SOCS=CAESEwgDEgk2NjE5NzUxNDkaAmVuIAEaBgiA0dOrBg",
        },
        redirect: "follow",
    }, 20000);

    if (!response.ok) {
        throw new Error("YouTube returned HTTP " + response.status);
    }

    const html = await response.text();
    console.log("[YouTube] Page length: " + html.length + ", has playerResponse: " + html.includes("ytInitialPlayerResponse"));

    if (html.includes("confirm you're not a bot") || html.includes("Sign in to confirm")) {
        console.log("[YouTube] Bot detection page served");
        throw new Error("YouTube bot detection triggered");
    }

    const playerData = extractPlayerResponse(html);
    if (!playerData) {
        console.log("[YouTube] Could not extract player response JSON");
        throw new Error("Could not find video data on YouTube page");
    }

    console.log("[YouTube] Player status: " + (playerData.playabilityStatus?.status || "unknown") + ", hasVideoDetails: " + !!playerData.videoDetails + ", hasStreamingData: " + !!playerData.streamingData);

    if (!playerData.videoDetails) {
        throw new Error("No video details in player response (status: " + (playerData.playabilityStatus?.status || "unknown") + ")");
    }

    const result = buildResultFromPlayerData(playerData, videoId);
    console.log("[YouTube] Page scrape success: \"" + result.title + "\", " + (result.metadata as any)?.qualityOptions?.length + " quality options");
    return result;
}

async function fetchViaInnertube(videoId: string): Promise<DownloadResult> {
    console.log("[YouTube] Trying Innertube API for: " + videoId);

    const clients = [
        {
            name: "WEB_CREATOR",
            clientName: "WEB_CREATOR",
            clientVersion: "1.20240723.00.00",
            ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
            apiKey: "AIzaSyBUPetSUmoZL-OhlxA7wSac5XinrygCqMo",
        },
        {
            name: "TVHTML5_SIMPLY_EMBEDDED_PLAYER",
            clientName: "TVHTML5_SIMPLY_EMBEDDED_PLAYER",
            clientVersion: "2.0",
            ua: "Mozilla/5.0",
            apiKey: "AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8",
            thirdParty: { embedUrl: "https://www.youtube.com/" },
        },
        {
            name: "ANDROID_VR",
            clientName: "ANDROID_VR",
            clientVersion: "1.57.29",
            ua: "com.google.android.apps.youtube.vr.oculus/1.57.29 (Linux; U; Android 12L; eureka-user Build/SQ3A.220605.009.A1) gzip",
            apiKey: "AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8",
            androidSdkVersion: 32,
        },
    ];

    for (const client of clients) {
        try {
            console.log("[YouTube] Innertube client: " + client.name);

            const body: any = {
                videoId: videoId,
                context: {
                    client: {
                        clientName: client.clientName,
                        clientVersion: client.clientVersion,
                        hl: "en",
                        gl: "US",
                    },
                },
                playbackContext: {
                    contentPlaybackContext: {
                        html5Preference: "HTML5_PREF_WANTS",
                        signatureTimestamp: 20073,
                    },
                },
            };

            if ((client as any).androidSdkVersion) {
                body.context.client.androidSdkVersion = (client as any).androidSdkVersion;
            }

            if ((client as any).thirdParty) {
                body.context.thirdParty = (client as any).thirdParty;
            }

            const response = await fetchWithTimeout(
                "https://www.youtube.com/youtubei/v1/player?key=" + client.apiKey + "&prettyPrint=false",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "User-Agent": client.ua,
                        "X-YouTube-Client-Name": client.clientName === "WEB_CREATOR" ? "62" : "85",
                        "X-YouTube-Client-Version": client.clientVersion,
                    },
                    body: JSON.stringify(body),
                },
                15000
            );

            if (!response.ok) {
                console.log("[YouTube] Innertube " + client.name + " returned HTTP " + response.status);
                continue;
            }

            const data = await response.json() as any;
            console.log("[YouTube] Innertube " + client.name + " status: " + (data.playabilityStatus?.status || "unknown") + ", formats: " + (data.streamingData?.formats?.length || 0) + ", adaptive: " + (data.streamingData?.adaptiveFormats?.length || 0));

            if (data.playabilityStatus?.status !== "OK") {
                continue;
            }

            if (!data.videoDetails || !data.streamingData) {
                continue;
            }

            const result = buildResultFromPlayerData(data, videoId);
            console.log("[YouTube] Innertube " + client.name + " success: \"" + result.title + "\"");
            return result;
        } catch (e: any) {
            console.log("[YouTube] Innertube " + client.name + " failed: " + e.message);
        }
    }

    throw new Error("All Innertube clients failed");
}

async function getMetadataFromOembed(videoId: string): Promise<{ title: string; author: string; thumbnail: string }> {
    try {
        const response = await fetchWithTimeout(
            "https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=" + videoId + "&format=json",
            {},
            10000
        );
        if (response.ok) {
            const data = await response.json() as any;
            return {
                title: data.title || "YouTube Video",
                author: data.author_name || "",
                thumbnail: data.thumbnail_url || "https://i.ytimg.com/vi/" + videoId + "/hqdefault.jpg",
            };
        }
    } catch {}
    return {
        title: "YouTube Video",
        author: "",
        thumbnail: "https://i.ytimg.com/vi/" + videoId + "/hqdefault.jpg",
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
}

function pickBestVideoUrl(formats: YtDlpFormat[]): string | undefined {
    const videoFormats = formats
        .filter(function(f) {
            return f.ext === "mp4" && f.vcodec && f.vcodec !== "none" && f.acodec && f.acodec !== "none" && f.url;
        })
        .sort(function(a, b) { return (b.height || 0) - (a.height || 0); });
    if (videoFormats.length > 0) return videoFormats[0].url;
    const anyVideo = formats
        .filter(function(f) { return f.vcodec && f.vcodec !== "none" && f.url; })
        .sort(function(a, b) { return (b.height || 0) - (a.height || 0); });
    return anyVideo[0]?.url;
}

function buildYtdlpQualityOptions(formats: YtDlpFormat[]): QualityOption[] {
    const seen = new Set<string>();
    const options: QualityOption[] = [];
    const videoFormats = formats
        .filter(function(f) {
            return f.ext === "mp4" && f.vcodec && f.vcodec !== "none" && f.acodec && f.acodec !== "none" && f.url && f.height;
        })
        .sort(function(a, b) { return (b.height || 0) - (a.height || 0); });
    for (const fmt of videoFormats) {
        const quality = fmt.height + "p";
        if (!seen.has(quality)) {
            seen.add(quality);
            options.push({ label: "MP4 " + quality, url: fmt.url, quality: quality, ext: "mp4" });
        }
    }
    const audioFormats = formats
        .filter(function(f) {
            return (f.ext === "m4a" || f.ext === "mp3" || f.ext === "webm") && f.vcodec === "none" && f.acodec && f.acodec !== "none" && f.url;
        })
        .sort(function(a, b) { return (b.abr || 0) - (a.abr || 0); });
    if (audioFormats.length > 0) {
        const best = audioFormats[0];
        options.push({ label: "Audio Only (" + (best.abr || "128") + "kbps)", url: best.url, quality: "audio", ext: best.ext || "m4a" });
    }
    return options;
}

export const youtubeService: DownloaderService = {
    canHandle: function(url: string) {
        return url.includes("youtube.com") || url.includes("youtu.be") || url.includes("m.youtube.com");
    },

    extract: async function(url: string): Promise<DownloadResult> {
        const videoId = extractVideoId(url);
        if (!videoId) {
            throw new Error("Could not extract YouTube video ID from URL.");
        }

        console.log("[YouTube] Extracting video: " + videoId);

        try {
            const result = await scrapeYouTubePage(videoId);
            return result;
        } catch (e: any) {
            console.log("[YouTube] Page scrape failed: " + e.message);
        }

        try {
            const result = await fetchViaInnertube(videoId);
            return result;
        } catch (e: any) {
            console.log("[YouTube] Innertube failed: " + e.message);
        }

        try {
            const metadata = await fetchMediaMetadata(url);
            const mediaUrl = pickBestVideoUrl(metadata.formats || []) || metadata.url || metadata.formats?.[metadata.formats.length - 1]?.url;
            if (!mediaUrl) throw new Error("No media found via yt-dlp.");
            const qualityOptions = buildYtdlpQualityOptions((metadata.formats as unknown as YtDlpFormat[]) || []);
            return {
                url: mediaUrl,
                thumbnail: metadata.thumbnail,
                title: metadata.title || "YouTube Video",
                platform: "youtube",
                type: "video",
                filename: "youtube_" + (metadata.id || videoId) + ".mp4",
                metadata: { qualityOptions: qualityOptions, duration: (metadata as any).duration, uploader: (metadata as any).uploader },
            };
        } catch (e: any) {
            console.log("[YouTube] yt-dlp failed: " + e.message);
        }

        throw new Error("Failed to download YouTube video. YouTube may be blocking this server. Please try again later.");
    },
};
