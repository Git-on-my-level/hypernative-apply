import { z } from 'zod';
import { readFileSync, existsSync } from 'fs';
import { homedir } from 'os';
import { join } from 'path';
import * as yaml from 'yaml';
import * as dotenv from 'dotenv';
import { log } from './logger.js';

// Configuration schema definitions
const ProfileConfigSchema = z.object({
  name: z.string(),
  baseUrl: z.string().url().optional(),
  clientId: z.string().optional(),
  clientSecret: z.string().optional(),
});

const ConfigFileSchema = z.object({
  profiles: z.record(z.string(), ProfileConfigSchema).optional(),
  defaultProfile: z.string().optional(),
});

const EnvironmentConfigSchema = z.object({
  HN_CLIENT_ID: z.string().optional(),
  HN_CLIENT_SECRET: z.string().optional(),
  HN_BASE_URL: z.string().url().optional(),
  HN_PROFILE: z.string().optional(),
});

// Type definitions
export type ProfileConfig = z.infer<typeof ProfileConfigSchema>;
export type ConfigFile = z.infer<typeof ConfigFileSchema>;
export type EnvironmentConfig = z.infer<typeof EnvironmentConfigSchema>;

export interface CommandFlags {
  profile?: string;
  baseUrl?: string;
}

export interface ResolvedConfig {
  clientId: string;
  clientSecret: string;
  baseUrl: string;
  profile: string;
}

export interface ConfigDebugInfo {
  profile: string;
  baseUrl: string;
  clientId: string; // Will be redacted when displayed
  clientSecret: string; // Will be redacted when displayed
  configSources: {
    profileFile?: string;
    envFile?: string;
    flags: boolean;
    environment: boolean;
  };
}

// Default configuration values
const DEFAULT_CONFIG = {
  baseUrl: 'https://api.hypernative.xyz',
  profile: 'default',
} as const;

// Configuration file paths
const CONFIG_DIR = join(homedir(), '.hypernative');
const CONFIG_FILE_PATH = join(CONFIG_DIR, 'config.yaml');
const ENV_FILE_PATH = '.env';

/**
 * Redacts sensitive information from configuration for safe logging
 */
export function redactSensitive(config: Partial<ResolvedConfig>): Partial<ResolvedConfig> {
  return {
    ...config,
    clientId: config.clientId ? `${config.clientId.slice(0, 4)}****` : undefined,
    clientSecret: config.clientSecret ? '****' : undefined,
  };
}

/**
 * Loads environment variables from .env file if it exists
 */
function loadDotEnv(): void {
  if (existsSync(ENV_FILE_PATH)) {
    dotenv.config({ path: ENV_FILE_PATH });
    log.debug(`Loaded environment variables from ${ENV_FILE_PATH}`);
  }
}

/**
 * Loads and validates environment variables
 */
function loadEnvironmentConfig(): EnvironmentConfig {
  const envConfig = {
    HN_CLIENT_ID: process.env.HN_CLIENT_ID,
    HN_CLIENT_SECRET: process.env.HN_CLIENT_SECRET,
    HN_BASE_URL: process.env.HN_BASE_URL,
    HN_PROFILE: process.env.HN_PROFILE,
  };

  try {
    return EnvironmentConfigSchema.parse(envConfig);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(`Invalid environment configuration: ${error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')}`);
    }
    throw error;
  }
}

/**
 * Loads configuration from YAML profile file
 */
