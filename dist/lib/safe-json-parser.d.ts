/**
 * Safe JSON parser with validation and security protections
 *
 * This module provides secure JSON parsing with protection against:
 * - Prototype pollution attacks
 * - Denial of service via large payloads
 * - Schema validation failures
 */
import { z } from 'zod';
/**
 * Safe JSON parser with built-in security protections
 */
export declare class SafeJsonParser {
    /**
     * Parse JSON string with schema validation and security protections
     *
     * @param jsonString - The JSON string to parse
     * @param schema - Zod schema to validate against
     * @returns Parsed and validated data
     * @throws Error if parsing fails, validation fails, or security checks fail
     */
    static parse<T>(jsonString: string, schema: z.ZodSchema<T>): T;
    /**
     * Check if parsed object contains prototype pollution attempts
     *
     * @param obj - The parsed object to check
     * @returns true if prototype pollution is detected
     */
    private static hasPrototypePollution;
    /**
     * Format Zod error for better error messages
     *
     * @param error - The Zod validation error
     * @returns Formatted error message
     */
    private static formatZodError;
}
//# sourceMappingURL=safe-json-parser.d.ts.map