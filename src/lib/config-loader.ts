import { readFileSync, existsSync, statSync } from 'fs';
import { join, dirname, resolve, relative, basename, extname } from 'path';
import { parseDocument, parseAllDocuments, YAMLParseError, LineCounter } from 'yaml';
import glob from 'fast-glob';
import { z } from 'zod';

import {
  rootConfigSchema,
  parsedConfigSchema,
  createEmptyParsedConfig,
  type RootConfig,
  type ParsedConfig,
  type ConfigLoadResult,
  type ConfigValidationError,
  type CrossReferenceValidation,
} from '../schemas/config.schema.js';
import { completeNotificationChannelSchema } from '../schemas/notification-channel.schema.js';
import { watchlistSchema } from '../schemas/watchlist.schema.js';
import { customAgentSchema } from '../schemas/custom-agent.schema.js';

// Configuration loader options
export interface ConfigLoaderOptions {
  baseDir?: string;
  strict?: boolean;
  validateReferences?: boolean;
  interpolateEnv?: boolean;
  maxDepth?: number;
}

// YAML parsing result with line/column information
interface ParsedYamlWithMeta {
  data: any;
  filePath: string;
  lineCounter?: LineCounter;
}

// Resource reference information
interface ResourceReference {
  resourceType: string;
  resourceName: string;
  referencedType: string;
  referencedName: string;
  filePath: string;
  lineNumber?: number;
}

export class ConfigLoader {
  private options: Required<ConfigLoaderOptions>;
  private loadedFiles: string[] = [];
  private validationErrors: ConfigValidationError[] = [];
  private resourceReferences: ResourceReference[] = [];
  
