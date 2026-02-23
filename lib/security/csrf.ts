/**
 * CSRF Protection Utilities
 * 
 * Provides CSRF token generation and validation for form submissions.
 * Uses cryptographically secure random tokens.
 */

import { generateSecureToken } from './sanitize';

// In-memory token store (for development)
// For production, use a session store or database
const tokenStore = new Map<string, { token: string; expires: number }>();

const TOKEN_EXPIRY = 60 * 60 * 1000; // 1 hour

/**
 * Generate a new CSRF token for a session
 * @param sessionId - Unique session identifier
 * @returns CSRF token string
 */
export function generateCsrfToken(sessionId: string): string {
    const token = generateSecureToken(32);
    const expires = Date.now() + TOKEN_EXPIRY;

    tokenStore.set(sessionId, { token, expires });

    return token;
}

/**
 * Validate a CSRF token
 * @param sessionId - Session identifier
 * @param token - Token to validate
 * @returns true if valid, false otherwise
 */
export function validateCsrfToken(sessionId: string, token: string): boolean {
    if (!sessionId || !token) return false;

    const stored = tokenStore.get(sessionId);

    if (!stored) return false;

    // Check expiry
    if (Date.now() > stored.expires) {
        tokenStore.delete(sessionId);
        return false;
    }

    // Timing-safe comparison
    return timingSafeEqual(stored.token, token);
}

/**
 * Revoke a CSRF token (after successful form submission)
 */
export function revokeCsrfToken(sessionId: string): void {
    tokenStore.delete(sessionId);
}

/**
 * Clean up expired tokens
 */
export function cleanupExpiredTokens(): void {
    const now = Date.now();
    for (const [sessionId, data] of tokenStore.entries()) {
        if (now > data.expires) {
            tokenStore.delete(sessionId);
        }
    }
}

/**
 * Timing-safe string comparison to prevent timing attacks
 */
function timingSafeEqual(a: string, b: string): boolean {
    if (a.length !== b.length) {
        return false;
    }

    let result = 0;
    for (let i = 0; i < a.length; i++) {
        result |= a.charCodeAt(i) ^ b.charCodeAt(i);
    }

    return result === 0;
}

/**
 * Get or create a CSRF token for a request
 * Creates a new token if one doesn't exist for the session
 */
export function getOrCreateCsrfToken(sessionId: string): string {
    const existing = tokenStore.get(sessionId);

    if (existing && Date.now() < existing.expires) {
        return existing.token;
    }

    return generateCsrfToken(sessionId);
}

// Cleanup expired tokens every 10 minutes
if (typeof setInterval !== 'undefined') {
    setInterval(cleanupExpiredTokens, 10 * 60 * 1000);
}
