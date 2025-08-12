/**
 * Watchlist Provider
 *
 * Handles CRUD operations for Hypernative Watchlists including:
 * - Creating, updating, and deleting watchlists
 * - Asset reconciliation (computing add/remove sets)
 * - CSV upload with dry-run support
 * - Integration with existing state management and planning
 */

import { readFileSync, createReadStream } from 'fs';
import FormData from 'form-data';
import { parse as parseCsv } from 'csv-parse/sync';
import { log } from '../lib/logger.js';
import { unwrapApiResponse, unwrapApiListResponse } from '../lib/api-response.js';
import { ApiClient } from '../lib/api-client.js';
import { generateFingerprint } from '../lib/fingerprint.js';
import type { WatchlistConfig, AssetConfig } from '../schemas/watchlist.schema.js';
import type {
  ApiWatchlist,
  ApiWatchlistAsset,
  ApiWatchlistCreatePayload,
  ApiWatchlistUpdatePayload,
  CsvUploadResult,
  AssetReconciliationResult,
} from '../types/api.js';

export interface WatchlistProviderOptions {
  apiClient: ApiClient;
  dryRun?: boolean;
}

export interface CsvUploadOptions {
  watchlistId: string;
  csvPath: string;
  dryRun?: boolean;
  replaceAssets?: boolean;
}

export class WatchlistProvider {
  private apiClient: ApiClient;
  private dryRun: boolean;

  constructor(options: WatchlistProviderOptions) {
    this.apiClient = options.apiClient;
    this.dryRun = options.dryRun ?? false;
  }

  /**
   * List all watchlists
   */
  async list(params?: { limit?: number; offset?: number }): Promise<ApiWatchlist[]> {
    log.debug('Fetching watchlists', params);

    try {
      const response = await this.apiClient.get('/watchlists', {
        params: {
          limit: params?.limit ?? 50,
          offset: params?.offset ?? 0,
        },
      });

      return unwrapApiListResponse<ApiWatchlist>(response);
    } catch (error) {
      log.error('Failed to list watchlists:', error);
      throw new Error(`Failed to list watchlists: ${error}`);
    }
  }

  /**
   * Get a watchlist by ID
   */
  async getById(id: string): Promise<ApiWatchlist | null> {
    log.debug(`Fetching watchlist: ${id}`);

    try {
      const response = await this.apiClient.get(`/watchlists/${id}`);
      return unwrapApiResponse<ApiWatchlist>(response);
    } catch (error: any) {
      if (error.status === 404) {
        return null;
      }
      log.error(`Failed to get watchlist ${id}:`, error);
      throw new Error(`Failed to get watchlist ${id}: ${error}`);
    }
  }

  /**
   * Create a new watchlist
   */
  async create(config: WatchlistConfig): Promise<ApiWatchlist> {
    const payload = this.buildCreatePayload(config);
    log.debug('Creating watchlist:', { name: payload.name, assets: payload.assets.length });

    if (this.dryRun) {
      log.info(`[DRY RUN] Would create watchlist: ${payload.name}`);
      return this.createMockWatchlist(payload);
    }

    try {
      // Try sending as an array (API might expect batch creation like notification channels)
      const response = await this.apiClient.post('/watchlists', [payload]);
      const result = unwrapApiResponse<ApiWatchlist[]>(response);
      const created = result[0]; // Get the first (and only) item from the array
      log.info(`Created watchlist: ${created.name} (${created.id})`);
      return created;
    } catch (error) {
      log.error('Failed to create watchlist:', error);
      throw new Error(`Failed to create watchlist: ${error}`);
    }
  }

  /**
   * Update an existing watchlist
   */
  async update(
    id: string,
    config: WatchlistConfig,
    currentRemoteState?: ApiWatchlist
  ): Promise<ApiWatchlist> {
    // If we have current state, perform asset reconciliation
    let reconciliation: AssetReconciliationResult | undefined;
    if (currentRemoteState) {
      reconciliation = this.reconcileAssets(config.assets, currentRemoteState.assets || []);
    }

    const payload = this.buildUpdatePayload(config, reconciliation);
    log.debug(`Updating watchlist: ${id}`, {
      name: payload.name,
      assetsToAdd: reconciliation?.assets_to_add.length ?? 0,
      assetsToRemove: reconciliation?.assets_to_remove.length ?? 0,
    });

    if (this.dryRun) {
      log.info(`[DRY RUN] Would update watchlist: ${id}`);
      if (reconciliation) {
        log.info(
          `[DRY RUN] Assets: ${reconciliation.current_count} -> ${reconciliation.desired_count} (+${reconciliation.assets_to_add.length}, -${reconciliation.assets_to_remove.length})`
        );
      }
      return currentRemoteState || this.createMockWatchlist(payload);
    }

    try {
      const response = await this.apiClient.patch(`/watchlists/${id}`, payload);
      const updated = unwrapApiResponse<ApiWatchlist>(response);
      log.info(`Updated watchlist: ${updated.name} (${id})`);

      if (
        reconciliation &&
        (reconciliation.assets_to_add.length > 0 || reconciliation.assets_to_remove.length > 0)
      ) {
        log.info(
          `Assets reconciled: ${reconciliation.current_count} -> ${reconciliation.desired_count} (+${reconciliation.assets_to_add.length}, -${reconciliation.assets_to_remove.length})`
        );
      }

      return updated;
    } catch (error) {
      log.error(`Failed to update watchlist ${id}:`, error);
      throw new Error(`Failed to update watchlist ${id}: ${error}`);
    }
  }

