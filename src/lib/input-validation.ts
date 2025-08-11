/**
 * Input validation with configurable limits
 *
 * This module provides validation functions that respect the validation_limits
 * configured in the global configuration.
 */

import type { ParsedConfig } from '../schemas/config.schema.js';

export interface ValidationLimits {
  max_file_size: number;
  max_assets_per_watchlist: number;
  max_resources_total: number;
  max_name_length: number;
  max_description_length: number;
  max_agent_code_length: number;
}

export interface ValidationError {
  field: string;
  message: string;
  limit: number;
  actual: number;
}

export class InputValidator {
  private limits: ValidationLimits;

  constructor(config?: ParsedConfig) {
    // Extract limits from config or use defaults
    const configLimits = config?.global?.defaults?.validation_limits;

    this.limits = {
      max_file_size: configLimits?.max_file_size ?? 10 * 1024 * 1024, // 10MB
      max_assets_per_watchlist: configLimits?.max_assets_per_watchlist ?? 1000,
      max_resources_total: configLimits?.max_resources_total ?? 100,
      max_name_length: configLimits?.max_name_length ?? 100,
      max_description_length: configLimits?.max_description_length ?? 1000,
      max_agent_code_length: configLimits?.max_agent_code_length ?? 50000,
    };
  }

  /**
   * Validate file size
   */
  validateFileSize(fileSizeBytes: number, fieldName = 'file'): ValidationError | null {
    if (fileSizeBytes > this.limits.max_file_size) {
      return {
        field: fieldName,
        message: `File size exceeds maximum limit of ${this.formatFileSize(this.limits.max_file_size)}`,
        limit: this.limits.max_file_size,
        actual: fileSizeBytes,
      };
    }
    return null;
  }

  /**
   * Validate string length
   */
  validateStringLength(
    value: string,
    fieldName: string,
    maxLength: number
  ): ValidationError | null {
    if (value.length > maxLength) {
      return {
        field: fieldName,
        message: `${fieldName} exceeds maximum length of ${maxLength} characters`,
        limit: maxLength,
        actual: value.length,
      };
    }
    return null;
  }

  /**
   * Validate resource name
   */
  validateResourceName(name: string): ValidationError | null {
    return this.validateStringLength(name, 'name', this.limits.max_name_length);
  }

  /**
   * Validate description
   */
  validateDescription(description: string): ValidationError | null {
    return this.validateStringLength(
      description,
      'description',
      this.limits.max_description_length
    );
  }

  /**
   * Validate custom agent code
   */
  validateAgentCode(code: string): ValidationError | null {
    return this.validateStringLength(code, 'code', this.limits.max_agent_code_length);
  }

  /**
   * Validate watchlist assets count
   */
  validateWatchlistAssets(assets: any[]): ValidationError | null {
    if (assets.length > this.limits.max_assets_per_watchlist) {
      return {
        field: 'assets',
        message: `Watchlist contains ${assets.length} assets, which exceeds the maximum limit of ${this.limits.max_assets_per_watchlist}`,
        limit: this.limits.max_assets_per_watchlist,
        actual: assets.length,
      };
    }
    return null;
  }

  /**
   * Validate total resource count
   */
  validateTotalResources(config: ParsedConfig): ValidationError | null {
    const totalResources =
      Object.keys(config.notification_channels).length +
      Object.keys(config.watchlists).length +
      Object.keys(config.custom_agents).length;

    if (totalResources > this.limits.max_resources_total) {
      return {
        field: 'resources',
        message: `Configuration contains ${totalResources} resources, which exceeds the maximum limit of ${this.limits.max_resources_total}`,
        limit: this.limits.max_resources_total,
        actual: totalResources,
      };
    }
    return null;
  }

  /**
   * Validate entire configuration against all limits
   */
  validateConfiguration(config: ParsedConfig): ValidationError[] {
    const errors: ValidationError[] = [];

    // Check total resource count
    const totalResourceError = this.validateTotalResources(config);
    if (totalResourceError) {
      errors.push(totalResourceError);
    }

    // Validate watchlists
    for (const [name, watchlist] of Object.entries(config.watchlists)) {
      const nameError = this.validateResourceName(name);
      if (nameError) {
        nameError.field = `watchlist.${name}.name`;
        errors.push(nameError);
      }

      if (watchlist.description) {
        const descError = this.validateDescription(watchlist.description);
        if (descError) {
          descError.field = `watchlist.${name}.description`;
          errors.push(descError);
        }
      }

      if (watchlist.assets) {
        const assetsError = this.validateWatchlistAssets(watchlist.assets);
        if (assetsError) {
          assetsError.field = `watchlist.${name}.assets`;
          errors.push(assetsError);
        }
      }
    }

    // Validate custom agents
    for (const [name, agent] of Object.entries(config.custom_agents)) {
      const nameError = this.validateResourceName(name);
      if (nameError) {
        nameError.field = `custom_agent.${name}.name`;
        errors.push(nameError);
      }

      if (agent.description) {
        const descError = this.validateDescription(agent.description);
        if (descError) {
          descError.field = `custom_agent.${name}.description`;
          errors.push(descError);
        }
      }

      if (agent.code) {
        const codeError = this.validateAgentCode(agent.code);
        if (codeError) {
          codeError.field = `custom_agent.${name}.code`;
          errors.push(codeError);
        }
      }
    }

    // Validate notification channels
    for (const [name, channel] of Object.entries(config.notification_channels)) {
      const nameError = this.validateResourceName(name);
      if (nameError) {
        nameError.field = `notification_channel.${name}.name`;
        errors.push(nameError);
      }

      if (channel.description) {
        const descError = this.validateDescription(channel.description);
        if (descError) {
          descError.field = `notification_channel.${name}.description`;
          errors.push(descError);
        }
      }
    }

    return errors;
  }

  /**
   * Get current validation limits
   */
  getLimits(): ValidationLimits {
    return { ...this.limits };
  }

  /**
   * Format file size in human-readable format
   */
  private formatFileSize(bytes: number): string {
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;

    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }

    return `${Math.round(size * 100) / 100} ${units[unitIndex]}`;
  }
}

/**
 * Create input validator from configuration
 */
export function createInputValidator(config?: ParsedConfig): InputValidator {
  return new InputValidator(config);
}

/**
 * Validate configuration and throw error if invalid
 */
export function validateConfigurationOrThrow(config: ParsedConfig): void {
  const validator = createInputValidator(config);
  const errors = validator.validateConfiguration(config);

  if (errors.length > 0) {
    const errorMessages = errors.map((error) => `${error.field}: ${error.message}`);
    throw new Error(`Configuration validation failed:\n  - ${errorMessages.join('\n  - ')}`);
  }
}
