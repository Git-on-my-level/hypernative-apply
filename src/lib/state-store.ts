/**
 * State store module for managing local state and preventing concurrent operations
 * 
 * This module handles:
 * - Loading and saving state to .hypernative/state.json
 * - Lock file management to prevent concurrent apply operations
 * - State comparison and change detection
 */

import { promises as fs } from 'fs';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { log } from './logger.js';
import {
  StateFile,
  StateEntry,
  LockFile,
  StateComparison,
  ResourceWithHash,
  StateOperationResult,
  StateEntryMetadata,
  StateFileMetadata,
} from '../types/state.js';
import { generateFingerprint, fingerprintsEqual } from './fingerprint.js';
import type { ParsedConfig } from '../schemas/config.schema.js';

/**
 * Default state directory name
 */
const STATE_DIR = '.hypernative';

/**
 * State file name
 */
const STATE_FILE = 'state.json';

/**
 * Lock file name
 */
const LOCK_FILE = '.lock';

/**
 * Current state file format version
 */
const STATE_VERSION = '1.0.0' as const;

/**
 * CLI version (should be imported from package.json in real implementation)
 */
const CLI_VERSION = '0.1.0'; // TODO: Import from package.json

/**
 * Maximum age for lock files before considering them stale (5 minutes)
 */
const LOCK_MAX_AGE_MS = 5 * 60 * 1000;

export class StateStore {
  private baseDir: string;
  private stateDir: string;
  private stateFilePath: string;
  private lockFilePath: string;

  constructor(baseDir: string = process.cwd()) {
    this.baseDir = baseDir;
    this.stateDir = join(baseDir, STATE_DIR);
    this.stateFilePath = join(this.stateDir, STATE_FILE);
    this.lockFilePath = join(this.stateDir, LOCK_FILE);
  }

