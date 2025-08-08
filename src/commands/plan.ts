import { Command } from 'commander';
import { log } from '../lib/logger.js';
import { loadConfig, redactSensitive, type CommandFlags } from '../lib/config.js';

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

      // Load configuration
      const config = await loadConfig(flags);
      log.debug('Configuration loaded', redactSensitive(config));

      log.info('Planning changes...');

      if (options.config) {
        log.info(`Using config file: ${options.config}`);
      }

      if (options.dryRun) {
        log.info('Running in dry-run mode');
      }

      log.info(`Using profile: ${config.profile}`);
      log.info(`API endpoint: ${config.baseUrl}`);

      // TODO: Implement actual planning logic with API client using config
      log.success('Plan completed successfully');
    } catch (error) {
      if (error instanceof Error) {
        log.error('Configuration error:', error.message);
      } else {
        log.error('Unknown configuration error:', String(error));
      }
      process.exit(1);
    }
  });
