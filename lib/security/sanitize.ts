/**
 * Input Sanitization Utilities
 * 
 * Provides functions to sanitize and validate user input
 * to prevent XSS, injection attacks, and other security vulnerabilities.
 */

/**
 * HTML entity encoding map
 */
const HTML_ENTITIES: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;'
};

/**
 * Escape HTML special characters to prevent XSS
 */
export function escapeHtml(str: string): string {
    if (typeof str !== 'string') return '';
    return str.replace(/[&<>"'`=/]/g, (char) => HTML_ENTITIES[char] || char);
}

/**
 * Sanitize a URL - validate and clean
 * @param url - URL string to sanitize
 * @returns Sanitized URL or null if invalid
 */
export function sanitizeUrl(url: string): string | null {
    if (typeof url !== 'string') return null;

    // Trim whitespace
    const trimmed = url.trim();

    // Check for empty string
    if (!trimmed) return null;

    // Block dangerous protocols
    const dangerousProtocols = ['javascript:', 'data:', 'vbscript:', 'file:'];
    const lowerUrl = trimmed.toLowerCase();

    for (const protocol of dangerousProtocols) {
        if (lowerUrl.startsWith(protocol)) {
            return null;
        }
    }

    // Validate URL structure
    try {
        const parsed = new URL(trimmed);

        // Only allow http and https
        if (!['http:', 'https:'].includes(parsed.protocol)) {
            return null;
        }

        // Return the sanitized URL
        return parsed.href;
    } catch {
        // If URL parsing fails, try adding https://
        if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
            try {
                const withHttps = new URL(`https://${trimmed}`);
                return withHttps.href;
            } catch {
                return null;
            }
        }
        return null;
    }
}

/**
 * Validate that a URL belongs to a supported platform
 */
export function validateSocialMediaUrl(url: string): {
    valid: boolean;
    platform: string | null;
    sanitizedUrl: string | null;
} {
    const sanitized = sanitizeUrl(url);

    if (!sanitized) {
        return { valid: false, platform: null, sanitizedUrl: null };
    }

    const platformPatterns: Record<string, RegExp[]> = {
        instagram: [
            /^https?:\/\/(www\.)?instagram\.com\/(p|reel|reels|tv|stories)\/[\w-]+/i,
            /^https?:\/\/(www\.)?instagram\.com\/[\w.]+\/?$/i
        ],
        facebook: [
            /^https?:\/\/(www\.|m\.|web\.)?facebook\.com\/.*\/videos\//i,
            /^https?:\/\/(www\.|m\.)?facebook\.com\/watch/i,
            /^https?:\/\/(www\.|m\.)?facebook\.com\/reel\//i,
            /^https?:\/\/fb\.watch\//i
        ],
        tiktok: [
            /^https?:\/\/(www\.|m\.|vm\.)?tiktok\.com\/@[\w.]+\/video\/\d+/i,
            /^https?:\/\/(www\.)?tiktok\.com\/t\/[\w]+/i,
            /^https?:\/\/vm\.tiktok\.com\/[\w]+/i
        ],
        twitter: [
            /^https?:\/\/(www\.)?(twitter|x)\.com\/[\w]+\/status\/\d+/i
        ]
    };

    for (const [platform, patterns] of Object.entries(platformPatterns)) {
        for (const pattern of patterns) {
            if (pattern.test(sanitized)) {
                return { valid: true, platform, sanitizedUrl: sanitized };
            }
        }
    }

    return { valid: false, platform: null, sanitizedUrl: sanitized };
}

/**
 * Sanitize text input - remove potential script injections
 */
export function sanitizeText(text: string, maxLength: number = 1000): string {
    if (typeof text !== 'string') return '';

    return text
        .slice(0, maxLength)  // Limit length
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')  // Remove script tags
        .replace(/on\w+\s*=/gi, '')  // Remove event handlers
        .trim();
}

/**
 * Sanitize email input
 */
export function sanitizeEmail(email: string): string | null {
    if (typeof email !== 'string') return null;

    const trimmed = email.trim().toLowerCase();

    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(trimmed)) {
        return null;
    }

    // Max length check
    if (trimmed.length > 254) {
        return null;
    }

    return trimmed;
}

/**
 * Generate a secure random token
 */
export function generateSecureToken(length: number = 32): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const randomValues = new Uint8Array(length);

    if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
        crypto.getRandomValues(randomValues);
    } else {
        // Fallback for environments without crypto
        for (let i = 0; i < length; i++) {
            randomValues[i] = Math.floor(Math.random() * 256);
        }
    }

    return Array.from(randomValues)
        .map(v => chars[v % chars.length])
        .join('');
}

/**
 * Validate content type header
 */
export function validateContentType(
    contentType: string | null,
    allowed: string[] = ['application/json']
): boolean {
    if (!contentType) return false;
    return allowed.some(type => contentType.toLowerCase().includes(type));
}
