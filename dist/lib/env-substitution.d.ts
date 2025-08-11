/**
 * Environment Variable Substitution Utility
 *
 * Handles runtime substitution of environment variables in configuration values.
 * Supports ${ENV_NAME} syntax and implements comprehensive secret redaction for logging.
 *
 * Features:
 * - Environment variable substitution with ${VAR_NAME} syntax
 * - Comprehensive secret redaction for logging
 * - Validation of required environment variables
 * - Deep object traversal for nested configuration
 * - Support for default values: ${VAR_NAME:default_value}
 */
export interface EnvSubstitutionOptions {
    /**
     * Whether to require all referenced environment variables to exist
     * If false, missing variables will be left as-is
     */
    strict?: boolean;
    /**
     * Custom environment variables to use instead of process.env
     */
    customEnv?: Record<string, string>;
    /**
     * Prefix for environment variable names (e.g., 'HN_' for HN_WEBHOOK_URL)
     */
    prefix?: string;
}
export interface EnvSubstitutionResult {
    /** The configuration with environment variables substituted */
    substituted: Record<string, any>;
    /** List of environment variables that were referenced */
    referencedVars: string[];
    /** List of environment variables that were missing (if strict=false) */
    missingVars: string[];
    /** Configuration with secrets redacted for logging */
    redacted: Record<string, any>;
}
/**
 * Substitute environment variables in configuration objects
 */
export declare function substituteEnvVars(config: Record<string, any>, options?: EnvSubstitutionOptions): EnvSubstitutionResult;
/**
 * Recursively redact secrets from configuration for safe logging
 */
export declare function redactSecrets(config: any): any;
/**
 * Validate that all required environment variables are present
 */
export declare function validateRequiredEnvVars(requiredVars: string[], customEnv?: Record<string, string>): void;
/**
 * Extract all environment variable references from a configuration object
 */
export declare function extractEnvVarReferences(config: any): string[];
/**
 * Create a safe configuration for logging by redacting secrets
 */
export declare function createSafeConfigForLogging(config: any, context?: string): any;
/**
 * Environment variable substitution with comprehensive error handling
 */
export declare function safeSubstituteEnvVars(config: Record<string, any>, options?: EnvSubstitutionOptions): EnvSubstitutionResult;
//# sourceMappingURL=env-substitution.d.ts.map