  /**
   * Delete a watchlist
   */
  async delete(id: string): Promise<void> {
    log.debug(`Deleting watchlist: ${id}`);

    if (this.dryRun) {
      log.info(`[DRY RUN] Would delete watchlist: ${id}`);
      return;
    }

    try {
      await this.apiClient.delete(`/watchlists/${id}`);
      log.info(`Deleted watchlist: ${id}`);
    } catch (error) {
      log.error(`Failed to delete watchlist ${id}:`, error);
      throw new Error(`Failed to delete watchlist ${id}: ${error}`);
    }
  }

  /**
   * Upload CSV assets to a watchlist
   */
  async uploadCsv(options: CsvUploadOptions): Promise<CsvUploadResult> {
    const { watchlistId, csvPath, dryRun = false, replaceAssets = false } = options;

    log.debug(`Uploading CSV to watchlist: ${watchlistId}`, { csvPath, replaceAssets });

    try {
      // Parse and validate CSV
      const assets = this.parseCsvFile(csvPath);

      if (dryRun || this.dryRun) {
        log.info(
          `[DRY RUN] Would upload ${assets.length} assets from CSV to watchlist: ${watchlistId}`
        );
        return {
          imported: assets.length,
          failed: 0,
          total: assets.length,
          errors: [],
        };
      }

      // Create form data for multipart upload
      const formData = new FormData();
      formData.append('file', createReadStream(csvPath), {
        filename: 'assets.csv',
        contentType: 'text/csv',
      });

      if (replaceAssets) {
        formData.append('replace', 'true');
      }

      const response = await this.apiClient.post(
        `/watchlists/${watchlistId}/upload-csv`,
        formData,
        {
          headers: {
            ...formData.getHeaders(),
          },
        }
      );

      const result = unwrapApiResponse<CsvUploadResult>(response);
      log.info(
        `CSV uploaded to watchlist ${watchlistId}: ${result.imported} imported, ${result.failed} failed`
      );
      return result;
    } catch (error) {
      log.error(`Failed to upload CSV to watchlist ${watchlistId}:`, error);
      throw new Error(`Failed to upload CSV to watchlist ${watchlistId}: ${error}`);
    }
  }

  /**
   * Reconcile assets between desired and current state
   */
  reconcileAssets(
    desiredAssets: AssetConfig[],
    currentAssets: ApiWatchlistAsset[]
  ): AssetReconciliationResult {
    const currentAssetIds = new Set(currentAssets.map((asset) => this.getAssetIdentifier(asset)));

    const desiredAssetIds = new Set(desiredAssets.map((asset) => this.getAssetIdentifier(asset)));

    const assetsToAdd: AssetConfig[] = [];
    const assetsToRemove: ApiWatchlistAsset[] = [];

    // Find assets to add (in desired but not in current)
    for (const asset of desiredAssets) {
      const assetId = this.getAssetIdentifier(asset);
      if (!currentAssetIds.has(assetId)) {
        assetsToAdd.push(asset);
      }
    }

    // Find assets to remove (in current but not in desired)
    for (const asset of currentAssets) {
      const assetId = this.getAssetIdentifier(asset);
      if (!desiredAssetIds.has(assetId)) {
        assetsToRemove.push(asset);
      }
    }

    return {
      current_count: currentAssets.length,
      desired_count: desiredAssets.length,
      assets_to_add: assetsToAdd,
      assets_to_remove: assetsToRemove,
      no_change_count: currentAssets.length - assetsToRemove.length,
    };
  }

  /**
   * Generate a unique identifier for an asset
   */
  private getAssetIdentifier(asset: AssetConfig | ApiWatchlistAsset): string {
    return `${asset.chain}:${asset.type}:${asset.address.toLowerCase()}`;
  }

