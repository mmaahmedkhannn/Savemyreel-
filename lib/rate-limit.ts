type RateLimitStore = Map<string, { count: number; lastReset: number }>;

const rateLimitStore: RateLimitStore = new Map();

interface RateLimitConfig {
    limit: number; // Max requests
    windowMs: number; // Time window in milliseconds
}

export function rateLimit(ip: string, config: RateLimitConfig = { limit: 10, windowMs: 60 * 1000 }) {
    const now = Date.now();
    const record = rateLimitStore.get(ip) || { count: 0, lastReset: now };

    if (now - record.lastReset > config.windowMs) {
        record.count = 0;
        record.lastReset = now;
    }

    record.count += 1;
    rateLimitStore.set(ip, record);

    return {
        success: record.count <= config.limit,
        limit: config.limit,
        remaining: Math.max(0, config.limit - record.count),
        reset: record.lastReset + config.windowMs,
    };
}
