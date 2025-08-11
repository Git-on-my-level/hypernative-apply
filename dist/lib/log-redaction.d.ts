/**
 * Centralized log redaction utility for preventing sensitive data exposure
 *
 * This module provides functions to automatically redact sensitive information
 * from log messages, preventing credentials, API keys, tokens, and other
 * sensitive data from appearing in log files or console output.
 */
/**
 * Configuration for redaction patterns and behavior
 */
interface RedactionConfig {
    sensitiveFields: string[];
    patterns: RegExp[];
    replacement: string;
}
/**
 * Log redaction utility class
 */
export declare class LogRedactor {
    private static config;
    /**
     * Configure the redaction behavior
     */
    static configure(config: Partial<RedactionConfig>): void;
    /**
     * Redact sensitive information from any data structure
     *
     * @param data - The data to redact (can be object, array, string, etc.)
     * @returns Redacted copy of the data
     */
    static redact(data: any): any;
    /**
     * Redact sensitive patterns from a string
     *
     * @param str - The string to redact
     * @returns String with sensitive patterns redacted
     */
    static redactString(str: string): string;
    /**
     * Partially redact a string (show first few chars for identification)
     *
     * @param str - The string to partially redact
     * @param visibleChars - Number of characters to keep visible (default: 4)
     * @returns Partially redacted string
     */
    static partialRedact(str: string, visibleChars?: number): string;
    /**
     * Check if a value appears to contain sensitive data
     *
     * @param value - The value to check
     * @returns True if the value appears sensitive
     */
    static isSensitive(value: string): boolean;
    /**
     * Create a safe logging object that automatically redacts sensitive data
     *
     * @param data - The data to make safe for logging
     * @returns Redacted copy safe for logging
     */
    static safeLog(data: any): any;
}
/**
 * Convenience function for quick redaction
 */
export declare function redactSensitive(data: any): any;
/**
 * Convenience function for string redaction
 */
export declare function redactString(str: string): string;
export {};
//# sourceMappingURL=log-redaction.d.ts.map