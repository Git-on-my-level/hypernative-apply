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
import { join } from 'path';
import { log } from './logger.js';
import { writeFileWithSecurePermissions, createDirectoryWithSecurePermissions, SECURE_FILE_MODE, } from './file-security.js';
import { SafeJsonParser } from './safe-json-parser.js';
import { basicStateFileSchema, basicLockFileSchema } from './basic-validation.js';
import { generateFingerprint, fingerprintsEqual } from './fingerprint.js';
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
const STATE_VERSION = '1.0.0';
/**
 * CLI version (should be imported from package.json in real implementation)
 */
const CLI_VERSION = '0.1.0'; // TODO: Import from package.json
/**
 * Maximum age for lock files before considering them stale (1 hour)
 */
const LOCK_MAX_AGE_MS = 60 * 60 * 1000;
export class StateStore {
    baseDir;
    stateDir;
    stateFilePath;
    lockFilePath;
    constructor(baseDir = process.cwd()) {
        this.baseDir = baseDir;
        this.stateDir = join(baseDir, STATE_DIR);
        this.stateFilePath = join(this.stateDir, STATE_FILE);
        this.lockFilePath = join(this.stateDir, LOCK_FILE);
    }
    /**
     * Initialize state directory if it doesn't exist with secure permissions
     */
    async ensureStateDirectory() {
        try {
            await createDirectoryWithSecurePermissions(this.stateDir, true);
        }
        catch (error) {
            throw new Error(`Failed to create state directory: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    /**
     * Create an initial empty state file
     */
    createInitialState() {
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
    async loadState() {
        try {
            if (!existsSync(this.stateFilePath)) {
                log.debug('State file does not exist, creating initial state');
                return this.createInitialState();
            }
            const content = await fs.readFile(this.stateFilePath, 'utf-8');
            // Use SafeJsonParser for all JSON parsing to ensure security
            const state = SafeJsonParser.parse(content, basicStateFileSchema);
            // Check version for backward compatibility after security validation
            if (state.version && state.version !== STATE_VERSION) {
                throw new Error(`Unsupported state file version: ${state.version}. Expected: ${STATE_VERSION}`);
            }
            log.debug(`Loaded state with ${state.metadata.total_resources} resources`);
            return state;
        }
        catch (error) {
            if (error instanceof SyntaxError) {
                throw new Error('State file is corrupted (invalid JSON)');
            }
            if (error instanceof Error && error.message.includes('Invalid JSON syntax')) {
                throw new Error('State file is corrupted (invalid JSON)');
            }
            // Don't override specific error messages we already throw
            if (error instanceof Error &&
                (error.message.includes('State file is corrupted') ||
                    error.message.includes('Unsupported state file version'))) {
                throw error;
            }
            throw new Error(`Failed to load state: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    /**
     * Save state to file using atomic write (temp file + rename)
     */
    async saveState(state) {
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
            // Atomic write using temp file + rename
            // Use unique temp file name to avoid race conditions
            const tempFilePath = `${this.stateFilePath}.tmp.${Date.now()}.${Math.random().toString(36).substr(2, 9)}`;
            try {
                // Write to temp file first
                await writeFileWithSecurePermissions(tempFilePath, content, 'utf-8');
                // Atomically move temp file to final location
                await fs.rename(tempFilePath, this.stateFilePath);
                log.debug(`Atomically saved state with ${state.metadata.total_resources} resources`);
                return { success: true };
            }
            catch (renameError) {
                // Clean up temp file if rename failed
                try {
                    await fs.unlink(tempFilePath);
                }
                catch (unlinkError) {
                    log.debug(`Failed to clean up temp file: ${unlinkError instanceof Error ? unlinkError.message : String(unlinkError)}`);
                }
                throw renameError;
            }
        }
        catch (error) {
            const message = `Failed to save state: ${error instanceof Error ? error.message : String(error)}`;
            log.error(message);
            return {
                success: false,
                message,
                error: error instanceof Error ? error : new Error(String(error)),
            };
        }
    }
    /**
     * Update a single resource in the state
     */
    async updateResource(name, kind, remoteId, appliedHash, seenRemoteHash, configFile) {
        try {
            const state = await this.loadState();
            const now = new Date().toISOString();
            const existingResource = state.resources[name];
            const metadata = {
                created_at: existingResource?.metadata.created_at || now,
                updated_at: now,
                created_by: existingResource?.metadata.created_by || 'cli',
                cli_version: CLI_VERSION,
                config_file: configFile || existingResource?.metadata.config_file,
            };
            const entry = {
                kind,
                name,
                remote_id: remoteId,
                last_applied_hash: appliedHash,
                last_seen_remote_hash: seenRemoteHash,
                metadata,
            };
            state.resources[name] = entry;
            return await this.saveState(state);
        }
        catch (error) {
            const message = `Failed to update resource ${name}: ${error instanceof Error ? error.message : String(error)}`;
            return {
                success: false,
                message,
                error: error instanceof Error ? error : new Error(String(error)),
            };
        }
    }
    /**
     * Remove a resource from the state
     */
    async removeResource(name) {
        try {
            const state = await this.loadState();
            if (!state.resources[name]) {
                return { success: true, message: `Resource ${name} not found in state` };
            }
            delete state.resources[name];
            return await this.saveState(state);
        }
        catch (error) {
            const message = `Failed to remove resource ${name}: ${error instanceof Error ? error.message : String(error)}`;
            return {
                success: false,
                message,
                error: error instanceof Error ? error : new Error(String(error)),
            };
        }
    }
    /**
     * Check if a process is still running (for lock file validation)
     * Cross-platform implementation for Windows and Unix systems
     */
    isProcessRunning(pid) {
        try {
            // Sending signal 0 checks if process exists without killing it
            process.kill(pid, 0);
            return true;
        }
        catch (error) {
            // ESRCH means process doesn't exist
            return error.code !== 'ESRCH';
        }
    }
    /**
     * Check if there's an active lock
     */
    async isLocked() {
        try {
            if (!existsSync(this.lockFilePath)) {
                return { locked: false };
            }
            const content = await fs.readFile(this.lockFilePath, 'utf-8');
            const lockInfo = SafeJsonParser.parse(content, basicLockFileSchema);
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
        }
        catch (error) {
            log.debug(`Error checking lock file: ${error instanceof Error ? error.message : String(error)}`);
            return { locked: false };
        }
    }
    /**
     * Create a lock file to prevent concurrent operations
     * Uses atomic file operations with 'wx' flag to prevent race conditions
     */
    async createLock(operation) {
        try {
            await this.ensureStateDirectory();
            const lock = {
                pid: process.pid,
                created_at: new Date().toISOString(),
                operation,
                version: CLI_VERSION,
                cwd: process.cwd(),
            };
            // Atomic lock creation with exclusive flag - fails if file exists
            // Note: We cannot use writeFileWithSecurePermissions here because we need the 'wx' flag
            // So we write first with secure mode, then explicitly set permissions
            await fs.writeFile(this.lockFilePath, JSON.stringify(lock, null, 2), {
                encoding: 'utf-8',
                flag: 'wx', // Exclusive creation - fails if file exists
                mode: SECURE_FILE_MODE, // Secure permissions (0600)
            });
            log.debug(`Created lock for ${operation} operation (PID: ${process.pid})`);
            return { success: true };
        }
        catch (error) {
            if (error.code === 'EEXIST') {
                // Lock already exists - check if it's stale
                const lockCheck = await this.isLocked();
                if (!lockCheck.locked) {
                    // Lock was stale and removed, try creating again
                    return this.createLock(operation);
                }
                const msg = `Another hypernative operation is in progress (PID: ${lockCheck.lockInfo?.pid}, operation: ${lockCheck.lockInfo?.operation})`;
                return { success: false, message: msg };
            }
            const message = `Failed to create lock: ${error.message}`;
            return {
                success: false,
                message,
                error: error instanceof Error ? error : new Error(String(error)),
            };
        }
    }
    /**
     * Remove the lock file
     */
    async removeLock() {
        try {
            if (existsSync(this.lockFilePath)) {
                await fs.unlink(this.lockFilePath);
                log.debug('Removed lock file');
            }
            return { success: true };
        }
        catch (error) {
            const message = `Failed to remove lock: ${error instanceof Error ? error.message : String(error)}`;
            return {
                success: false,
                message,
                error: error instanceof Error ? error : new Error(String(error)),
            };
        }
    }
    /**
     * Convert parsed configuration to resources with hashes
     */
    configToResourcesWithHash(config) {
        const resources = [];
        // Notification Channels - handle undefined collections gracefully
        for (const [name, channelConfig] of Object.entries(config.notification_channels || {})) {
            resources.push({
                kind: 'notification_channel',
                name,
                config: channelConfig,
                hash: generateFingerprint(channelConfig),
            });
        }
        // Watchlists - handle undefined collections gracefully
        for (const [name, watchlistConfig] of Object.entries(config.watchlists || {})) {
            resources.push({
                kind: 'watchlist',
                name,
                config: watchlistConfig,
                hash: generateFingerprint(watchlistConfig),
            });
        }
        // Custom Agents - handle undefined collections gracefully
        for (const [name, agentConfig] of Object.entries(config.custom_agents || {})) {
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
    async compareState(config) {
        const state = await this.loadState();
        const desiredResources = this.configToResourcesWithHash(config);
        const comparison = {
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
            }
            else if (!fingerprintsEqual(existing.last_applied_hash, desired.hash)) {
                // Resource exists but configuration has changed
                comparison.to_update.push({
                    kind: desired.kind,
                    name: desired.name,
                    remote_id: existing.remote_id,
                    old_hash: existing.last_applied_hash,
                    new_hash: desired.hash,
                });
            }
            else {
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
        const desiredNames = new Set(desiredResources.map((r) => r.name));
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
    async isNoOp(config) {
        const comparison = await this.compareState(config);
        return (comparison.to_create.length === 0 &&
            comparison.to_update.length === 0 &&
            comparison.to_delete.length === 0);
    }
    /**
     * Get state directory path
     */
    getStateDir() {
        return this.stateDir;
    }
    /**
     * Get state file path
     */
    getStateFilePath() {
        return this.stateFilePath;
    }
    /**
     * Acquire a lock with retry logic and exponential backoff
     */
    async acquireLockWithRetry(operation, maxRetries = 3) {
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            const result = await this.createLock(operation);
            if (result.success) {
                return result;
            }
            if (attempt < maxRetries) {
                const delay = Math.min(1000 * Math.pow(2, attempt - 1), 5000); // Exponential backoff, max 5s
                log.debug(`Lock acquisition failed, retrying in ${delay}ms (attempt ${attempt}/${maxRetries})`);
                await new Promise((resolve) => setTimeout(resolve, delay));
            }
        }
        return {
            success: false,
            message: `Failed to acquire lock after ${maxRetries} attempts`,
        };
    }
    /**
     * Acquire a lock for the given operation (convenience method)
     */
    async acquireLock(operation) {
        const result = await this.acquireLockWithRetry(operation);
        if (!result.success) {
            throw new Error(result.message || 'Failed to acquire lock');
        }
    }
    /**
     * Release the current lock (convenience method)
     */
    async releaseLock() {
        const result = await this.removeLock();
        if (!result.success) {
            throw new Error(result.message || 'Failed to release lock');
        }
    }
}
//# sourceMappingURL=state-store.js.map