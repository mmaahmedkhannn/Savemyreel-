import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * Server-side video download endpoint for Vercel.
 * Proxies the direct media URL to the client, adding Content-Disposition
 * headers to force a file download instead of opening in the browser.
 * 
 * This completely bypasses the need for yt-dlp or ffmpeg binaries
 * which are incompatible with Vercel Serverless Functions.
 */
export async function GET(request: NextRequest) {
    const url = request.nextUrl.searchParams.get("url");
    const filename = request.nextUrl.searchParams.get("filename") || "download.mp4";

    if (!url) {
        return NextResponse.json({ error: "Missing url parameter" }, { status: 400 });
    }

    try {
        console.log(`[Stream Proxy] Fetching URL: ${url.substring(0, 100)}...`);

        // Fetch the raw media file from the platform's CDN
        const mediaResponse = await fetch(url, {
            headers: {
                // Mimic a standard browser to prevent 403 Forbidden errors from CDNs
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36",
                "Accept": "*/*",
                "Connection": "keep-alive"
            }
        });

        if (!mediaResponse.ok) {
            console.error(`[Stream Proxy] CDN returned HTTP ${mediaResponse.status}`);
            return NextResponse.json(
                { error: `Remote server returned HTTP ${mediaResponse.status}` },
                { status: mediaResponse.status }
            );
        }

        // Pass through the remote content type and length if available
        const contentType = mediaResponse.headers.get("Content-Type") || "application/octet-stream";
        const contentLength = mediaResponse.headers.get("Content-Length");

        const headers = new Headers();
        headers.set("Content-Type", contentType);
        // Force the browser to download the file rather than play it
        headers.set("Content-Disposition", `attachment; filename="${filename}"`);
        headers.set("Cache-Control", "no-cache");

        if (contentLength) {
            headers.set("Content-Length", contentLength);
        }

        // Note: Next.js Response supports taking a Web ReadableStream directly
        return new NextResponse(mediaResponse.body, {
            status: 200,
            headers: headers
        });

    } catch (error: any) {
        console.error("[Stream Proxy] Error:", error.message);
        return NextResponse.json(
            { error: error.message || "Failed to proxy stream" },
            { status: 500 }
        );
    }
}
