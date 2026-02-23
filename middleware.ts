import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Security headers configuration
const securityHeaders = {
    // Content Security Policy - Allows Google AdSense and Analytics
    'Content-Security-Policy': [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://pagead2.googlesyndication.com https://www.googletagmanager.com https://www.google-analytics.com https://adservice.google.com",
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "font-src 'self' https://fonts.gstatic.com",
        "img-src 'self' data: blob: https: http:",
        "media-src 'self' blob: https: http:",
        "connect-src 'self' https://www.google-analytics.com https://pagead2.googlesyndication.com https://adservice.google.com",
        "frame-src 'self' https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://www.google.com",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
        "frame-ancestors 'none'",
        "upgrade-insecure-requests"
    ].join('; '),

    // Prevent clickjacking attacks
    'X-Frame-Options': 'DENY',

    // Prevent MIME type sniffing
    'X-Content-Type-Options': 'nosniff',

    // Referrer policy for privacy
    'Referrer-Policy': 'strict-origin-when-cross-origin',

    // HTTP Strict Transport Security (HSTS)
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',

    // XSS Protection (legacy but still useful)
    'X-XSS-Protection': '1; mode=block',

    // Permissions Policy (restrict browser features)
    'Permissions-Policy': [
        'camera=()',
        'microphone=()',
        'geolocation=()',
        'interest-cohort=()',
        'payment=()',
        'usb=()'
    ].join(', '),

    // Prevent DNS prefetching (privacy)
    'X-DNS-Prefetch-Control': 'off'
};

// Simple in-memory rate limiting (per IP)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute window
const RATE_LIMIT_MAX = 100; // 100 requests per minute for pages
const API_RATE_LIMIT_MAX = 30; // 30 API requests per minute

function getRateLimitKey(ip: string, type: 'api' | 'page'): string {
    return `${ip}:${type}`;
}

function isRateLimited(ip: string, isAPI: boolean): boolean {
    const key = getRateLimitKey(ip, isAPI ? 'api' : 'page');
    const now = Date.now();
    const limit = isAPI ? API_RATE_LIMIT_MAX : RATE_LIMIT_MAX;

    const record = rateLimitMap.get(key);

    if (!record || now > record.resetTime) {
        rateLimitMap.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
        return false;
    }

    if (record.count >= limit) {
        return true;
    }

    record.count++;
    return false;
}

// Clean up old rate limit entries periodically
setInterval(() => {
    const now = Date.now();
    for (const [key, value] of rateLimitMap.entries()) {
        if (now > value.resetTime) {
            rateLimitMap.delete(key);
        }
    }
}, RATE_LIMIT_WINDOW);

export function middleware(request: NextRequest) {
    const response = NextResponse.next();
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ??
        request.headers.get('x-real-ip') ??
        'unknown';

    const isAPIRoute = request.nextUrl.pathname.startsWith('/api');

    // Apply rate limiting
    if (isRateLimited(ip, isAPIRoute)) {
        return new NextResponse(
            JSON.stringify({
                error: 'Too many requests. Please wait a moment and try again.',
                retryAfter: 60
            }),
            {
                status: 429,
                headers: {
                    'Content-Type': 'application/json',
                    'Retry-After': '60'
                }
            }
        );
    }

    // Apply security headers
    for (const [key, value] of Object.entries(securityHeaders)) {
        response.headers.set(key, value);
    }

    // Add CORS headers for API routes
    if (isAPIRoute) {
        response.headers.set('Access-Control-Allow-Origin', '*');
        response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
    }

    return response;
}

// Configure which routes the middleware applies to
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder files
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml)$).*)',
    ],
};
