import { exec } from "child_process";
import fs from "fs";
import path from "path";
import util from "util";

const execPromise = util.promisify(exec);

export interface YtDlpOutput {
    id: string;
    title: string;
    url?: string;
    thumbnail?: string;
    extractor: string;
    formats?: { url: string; ext: string; format_note?: string }[];
    _type?: string;
    entries?: YtDlpOutput[]; // For carousel/playlist posts
    ext?: string; // File extension
}

export const fetchMediaMetadata = async (url: string) => {
    const isWindows = process.platform === "win32";
    const binExt = isWindows ? ".exe" : "";

    // Explicitly resolve the binary path from the project root directory
    const binPath = path.resolve(process.cwd(), "bin", `yt-dlp${binExt}`);

    // Check if the binary exists at the resolved path
    if (!fs.existsSync(binPath)) {
        throw new Error(`[yt-dlp error] yt-dlp binary not found at ${binPath}`);
    }

    try {
        "--extractor-args", "youtube:player_client=web",
            "--user-agent",
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36",
        ];

let activeCookiesPath: string | null = null;
const localCookiesPath = path.join(process.cwd(), "cookies.txt");

if (process.env.IG_COOKIES_BASE64) {
    // Write base64 cookies to a temporary OS file to avoid hosting flags for 'cookies.txt'
    const tmpPath = path.join(os.tmpdir(), "ig_ydlp_cookies.txt");
    fs.writeFileSync(tmpPath, Buffer.from(process.env.IG_COOKIES_BASE64, 'base64').toString('utf-8'));
    activeCookiesPath = tmpPath;
} else if (fs.existsSync(localCookiesPath)) {
    activeCookiesPath = localCookiesPath;
}

if (activeCookiesPath) {
    args.push("--cookies", activeCookiesPath);
}

args.push(url);

const { stdout } = await execFileAsync(YTDLP_PATH, args, {
    maxBuffer: 10 * 1024 * 1024, // 10MB buffer for large JSON
    timeout: 8000 // 8 second hard limit before killing the process
});

return JSON.parse(stdout);
    } catch (error: any) {
    console.error("yt-dlp error details:", {
        message: error.message,
        stderr: error.stderr,
        stdout: error.stdout,
        code: error.code
    });

    const stderrText = error.stderr || "";

    // Check for common specific errors
    if (stderrText.includes("Sign in to confirm your age") || stderrText.includes("login required")) {
        throw new Error("This content requires authentication. Please set IG_COOKIES_BASE64 environment variable.");
    }
    if (stderrText.includes("Video unavailable")) {
        throw new Error("The video is unavailable or deleted.");
    }
    if (stderrText.includes("private")) {
        throw new Error("This account or post is private.");
    }

    // Special handling for image-only posts - don't throw, let the service handle it
    if (stderrText.includes("There is no video in this post")) {
        // Return a special marker object that indicates this is an image-only post
        return {
            id: "image-only",
            title: "Instagram Image Post",
            extractor: "instagram",
            _type: "image-only" as any,
            thumbnail: undefined,
            url: undefined,
            formats: []
        };
    }

    throw new Error(`Failed to extract media: ${stderrText || error.message}`);
}
}
