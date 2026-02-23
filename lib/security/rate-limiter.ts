/**
 * Rate Limiter Utility
 * 
 * Provides in-memory rate limiting for API routes.
 * For production, consider using Redis or a distributed rate limiter.
 */

interface RateLimitRecord {
    count: number;
    resetTime: number;
}

interface RateLimiterConfig {
    windowMs: number;      // Time window in milliseconds
    maxRequests: number;   // Max requests per window
}

const rateLimitStore = new Map<string, RateLimitRecord>();

// Default configurations for different use cases
export const RATE_LIMIT_CONFIGS = {
    api: { windowMs: 60 * 1000, maxRequests: 30 },          // 30 per minute
    download: { windowMs: 60 * 1000, maxRequests: 10 },     // 10 per minute
    contact: { windowMs: 60 * 60 * 1000, maxRequests: 5 },  // 5 per hour
    strict: { windowMs: 60 * 1000, maxRequests: 5 },        // 5 per minute
} as const;

/**
 * Check if a request should be rate limited
 * @param identifier - Unique identifier (usually IP address)
 * @param config - Rate limiting configuration
 * @returns Object with isLimited boolean and remaining requests
 */
export function checkRateLimit(
    identifier: string,
    config: RateLimiterConfig = RATE_LIMIT_CONFIGS.api
): { isLimited: boolean; remaining: number; resetIn: number } {
    const now = Date.now();
    const record = rateLimitStore.get(identifier);

    // No existing record or expired window
    if (!record || now > record.resetTime) {
        rateLimitStore.set(identifier, {
            count: 1,
            resetTime: now + config.windowMs
        });
        return {
            isLimited: false,
            remaining: config.maxRequests - 1,
            resetIn: config.windowMs
        };
    }

    // Check if over limit
    if (record.count >= config.maxRequests) {
        return {
            isLimited: true,
            remaining: 0,
            resetIn: record.resetTime - now
        };
    }

    // Increment counter
    record.count++;
    return {
        isLimited: false,
        remaining: config.maxRequests - record.count,
        resetIn: record.resetTime - now
    };
}

/**
 * Clean up expired rate limit records
 * Call this periodically to prevent memory leaks
 */
export function cleanupRateLimits(): void {
    const now = Date.now();
    for (const [key, record] of rateLimitStore.entries()) {
        if (now > record.resetTime) {
            rateLimitStore.delete(key);
        }
    }
}

/**
 * Get client IP from request headers
 */
export function getClientIP(headers: Headers): string {
    return (
        headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
        headers.get('x-real-ip') ||
        headers.get('cf-connecting-ip') ||  // Cloudflare
        'unknown'
    );
}

/**
 * Create rate limit response
 */
export function createRateLimitResponse(resetIn: number): Response {
    return new Response(
        JSON.stringify({
            error: 'Rate limit exceeded',
            message: 'Too many requests. Please wait before trying again.',
            retryAfter: Math.ceil(resetIn / 1000)
        }),
        {
            status: 429,
            headers: {
                'Content-Type': 'application/json',
                'Retry-After': String(Math.ceil(resetIn / 1000)),
                'X-RateLimit-Remaining': '0'
            }
        }
    );
}

// Cleanup expired records every minute
if (typeof setInterval !== 'undefined') {
    setInterval(cleanupRateLimits, 60 * 1000);
}