  constructor(options: ConfigLoaderOptions = {}) {
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
  async loadConfig(): Promise<ConfigLoadResult> {
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
    } catch (error) {
      if (error instanceof ConfigurationValidationError) {
        throw error;
      }
      
      throw new Error(`Failed to load configuration: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Load notification channels from the notification-channels directory
   */
  private async loadNotificationChannels(config: ParsedConfig): Promise<void> {
    const channelsDir = join(this.options.baseDir, 'hypernative', 'notification-channels');
    
    if (!existsSync(channelsDir)) {
      return; // Optional directory
    }

    const channelFiles = await glob('*.{yml,yaml}', { cwd: channelsDir, absolute: true });
    
    for (const filePath of channelFiles) {
      try {
        const parsedYaml = this.parseYamlFile(filePath);
        const channels = this.parseMultiDocumentYaml(parsedYaml);
        
        for (const channelData of channels) {
          const logicalName = this.getLogicalName(filePath, channelData.name);
          
          if (this.options.interpolateEnv) {
            this.interpolateEnvironmentVariables(channelData);
          }
          
          const validationResult = completeNotificationChannelSchema.safeParse(channelData);
          
          if (!validationResult.success) {
            this.addValidationError(filePath, 'notification_channel', logicalName, validationResult.error);
          } else {
            config.notification_channels[logicalName] = validationResult.data;
          }
        }
        
        this.loadedFiles.push(filePath);
      } catch (error) {
        this.addFileError(filePath, error);
      }
    }
  }

  /**
   * Load watchlists from the watchlists directory
   */
  private async loadWatchlists(config: ParsedConfig): Promise<void> {
    const watchlistsDir = join(this.options.baseDir, 'hypernative', 'watchlists');
    
    if (!existsSync(watchlistsDir)) {
      return; // Optional directory
    }

    const watchlistFiles = await glob('*.{yml,yaml}', { cwd: watchlistsDir, absolute: true });
    
    for (const filePath of watchlistFiles) {
      try {
        const parsedYaml = this.parseYamlFile(filePath);
        const watchlistData = parsedYaml.data;
        
        if (this.options.interpolateEnv) {
          this.interpolateEnvironmentVariables(watchlistData);
        }
        
        const logicalName = this.getLogicalName(filePath, watchlistData.name);
        const validationResult = watchlistSchema.safeParse(watchlistData);
        
        if (!validationResult.success) {
          this.addValidationError(filePath, 'watchlist', logicalName, validationResult.error);
        } else {
          // Collect notification channel references
          this.collectReferences(
            'watchlist', 
            logicalName, 
            'notification_channel',
            watchlistData.alert_config?.notification_channels || [],
            filePath
          );
          
          config.watchlists[logicalName] = validationResult.data;
        }
        
        this.loadedFiles.push(filePath);
      } catch (error) {
        this.addFileError(filePath, error);
      }
    }
  }

  /**
   * Load custom agents from the custom-agents directory
   */
  private async loadCustomAgents(config: ParsedConfig): Promise<void> {
    const agentsDir = join(this.options.baseDir, 'hypernative', 'custom-agents');
    
    if (!existsSync(agentsDir)) {
      return; // Optional directory
    }

    const agentFiles = await glob('*.{yml,yaml}', { cwd: agentsDir, absolute: true });
    
    for (const filePath of agentFiles) {
      try {
        const parsedYaml = this.parseYamlFile(filePath);
        const agentData = parsedYaml.data;
        
        if (this.options.interpolateEnv) {
          this.interpolateEnvironmentVariables(agentData);
        }
        
        const logicalName = this.getLogicalName(filePath, agentData.name);
        const validationResult = customAgentSchema.safeParse(agentData);
        
        if (!validationResult.success) {
          this.addValidationError(filePath, 'custom_agent', logicalName, validationResult.error);
        } else {
          // Collect notification channel references
          this.collectReferences(
            'custom_agent',
            logicalName,
            'notification_channel', 
            agentData.notification_channels || [],
            filePath
          );
          
          config.custom_agents[logicalName] = validationResult.data;
        }
        
        this.loadedFiles.push(filePath);
      } catch (error) {
        this.addFileError(filePath, error);
      }
    }
  }

  /**
   * Load global configuration if present
   */
  private async loadGlobalConfig(config: ParsedConfig): Promise<void> {
    const globalConfigPaths = [
      join(this.options.baseDir, 'hypernative', 'config.yml'),
      join(this.options.baseDir, 'hypernative', 'config.yaml'),
      join(this.options.baseDir, 'hypernative.yml'),
      join(this.options.baseDir, 'hypernative.yaml'),
    ];
    
    for (const configPath of globalConfigPaths) {
      if (existsSync(configPath)) {
        try {
          const parsedYaml = this.parseYamlFile(configPath);
          
          if (this.options.interpolateEnv) {
            this.interpolateEnvironmentVariables(parsedYaml.data);
          }
          
          const validationResult = rootConfigSchema.safeParse(parsedYaml.data);
          
          if (!validationResult.success) {
            this.addValidationError(configPath, 'global_config', 'global', validationResult.error);
          } else {
            // Merge global configuration
            config.global = validationResult.data.global;
          }
          
          this.loadedFiles.push(configPath);
          break; // Use first found config file
        } catch (error) {
          this.addFileError(configPath, error);
        }
      }
    }
  }

  /**
   * Parse a YAML file with error handling and metadata
   */
  private parseYamlFile(filePath: string): ParsedYamlWithMeta {
    try {
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
    } catch (error) {
      if (error instanceof YAMLParseError) {
        throw new Error(`YAML parse error in ${filePath} at line ${error.linePos?.[0].line}: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * Parse multi-document YAML (for notification channels that may have multiple entries)
   */
  private parseMultiDocumentYaml(parsedYaml: ParsedYamlWithMeta): any[] {
    const { filePath } = parsedYaml;
    const content = readFileSync(filePath, 'utf-8');
    
    if (content.includes('\n---')) {
      // Multi-document YAML
      try {
        const docs = parseAllDocuments(content);
        return docs.map(doc => doc.toJS()).filter(data => data != null);
      } catch (error) {
        if (error instanceof YAMLParseError) {
          throw new Error(`YAML parse error in ${filePath}: ${error.message}`);
        }
        throw error;
      }
    } else {
      // Single document
      return [parsedYaml.data];
    }
  }

  /**
   * Generate a logical name for a resource based on filename and resource name
   */
  private getLogicalName(filePath: string, resourceName?: string): string {
    const baseNameWithoutExt = basename(filePath, extname(filePath));
    
    if (resourceName) {
      // Use resource name if provided, but prefix with filename if different
      const normalizedResourceName = resourceName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const normalizedBasename = baseNameWithoutExt.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      
      if (normalizedResourceName === normalizedBasename || baseNameWithoutExt.startsWith('example')) {
        return normalizedResourceName;
      }
      
      return `${normalizedBasename}-${normalizedResourceName}`;
    }
    
    return baseNameWithoutExt.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  }

  /**
   * Interpolate environment variables in configuration data
   */
  private interpolateEnvironmentVariables(data: any): void {
    if (typeof data === 'string') {
      // Replace ${VAR_NAME} with environment variable value
      data = data.replace(/\$\{([^}]+)\}/g, (match, varName) => {
        const value = process.env[varName];
        if (value === undefined) {
          throw new Error(`Environment variable ${varName} is not defined`);
        }
        return value;
      });
      return data;
    }
    
    if (Array.isArray(data)) {
      data.forEach((item, index) => {
        data[index] = this.interpolateEnvironmentVariables(item);
      });
    } else if (data && typeof data === 'object') {
      Object.keys(data).forEach(key => {
        data[key] = this.interpolateEnvironmentVariables(data[key]);
      });
    }
  }

  /**
   * Collect resource references for validation
   */
  private collectReferences(
    resourceType: string,
    resourceName: string,
    referencedType: string,
    references: string[],
    filePath: string
  ): void {
    references.forEach(referencedName => {
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
  private validateCrossReferences(config: ParsedConfig): CrossReferenceValidation {
    const missingReferences: any[] = [];
    const circularReferences: any[] = [];
    
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
        
        this.addValidationError(
          ref.filePath,
          ref.resourceType,
          ref.resourceName,
          new Error(`Referenced ${referencedType} '${referencedName}' not found`)
        );
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
  private resourceExists(config: ParsedConfig, resourceType: string, resourceName: string): boolean {
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
  private addValidationError(
    filePath: string,
    resourceType: string,
    resourceName: string,
    error: z.ZodError | Error
  ): void {
    if (error instanceof z.ZodError) {
      error.issues.forEach(issue => {
        this.validationErrors.push({
          file_path: relative(this.options.baseDir, filePath),
          resource_type: resourceType,
          resource_name: resourceName,
          error_code: issue.code,
          message: `${issue.path.join('.')}: ${issue.message}`,
          details: { path: issue.path },
        });
      });
    } else {
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
  private addFileError(filePath: string, error: unknown): void {
    this.validationErrors.push({
      file_path: relative(this.options.baseDir, filePath),
      error_code: 'FILE_ERROR',
      message: error instanceof Error ? error.message : String(error),
    });
  }

  /**
   * Get total resource count
   */
  private getTotalResourceCount(config: ParsedConfig): number {
    return (
      Object.keys(config.notification_channels).length +
      Object.keys(config.watchlists).length +
      Object.keys(config.custom_agents).length
    );
  }
}

/**
 * Custom error class for configuration validation errors
 */
export class ConfigurationValidationError extends Error {
  constructor(public errors: ConfigValidationError[]) {
    const errorCount = errors.length;
    const summary = `Configuration validation failed with ${errorCount} error${errorCount !== 1 ? 's' : ''}`;
    
    const errorMessages = errors.map(error => {
      const location = error.line_number ? `${error.file_path}:${error.line_number}` : error.file_path;
      const resource = error.resource_name ? ` (${error.resource_type}: ${error.resource_name})` : '';
      return `  ${location}${resource}: ${error.message}`;
    });
    
    super(`${summary}:\n${errorMessages.join('\n')}`);
    this.name = 'ConfigurationValidationError';
  }
}

/**
 * Convenience function to load configuration
 */
export async function loadHypernativeConfig(
  baseDir?: string,
  options?: Omit<ConfigLoaderOptions, 'baseDir'>
): Promise<ConfigLoadResult> {
  const loader = new ConfigLoader({ baseDir, ...options });
  return loader.loadConfig();
}