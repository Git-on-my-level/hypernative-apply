/**
 * Channel Resolver Utility
 *
 * Resolves notification channel logical names to their API IDs
 * Used during planning phase to validate channel references and during
 * execution to convert logical names to actual API channel IDs.
 */
import { ApiClient } from './api-client.js';
import type { NotificationChannel } from '../types/api.js';
export interface ChannelResolutionResult {
    /** Successfully resolved channel mappings */
    resolved: Record<string, string>;
    /** Channels that failed to resolve */
    failed: string[];
    /** Error messages for failed resolutions */
    errors: Record<string, string>;
}
export declare class ChannelResolver {
    private apiClient;
    private channelCache;
    private cacheExpiry;
    private lastCacheUpdate;
    constructor(apiClient: ApiClient);
    /**
     * Resolve logical channel names to API IDs
     */
    resolveChannels(channelNames: string[]): Promise<ChannelResolutionResult>;
    /**
     * Validate that all referenced channels exist
     */
    validateChannels(channelNames: string[]): Promise<{
        valid: boolean;
        errors: string[];
    }>;
    /**
     * Get all available channels (for validation/suggestions)
     */
    getAvailableChannels(): Promise<NotificationChannel[]>;
    /**
     * Refresh the internal channel cache
     */
    private refreshChannelCache;
    /**
     * Find channel by logical name (case-insensitive)
     */
    private findChannelByLogicalName;
    /**
     * Clear the channel cache (useful for testing or forced refresh)
     */
    clearCache(): void;
    /**
     * Get suggestions for similar channel names (for better error messages)
     */
    getSuggestions(invalidName: string): string[];
    /**
     * Generate actionable error message for channel resolution failures
     */
    generateErrorMessage(result: ChannelResolutionResult): string;
}
/**
 * Convenience function to create a channel resolver
 */
export declare function createChannelResolver(apiClient: ApiClient): ChannelResolver;
//# sourceMappingURL=channel-resolver.d.ts.map