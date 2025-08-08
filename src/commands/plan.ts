import { Command } from 'commander';
import { log } from '../lib/logger.js';

export const planCommand = new Command()
  .name('plan')
  .description('Plan configuration changes')
  .option('-c, --config <path>', 'Configuration file path')
  .option('--dry-run', 'Show what would be done without making changes', true)
  .action((options) => {
    log.info('Planning changes...');

    if (options.config) {
      log.info(`Using config file: ${options.config}`);
    }

    if (options.dryRun) {
      log.info('Running in dry-run mode');
    }

    // TODO: Implement actual planning logic
    log.success('Plan completed successfully');
  });
