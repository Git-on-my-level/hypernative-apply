/**
 * Centralized log redaction utility for preventing sensitive data exposure
 *
 * This module provides functions to automatically redact sensitive information
 * from log messages, preventing credentials, API keys, tokens, and other
 * sensitive data from appearing in log files or console output.
 */
/**
 * Default configuration for sensitive field detection
 */
const DEFAULT_CONFIG = {
    sensitiveFields: [
        'password',
        'secret',
        'token',
        'key',
        'credential',
        'clientSecret',
        'client_secret',
        'apiKey',
        'api_key',
        'accessToken',
        'access_token',
        'refreshToken',
        'refresh_token',
        'bearer',
        'authorization',
        'auth',
    ],
    patterns: [
        /\b[A-Za-z0-9+/]{20,}={0,2}\b/g, // Base64 tokens (20+ chars)
        /\b[a-f0-9]{32,}\b/gi, // Hex keys (32+ chars)
        /\b[A-Za-z0-9_-]{20,}\b/g, // General tokens/keys (20+ chars)
        /Bearer\s+[A-Za-z0-9._-]+/gi, // Bearer tokens
        /sk_[a-zA-Z0-9]{20,}/g, // Secret keys (sk_ prefix)
        /pk_[a-zA-Z0-9]{20,}/g, // Public keys (pk_ prefix)
    ],
    replacement: '***REDACTED***',
};
/**
 * Log redaction utility class
 */
export class LogRedactor {
    static config = DEFAULT_CONFIG;
    /**
     * Configure the redaction behavior
     */
    static configure(config) {
        LogRedactor.config = {
            ...DEFAULT_CONFIG,
            ...config,
        };
    }
    /**
     * Redact sensitive information from any data structure
     *
     * @param data - The data to redact (can be object, array, string, etc.)
     * @returns Redacted copy of the data
     */
    static redact(data) {
        if (data === null || data === undefined) {
            return data;
        }
        if (typeof data === 'string') {
            return LogRedactor.redactString(data);
        }
        if (Array.isArray(data)) {
            return data.map((item) => LogRedactor.redact(item));
        }
        if (typeof data === 'object') {
            const redacted = {};
            for (const [key, value] of Object.entries(data)) {
                const lowerKey = key.toLowerCase();
                // Check if field name indicates sensitive data
                const isSensitiveField = LogRedactor.config.sensitiveFields.some((sensitiveField) => lowerKey.includes(sensitiveField.toLowerCase()));
                if (isSensitiveField) {
                    // Redact the entire value for sensitive fields
                    if (typeof value === 'string' && value.length > 0) {
                        redacted[key] = LogRedactor.partialRedact(value);
                    }
                    else {
                        redacted[key] = LogRedactor.config.replacement;
                    }
                }
                else {
                    // Recursively redact nested structures and apply pattern matching
                    redacted[key] = LogRedactor.redact(value);
                }
            }
            return redacted;
        }
        // Return primitive types as-is
        return data;
    }
    /**
     * Redact sensitive patterns from a string
     *
     * @param str - The string to redact
     * @returns String with sensitive patterns redacted
     */
    static redactString(str) {
        let result = str;
        for (const pattern of LogRedactor.config.patterns) {
            result = result.replace(pattern, LogRedactor.config.replacement);
        }
        return result;
    }
    /**
     * Partially redact a string (show first few chars for identification)
     *
     * @param str - The string to partially redact
     * @param visibleChars - Number of characters to keep visible (default: 4)
     * @returns Partially redacted string
     */
    static partialRedact(str, visibleChars = 4) {
        if (str.length <= visibleChars) {
            return LogRedactor.config.replacement;
        }
        return `${str.slice(0, visibleChars)}****`;
    }
    /**
     * Check if a value appears to contain sensitive data
     *
     * @param value - The value to check
     * @returns True if the value appears sensitive
     */
    static isSensitive(value) {
        for (const pattern of LogRedactor.config.patterns) {
            if (pattern.test(value)) {
                return true;
            }
        }
        return false;
    }
    /**
     * Create a safe logging object that automatically redacts sensitive data
     *
     * @param data - The data to make safe for logging
     * @returns Redacted copy safe for logging
     */
    static safeLog(data) {
        return LogRedactor.redact(data);
    }
}
/**
 * Convenience function for quick redaction
 */
export function redactSensitive(data) {
    return LogRedactor.redact(data);
}
/**
 * Convenience function for string redaction
 */
export function redactString(str) {
    return LogRedactor.redactString(str);
}
//# sourceMappingURL=log-redaction.js.map