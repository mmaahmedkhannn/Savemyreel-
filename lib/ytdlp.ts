import { execFile } from "child_process";
import path from "path";
import { promisify } from "util";

const execFileAsync = promisify(execFile);

const fs = require('fs');
const os = require('os'); // Added os import

// Path to the downloaded standalone binary
const isWindows = os.platform() === 'win32';
const YTDLP_PATH = path.join(process.cwd(), "bin", isWindows ? "yt-dlp.exe" : "yt-dlp");

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



export async function fetchMediaMetadata(url: string): Promise<YtDlpOutput> {
    try {
        const args = [
            "--dump-json",
            "--no-warnings",
            "--no-playlist",
            "--socket-timeout", "15",
            "--force-ipv4",
            "--extractor-args", "youtube:player_client=web",
            "--user-agent",
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36",
        ];

        // Check for cookies.txt
        const cookiesPath = path.join(process.cwd(), "cookies.txt");
        if (fs.existsSync(cookiesPath)) {
            args.push("--cookies", cookiesPath);
        }

        args.push(url);

        const { stdout } = await execFileAsync(YTDLP_PATH, args, {
            maxBuffer: 10 * 1024 * 1024 // 10MB buffer for large JSON
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
            throw new Error("This content requires authentication. Please add a cookies.txt file.");
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
