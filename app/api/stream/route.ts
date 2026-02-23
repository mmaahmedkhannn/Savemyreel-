import { NextRequest, NextResponse } from "next/server";
import { spawn } from "child_process";
import path from "path";
import fs from "fs";
import os from "os";
import crypto from "crypto";

const YTDLP_PATH = path.join(process.cwd(), "bin", "yt-dlp.exe");
const FFMPEG_PATH = path.join(process.cwd(), "bin", "ffmpeg.exe");

/**
 * Server-side video download endpoint.
 * Uses yt-dlp to download, merge (via ffmpeg), and stream the result.
 *
 * For YouTube 720p+, video and audio are separate streams that must be
 * merged by ffmpeg. We download to a temp file, then stream it to the client.
 *
 * Query params:
 *   url      — The original platform URL (youtube.com/tiktok.com/etc.)
 *   format   — yt-dlp format selector (e.g. "bestvideo[height<=1080]+bestaudio/best")
 *   filename — Output filename for Content-Disposition header
 */

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
    const url = request.nextUrl.searchParams.get("url");
    const format = request.nextUrl.searchParams.get("format") || "bestvideo[ext=mp4][height<=1080]+bestaudio[ext=m4a]/best[ext=mp4]/best";
    const filename = request.nextUrl.searchParams.get("filename") || "download.mp4";

    if (!url) {
        return NextResponse.json({ error: "Missing url parameter" }, { status: 400 });
    }

    // Security: only allow known platform URLs
    const allowed = [
        "youtube.com", "youtu.be", "m.youtube.com",
        "tiktok.com", "instagram.com",
        "twitter.com", "x.com",
        "facebook.com", "fb.watch",
    ];
    const isAllowed = allowed.some(domain => url.includes(domain));
    if (!isAllowed) {
        return NextResponse.json({ error: "Unsupported platform URL" }, { status: 400 });
    }

    // Generate temp output path
    const tempId = crypto.randomBytes(8).toString("hex");
    const tempDir = path.join(os.tmpdir(), "smr-downloads");
    const tempFile = path.join(tempDir, `${tempId}.mp4`);

    // Ensure temp directory exists
    if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
    }

    try {
        console.log(`[Stream Download] URL: ${url.substring(0, 80)}... format: ${format}`);

        const args = [
            "--no-warnings",
            "--no-playlist",
            "-f", format,
            "--socket-timeout", "30",
            "--merge-output-format", "mp4",
            "-o", tempFile,
            "--force-ipv4",
            "--extractor-args", "youtube:player_client=web",
            "--user-agent",
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36",
        ];

        // Point yt-dlp to ffmpeg for merging
        if (fs.existsSync(FFMPEG_PATH)) {
            args.push("--ffmpeg-location", path.dirname(FFMPEG_PATH));
        }

        // Check for cookies.txt
        const cookiesPath = path.join(process.cwd(), "cookies.txt");
        if (fs.existsSync(cookiesPath)) {
            args.push("--cookies", cookiesPath);
        }

        args.push(url);

        // Run yt-dlp and wait for completion
        await new Promise<void>((resolve, reject) => {
            console.log(`[Stream Download] Running: yt-dlp ${args.join(" ")}`);
            const ytdlp = spawn(YTDLP_PATH, args, {
                stdio: ["ignore", "pipe", "pipe"],
            });

            let stderrData = "";
            ytdlp.stdout.on("data", (chunk: Buffer) => {
                // Log progress
                const line = chunk.toString().trim();
                if (line) console.log(`[yt-dlp] ${line}`);
            });
            ytdlp.stderr.on("data", (chunk: Buffer) => {
                stderrData += chunk.toString();
            });

            ytdlp.on("close", (code: number | null) => {
                if (code === 0) {
                    resolve();
                } else {
                    console.error(`[Stream Download] yt-dlp exited with code ${code}. stderr: ${stderrData}`);
                    reject(new Error(`yt-dlp failed (code ${code}): ${stderrData.substring(0, 200)}`));
                }
            });

            ytdlp.on("error", (err: Error) => {
                reject(err);
            });

            // Timeout after 5 minutes
            setTimeout(() => {
                ytdlp.kill("SIGTERM");
                reject(new Error("Download timed out after 5 minutes"));
            }, 5 * 60 * 1000);
        });

        // Check the temp file exists and has content
        if (!fs.existsSync(tempFile)) {
            // yt-dlp may have used a different extension — look for any file with our tempId
            const files = fs.readdirSync(tempDir).filter(f => f.startsWith(tempId));
            if (files.length === 0) {
                throw new Error("Download completed but no output file found");
            }
            // Use the first matching file
            const actualFile = path.join(tempDir, files[0]);
            return streamAndCleanup(actualFile, filename);
        }

        return streamAndCleanup(tempFile, filename);

    } catch (error: any) {
        // Clean up temp file on error
        cleanupFile(tempFile);
        console.error("[Stream Download] Error:", error.message);
        return NextResponse.json(
            { error: error.message || "Download failed" },
            { status: 500 }
        );
    }
}

function streamAndCleanup(filePath: string, filename: string): NextResponse {
    const stat = fs.statSync(filePath);
    const fileStream = fs.createReadStream(filePath);

    // Determine content type from extension
    const ext = path.extname(filePath).toLowerCase();
    const contentTypes: Record<string, string> = {
        ".mp4": "video/mp4",
        ".webm": "video/webm",
        ".mkv": "video/x-matroska",
        ".m4a": "audio/mp4",
        ".mp3": "audio/mpeg",
        ".ogg": "audio/ogg",
    };
    const contentType = contentTypes[ext] || "application/octet-stream";

    // Convert Node.js ReadStream to Web ReadableStream
    const stream = new ReadableStream({
        start(controller) {
            fileStream.on("data", (chunk: any) => {
                controller.enqueue(new Uint8Array(chunk));
            });
            fileStream.on("end", () => {
                controller.close();
                // Clean up temp file after streaming
                cleanupFile(filePath);
            });
            fileStream.on("error", (err) => {
                controller.error(err);
                cleanupFile(filePath);
            });
        },
        cancel() {
            fileStream.destroy();
            cleanupFile(filePath);
        },
    });

    return new NextResponse(stream, {
        headers: {
            "Content-Type": contentType,
            "Content-Length": stat.size.toString(),
            "Content-Disposition": `attachment; filename="${filename}"`,
            "Cache-Control": "no-cache",
        },
    });
}

function cleanupFile(filePath: string) {
    try {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            console.log(`[Stream Download] Cleaned up: ${filePath}`);
        }
    } catch (e) {
        // Ignore cleanup errors
    }
}
