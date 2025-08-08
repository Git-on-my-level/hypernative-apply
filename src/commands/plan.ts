import { Command } from 'commander';
import { dirname } from 'path';
import { log } from '../lib/logger.js';
import { loadConfig, redactSensitive, type CommandFlags } from '../lib/config.js';
import { loadHypernativeConfig, ConfigurationValidationError } from '../lib/config-loader.js';
import { StateStore } from '../lib/state-store.js';
import type { ParsedConfig } from '../schemas/config.schema.js';
import type { StateComparison } from '../types/state.js';

/**
 * Display a summary of the loaded configuration
 */
function displayConfigurationSummary(config: ParsedConfig): void {
  log.info('\n📋 Configuration Summary');
  
  // Notification Channels
  const channels = Object.entries(config.notification_channels);
  if (channels.length > 0) {
    log.info(`\n🔔 Notification Channels (${channels.length}):`);
    channels.forEach(([name, channel]) => {
      const status = channel.enabled ? '✅' : '❌';
      log.info(`  ${status} ${name} (${channel.type})`);
    });
  }

  // Watchlists
  const watchlists = Object.entries(config.watchlists);
  if (watchlists.length > 0) {
    log.info(`\n👀 Watchlists (${watchlists.length}):`);
    watchlists.forEach(([name, watchlist]) => {
      const status = watchlist.enabled ? '✅' : '❌';
      const assetCount = watchlist.assets.length;
      log.info(`  ${status} ${name} (${assetCount} assets)`);
    });
  }

  // Custom Agents
  const agents = Object.entries(config.custom_agents);
  if (agents.length > 0) {
    log.info(`\n🤖 Custom Agents (${agents.length}):`);
    agents.forEach(([name, agent]) => {
      const status = agent.enabled ? '✅' : '❌';
      log.info(`  ${status} ${name} (${agent.type}, ${agent.severity})`);
    });
  }

  // Global Configuration
  if (config.global) {
    log.info('\n🌍 Global Configuration:');
    if (config.global.project) {
      log.info(`  Project: ${config.global.project.name || 'Unnamed'}`);
      log.info(`  Environment: ${config.global.project.environment || 'development'}`);
    }
    if (config.global.defaults) {
      log.info(`  Default timezone: ${config.global.defaults.timezone || 'UTC'}`);
      if (config.global.defaults.notification_channels) {
        log.info(`  Default channels: ${config.global.defaults.notification_channels.join(', ')}`);
      }
    }
  }
}

/**
 * Display the execution plan based on state comparison
 */
function displayExecutionPlan(comparison: StateComparison): void {
  const totalChanges = comparison.to_create.length + comparison.to_update.length + comparison.to_delete.length;
  
  if (totalChanges === 0) {
    log.success('\n✅ No changes required - configuration matches current state');
    log.info('\nAll resources are up to date:');
    comparison.no_change.forEach(resource => {
      log.info(`  = ${resource.kind}.${resource.name} (${resource.hash.substring(0, 12)}...)`);
    });
    return;
  }

  log.info(`\n📋 Execution Plan: ${comparison.to_create.length} to create, ${comparison.to_update.length} to update, ${comparison.to_delete.length} to delete\n`);

  // Resources to create
  if (comparison.to_create.length > 0) {
    log.info('Resources to CREATE:');
    comparison.to_create.forEach(resource => {
      log.info(`  + ${resource.kind}.${resource.name}`);
      log.info(`    Hash: ${resource.config_hash.substring(0, 12)}...`);
    });
    log.info('');
  }

  // Resources to update
  if (comparison.to_update.length > 0) {
    log.info('Resources to UPDATE:');
    comparison.to_update.forEach(resource => {
      log.info(`  ~ ${resource.kind}.${resource.name}`);
      log.info(`    Hash: ${resource.old_hash.substring(0, 12)}... -> ${resource.new_hash.substring(0, 12)}...`);
    });
    log.info('');
  }

  // Resources to delete
  if (comparison.to_delete.length > 0) {
    log.info('Resources to DELETE:');
    comparison.to_delete.forEach(resource => {
      log.info(`  - ${resource.kind}.${resource.name} (${resource.remote_id})`);
    });
    log.info('');
  }

  // Resources with no changes
  if (comparison.no_change.length > 0) {
    log.info('Resources with NO CHANGE:');
    comparison.no_change.forEach(resource => {
      log.info(`  = ${resource.kind}.${resource.name} (${resource.hash.substring(0, 12)}...)`);
    });
    log.info('');
  }
}

