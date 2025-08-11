/**
 * Fingerprinting module for stable JSON canonicalization and resource hashing
 *
 * This module provides utilities to generate consistent SHA-256 hashes of resource
 * configurations for change detection and idempotency.
 */
/**
 * Generate a SHA-256 hash of a resource configuration
 *
 * @param config - The resource configuration to hash
 * @returns A SHA-256 hash string (hex encoded)
 */
export declare function generateFingerprint(config: any): string;
/**
 * Generate fingerprints for multiple resources
 *
 * @param resources - Map of resource name to configuration
 * @param kind - The resource kind (for context in errors)
 * @returns Map of resource name to hash
 */
export declare function generateResourceFingerprints(resources: Record<string, any>, kind: string): Record<string, string>;
/**
 * Compare two fingerprints to determine if they represent the same configuration
 *
 * @param hash1 - First hash to compare
 * @param hash2 - Second hash to compare
 * @returns True if the hashes are equal
 */
export declare function fingerprintsEqual(hash1: string, hash2: string): boolean;
/**
 * Validate that a fingerprint is in the expected format (64-character hex string)
 *
 * @param fingerprint - The fingerprint to validate
 * @returns True if the fingerprint is valid
 */
export declare function isValidFingerprint(fingerprint: string): boolean;
/**
 * Debug utility to show the canonical JSON that would be hashed
 * This is useful for troubleshooting fingerprint mismatches
 *
 * @param config - The configuration to canonicalize
 * @returns The canonical JSON string
 */
export declare function getCanonicalJSON(config: any): string;
//# sourceMappingURL=fingerprint.d.ts.map