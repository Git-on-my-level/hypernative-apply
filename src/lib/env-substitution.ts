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

import { log } from './logger.js';

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

// Common secret field patterns to redact
const SECRET_PATTERNS = [
  /password/i,
  /secret/i,
  /token/i,
  /key/i,
  /auth/i,
  /credential/i,
  /webhook_url/i,
  /smtp.*pass/i,
  /bot_token/i,
  /integration_key/i,
];

// URL patterns that should be redacted (contain sensitive info)
const SENSITIVE_URL_PATTERNS = [
  /^https:\/\/hooks\.slack\.com\/services\//i,
  /^https:\/\/discord\.com\/api\/webhooks\//i,
  /^https:\/\/.*\.webhook\.office\.com\//i,
];

/**
 * Substitute environment variables in configuration objects
 */
export function substituteEnvVars(
  config: Record<string, any>,
  options: EnvSubstitutionOptions = {}
): EnvSubstitutionResult {
  const { strict = true, customEnv = process.env as Record<string, string>, prefix = '' } = options;

  const referencedVars: string[] = [];
  const missingVars: string[] = [];

  const substituted = substituteInValue(
    config,
    customEnv,
    prefix,
    referencedVars,
    missingVars,
    strict
  );
  const redacted = redactSecrets(substituted);

  return {
    substituted,
    referencedVars: [...new Set(referencedVars)],
    missingVars: [...new Set(missingVars)],
    redacted,
  };
}

/**
 * Recursively substitute environment variables in any value
 */
function substituteInValue(
  value: any,
  env: Record<string, string>,
  prefix: string,
  referencedVars: string[],
  missingVars: string[],
  strict: boolean
): any {
  if (typeof value === 'string') {
    return substituteInString(value, env, prefix, referencedVars, missingVars, strict);
  }

  if (Array.isArray(value)) {
    return value.map((item) =>
      substituteInValue(item, env, prefix, referencedVars, missingVars, strict)
    );
  }

  if (value && typeof value === 'object') {
    const result: Record<string, any> = {};
    for (const [key, val] of Object.entries(value)) {
      result[key] = substituteInValue(val, env, prefix, referencedVars, missingVars, strict);
    }
    return result;
  }

  return value;
}

/**
 * Substitute environment variables in a string
 * Supports both ${VAR_NAME} and ${VAR_NAME:default_value} syntax
 */
function substituteInString(
  str: string,
  env: Record<string, string>,
  prefix: string,
  referencedVars: string[],
  missingVars: string[],
  strict: boolean
): string {
  // Pattern matches ${VAR_NAME} or ${VAR_NAME:default_value}
  const envVarPattern = /\$\{([A-Z_][A-Z0-9_]*?)(?::([^}]*))?\}/g;

  return str.replace(envVarPattern, (match, varName, defaultValue) => {
    const fullVarName = prefix ? `${prefix}${varName}` : varName;
    referencedVars.push(fullVarName);

    const envValue = env[fullVarName];

    if (envValue !== undefined) {
      return envValue;
    }

    if (defaultValue !== undefined) {
      return defaultValue;
    }

    missingVars.push(fullVarName);

    if (strict) {
      throw new Error(`Missing required environment variable: ${fullVarName}`);
    }

    // Return original placeholder if not strict
    return match;
  });
}

/**
 * Recursively redact secrets from configuration for safe logging
 */
export function redactSecrets(config: any): any {
  if (typeof config === 'string') {
    return redactStringSecrets(config);
  }

  if (Array.isArray(config)) {
    return config.map(redactSecrets);
  }

  if (config && typeof config === 'object') {
    const result: Record<string, any> = {};
    for (const [key, value] of Object.entries(config)) {
      if (isSecretField(key)) {
        result[key] = redactValue(value);
      } else {
        result[key] = redactSecrets(value);
      }
    }
    return result;
  }

  return config;
}

/**
 * Check if a field name indicates it contains secret data
 */
function isSecretField(fieldName: string): boolean {
  return SECRET_PATTERNS.some((pattern) => pattern.test(fieldName));
}

/**
 * Redact secret values while preserving type information
 */
function redactValue(value: any): any {
  if (typeof value === 'string') {
    return redactStringSecrets(value);
  }

  if (typeof value === 'number') {
    return '***';
  }

  if (Array.isArray(value)) {
    return value.map(() => '***');
  }

  if (value && typeof value === 'object') {
    const result: Record<string, any> = {};
    for (const key of Object.keys(value)) {
      result[key] = '***';
    }
    return result;
  }

  return '***';
}

/**
 * Redact sensitive parts of strings (like URLs)
 */
function redactStringSecrets(str: string): string {
  if (typeof str !== 'string') {
    return str;
  }

  // Redact sensitive URLs
  for (const pattern of SENSITIVE_URL_PATTERNS) {
    if (pattern.test(str)) {
      const url = new URL(str);
      return `${url.protocol}//${url.hostname}/***`;
    }
  }

  // Redact tokens and keys (preserve first/last 4 characters for debugging)
  if (str.length > 20 && (str.includes('token') || str.includes('key') || str.includes('secret'))) {
    return `${str.slice(0, 4)}***${str.slice(-4)}`;
  }

  // Redact very long strings that might be secrets
  if (str.length > 50) {
    return `${str.slice(0, 10)}***${str.slice(-4)}`;
  }

  return str;
}

/**
 * Validate that all required environment variables are present
 */
export function validateRequiredEnvVars(
  requiredVars: string[],
  customEnv?: Record<string, string>
): void {
  const env = customEnv || (process.env as Record<string, string>);
  const missing = requiredVars.filter((varName) => !env[varName]);

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}

/**
 * Extract all environment variable references from a configuration object
 */
export function extractEnvVarReferences(config: any): string[] {
  const references: string[] = [];

  function extract(value: any): void {
    if (typeof value === 'string') {
      const envVarPattern = /\$\{([A-Z_][A-Z0-9_]*?)(?::([^}]*))?\}/g;
      let match;
      while ((match = envVarPattern.exec(value)) !== null) {
        references.push(match[1]);
      }
    } else if (Array.isArray(value)) {
      value.forEach(extract);
    } else if (value && typeof value === 'object') {
      Object.values(value).forEach(extract);
    }
  }

  extract(config);
  return [...new Set(references)];
}

/**
 * Create a safe configuration for logging by redacting secrets
 */
export function createSafeConfigForLogging(config: any, context: string = 'configuration'): any {
  try {
    const redacted = redactSecrets(config);
    log.debug(`Creating safe ${context} for logging`, {
      originalKeys:
        config && typeof config === 'object' ? Object.keys(config).length : 'non-object',
      redactedKeys:
        redacted && typeof redacted === 'object' ? Object.keys(redacted).length : 'non-object',
    });
    return redacted;
  } catch (error) {
    log.error(`Failed to create safe ${context} for logging:`, error);
    return { error: 'Failed to redact secrets' };
  }
}

/**
 * Environment variable substitution with comprehensive error handling
 */
export function safeSubstituteEnvVars(
  config: Record<string, any>,
  options: EnvSubstitutionOptions = {}
): EnvSubstitutionResult {
  try {
    const result = substituteEnvVars(config, options);

    log.debug('Environment variable substitution completed', {
      referencedVars: result.referencedVars.length,
      missingVars: result.missingVars.length,
      strict: options.strict ?? true,
    });

    if (result.missingVars.length > 0) {
      log.warn('Missing environment variables:', result.missingVars);
    }

    return result;
  } catch (error) {
    log.error('Environment variable substitution failed:', error);
    throw error;
  }
}