export const planCommand = new Command()
  .name('plan')
  .description('Plan configuration changes')
  .option('-c, --config <path>', 'Configuration file path')
  .option('--dry-run', 'Show what would be done without making changes', true)
  .action(async (options, command) => {
    try {
      // Get global options from parent command
      const parentOpts = command.parent?.opts() || {};
      const flags: CommandFlags = {
        profile: parentOpts.profile,
        baseUrl: parentOpts.baseUrl,
      };

      // Load CLI configuration
      const cliConfig = await loadConfig(flags);
      log.debug('CLI Configuration loaded', redactSensitive(cliConfig));

      log.info('Planning changes...');

      // Determine base directory for hypernative configs
      const baseDir = options.config ? dirname(options.config) : process.cwd();
      
      // Load and validate hypernative resource configurations
      log.info('Loading Hypernative resource configurations...');
      const configResult = await loadHypernativeConfig(baseDir, {
        strict: true,
        validateReferences: true,
        interpolateEnv: false, // Disable for testing
      });

      const { config: hypernativeConfig, metadata } = configResult;

      // Report loaded resources
      log.info(`Loaded ${metadata.total_resources} resources from ${metadata.files_loaded.length} files:`);
      log.info(`  - ${metadata.resource_counts.notification_channels} notification channels`);
      log.info(`  - ${metadata.resource_counts.watchlists} watchlists`);
      log.info(`  - ${metadata.resource_counts.custom_agents} custom agents`);
      
      if (metadata.load_time) {
        log.info(`Configuration loaded in ${metadata.load_time}ms`);
      }

      if (options.dryRun) {
        log.info('Running in dry-run mode');
      }

      log.info(`Using profile: ${cliConfig.profile}`);
      log.info(`API endpoint: ${cliConfig.baseUrl}`);

      // Display configuration summary
      displayConfigurationSummary(hypernativeConfig);

      // Initialize state store
      log.info('\nInitializing state management...');
      const stateStore = new StateStore(baseDir);
      
      // Check for existing lock
      const lockCheck = await stateStore.isLocked();
      if (lockCheck.locked) {
        log.error(`Another hypernative operation is in progress (PID: ${lockCheck.lockInfo?.pid}, operation: ${lockCheck.lockInfo?.operation})`);
        log.info('If you believe this is an error, you can remove the lock file manually:');
        log.info(`  rm ${stateStore.getStateDir()}/.lock`);
        process.exit(1);
      }

      // Load existing state
      const currentState = await stateStore.loadState();
      const isFirstRun = Object.keys(currentState.resources).length === 0;
      
      if (isFirstRun) {
        log.info('No existing state found - this appears to be the first run');
      } else {
        log.info(`Loaded existing state with ${currentState.metadata.total_resources} tracked resources`);
      }

      // Compare desired configuration with current state
      log.info('Comparing configuration with current state...');
      const comparison = await stateStore.compareState(hypernativeConfig);
      
      // Check if this is a no-op
      const isNoOp = await stateStore.isNoOp(hypernativeConfig);
      
      if (isNoOp && !isFirstRun) {
        log.success('\n✅ Configuration is already up to date - no changes needed');
        log.info('All resources match their last applied configuration');
      } else {
        // Display the execution plan
        displayExecutionPlan(comparison);
        
        if (isFirstRun) {
          log.info('\nNote: This is the first run, so all resources will be created.');
          log.info('The state file will be created at: ' + stateStore.getStateFilePath());
        }
      }
      
      log.success('\nPlan completed successfully');
      
      if (!isNoOp) {
        log.info('\nNext steps:');
        log.info('  Run `hypernative apply` to execute the planned changes');
      }
      
    } catch (error) {
      if (error instanceof ConfigurationValidationError) {
        log.error('Configuration validation failed:');
        error.errors.forEach(err => {
          const location = err.line_number ? `${err.file_path}:${err.line_number}` : err.file_path;
          const resource = err.resource_name ? ` (${err.resource_type}: ${err.resource_name})` : '';
          log.error(`  ${location}${resource}: ${err.message}`);
        });
        process.exit(1);
      } else if (error instanceof Error) {
        log.error('Configuration error:', error.message);
      } else {
        log.error('Unknown configuration error:', String(error));
      }
      process.exit(1);
    }
  });
