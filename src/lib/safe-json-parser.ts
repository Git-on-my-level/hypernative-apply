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
 * Maximum JSON payload size (10MB)
 */
const MAX_JSON_SIZE = 10 * 1024 * 1024;

/**
 * Safe JSON parser with built-in security protections
 */
export class SafeJsonParser {
  /**
   * Parse JSON string with schema validation and security protections
   *
   * @param jsonString - The JSON string to parse
   * @param schema - Zod schema to validate against
   * @returns Parsed and validated data
   * @throws Error if parsing fails, validation fails, or security checks fail
   */
  static parse<T>(jsonString: string, schema: z.ZodSchema<T>): T {
    // Basic DoS protection - check payload size
    if (jsonString.length > MAX_JSON_SIZE) {
      throw new Error(`JSON payload too large: ${jsonString.length} bytes (max: ${MAX_JSON_SIZE})`);
    }

    let parsed: unknown;
    try {
      // Parse JSON with native parser
      parsed = JSON.parse(jsonString);
    } catch (error) {
      if (error instanceof SyntaxError) {
        throw new Error('Invalid JSON syntax');
      }
      throw new Error(
        `JSON parsing failed: ${error instanceof Error ? error.message : String(error)}`
      );
    }

    // Check for prototype pollution attempts
    if (SafeJsonParser.hasPrototypePollution(parsed)) {
      throw new Error('JSON contains potential prototype pollution');
    }

    // Validate against schema
    try {
      return schema.parse(parsed);
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new Error(`JSON validation failed: ${SafeJsonParser.formatZodError(error)}`);
      }
      throw new Error(
        `Validation failed: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  /**
   * Check if parsed object contains prototype pollution attempts
   *
   * @param obj - The parsed object to check
   * @returns true if prototype pollution is detected
   */
  private static hasPrototypePollution(obj: unknown): boolean {
    if (obj === null || typeof obj !== 'object') {
      return false;
    }

    // Check for __proto__ pollution (only if explicitly set as own property)
    if (obj.hasOwnProperty('__proto__')) {
      return true;
    }

    // Check for constructor pollution (only if constructor is explicitly set in JSON)
    if (
      obj.hasOwnProperty('constructor') &&
      typeof obj.constructor === 'object' &&
      obj.constructor !== null
    ) {
      if ('prototype' in obj.constructor) {
        return true;
      }
    }

    // Recursively check nested objects
    if (Array.isArray(obj)) {
      return obj.some((item) => SafeJsonParser.hasPrototypePollution(item));
    }

    // Check object properties
    for (const value of Object.values(obj)) {
      if (SafeJsonParser.hasPrototypePollution(value)) {
        return true;
      }
    }

    return false;
  }

  /**
   * Format Zod error for better error messages
   *
   * @param error - The Zod validation error
   * @returns Formatted error message
   */
  private static formatZodError(error: z.ZodError): string {
    const issues = error.issues.map((issue) => {
      const path = issue.path.length > 0 ? issue.path.join('.') : 'root';
      return `${path}: ${issue.message}`;
    });

    return issues.join(', ');
  }
}
