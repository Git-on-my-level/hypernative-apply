/**
 * Fingerprinting module for stable JSON canonicalization and resource hashing
 *
 * This module provides utilities to generate consistent SHA-256 hashes of resource
 * configurations for change detection and idempotency.
 */

import { createHash } from 'crypto';

/**
 * Fields to exclude from fingerprinting as they don't affect resource behavior
 */
const EXCLUDED_FIELDS = new Set([
  'id',
  'created_at',
  'updated_at',
  'last_execution',
  'next_execution',
  'execution_count',
  'error_count',
  'last_error',
  'request_id',
  // API response metadata
  'metadata',
]);

/**
 * Recursively clean an object by removing excluded fields and normalizing values
 */
function cleanForFingerprinting(obj: any): any {
  if (obj === null || obj === undefined) {
    return null;
  }

  if (Array.isArray(obj)) {
    return obj
      .map((item) => cleanForFingerprinting(item))
      .filter((item) => item !== null && item !== undefined);
  }

  if (typeof obj === 'object') {
    const cleaned: Record<string, any> = {};

    // Sort keys for consistent ordering
    const sortedKeys = Object.keys(obj).sort();

    for (const key of sortedKeys) {
      // Skip excluded fields
      if (EXCLUDED_FIELDS.has(key)) {
        continue;
      }

      const value = cleanForFingerprinting(obj[key]);

      // Only include non-null, non-undefined values
      if (value !== null && value !== undefined) {
        // Convert empty arrays and objects to null for consistency
        if (Array.isArray(value) && value.length === 0) {
          continue;
        }
        if (typeof value === 'object' && Object.keys(value).length === 0) {
          continue;
        }

        cleaned[key] = value;
      }
    }

    return cleaned;
  }

  // Handle primitive types
  if (typeof obj === 'string') {
    // Normalize whitespace
    return obj.trim();
  }

  if (typeof obj === 'boolean' || typeof obj === 'number') {
    return obj;
  }

  return obj;
}

/**
 * Convert an object to stable, canonical JSON string
 *
 * This function ensures that:
 * - Object keys are sorted alphabetically
 * - Excluded fields (timestamps, IDs, etc.) are removed
 * - Empty arrays and objects are omitted
 * - Whitespace is normalized
 * - Output is deterministic regardless of input key order
 */
function canonicalizeJSON(obj: any): string {
  const cleaned = cleanForFingerprinting(obj);
  return JSON.stringify(cleaned, null, 0); // No indentation for compact hash
}

/**
 * Generate a SHA-256 hash of a resource configuration
 *
 * @param config - The resource configuration to hash
 * @returns A SHA-256 hash string (hex encoded)
 */
export function generateFingerprint(config: any): string {
  const canonical = canonicalizeJSON(config);
  return createHash('sha256').update(canonical, 'utf8').digest('hex');
}

/**
 * Generate fingerprints for multiple resources
 *
 * @param resources - Map of resource name to configuration
 * @param kind - The resource kind (for context in errors)
 * @returns Map of resource name to hash
 */
export function generateResourceFingerprints(
  resources: Record<string, any>,
  kind: string
): Record<string, string> {
  const fingerprints: Record<string, string> = {};

  for (const [name, config] of Object.entries(resources)) {
    try {
      fingerprints[name] = generateFingerprint(config);
    } catch (error) {
      throw new Error(
        `Failed to generate fingerprint for ${kind} '${name}': ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }

  return fingerprints;
}

/**
 * Compare two fingerprints to determine if they represent the same configuration
 *
 * @param hash1 - First hash to compare
 * @param hash2 - Second hash to compare
 * @returns True if the hashes are equal
 */
export function fingerprintsEqual(hash1: string, hash2: string): boolean {
  return hash1 === hash2;
}

/**
 * Validate that a fingerprint is in the expected format (64-character hex string)
 *
 * @param fingerprint - The fingerprint to validate
 * @returns True if the fingerprint is valid
 */
export function isValidFingerprint(fingerprint: string): boolean {
  return (
    typeof fingerprint === 'string' && fingerprint.length === 64 && /^[a-f0-9]+$/i.test(fingerprint)
  );
}

/**
 * Debug utility to show the canonical JSON that would be hashed
 * This is useful for troubleshooting fingerprint mismatches
 *
 * @param config - The configuration to canonicalize
 * @returns The canonical JSON string
 */
export function getCanonicalJSON(config: any): string {
  return canonicalizeJSON(config);
}
