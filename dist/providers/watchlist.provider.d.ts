/**
 * Watchlist Provider
 *
 * Handles CRUD operations for Hypernative Watchlists including:
 * - Creating, updating, and deleting watchlists
 * - Asset reconciliation (computing add/remove sets)
 * - CSV upload with dry-run support
 * - Integration with existing state management and planning
 */
import { ApiClient } from '../lib/api-client.js';
import type { WatchlistConfig, AssetConfig } from '../schemas/watchlist.schema.js';
import type { ApiWatchlist, ApiWatchlistAsset, CsvUploadResult, AssetReconciliationResult } from '../types/api.js';
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
export declare class WatchlistProvider {
    private apiClient;
    private dryRun;
    constructor(options: WatchlistProviderOptions);
    /**
     * List all watchlists
     */
    list(params?: {
        limit?: number;
        offset?: number;
    }): Promise<ApiWatchlist[]>;
    /**
     * Get a watchlist by ID
     */
    getById(id: string): Promise<ApiWatchlist | null>;
    /**
     * Create a new watchlist
     */
    create(config: WatchlistConfig): Promise<ApiWatchlist>;
    /**
     * Update an existing watchlist
     */
    update(id: string, config: WatchlistConfig, currentRemoteState?: ApiWatchlist): Promise<ApiWatchlist>;
    /**
     * Delete a watchlist
     */
    delete(id: string): Promise<void>;
    /**
     * Upload CSV assets to a watchlist
     */
    uploadCsv(options: CsvUploadOptions): Promise<CsvUploadResult>;
    /**
     * Reconcile assets between desired and current state
     */
    reconcileAssets(desiredAssets: AssetConfig[], currentAssets: ApiWatchlistAsset[]): AssetReconciliationResult;
    /**
     * Generate a unique identifier for an asset
     */
    private getAssetIdentifier;
    /**
     * Build create payload from watchlist config
     */
    private buildCreatePayload;
    /**
     * Build update payload from watchlist config
     */
    private buildUpdatePayload;
    /**
     * Parse CSV file and validate assets
     */
    private parseCsvFile;
    /**
     * Create a mock watchlist for dry-run mode
     */
    private createMockWatchlist;
    /**
     * Generate hash for watchlist configuration (for state tracking)
     */
    static generateConfigHash(config: WatchlistConfig): string;
    /**
     * Check if two watchlist configurations are equivalent
     */
    static isConfigEqual(config1: WatchlistConfig, config2: WatchlistConfig): boolean;
}
/**
 * Convenience function to create a watchlist provider
 */
export declare function createWatchlistProvider(apiClient: ApiClient, dryRun?: boolean): WatchlistProvider;
//# sourceMappingURL=watchlist.provider.d.ts.map