import { type ConfigLoadResult, type ConfigValidationError } from '../schemas/config.schema.js';
export interface ConfigLoaderOptions {
    baseDir?: string;
    strict?: boolean;
    validateReferences?: boolean;
    interpolateEnv?: boolean;
    maxDepth?: number;
}
export declare class ConfigLoader {
    private options;
    private loadedFiles;
    private validationErrors;
    private resourceReferences;
    constructor(options?: ConfigLoaderOptions);
    /**
     * Load and validate all configuration files from the hypernative directory
     */
    loadConfig(): Promise<ConfigLoadResult>;
    /**
     * Load notification channels from the notification-channels directory
     */
    private loadNotificationChannels;
    /**
     * Load watchlists from the watchlists directory
     */
    private loadWatchlists;
    /**
     * Load custom agents from the custom-agents directory
     */
    private loadCustomAgents;
    /**
     * Load global configuration if present
     */
    private loadGlobalConfig;
    /**
     * Parse a YAML file with error handling and metadata
     */
    private parseYamlFile;
    /**
     * Parse multi-document YAML (for notification channels that may have multiple entries)
     */
    private parseMultiDocumentYaml;
    /**
     * Generate a logical name for a resource based on filename and resource name
     */
    private getLogicalName;
    /**
     * Interpolate environment variables in configuration data
     */
    private interpolateEnvironmentVariables;
    /**
     * Collect resource references for validation
     */
    private collectReferences;
    /**
     * Validate cross-references between resources
     */
    private validateCrossReferences;
    /**
     * Check if a resource exists in the configuration
     */
    private resourceExists;
    /**
     * Add a validation error with file context
     */
    private addValidationError;
    /**
     * Add a file-level error
     */
    private addFileError;
    /**
     * Validate input limits and constraints
     */
    private validateInputLimits;
    /**
     * Find the file that contains a specific resource (approximation based on loaded files)
     */
    private findFileForResource;
    /**
     * Get total resource count
     */
    private getTotalResourceCount;
}
/**
 * Custom error class for configuration validation errors
 */
export declare class ConfigurationValidationError extends Error {
    errors: ConfigValidationError[];
    constructor(errors: ConfigValidationError[]);
}
/**
 * Convenience function to load configuration
 */
export declare function loadHypernativeConfig(baseDir?: string, options?: Omit<ConfigLoaderOptions, 'baseDir'>): Promise<ConfigLoadResult>;
//# sourceMappingURL=config-loader.d.ts.map