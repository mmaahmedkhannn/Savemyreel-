import { NextRequest, NextResponse } from "next/server";

/**
 * File Proxy Endpoint — STREAMING version
 * Streams media files from CDN to client without buffering in memory.
 * This fixes the issue where large videos were truncated to tiny files.
 * 
 * - Without `filename` param: serves inline (for <img>/<video> previews)
 * - With `filename` param: triggers browser download
 */
export async function GET(request: NextRequest) {
    const url = request.nextUrl.searchParams.get("url");
    const filename = request.nextUrl.searchParams.get("filename");

    if (!url) {
        return NextResponse.json({ error: "Missing url parameter" }, { status: 400 });
    }

    try {
        console.log(`[File Proxy] Streaming: ${url.substring(0, 100)}...`);

        // Determine appropriate referer based on source URL
        let referer = 'https://www.google.com/';
        try {
            const sourceHost = new URL(url).hostname;
            if (sourceHost.includes('instagram') || sourceHost.includes('cdninstagram') || sourceHost.includes('fbcdn')) {
                referer = 'https://www.instagram.com/';
            } else if (sourceHost.includes('tiktok') || sourceHost.includes('tiktokcdn') || sourceHost.includes('musical.ly')) {
                referer = 'https://www.tiktok.com/';
            } else if (sourceHost.includes('youtube') || sourceHost.includes('googlevideo') || sourceHost.includes('ytimg')) {
                referer = 'https://www.youtube.com/';
            }
        } catch { /* use default referer */ }

        // Forward range header if client sends one (video seeking)
        const rangeHeader = request.headers.get('range');
        const fetchHeaders: Record<string, string> = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
            'Referer': referer,
        };
        if (rangeHeader) {
            fetchHeaders['Range'] = rangeHeader;
        }

        const response = await fetch(url, {
            headers: fetchHeaders,
            // @ts-ignore — Next.js/Node fetch supports this
            cache: 'no-store',
        });

        if (!response.ok && response.status !== 206) {
            console.error(`[File Proxy] Upstream returned ${response.status}`);
            return NextResponse.json({ error: "Failed to fetch media" }, { status: response.status });
        }

        const contentType = response.headers.get('content-type') || 'application/octet-stream';
        const contentLength = response.headers.get('content-length');
        const contentRange = response.headers.get('content-range');
        const acceptRanges = response.headers.get('accept-ranges');

        const headers: Record<string, string> = {
            'Content-Type': contentType,
            'Cache-Control': 'public, max-age=3600',
        };

        if (contentLength) {
            headers['Content-Length'] = contentLength;
        }
        if (contentRange) {
            headers['Content-Range'] = contentRange;
        }
        if (acceptRanges) {
            headers['Accept-Ranges'] = acceptRanges;
        }

        // Only add download header if filename is explicitly provided
        if (filename) {
            headers['Content-Disposition'] = `attachment; filename="${filename}"`;
        }

        // Stream the response body directly — no buffering
        return new NextResponse(response.body, {
            status: response.status,
            headers,
        });

    } catch (error: any) {
        console.error("[File Proxy] Error:", error.message);
        return NextResponse.json({ error: "Download failed" }, { status: 500 });
    }
}
