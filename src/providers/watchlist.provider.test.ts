/**
 * Unit tests for the WatchlistProvider class
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { writeFileSync } from 'fs';
import { join } from 'path';
import { WatchlistProvider } from './watchlist.provider.js';
import { ApiClient } from '../lib/api-client.js';
import { TestFixture } from '../../tests/utils/test-helpers.js';
import type { WatchlistConfig } from '../schemas/watchlist.schema.js';
import type { ApiWatchlist, ApiWatchlistAsset } from '../types/api.js';

describe('WatchlistProvider', () => {
  let provider: WatchlistProvider;
  let mockApiClient: ApiClient;

  beforeEach(() => {
    mockApiClient = {
      get: vi.fn(),
      post: vi.fn(),
      patch: vi.fn(),
      delete: vi.fn(),
    } as any;

    provider = new WatchlistProvider({ apiClient: mockApiClient, dryRun: false });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const mockWatchlistConfig: WatchlistConfig = {
    name: 'Test Watchlist',
    description: 'Test watchlist for unit tests',
    assets: [
      {
        chain: 'ethereum',
        type: 'Wallet',
        address: '0x1234567890123456789012345678901234567890',
        name: 'Test Wallet',
      },
      {
        chain: 'ethereum',
        type: 'Token',
        address: '0xA0b86991c431e8c5f2cfae5C4F1b2A4c0b48F8C7',
        name: 'USDC',
        symbol: 'USDC',
      },
    ],
    alert_policy_id: 'policy_123',
  };

  const mockApiWatchlist: ApiWatchlist = {
    id: 'wl_test_123',
    name: 'Test Watchlist',
    description: 'Test watchlist for unit tests',
    asset_count: 2,
    alert_policy: 'policy_123',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    enabled: true,
    assets: [
      {
        chain: 'ethereum',
        type: 'Wallet',
        address: '0x1234567890123456789012345678901234567890',
        name: 'Test Wallet',
      },
      {
        chain: 'ethereum',
        type: 'Token',
        address: '0xA0b86991c431e8c5f2cfae5C4F1b2A4c0b48F8C7',
        name: 'USDC',
        symbol: 'USDC',
      },
    ],
  };

  describe('list', () => {
    it('should list watchlists with default parameters', async () => {
      const mockWatchlists = [mockApiWatchlist];
      mockApiClient.get = vi.fn().mockResolvedValue({ data: mockWatchlists });

      const result = await provider.list();

      expect(mockApiClient.get).toHaveBeenCalledWith('/watchlists', {
        params: { limit: 50, offset: 0 },
      });
      expect(result).toEqual(mockWatchlists);
    });

    it('should list watchlists with custom parameters', async () => {
      const mockWatchlists = [mockApiWatchlist];
      mockApiClient.get = vi.fn().mockResolvedValue({ data: mockWatchlists });

      const result = await provider.list({ limit: 10, offset: 20 });

      expect(mockApiClient.get).toHaveBeenCalledWith('/watchlists', {
        params: { limit: 10, offset: 20 },
      });
      expect(result).toEqual(mockWatchlists);
    });

    it('should handle API errors', async () => {
      mockApiClient.get = vi.fn().mockRejectedValue(new Error('API Error'));

      await expect(provider.list()).rejects.toThrow('Failed to list watchlists: Error: API Error');
    });
  });

  describe('getById', () => {
    it('should get watchlist by ID', async () => {
      mockApiClient.get = vi.fn().mockResolvedValue({ data: mockApiWatchlist });

      const result = await provider.getById('wl_test_123');

      expect(mockApiClient.get).toHaveBeenCalledWith('/watchlists/wl_test_123');
      expect(result).toEqual(mockApiWatchlist);
    });

    it('should return null for 404 errors', async () => {
      mockApiClient.get = vi.fn().mockRejectedValue({ status: 404 });

      const result = await provider.getById('wl_nonexistent');

      expect(result).toBeNull();
    });

    it('should throw for other API errors', async () => {
      mockApiClient.get = vi.fn().mockRejectedValue(new Error('Server Error'));

      await expect(provider.getById('wl_test_123')).rejects.toThrow(
        'Failed to get watchlist wl_test_123'
      );
    });
  });

  describe('create', () => {
    it('should create a new watchlist', async () => {
      mockApiClient.post = vi.fn().mockResolvedValue({ data: mockApiWatchlist });
      mockApiClient.patch = vi.fn().mockResolvedValue({ data: mockApiWatchlist });

      const result = await provider.create(mockWatchlistConfig);

      expect(mockApiClient.post).toHaveBeenCalledWith('/watchlists', {
        name: 'Test Watchlist',
        description: 'Test watchlist for unit tests',
        assets: [], // Initially empty as per API documentation
        alert_policy_id: 'policy_123',
      });

      // Should also call patch to add assets
      expect(mockApiClient.patch).toHaveBeenCalledWith('/watchlists/wl_test_123', {
        assets_to_add: mockWatchlistConfig.assets,
      });
      expect(result).toEqual(mockApiWatchlist);
    });

    it('should handle dry run mode', async () => {
      const dryRunProvider = new WatchlistProvider({ apiClient: mockApiClient, dryRun: true });

      const result = await dryRunProvider.create(mockWatchlistConfig);

      expect(mockApiClient.post).not.toHaveBeenCalled();
      expect(result.name).toBe('Test Watchlist');
      expect(result.id).toMatch(/^mock_\d+$/);
    });

    it('should handle API errors', async () => {
      mockApiClient.post = vi.fn().mockRejectedValue(new Error('Creation failed'));

      await expect(provider.create(mockWatchlistConfig)).rejects.toThrow(
        'Failed to create watchlist: Error: Creation failed'
      );
    });
  });

  describe('update', () => {
    it('should update watchlist without current state', async () => {
      mockApiClient.patch = vi.fn().mockResolvedValue({ data: mockApiWatchlist });

      const result = await provider.update('wl_test_123', mockWatchlistConfig);

      expect(mockApiClient.patch).toHaveBeenCalledWith('/watchlists/wl_test_123', {
        name: 'Test Watchlist',
        description: 'Test watchlist for unit tests',
        alert_policy_id: 'policy_123',
      });
      expect(result).toEqual(mockApiWatchlist);
    });

    it('should update watchlist with asset reconciliation', async () => {
      const currentRemoteState: ApiWatchlist = {
        ...mockApiWatchlist,
        assets: [
          // Different asset than in config - should be removed
          {
            chain: 'ethereum',
            type: 'Wallet',
            address: '0xDEADBEEF00000000000000000000000000000000',
            name: 'Old Wallet',
          },
          // Same asset - should remain
          mockWatchlistConfig.assets[0],
        ],
      };

      mockApiClient.patch = vi.fn().mockResolvedValue({ data: mockApiWatchlist });

      const result = await provider.update('wl_test_123', mockWatchlistConfig, currentRemoteState);

      const patchCall = mockApiClient.patch as any;
      const payload = patchCall.mock.calls[0][1];

      expect(payload.assets_to_add).toHaveLength(1); // USDC token
      expect(payload.assets_to_remove).toHaveLength(1); // Old wallet
      expect(result).toEqual(mockApiWatchlist);
    });

    it('should handle dry run mode with reconciliation', async () => {
      const dryRunProvider = new WatchlistProvider({ apiClient: mockApiClient, dryRun: true });
      const currentState = { ...mockApiWatchlist, assets: [] }; // Empty assets

      const result = await dryRunProvider.update('wl_test_123', mockWatchlistConfig, currentState);

      expect(mockApiClient.patch).not.toHaveBeenCalled();
      expect(result).toBeDefined();
    });

    it('should handle API errors', async () => {
      mockApiClient.patch = vi.fn().mockRejectedValue(new Error('Update failed'));

      await expect(provider.update('wl_test_123', mockWatchlistConfig)).rejects.toThrow(
        'Failed to update watchlist wl_test_123: Error: Update failed'
      );
    });
  });

  describe('delete', () => {
    it('should delete watchlist', async () => {
      mockApiClient.delete = vi.fn().mockResolvedValue({});

      await provider.delete('wl_test_123');

      expect(mockApiClient.delete).toHaveBeenCalledWith('/watchlists/wl_test_123');
    });

    it('should handle dry run mode', async () => {
      const dryRunProvider = new WatchlistProvider({ apiClient: mockApiClient, dryRun: true });

      await dryRunProvider.delete('wl_test_123');

      expect(mockApiClient.delete).not.toHaveBeenCalled();
    });

    it('should handle API errors', async () => {
      mockApiClient.delete = vi.fn().mockRejectedValue(new Error('Delete failed'));

      await expect(provider.delete('wl_test_123')).rejects.toThrow(
        'Failed to delete watchlist wl_test_123: Error: Delete failed'
      );
    });
  });

  describe('uploadCsv', () => {
    let testDir: string;
    let csvPath: string;

    beforeEach(() => {
      testDir = TestFixture.createTempDir('csv-upload');
      csvPath = join(testDir, 'assets.csv');

      // Create a test CSV file
      const csvContent = `address,chain,type,name,symbol,tags
0x1234567890123456789012345678901234567890,ethereum,Wallet,Test Wallet,,
0xa0b86991c431e8c5f2f1b2a4c0b48f8c7aabbccd,ethereum,Token,USD Coin,USDC,stablecoin
0x742d35cc6e7e7c59cc51a0c8ff7f4d5b6e6f7f7f,polygon,Protocol,Test Protocol,,defi`;

      writeFileSync(csvPath, csvContent);
    });

    it('should upload CSV file', async () => {
      const mockResponse = {
        imported: 3,
        failed: 0,
        total: 3,
        errors: [],
      };

      mockApiClient.post = vi.fn().mockResolvedValue({ data: mockResponse });

      const result = await provider.uploadCsv({
        watchlistId: 'wl_test_123',
        csvPath,
        replaceAssets: false,
      });

      // Verify the endpoint and that FormData was used
      const call = mockApiClient.post.mock.calls[0];
      expect(call[0]).toBe('/watchlists/wl_test_123/upload-csv');
      // Verify FormData-like object by checking for typical FormData properties
      expect(call[1]).toHaveProperty('_boundary');
      expect(call[1]).toHaveProperty('_streams');
      expect(call[2]).toHaveProperty('headers');
      expect(call[2].headers).toMatchObject(
        expect.objectContaining({
          'content-type': expect.stringContaining('multipart/form-data'),
        })
      );
      expect(result).toEqual(mockResponse);
    });

    it('should handle dry run mode', async () => {
      const result = await provider.uploadCsv({
        watchlistId: 'wl_test_123',
        csvPath,
        dryRun: true,
      });

      expect(mockApiClient.post).not.toHaveBeenCalled();
      expect(result.imported).toBe(3);
      expect(result.failed).toBe(0);
      expect(result.total).toBe(3);
    });

    it('should handle CSV with replace option', async () => {
      const mockResponse = { imported: 3, failed: 0, total: 3, errors: [] };
      mockApiClient.post = vi.fn().mockResolvedValue({ data: mockResponse });

      await provider.uploadCsv({
        watchlistId: 'wl_test_123',
        csvPath,
        replaceAssets: true,
      });

      // Verify the endpoint and that FormData was used
      const call = mockApiClient.post.mock.calls[0];
      expect(call[0]).toBe('/watchlists/wl_test_123/upload-csv');
      // Verify FormData-like object by checking for typical FormData properties
      expect(call[1]).toHaveProperty('_boundary');
      expect(call[1]).toHaveProperty('_streams');
      expect(call[2]).toHaveProperty('headers');
      expect(call[2].headers).toMatchObject(
        expect.objectContaining({
          'content-type': expect.stringContaining('multipart/form-data'),
        })
      );
    });

    it('should validate CSV content', async () => {
      // Create invalid CSV
      const invalidCsvPath = join(testDir, 'invalid.csv');
      writeFileSync(invalidCsvPath, 'address,chain\n0x123,invalid_chain'); // Invalid chain

      await expect(
        provider.uploadCsv({
          watchlistId: 'wl_test_123',
          csvPath: invalidCsvPath,
        })
      ).rejects.toThrow('Failed to upload CSV to watchlist wl_test_123');
    });

    it('should handle missing required CSV fields', async () => {
      // Create CSV missing required fields
      const incompleteCSV = join(testDir, 'incomplete.csv');
      writeFileSync(incompleteCSV, 'name\nTest Wallet'); // Missing address and chain

      await expect(
        provider.uploadCsv({
          watchlistId: 'wl_test_123',
          csvPath: incompleteCSV,
        })
      ).rejects.toThrow('Failed to upload CSV to watchlist wl_test_123');
    });
  });

  describe('reconcileAssets', () => {
    it('should identify assets to add and remove', () => {
      const desiredAssets = mockWatchlistConfig.assets;
      const currentAssets: ApiWatchlistAsset[] = [
        // This one should be removed (not in desired)
        {
          chain: 'ethereum',
          type: 'Wallet',
          address: '0xDEADBEEF00000000000000000000000000000000',
          name: 'Old Wallet',
        },
        // This one should remain (in both)
        mockWatchlistConfig.assets[0],
      ];

      const reconciliation = provider.reconcileAssets(desiredAssets, currentAssets);

      expect(reconciliation.assets_to_add).toHaveLength(1); // USDC token
      expect(reconciliation.assets_to_remove).toHaveLength(1); // Old wallet
      expect(reconciliation.current_count).toBe(2);
      expect(reconciliation.desired_count).toBe(2);
      expect(reconciliation.no_change_count).toBe(1);
    });

    it('should handle identical asset lists', () => {
      const assets = mockWatchlistConfig.assets;
      const reconciliation = provider.reconcileAssets(assets, assets);

      expect(reconciliation.assets_to_add).toHaveLength(0);
      expect(reconciliation.assets_to_remove).toHaveLength(0);
      expect(reconciliation.no_change_count).toBe(2);
    });

    it('should handle empty current assets', () => {
      const reconciliation = provider.reconcileAssets(mockWatchlistConfig.assets, []);

      expect(reconciliation.assets_to_add).toHaveLength(2); // All desired assets
      expect(reconciliation.assets_to_remove).toHaveLength(0);
      expect(reconciliation.current_count).toBe(0);
      expect(reconciliation.desired_count).toBe(2);
    });

    it('should handle empty desired assets', () => {
      const currentAssets = mockApiWatchlist.assets || [];
      const reconciliation = provider.reconcileAssets([], currentAssets);

      expect(reconciliation.assets_to_add).toHaveLength(0);
      expect(reconciliation.assets_to_remove).toHaveLength(2); // All current assets
      expect(reconciliation.current_count).toBe(2);
      expect(reconciliation.desired_count).toBe(0);
    });
  });

  describe('static methods', () => {
    it('should generate consistent hashes for configs', () => {
      const hash1 = WatchlistProvider.generateConfigHash(mockWatchlistConfig);
      const hash2 = WatchlistProvider.generateConfigHash(mockWatchlistConfig);

      expect(hash1).toBe(hash2);
      expect(hash1).toMatch(/^[a-f0-9]+$/);
    });

    it('should generate different hashes for different configs', () => {
      const modifiedConfig = {
        ...mockWatchlistConfig,
        name: 'Different Name',
      };

      const hash1 = WatchlistProvider.generateConfigHash(mockWatchlistConfig);
      const hash2 = WatchlistProvider.generateConfigHash(modifiedConfig);

      expect(hash1).not.toBe(hash2);
    });

    it('should correctly compare configurations', () => {
      const config1 = mockWatchlistConfig;
      const config2 = { ...mockWatchlistConfig };
      const config3 = { ...mockWatchlistConfig, name: 'Different' };

      expect(WatchlistProvider.isConfigEqual(config1, config2)).toBe(true);
      expect(WatchlistProvider.isConfigEqual(config1, config3)).toBe(false);
    });
  });

  describe('error handling', () => {
    it('should handle network timeouts', async () => {
      mockApiClient.get = vi.fn().mockRejectedValue(new Error('ETIMEDOUT'));

      await expect(provider.list()).rejects.toThrow('Failed to list watchlists: Error: ETIMEDOUT');
    });

    it('should handle malformed API responses', async () => {
      mockApiClient.get = vi.fn().mockResolvedValue({ data: null });

      const result = await provider.list();
      expect(result).toEqual([]);
    });

    it('should handle invalid JSON in CSV parsing', async () => {
      const testDir = TestFixture.createTempDir('csv-invalid');
      const invalidCsvPath = join(testDir, 'invalid.csv');

      // Create a file that's not valid CSV
      writeFileSync(invalidCsvPath, 'not,a,valid\ncsv file with invalid content');

      await expect(
        provider.uploadCsv({
          watchlistId: 'wl_test_123',
          csvPath: invalidCsvPath,
        })
      ).rejects.toThrow('Failed to upload CSV to watchlist wl_test_123');
    });
  });

  describe('edge cases', () => {
    it('should handle assets with case-insensitive addresses', () => {
      const desiredAssets = [
        {
          chain: 'ethereum',
          type: 'Wallet',
          address: '0x1234567890123456789012345678901234567890', // lowercase
        },
      ];

      const currentAssets = [
        {
          chain: 'ethereum',
          type: 'Wallet',
          address: '0X1234567890123456789012345678901234567890', // uppercase
        },
      ];

      const reconciliation = provider.reconcileAssets(desiredAssets, currentAssets as any);

      // Should recognize as the same asset (addresses are normalized to lowercase)
      expect(reconciliation.assets_to_add).toHaveLength(0);
      expect(reconciliation.assets_to_remove).toHaveLength(0);
    });

    it('should handle very large asset lists', () => {
      const largeAssetList = Array.from({ length: 1000 }, (_, i) => ({
        chain: 'ethereum',
        type: 'Wallet',
        address: `0x${i.toString(16).padStart(40, '0')}`,
      }));

      const reconciliation = provider.reconcileAssets(largeAssetList, []);

      expect(reconciliation.assets_to_add).toHaveLength(1000);
      expect(reconciliation.current_count).toBe(0);
      expect(reconciliation.desired_count).toBe(1000);
    });
  });
});
