import { z } from 'zod';
declare const ProfileConfigSchema: z.ZodObject<{
    name: z.ZodString;
    baseUrl: z.ZodOptional<z.ZodString>;
    clientId: z.ZodOptional<z.ZodString>;
    clientSecret: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    clientSecret?: string | undefined;
    baseUrl?: string | undefined;
    clientId?: string | undefined;
}, {
    name: string;
    clientSecret?: string | undefined;
    baseUrl?: string | undefined;
    clientId?: string | undefined;
}>;
declare const ConfigFileSchema: z.ZodObject<{
    profiles: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
        name: z.ZodString;
        baseUrl: z.ZodOptional<z.ZodString>;
        clientId: z.ZodOptional<z.ZodString>;
        clientSecret: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        clientSecret?: string | undefined;
        baseUrl?: string | undefined;
        clientId?: string | undefined;
    }, {
        name: string;
        clientSecret?: string | undefined;
        baseUrl?: string | undefined;
        clientId?: string | undefined;
    }>>>;
    defaultProfile: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    profiles?: Record<string, {
        name: string;
        clientSecret?: string | undefined;
        baseUrl?: string | undefined;
        clientId?: string | undefined;
    }> | undefined;
    defaultProfile?: string | undefined;
}, {
    profiles?: Record<string, {
        name: string;
        clientSecret?: string | undefined;
        baseUrl?: string | undefined;
        clientId?: string | undefined;
    }> | undefined;
    defaultProfile?: string | undefined;
}>;
declare const EnvironmentConfigSchema: z.ZodObject<{
    HN_CLIENT_ID: z.ZodOptional<z.ZodString>;
    HN_CLIENT_SECRET: z.ZodOptional<z.ZodString>;
    HN_BASE_URL: z.ZodOptional<z.ZodString>;
    HN_PROFILE: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    HN_CLIENT_ID?: string | undefined;
    HN_CLIENT_SECRET?: string | undefined;
    HN_BASE_URL?: string | undefined;
    HN_PROFILE?: string | undefined;
}, {
    HN_CLIENT_ID?: string | undefined;
    HN_CLIENT_SECRET?: string | undefined;
    HN_BASE_URL?: string | undefined;
    HN_PROFILE?: string | undefined;
}>;
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
    clientId: string;
    clientSecret: string;
    configSources: {
        profileFile?: string;
        envFile?: string;
        flags: boolean;
        environment: boolean;
    };
}
/**
 * Redacts sensitive information from configuration for safe logging
 */
export declare function redactSensitive(config: Partial<ResolvedConfig>): Partial<ResolvedConfig>;
/**
 * Loads and resolves complete configuration with precedence handling
 */
export declare function loadConfig(flags?: CommandFlags): Promise<ResolvedConfig>;
/**
 * Gets configuration debug information with redacted secrets
 */
export declare function getConfigDebugInfo(flags?: CommandFlags): Promise<ConfigDebugInfo>;
/**
 * Example configuration file generator
 */
export declare function generateExampleConfig(): string;
export {};
//# sourceMappingURL=config.d.ts.map