  /**
   * Initialize state directory if it doesn't exist
   */
  private async ensureStateDirectory(): Promise<void> {
    try {
      await fs.mkdir(this.stateDir, { recursive: true });
    } catch (error) {
      throw new Error(`Failed to create state directory: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Create an initial empty state file
   */
  private createInitialState(): StateFile {
    const now = new Date().toISOString();
    
    return {
      version: STATE_VERSION,
      resources: {},
      metadata: {
        created_at: now,
        created_by_version: CLI_VERSION,
        total_resources: 0,
        resource_counts: {
          watchlists: 0,
          custom_agents: 0,
          notification_channels: 0,
        },
      },
    };
  }

  /**
   * Load state from file, creating an empty state if file doesn't exist
   */
  async loadState(): Promise<StateFile> {
    try {
      if (!existsSync(this.stateFilePath)) {
        log.debug('State file does not exist, creating initial state');
        return this.createInitialState();
      }

      const content = await fs.readFile(this.stateFilePath, 'utf-8');
      const state: StateFile = JSON.parse(content);

      // Validate state file version
      if (state.version !== STATE_VERSION) {
        throw new Error(`Unsupported state file version: ${state.version}. Expected: ${STATE_VERSION}`);
      }

      log.debug(`Loaded state with ${state.metadata.total_resources} resources`);
      return state;
    } catch (error) {
      if (error instanceof SyntaxError) {
        throw new Error('State file is corrupted (invalid JSON)');
      }
      throw new Error(`Failed to load state: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Save state to file
   */
  async saveState(state: StateFile): Promise<StateOperationResult> {
    try {
      await this.ensureStateDirectory();
      
      // Update metadata
      const now = new Date().toISOString();
      state.last_sync = now;
      state.metadata.total_resources = Object.keys(state.resources).length;
      
      // Count resources by type
      const counts = { watchlists: 0, custom_agents: 0, notification_channels: 0 };
      for (const resource of Object.values(state.resources)) {
        switch (resource.kind) {
          case 'watchlist':
            counts.watchlists++;
            break;
          case 'custom_agent':
            counts.custom_agents++;
            break;
          case 'notification_channel':
            counts.notification_channels++;
            break;
        }
      }
      state.metadata.resource_counts = counts;

      const content = JSON.stringify(state, null, 2);
      await fs.writeFile(this.stateFilePath, content, 'utf-8');
      
      log.debug(`Saved state with ${state.metadata.total_resources} resources`);
      return { success: true };
    } catch (error) {
      const message = `Failed to save state: ${error instanceof Error ? error.message : String(error)}`;
      log.error(message);
      return { success: false, message, error: error instanceof Error ? error : new Error(String(error)) };
    }
  }

  /**
   * Update a single resource in the state
   */
  async updateResource(
    name: string,
    kind: string,
    remoteId: string,
    appliedHash: string,
    seenRemoteHash: string,
    configFile?: string
  ): Promise<StateOperationResult> {
    try {
      const state = await this.loadState();
      const now = new Date().toISOString();

      const existingResource = state.resources[name];
      const metadata: StateEntryMetadata = {
        created_at: existingResource?.metadata.created_at || now,
        updated_at: now,
        created_by: existingResource?.metadata.created_by || 'cli',
        cli_version: CLI_VERSION,
        config_file: configFile || existingResource?.metadata.config_file,
      };

      const entry: StateEntry = {
        kind,
        name,
        remote_id: remoteId,
        last_applied_hash: appliedHash,
        last_seen_remote_hash: seenRemoteHash,
        metadata,
      };

      state.resources[name] = entry;
      
      return await this.saveState(state);
    } catch (error) {
      const message = `Failed to update resource ${name}: ${error instanceof Error ? error.message : String(error)}`;
      return { success: false, message, error: error instanceof Error ? error : new Error(String(error)) };
    }
  }

  /**
   * Remove a resource from the state
   */
  async removeResource(name: string): Promise<StateOperationResult> {
    try {
      const state = await this.loadState();
      
      if (!state.resources[name]) {
        return { success: true, message: `Resource ${name} not found in state` };
      }

      delete state.resources[name];
      
      return await this.saveState(state);
    } catch (error) {
      const message = `Failed to remove resource ${name}: ${error instanceof Error ? error.message : String(error)}`;
      return { success: false, message, error: error instanceof Error ? error : new Error(String(error)) };
    }
  }

  /**
   * Check if a process is still running (for lock file validation)
   */
  private isProcessRunning(pid: number): boolean {
    try {
      // On Unix systems, sending signal 0 checks if process exists without affecting it
      process.kill(pid, 0);
      return true;
    } catch (error) {
      // Process doesn't exist or we don't have permission (assume it's dead)
      return false;
    }
  }

  /**
   * Check if there's an active lock
   */
  async isLocked(): Promise<{ locked: boolean; lockInfo?: LockFile; stale?: boolean }> {
    try {
      if (!existsSync(this.lockFilePath)) {
        return { locked: false };
      }

      const content = await fs.readFile(this.lockFilePath, 'utf-8');
      const lockInfo: LockFile = JSON.parse(content);

      // Check if lock is stale
      const lockAge = Date.now() - new Date(lockInfo.created_at).getTime();
      const isStale = lockAge > LOCK_MAX_AGE_MS;
      
      // Check if process is still running
      const processRunning = this.isProcessRunning(lockInfo.pid);

      if (isStale || !processRunning) {
        log.debug(`Lock file is stale (age: ${lockAge}ms, process running: ${processRunning}), removing`);
        await this.removeLock();
        return { locked: false, lockInfo, stale: true };
      }

      return { locked: true, lockInfo };
    } catch (error) {
      log.debug(`Error checking lock file: ${error instanceof Error ? error.message : String(error)}`);
      return { locked: false };
    }
  }

  /**
   * Create a lock file to prevent concurrent operations
   */
  async createLock(operation: 'plan' | 'apply'): Promise<StateOperationResult> {
    try {
      const lockCheck = await this.isLocked();
      if (lockCheck.locked) {
        const msg = `Another hypernative operation is in progress (PID: ${lockCheck.lockInfo?.pid}, operation: ${lockCheck.lockInfo?.operation})`;
        return { success: false, message: msg };
      }

      await this.ensureStateDirectory();

      const lock: LockFile = {
        pid: process.pid,
        created_at: new Date().toISOString(),
        operation,
        version: CLI_VERSION,
        cwd: process.cwd(),
      };

      await fs.writeFile(this.lockFilePath, JSON.stringify(lock, null, 2), 'utf-8');
      
      log.debug(`Created lock for ${operation} operation (PID: ${process.pid})`);
      return { success: true };
    } catch (error) {
      const message = `Failed to create lock: ${error instanceof Error ? error.message : String(error)}`;
      return { success: false, message, error: error instanceof Error ? error : new Error(String(error)) };
    }
  }

  /**
   * Remove the lock file
   */
  async removeLock(): Promise<StateOperationResult> {
    try {
      if (existsSync(this.lockFilePath)) {
        await fs.unlink(this.lockFilePath);
        log.debug('Removed lock file');
      }
      return { success: true };
    } catch (error) {
      const message = `Failed to remove lock: ${error instanceof Error ? error.message : String(error)}`;
      return { success: false, message, error: error instanceof Error ? error : new Error(String(error)) };
    }
  }

  /**
   * Convert parsed configuration to resources with hashes
   */
  private configToResourcesWithHash(config: ParsedConfig): ResourceWithHash[] {
    const resources: ResourceWithHash[] = [];

    // Notification Channels
    for (const [name, channelConfig] of Object.entries(config.notification_channels)) {
      resources.push({
        kind: 'notification_channel',
        name,
        config: channelConfig,
        hash: generateFingerprint(channelConfig),
      });
    }

    // Watchlists
    for (const [name, watchlistConfig] of Object.entries(config.watchlists)) {
      resources.push({
        kind: 'watchlist',
        name,
        config: watchlistConfig,
        hash: generateFingerprint(watchlistConfig),
      });
    }

    // Custom Agents
    for (const [name, agentConfig] of Object.entries(config.custom_agents)) {
      resources.push({
        kind: 'custom_agent',
        name,
        config: agentConfig,
        hash: generateFingerprint(agentConfig),
      });
    }

    return resources;
  }

  /**
   * Compare current state with desired configuration
   */
  async compareState(config: ParsedConfig): Promise<StateComparison> {
    const state = await this.loadState();
    const desiredResources = this.configToResourcesWithHash(config);
    
    const comparison: StateComparison = {
      to_create: [],
      to_update: [],
      to_delete: [],
      no_change: [],
    };

    // Check desired resources against current state
    for (const desired of desiredResources) {
      const existing = state.resources[desired.name];
      
      if (!existing) {
        // Resource doesn't exist in state - needs to be created
        comparison.to_create.push({
          kind: desired.kind,
          name: desired.name,
          config_hash: desired.hash,
        });
      } else if (!fingerprintsEqual(existing.last_applied_hash, desired.hash)) {
        // Resource exists but configuration has changed
        comparison.to_update.push({
          kind: desired.kind,
          name: desired.name,
          remote_id: existing.remote_id,
          old_hash: existing.last_applied_hash,
          new_hash: desired.hash,
        });
      } else {
        // Resource exists and hasn't changed
        comparison.no_change.push({
          kind: desired.kind,
          name: desired.name,
          remote_id: existing.remote_id,
          hash: desired.hash,
        });
      }
    }

    // Check for resources in state but not in desired configuration (to delete)
    const desiredNames = new Set(desiredResources.map(r => r.name));
    for (const [name, stateEntry] of Object.entries(state.resources)) {
      if (!desiredNames.has(name)) {
        comparison.to_delete.push({
          kind: stateEntry.kind,
          name,
          remote_id: stateEntry.remote_id,
        });
      }
    }

    return comparison;
  }

  /**
   * Check if this would be a no-op (no changes needed)
   */
  async isNoOp(config: ParsedConfig): Promise<boolean> {
    const comparison = await this.compareState(config);
    return comparison.to_create.length === 0 && 
           comparison.to_update.length === 0 && 
           comparison.to_delete.length === 0;
  }

  /**
   * Get state directory path
   */
  getStateDir(): string {
    return this.stateDir;
  }

  /**
   * Get state file path
   */
  getStateFilePath(): string {
    return this.stateFilePath;
  }

  /**
   * Acquire a lock for the given operation (convenience method)
   */
  async acquireLock(operation: 'plan' | 'apply'): Promise<void> {
    const result = await this.createLock(operation);
    if (!result.success) {
      throw new Error(result.message || 'Failed to acquire lock');
    }
  }

  /**
   * Release the current lock (convenience method)
   */
  async releaseLock(): Promise<void> {
    const result = await this.removeLock();
    if (!result.success) {
      throw new Error(result.message || 'Failed to release lock');
    }
  }
}