function loadProfileConfig(): ConfigFile | null {
  if (!existsSync(CONFIG_FILE_PATH)) {
    log.debug(`Profile configuration file not found: ${CONFIG_FILE_PATH}`);
    return null;
  }

  try {
    const fileContent = readFileSync(CONFIG_FILE_PATH, 'utf-8');
    const rawConfig = yaml.parse(fileContent);
    const config = ConfigFileSchema.parse(rawConfig);
    log.debug(`Loaded profile configuration from ${CONFIG_FILE_PATH}`);
    return config;
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(`Invalid profile configuration file: ${error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')}`);
    }
    throw new Error(`Failed to load profile configuration: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Resolves the active profile name based on precedence
 */
function resolveProfileName(flags: CommandFlags, envConfig: EnvironmentConfig, profileConfig: ConfigFile | null): string {
  // Precedence: flags > env > profile file > default
  if (flags.profile) {
    return flags.profile;
  }
  
  if (envConfig.HN_PROFILE) {
    return envConfig.HN_PROFILE;
  }
  
  if (profileConfig?.defaultProfile) {
    return profileConfig.defaultProfile;
  }
  
  return DEFAULT_CONFIG.profile;
}

/**
 * Gets profile configuration by name
 */
function getProfileByName(profileName: string, profileConfig: ConfigFile | null): ProfileConfig | null {
  if (!profileConfig?.profiles) {
    return null;
  }
  
  return profileConfig.profiles[profileName] || null;
}

/**
 * Loads and resolves complete configuration with precedence handling
 */
export async function loadConfig(flags: CommandFlags = {}): Promise<ResolvedConfig> {
  try {
    // Step 1: Load .env file
    loadDotEnv();

    // Step 2: Load environment variables
    const envConfig = loadEnvironmentConfig();

    // Step 3: Load profile configuration
    const profileConfig = loadProfileConfig();

    // Step 4: Resolve active profile name
    const activeProfileName = resolveProfileName(flags, envConfig, profileConfig);

    // Step 5: Get profile-specific configuration
    const profileData = getProfileByName(activeProfileName, profileConfig);

    // Step 6: Resolve configuration with precedence (flags > env > profile > defaults)
    const resolvedConfig = {
      clientId: flags.baseUrl ? '' : (envConfig.HN_CLIENT_ID || profileData?.clientId || ''),
      clientSecret: flags.baseUrl ? '' : (envConfig.HN_CLIENT_SECRET || profileData?.clientSecret || ''),
      baseUrl: flags.baseUrl || envConfig.HN_BASE_URL || profileData?.baseUrl || DEFAULT_CONFIG.baseUrl,
      profile: activeProfileName,
    };

    // Step 7: Validate required credentials (unless using custom base URL)
    if (!flags.baseUrl && (!resolvedConfig.clientId || !resolvedConfig.clientSecret)) {
      const missingFields = [];
      if (!resolvedConfig.clientId) missingFields.push('client ID');
      if (!resolvedConfig.clientSecret) missingFields.push('client secret');
      
      throw new Error(
        `Missing required configuration: ${missingFields.join(' and ')}. ` +
        'Please set HN_CLIENT_ID and HN_CLIENT_SECRET environment variables, ' +
        'configure them in ~/.hypernative/config.yaml, or use --base-url for custom endpoints.'
      );
    }

    log.debug('Configuration resolved successfully', redactSensitive(resolvedConfig));
    return resolvedConfig;

  } catch (error) {
    if (error instanceof Error) {
      throw error; // Re-throw with original message
    }
    throw new Error(`Configuration loading failed: ${String(error)}`);
  }
}

/**
 * Gets configuration debug information with redacted secrets
 */
export async function getConfigDebugInfo(flags: CommandFlags = {}): Promise<ConfigDebugInfo> {
  try {
    // Load configuration without throwing on missing credentials
    loadDotEnv();
    const envConfig = loadEnvironmentConfig();
    const profileConfig = loadProfileConfig();
    const activeProfileName = resolveProfileName(flags, envConfig, profileConfig);
    const profileData = getProfileByName(activeProfileName, profileConfig);

    const config = {
      clientId: flags.baseUrl ? '' : (envConfig.HN_CLIENT_ID || profileData?.clientId || ''),
      clientSecret: flags.baseUrl ? '' : (envConfig.HN_CLIENT_SECRET || profileData?.clientSecret || ''),
      baseUrl: flags.baseUrl || envConfig.HN_BASE_URL || profileData?.baseUrl || DEFAULT_CONFIG.baseUrl,
      profile: activeProfileName,
    };

    return {
      profile: config.profile,
      baseUrl: config.baseUrl,
      clientId: config.clientId ? `${config.clientId.slice(0, 4)}****` : '(not set)',
      clientSecret: config.clientSecret ? '****' : '(not set)',
      configSources: {
        profileFile: existsSync(CONFIG_FILE_PATH) ? CONFIG_FILE_PATH : undefined,
        envFile: existsSync(ENV_FILE_PATH) ? ENV_FILE_PATH : undefined,
        flags: !!(flags.profile || flags.baseUrl),
        environment: !!(envConfig.HN_CLIENT_ID || envConfig.HN_CLIENT_SECRET || envConfig.HN_BASE_URL || envConfig.HN_PROFILE),
      },
    };
  } catch (error) {
    throw new Error(`Failed to get debug info: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Example configuration file generator
 */
export function generateExampleConfig(): string {
  return `# Hypernative CLI Configuration
# This file is located at ~/.hypernative/config.yaml

# Default profile to use when none specified
defaultProfile: default

# Profile configurations
profiles:
  default:
    name: "Default Profile"
    baseUrl: "https://api.hypernative.xyz"
    # clientId: "your-client-id"
    # clientSecret: "your-client-secret"
  
  staging:
    name: "Staging Environment"
    baseUrl: "https://staging-api.hypernative.xyz"
    # clientId: "staging-client-id"
    # clientSecret: "staging-client-secret"
  
  local:
    name: "Local Development"
    baseUrl: "http://localhost:3000"
    # clientId: "local-client-id" 
    # clientSecret: "local-client-secret"

# Note: It's recommended to use environment variables for sensitive credentials:
# HN_CLIENT_ID and HN_CLIENT_SECRET instead of storing them in this file.
`;
}