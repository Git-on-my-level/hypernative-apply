import { readFileSync, existsSync } from 'fs';
import { join, relative, basename, extname } from 'path';
import { parseDocument, parseAllDocuments, YAMLParseError, LineCounter } from 'yaml';
import glob from 'fast-glob';
import { z } from 'zod';
import { validateConfigPath } from './path-security.js';
import { createInputValidator } from './input-validation.js';
import { globalOnlyConfigSchema, createEmptyParsedConfig, } from '../schemas/config.schema.js';
import { completeNotificationChannelSchema } from '../schemas/notification-channel.schema.js';
import { watchlistSchema } from '../schemas/watchlist.schema.js';
import { customAgentSchema } from '../schemas/custom-agent.schema.js';
export class ConfigLoader {
    options;
    loadedFiles = [];
    validationErrors = [];
    resourceReferences = [];
    constructor(options = {}) {
        this.options = {
            baseDir: options.baseDir || process.cwd(),
            strict: options.strict ?? true,
            validateReferences: options.validateReferences ?? true,
            interpolateEnv: options.interpolateEnv ?? true,
            maxDepth: options.maxDepth ?? 10,
        };
    }
    /**
     * Load and validate all configuration files from the hypernative directory
     */
    async loadConfig() {
        const startTime = Date.now();
        const hypernativeDir = join(this.options.baseDir, 'hypernative');
        this.loadedFiles = [];
        this.validationErrors = [];
        this.resourceReferences = [];
        if (!existsSync(hypernativeDir)) {
            throw new Error(`Hypernative configuration directory not found: ${hypernativeDir}`);
        }
        const config = createEmptyParsedConfig();
        try {
            // Load notification channels first (they are referenced by other resources)
            await this.loadNotificationChannels(config);
            // Load watchlists
            await this.loadWatchlists(config);
            // Load custom agents
            await this.loadCustomAgents(config);
            // Load global configuration if present
            await this.loadGlobalConfig(config);
            // Validate cross-references
            if (this.options.validateReferences) {
                this.validateCrossReferences(config);
            }
            // Validate input limits
            this.validateInputLimits(config);
            // Fail fast if there are validation errors
            if (this.validationErrors.length > 0) {
                throw new ConfigurationValidationError(this.validationErrors);
            }
            const loadTime = Date.now() - startTime;
            return {
                config,
                metadata: {
                    files_loaded: [...this.loadedFiles],
                    total_resources: this.getTotalResourceCount(config),
                    resource_counts: {
                        notification_channels: Object.keys(config.notification_channels).length,
                        watchlists: Object.keys(config.watchlists).length,
                        custom_agents: Object.keys(config.custom_agents).length,
                    },
                    load_time: loadTime,
                },
            };
        }
        catch (error) {
            if (error instanceof ConfigurationValidationError) {
                throw error;
            }
            throw new Error(`Failed to load configuration: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    /**
     * Load notification channels from the notification-channels directory
     */
    async loadNotificationChannels(config) {
        const channelsDir = join(this.options.baseDir, 'hypernative', 'notification-channels');
        if (!existsSync(channelsDir)) {
            return; // Optional directory
        }
        const channelFiles = await glob('*.{yml,yaml}', { cwd: channelsDir, absolute: true });
        for (const filePath of channelFiles) {
            // Validate path to prevent traversal attacks
            try {
                validateConfigPath(filePath, this.options.baseDir);
            }
            catch (error) {
                this.addFileError(filePath, error);
                continue;
            }
            try {
                const parsedYaml = this.parseYamlFile(filePath);
                const channels = this.parseMultiDocumentYaml(parsedYaml);
                for (let channelData of channels) {
                    const logicalName = this.getLogicalName(filePath, channelData.name);
                    if (this.options.interpolateEnv) {
                        channelData = this.interpolateEnvironmentVariables(channelData);
                    }
                    const validationResult = completeNotificationChannelSchema.safeParse(channelData);
                    if (!validationResult.success) {
                        this.addValidationError(filePath, 'notification_channel', logicalName, validationResult.error);
                    }
                    else {
                        config.notification_channels[logicalName] = validationResult.data;
                    }
                }
                this.loadedFiles.push(filePath);
            }
            catch (error) {
                this.addFileError(filePath, error);
            }
        }
    }
    /**
     * Load watchlists from the watchlists directory
     */
    async loadWatchlists(config) {
        const watchlistsDir = join(this.options.baseDir, 'hypernative', 'watchlists');
        if (!existsSync(watchlistsDir)) {
            return; // Optional directory
        }
        const watchlistFiles = await glob('*.{yml,yaml}', { cwd: watchlistsDir, absolute: true });
        for (const filePath of watchlistFiles) {
            // Validate path to prevent traversal attacks
            try {
                validateConfigPath(filePath, this.options.baseDir);
            }
            catch (error) {
                this.addFileError(filePath, error);
                continue;
            }
            try {
                const parsedYaml = this.parseYamlFile(filePath);
                let watchlistData = parsedYaml.data;
                if (this.options.interpolateEnv) {
                    watchlistData = this.interpolateEnvironmentVariables(watchlistData);
                }
                const logicalName = this.getLogicalName(filePath, watchlistData.name);
                const validationResult = watchlistSchema.safeParse(watchlistData);
                if (!validationResult.success) {
                    this.addValidationError(filePath, 'watchlist', logicalName, validationResult.error);
                }
                else {
                    // Collect notification channel references
                    this.collectReferences('watchlist', logicalName, 'notification_channel', watchlistData.alert_config?.notification_channels || [], filePath);
                    config.watchlists[logicalName] = validationResult.data;
                }
                this.loadedFiles.push(filePath);
            }
            catch (error) {
                this.addFileError(filePath, error);
            }
        }
    }
    /**
     * Load custom agents from the custom-agents directory
     */
    async loadCustomAgents(config) {
        const agentsDir = join(this.options.baseDir, 'hypernative', 'custom-agents');
        if (!existsSync(agentsDir)) {
            return; // Optional directory
        }
        const agentFiles = await glob('*.{yml,yaml}', { cwd: agentsDir, absolute: true });
        for (const filePath of agentFiles) {
            // Validate path to prevent traversal attacks
            try {
                validateConfigPath(filePath, this.options.baseDir);
            }
            catch (error) {
                this.addFileError(filePath, error);
                continue;
            }
            try {
                const parsedYaml = this.parseYamlFile(filePath);
                let agentData = parsedYaml.data;
                if (this.options.interpolateEnv) {
                    agentData = this.interpolateEnvironmentVariables(agentData);
                }
                const logicalName = this.getLogicalName(filePath, agentData.name);
                const validationResult = customAgentSchema.safeParse(agentData);
                if (!validationResult.success) {
                    this.addValidationError(filePath, 'custom_agent', logicalName, validationResult.error);
                }
                else {
                    // Collect notification channel references
                    this.collectReferences('custom_agent', logicalName, 'notification_channel', agentData.notification_channels || [], filePath);
                    config.custom_agents[logicalName] = validationResult.data;
                }
                this.loadedFiles.push(filePath);
            }
            catch (error) {
                this.addFileError(filePath, error);
            }
        }
    }
    /**
     * Load global configuration if present
     */
    async loadGlobalConfig(config) {
        const globalConfigPaths = [
            join(this.options.baseDir, 'hypernative', 'config.yml'),
            join(this.options.baseDir, 'hypernative', 'config.yaml'),
            join(this.options.baseDir, 'hypernative.yml'),
            join(this.options.baseDir, 'hypernative.yaml'),
        ];
        for (const configPath of globalConfigPaths) {
            if (existsSync(configPath)) {
                // Validate path to prevent traversal attacks
                try {
                    validateConfigPath(configPath, this.options.baseDir);
                }
                catch (error) {
                    this.addFileError(configPath, error);
                    continue;
                }
                try {
                    const parsedYaml = this.parseYamlFile(configPath);
                    if (this.options.interpolateEnv) {
                        parsedYaml.data = this.interpolateEnvironmentVariables(parsedYaml.data);
                    }
                    const validationResult = globalOnlyConfigSchema.safeParse(parsedYaml.data);
                    if (!validationResult.success) {
                        this.addValidationError(configPath, 'global_config', 'global', validationResult.error);
                    }
                    else {
                        // Merge global configuration
                        config.global = validationResult.data.global;
                    }
                    this.loadedFiles.push(configPath);
                    break; // Use first found config file
                }
                catch (error) {
                    this.addFileError(configPath, error);
                }
            }
        }
    }
    /**
     * Parse a YAML file with error handling and metadata
     */
    parseYamlFile(filePath) {
        try {
            // Additional path validation at the lowest level
            validateConfigPath(filePath, this.options.baseDir);
            const content = readFileSync(filePath, 'utf-8');
            const lineCounter = new LineCounter();
            // For single document YAML
            const doc = parseDocument(content, { lineCounter });
            const data = doc.toJS();
            return {
                data,
                filePath,
                lineCounter,
            };
        }
        catch (error) {
            if (error instanceof YAMLParseError) {
                throw new Error(`YAML parse error in ${filePath} at line ${error.linePos?.[0].line}: ${error.message}`);
            }
            throw error;
        }
    }
    /**
     * Parse multi-document YAML (for notification channels that may have multiple entries)
     */
    parseMultiDocumentYaml(parsedYaml) {
        const { filePath } = parsedYaml;
        const content = readFileSync(filePath, 'utf-8');
        if (content.includes('\n---')) {
            // Multi-document YAML
            try {
                const docs = parseAllDocuments(content);
                return docs.map((doc) => doc.toJS()).filter((data) => data != null);
            }
            catch (error) {
                if (error instanceof YAMLParseError) {
                    throw new Error(`YAML parse error in ${filePath}: ${error.message}`);
                }
                throw error;
            }
        }
        else {
            // Single document
            return [parsedYaml.data];
        }
    }
    /**
     * Generate a logical name for a resource based on filename and resource name
     */
    getLogicalName(filePath, resourceName) {
        const baseNameWithoutExt = basename(filePath, extname(filePath));
        if (resourceName) {
            // Use resource name if provided, but prefix with filename if different
            const normalizedResourceName = resourceName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            const normalizedBasename = baseNameWithoutExt.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            if (normalizedResourceName === normalizedBasename ||
                baseNameWithoutExt.startsWith('example')) {
                return normalizedResourceName;
            }
            return `${normalizedBasename}-${normalizedResourceName}`;
        }
        return baseNameWithoutExt.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    }
    /**
     * Interpolate environment variables in configuration data
     */
    interpolateEnvironmentVariables(data) {
        if (typeof data === 'string') {
            // Replace ${VAR_NAME} with environment variable value
            return data.replace(/\$\{([^}]+)\}/g, (match, varName) => {
                const value = process.env[varName];
                if (value === undefined) {
                    throw new Error(`Environment variable ${varName} is not defined`);
                }
                return value;
            });
        }
        if (Array.isArray(data)) {
            data.forEach((item, index) => {
                data[index] = this.interpolateEnvironmentVariables(item);
            });
            return data;
        }
        else if (data && typeof data === 'object') {
            Object.keys(data).forEach((key) => {
                data[key] = this.interpolateEnvironmentVariables(data[key]);
            });
            return data;
        }
        return data;
    }
    /**
     * Collect resource references for validation
     */
    collectReferences(resourceType, resourceName, referencedType, references, filePath) {
        references.forEach((referencedName) => {
            this.resourceReferences.push({
                resourceType,
                resourceName,
                referencedType,
                referencedName,
                filePath,
            });
        });
    }
    /**
     * Validate cross-references between resources
     */
    validateCrossReferences(config) {
        const missingReferences = [];
        const circularReferences = [];
        for (const ref of this.resourceReferences) {
            const { referencedType, referencedName } = ref;
            // Check if referenced resource exists
            const resourceExists = this.resourceExists(config, referencedType, referencedName);
            if (!resourceExists) {
                missingReferences.push({
                    resource_type: ref.resourceType,
                    resource_name: ref.resourceName,
                    reference_type: referencedType,
                    reference_name: referencedName,
                    file_path: ref.filePath,
                });
                this.addValidationError(ref.filePath, ref.resourceType, ref.resourceName, new Error(`Referenced ${referencedType} '${referencedName}' not found`));
            }
        }
        // TODO: Implement circular reference detection if needed
        return {
            valid: missingReferences.length === 0 && circularReferences.length === 0,
            missing_references: missingReferences.length > 0 ? missingReferences : undefined,
            circular_references: circularReferences.length > 0 ? circularReferences : undefined,
        };
    }
    /**
     * Check if a resource exists in the configuration
     */
    resourceExists(config, resourceType, resourceName) {
        switch (resourceType) {
            case 'notification_channel':
                return resourceName in config.notification_channels;
            case 'watchlist':
                return resourceName in config.watchlists;
            case 'custom_agent':
                return resourceName in config.custom_agents;
            default:
                return false;
        }
    }
    /**
     * Add a validation error with file context
     */
    addValidationError(filePath, resourceType, resourceName, error) {
        if (error instanceof z.ZodError) {
            error.issues.forEach((issue) => {
                this.validationErrors.push({
                    file_path: relative(this.options.baseDir, filePath),
                    resource_type: resourceType,
                    resource_name: resourceName,
                    error_code: issue.code,
                    message: `${issue.path.join('.')}: ${issue.message}`,
                    details: { path: issue.path },
                });
            });
        }
        else {
            this.validationErrors.push({
                file_path: relative(this.options.baseDir, filePath),
                resource_type: resourceType,
                resource_name: resourceName,
                error_code: 'VALIDATION_ERROR',
                message: error.message,
            });
        }
    }
    /**
     * Add a file-level error
     */
    addFileError(filePath, error) {
        this.validationErrors.push({
            file_path: relative(this.options.baseDir, filePath),
            error_code: 'FILE_ERROR',
            message: error instanceof Error ? error.message : String(error),
        });
    }
    /**
     * Validate input limits and constraints
     */
    validateInputLimits(config) {
        try {
            const validator = createInputValidator(config);
            const validationErrors = validator.validateConfiguration(config);
            // Convert validation errors to ConfigValidationError format
            for (const error of validationErrors) {
                // Extract file path information from field name if possible
                const fieldParts = error.field.split('.');
                const resourceType = fieldParts[0];
                const resourceName = fieldParts[1];
                // Find the file that contains this resource (approximation)
                const filePath = this.findFileForResource(resourceType, resourceName);
                this.validationErrors.push({
                    file_path: filePath || 'unknown',
                    resource_type: resourceType,
                    resource_name: resourceName,
                    error_code: 'INPUT_LIMIT_EXCEEDED',
                    message: error.message,
                    details: {
                        field: error.field,
                        limit: error.limit,
                        actual: error.actual,
                    },
                });
            }
        }
        catch (error) {
            // If input validation fails, add a general error
            this.validationErrors.push({
                file_path: 'configuration',
                error_code: 'INPUT_VALIDATION_ERROR',
                message: `Input validation failed: ${error instanceof Error ? error.message : String(error)}`,
            });
        }
    }
    /**
     * Find the file that contains a specific resource (approximation based on loaded files)
     */
    findFileForResource(resourceType, _resourceName) {
        // This is a simple approximation - in a more sophisticated implementation,
        // we would track which file each resource came from during loading
        const typeToDir = {
            notification_channel: 'notification-channels',
            watchlist: 'watchlists',
            custom_agent: 'custom-agents',
        };
        const dirName = typeToDir[resourceType];
        if (!dirName)
            return null;
        // Look for files in the loaded files list that match the pattern
        const pattern = join('hypernative', dirName);
        return this.loadedFiles.find((file) => file.includes(pattern)) || null;
    }
    /**
     * Get total resource count
     */
    getTotalResourceCount(config) {
        return (Object.keys(config.notification_channels).length +
            Object.keys(config.watchlists).length +
            Object.keys(config.custom_agents).length);
    }
}
/**
 * Custom error class for configuration validation errors
 */
export class ConfigurationValidationError extends Error {
    errors;
    constructor(errors) {
        const errorCount = errors.length;
        const summary = `Configuration validation failed with ${errorCount} error${errorCount !== 1 ? 's' : ''}`;
        const errorMessages = errors.map((error) => {
            const location = error.line_number
                ? `${error.file_path}:${error.line_number}`
                : error.file_path;
            const resource = error.resource_name
                ? ` (${error.resource_type}: ${error.resource_name})`
                : '';
            return `  ${location}${resource}: ${error.message}`;
        });
        super(`${summary}:\n${errorMessages.join('\n')}`);
        this.errors = errors;
        this.name = 'ConfigurationValidationError';
    }
}
/**
 * Convenience function to load configuration
 */
export async function loadHypernativeConfig(baseDir, options) {
    const loader = new ConfigLoader({ baseDir, ...options });
    return loader.loadConfig();
}
//# sourceMappingURL=config-loader.js.map