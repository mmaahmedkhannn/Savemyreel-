import { exec } from "child_process";
import fs from "fs";
import path from "path";
import util from "util";

const execPromise = util.promisify(exec);

export interface YtDlpOutput {
    id: string;
    title: string;
    url: string;
    thumbnail: string;
    duration?: number;
    formats?: any[];
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
        console.log(`[yt-dlp] Invoking: ${binPath} --dump-json --no-warnings --cookies cookies.txt "${url}"`);
        const { stdout, stderr } = await execPromise(`"${binPath}" --dump-json --no-warnings --cookies cookies.txt "${url}"`);
        if (stderr.trim()) console.warn(`[yt-dlp stderr] ${stderr}`);
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
};
```