  /**
   * Build create payload from watchlist config
   */
  private buildCreatePayload(config: WatchlistConfig): ApiWatchlistCreatePayload {
    return {
      name: config.name,
      description: config.description,
      assets: config.assets.map((asset) => ({
        chain: asset.chain,
        type: asset.type,
        address: asset.address,
        name: asset.name,
        symbol: asset.symbol,
        tags: asset.tags,
      })),
      alert_policy_id: config.alert_policy_id,
    };
  }

  /**
   * Build update payload from watchlist config
   */
  private buildUpdatePayload(
    config: WatchlistConfig,
    reconciliation?: AssetReconciliationResult
  ): ApiWatchlistUpdatePayload {
    const payload: ApiWatchlistUpdatePayload = {
      name: config.name,
      description: config.description,
      alert_policy_id: config.alert_policy_id,
    };

    // Include asset changes if we have reconciliation data
    if (reconciliation) {
      if (reconciliation.assets_to_add.length > 0) {
        payload.assets_to_add = reconciliation.assets_to_add.map((asset) => ({
          chain: asset.chain,
          type: asset.type,
          address: asset.address,
          name: asset.name,
          symbol: asset.symbol,
          tags: asset.tags,
        }));
      }

      if (reconciliation.assets_to_remove.length > 0) {
        payload.assets_to_remove = reconciliation.assets_to_remove.map((asset) => ({
          chain: asset.chain,
          type: asset.type,
          address: asset.address,
        }));
      }
    }

    return payload;
  }

  /**
   * Parse CSV file and validate assets
   */
  private parseCsvFile(csvPath: string): AssetConfig[] {
    try {
      const csvContent = readFileSync(csvPath, 'utf-8');
      const records = parseCsv(csvContent, {
        columns: true,
        skip_empty_lines: true,
        trim: true,
      });

      const assets: AssetConfig[] = [];

      for (const record of records as Record<string, string>[]) {
        // Validate required fields
        if (!record.address || !record.chain) {
          throw new Error(
            `Missing required fields (address, chain) in CSV row: ${JSON.stringify(record)}`
          );
        }

        // Validate address format
        if (!/^0x[a-fA-F0-9]{40}$/.test(record.address)) {
          throw new Error(`Invalid address format: ${record.address}`);
        }

        // Validate and cast chain
        const validChains = [
          'ethereum',
          'polygon',
          'bsc',
          'avalanche',
          'arbitrum',
          'optimism',
          'base',
          'fantom',
          'gnosis',
          'celo',
        ];
        if (!validChains.includes(record.chain)) {
          throw new Error(
            `Invalid chain: ${record.chain}. Must be one of: ${validChains.join(', ')}`
          );
        }

        // Validate and cast asset type
        const validTypes = ['Wallet', 'Protocol', 'Token', 'Contract', 'Pool', 'NFT'];
        const assetType = record.type || 'Wallet';
        if (!validTypes.includes(assetType)) {
          throw new Error(
            `Invalid asset type: ${assetType}. Must be one of: ${validTypes.join(', ')}`
          );
        }

        assets.push({
          chain: record.chain as any,
          type: assetType as any,
          address: record.address,
          name: record.name || undefined,
          symbol: record.symbol || undefined,
          tags: record.tags ? record.tags.split(',').map((tag: string) => tag.trim()) : undefined,
        });
      }

      return assets;
    } catch (error) {
      throw new Error(`Failed to parse CSV file ${csvPath}: ${error}`);
    }
  }

  /**
   * Create a mock watchlist for dry-run mode
   */
  private createMockWatchlist(
    payload: ApiWatchlistCreatePayload | ApiWatchlistUpdatePayload
  ): ApiWatchlist {
    return {
      id: `mock_${Date.now()}`,
      name: payload.name || 'Mock Watchlist',
      description: payload.description,
      asset_count: 'assets' in payload ? payload.assets.length : 0,
      alert_policy: payload.alert_policy_id || 'default_policy',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      enabled: true,
      assets: 'assets' in payload ? payload.assets : undefined,
    };
  }

  /**
   * Generate hash for watchlist configuration (for state tracking)
   */
  static generateConfigHash(config: WatchlistConfig): string {
    return generateFingerprint(config);
  }

  /**
   * Check if two watchlist configurations are equivalent
   */
  static isConfigEqual(config1: WatchlistConfig, config2: WatchlistConfig): boolean {
    return this.generateConfigHash(config1) === this.generateConfigHash(config2);
  }
}

/**
 * Convenience function to create a watchlist provider
 */
export function createWatchlistProvider(apiClient: ApiClient, dryRun?: boolean): WatchlistProvider {
  return new WatchlistProvider({ apiClient, dryRun });
}
