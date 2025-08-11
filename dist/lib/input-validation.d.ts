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
export declare class InputValidator {
    private limits;
    constructor(config?: ParsedConfig);
    /**
     * Validate file size
     */
    validateFileSize(fileSizeBytes: number, fieldName?: string): ValidationError | null;
    /**
     * Validate string length
     */
    validateStringLength(value: string, fieldName: string, maxLength: number): ValidationError | null;
    /**
     * Validate resource name
     */
    validateResourceName(name: string): ValidationError | null;
    /**
     * Validate description
     */
    validateDescription(description: string): ValidationError | null;
    /**
     * Validate custom agent code
     */
    validateAgentCode(code: string): ValidationError | null;
    /**
     * Validate watchlist assets count
     */
    validateWatchlistAssets(assets: any[]): ValidationError | null;
    /**
     * Validate total resource count
     */
    validateTotalResources(config: ParsedConfig): ValidationError | null;
    /**
     * Validate entire configuration against all limits
     */
    validateConfiguration(config: ParsedConfig): ValidationError[];
    /**
     * Get current validation limits
     */
    getLimits(): ValidationLimits;
    /**
     * Format file size in human-readable format
     */
    private formatFileSize;
}
/**
 * Create input validator from configuration
 */
export declare function createInputValidator(config?: ParsedConfig): InputValidator;
/**
 * Validate configuration and throw error if invalid
 */
export declare function validateConfigurationOrThrow(config: ParsedConfig): void;
//# sourceMappingURL=input-validation.d.ts.map