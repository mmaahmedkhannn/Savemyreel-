import { execFile } from "child_process";
import fs from "fs";
import path from "path";
import util from "util";

const execFileAsync = util.promisify(execFile);

export interface YtDlpOutput {
    id: string;
    title: string;
    url: string;
    thumbnail: string;
    duration?: number;
    formats?: any[];
    ext?: string;
}

export const fetchMediaMetadata = async (url: string) => {
    const args = [
        "-m", "yt_dlp",
        "--dump-json",
        "--no-download",
        "--no-check-certificates",
        "--no-warnings",
    ];

    const cookiesPath = path.resolve(process.cwd(), "cookies.txt");
    if (fs.existsSync(cookiesPath)) {
        args.push("--cookies", cookiesPath);
    }

    args.push(url);

    console.log(`[yt-dlp] Invoking: python3 -m yt_dlp for ${url}`);

    try {
        const { stdout, stderr } = await execFileAsync("python3", args, {
            timeout: 45000,
            maxBuffer: 20 * 1024 * 1024,
            env: { ...process.env, PYTHONUNBUFFERED: "1" },
        });
        if (stderr && stderr.trim()) console.warn(`[yt-dlp stderr] ${stderr.substring(0, 200)}`);
        return JSON.parse(stdout);
    } catch (error: any) {
        const stderrText = error.stderr || "";
        console.error("[yt-dlp] error:", stderrText.substring(0, 300));

        if (stderrText.includes("Sign in to confirm your age") || stderrText.includes("login required")) {
            throw new Error("This content requires authentication.");
        }
        if (stderrText.includes("Video unavailable")) {
            throw new Error("The video is unavailable or deleted.");
        }
        if (stderrText.includes("private")) {
            throw new Error("This account or post is private.");
        }
        if (stderrText.includes("There is no video in this post")) {
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
};
