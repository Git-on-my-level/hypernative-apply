import { Command } from 'commander';
import { dirname } from 'path';
import { log } from '../lib/logger.js';
import { loadConfig, redactSensitive, type CommandFlags } from '../lib/config.js';
import { loadHypernativeConfig, ConfigurationValidationError } from '../lib/config-loader.js';
import type { ParsedConfig } from '../schemas/config.schema.js';

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

      // TODO: Implement actual planning logic
      // - Compare current state with desired state using API client
      // - Generate plan of changes needed (create, update, delete operations)
      // - Display the plan to user
      
      log.success('Plan completed successfully');
      log.info('\nNext steps:');
      log.info('  Run `hypernative apply` to execute the planned changes');
      
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
