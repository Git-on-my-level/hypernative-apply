/**
 * Channel Resolver Utility
 *
 * Resolves notification channel logical names to their API IDs
 * Used during planning phase to validate channel references and during
 * execution to convert logical names to actual API channel IDs.
 */

import { log } from './logger.js';
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

export class ChannelResolver {
  private apiClient: ApiClient;
  private channelCache: Map<string, NotificationChannel>;
  private cacheExpiry: number;
  private lastCacheUpdate: number;

  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
    this.channelCache = new Map();
    this.cacheExpiry = 5 * 60 * 1000; // 5 minutes
    this.lastCacheUpdate = 0;
  }

  /**
   * Resolve logical channel names to API IDs
   */
  async resolveChannels(channelNames: string[]): Promise<ChannelResolutionResult> {
    if (channelNames.length === 0) {
      return { resolved: {}, failed: [], errors: {} };
    }

    log.debug(`Resolving ${channelNames.length} notification channels`);

    try {
      // Ensure we have fresh channel data
      await this.refreshChannelCache();

      const resolved: Record<string, string> = {};
      const failed: string[] = [];
      const errors: Record<string, string> = {};

      for (const logicalName of channelNames) {
        const channel = this.findChannelByLogicalName(logicalName);

        if (channel) {
          resolved[logicalName] = channel.id;
          log.debug(`Resolved channel '${logicalName}' to ID '${channel.id}'`);
        } else {
          failed.push(logicalName);
          errors[logicalName] = `Notification channel '${logicalName}' not found`;
          log.warn(`Failed to resolve channel '${logicalName}'`);
        }
      }

      if (failed.length > 0) {
        log.warn(`Failed to resolve ${failed.length} channels: ${failed.join(', ')}`);
      }

      return { resolved, failed, errors };
    } catch (error) {
      log.error('Failed to resolve notification channels:', error);

      // Return all as failed if we couldn't fetch channel data
      const failed = [...channelNames];
      const errors: Record<string, string> = {};
      for (const name of channelNames) {
        errors[name] = `Failed to fetch channel data: ${error}`;
      }

      return { resolved: {}, failed, errors };
    }
  }

  /**
   * Validate that all referenced channels exist
   */
  async validateChannels(channelNames: string[]): Promise<{
    valid: boolean;
    errors: string[];
  }> {
    const result = await this.resolveChannels(channelNames);

    return {
      valid: result.failed.length === 0,
      errors: result.failed.map((name) => result.errors[name] || `Channel '${name}' not found`),
    };
  }

  /**
   * Get all available channels (for validation/suggestions)
   */
  async getAvailableChannels(): Promise<NotificationChannel[]> {
    await this.refreshChannelCache();
    return Array.from(this.channelCache.values());
  }

  /**
   * Refresh the internal channel cache
   */
  private async refreshChannelCache(): Promise<void> {
    const now = Date.now();

    // Skip refresh if cache is still valid
    if (now - this.lastCacheUpdate < this.cacheExpiry && this.channelCache.size > 0) {
      return;
    }

    try {
      log.debug('Refreshing notification channel cache');

      const response = await this.apiClient.get('/notification-channels', {
        params: { limit: 200 }, // Get up to 200 channels
      });

      this.channelCache.clear();
      const channels: NotificationChannel[] = response.data || [];

      for (const channel of channels) {
        this.channelCache.set(channel.name, channel);
      }

      this.lastCacheUpdate = now;
      log.debug(`Cached ${channels.length} notification channels`);
    } catch (error) {
      log.error('Failed to refresh notification channel cache:', error);
      throw new Error(`Failed to fetch notification channels: ${error}`);
    }
  }

  /**
   * Find channel by logical name (case-insensitive)
   */
  private findChannelByLogicalName(logicalName: string): NotificationChannel | undefined {
    // First try exact match
    let channel = this.channelCache.get(logicalName);
    if (channel) {
      return channel;
    }

    // Try case-insensitive match
    const lowerName = logicalName.toLowerCase();
    for (const [name, channelData] of this.channelCache.entries()) {
      if (name.toLowerCase() === lowerName) {
        return channelData;
      }
    }

    return undefined;
  }

  /**
   * Clear the channel cache (useful for testing or forced refresh)
   */
  clearCache(): void {
    this.channelCache.clear();
    this.lastCacheUpdate = 0;
  }

  /**
   * Force refresh the channel cache immediately
   * This is useful when channels are created/updated/deleted during execution
   * and we need to ensure the cache reflects the latest state
   */
  async forceRefresh(): Promise<void> {
    // Clear the cache and reset timestamp to force a refresh
    this.channelCache.clear();
    this.lastCacheUpdate = 0;

    // Immediately refresh the cache
    await this.refreshChannelCache();
  }

  /**
   * Get suggestions for similar channel names (for better error messages)
   */
  getSuggestions(invalidName: string): string[] {
    const suggestions: string[] = [];
    const lowerInvalid = invalidName.toLowerCase();

    for (const [name] of this.channelCache.entries()) {
      const lowerName = name.toLowerCase();

      // Simple similarity check: contains substring or similar
      if (lowerName.includes(lowerInvalid) || lowerInvalid.includes(lowerName)) {
        suggestions.push(name);
      }
    }

    return suggestions.slice(0, 3); // Return up to 3 suggestions
  }

  /**
   * Generate actionable error message for channel resolution failures
   */
  generateErrorMessage(result: ChannelResolutionResult): string {
    if (result.failed.length === 0) {
      return '';
    }

    const messages: string[] = [];

    for (const failedChannel of result.failed) {
      const suggestions = this.getSuggestions(failedChannel);
      let message = `Notification channel '${failedChannel}' not found`;

      if (suggestions.length > 0) {
        message += `. Did you mean: ${suggestions.join(', ')}?`;
      }

      messages.push(message);
    }

    return messages.join('\n');
  }
}

/**
 * Convenience function to create a channel resolver
 */
export function createChannelResolver(apiClient: ApiClient): ChannelResolver {
  return new ChannelResolver(apiClient);
}
