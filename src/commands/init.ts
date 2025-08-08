import { Command } from 'commander';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { log } from '../lib/logger.js';

const SAMPLE_CONFIG_FILES = {
  'hypernative/config.yaml': `# Hypernative Configuration
version: 1
api:
  endpoint: "https://api.hypernative.com"
  timeout: 30000

watchlists: []
notification_channels: []
custom_agents: []
`,
  'hypernative/watchlists/example-watchlist.yaml': `# Example Watchlist Configuration
name: example-watchlist
description: "Example watchlist for monitoring"
rules:
  - type: balance_threshold
    threshold: 1000000
    token: USDC
  - type: transaction_volume
    threshold: 10000000
    timeframe: "1h"
enabled: true
`,
  'hypernative/notification-channels/example-channel.yaml': `# Example Notification Channel Configuration
name: example-slack-channel
type: slack
description: "Example Slack notification channel"
config:
  webhook_url: "https://hooks.slack.com/services/YOUR/WEBHOOK/URL"
  channel: "#alerts"
  username: "Hypernative Bot"
enabled: true
`,
  'hypernative/custom-agents/example-agent.yaml': `# Example Custom Agent Configuration
name: example-agent
description: "Example custom monitoring agent"
triggers:
  - event: transaction
    filters:
      - field: amount
        operator: gt
        value: 100000
actions:
  - type: alert
    severity: high
    message: "Large transaction detected"
enabled: true
`,
};

export const initCommand = new Command()
  .name('init')
  .description('Initialize Hypernative project structure')
  .option('--yes', 'Create files without confirmation (skip dry-run)')
  .option('--force', 'Overwrite existing files')
  .action((options) => {
    const isDryRun = !options.yes;
    const cwd = process.cwd();

    log.info('Initializing Hypernative project structure...');

    if (isDryRun) {
      log.info('Running in dry-run mode. Use --yes to create files.');
      log.info('The following structure would be created:');

      // Show what would be created
      const directories = [
        'hypernative/',
        'hypernative/watchlists/',
        'hypernative/notification-channels/',
        'hypernative/custom-agents/',
      ];

      directories.forEach((dir) => {
        const fullPath = join(cwd, dir);
        if (!existsSync(fullPath)) {
          log.info(`  📁 ${dir}`);
        } else {
          log.warn(`  📁 ${dir} (already exists)`);
        }
      });

      Object.keys(SAMPLE_CONFIG_FILES).forEach((file) => {
        const fullPath = join(cwd, file);
        if (!existsSync(fullPath)) {
          log.info(`  📄 ${file}`);
        } else if (options.force) {
          log.warn(`  📄 ${file} (would overwrite)`);
        } else {
          log.warn(`  📄 ${file} (already exists, use --force to overwrite)`);
        }
      });

      log.info('\nTo create these files, run: hypernative init --yes');
      return;
    }

    // Create actual files and directories
    log.info('Creating project structure...');

    // Create directories
    const directories = [
      'hypernative',
      'hypernative/watchlists',
      'hypernative/notification-channels',
      'hypernative/custom-agents',
    ];

    directories.forEach((dir) => {
      const fullPath = join(cwd, dir);
      if (!existsSync(fullPath)) {
        mkdirSync(fullPath, { recursive: true });
        log.success(`Created directory: ${dir}`);
      } else {
        log.info(`Directory already exists: ${dir}`);
      }
    });

    // Create files
    Object.entries(SAMPLE_CONFIG_FILES).forEach(([relativePath, content]) => {
      const fullPath = join(cwd, relativePath);

      if (existsSync(fullPath) && !options.force) {
        log.warn(`File already exists: ${relativePath} (use --force to overwrite)`);
        return;
      }

      try {
        writeFileSync(fullPath, content, 'utf-8');
        log.success(`Created file: ${relativePath}`);
      } catch (error) {
        log.error(`Failed to create file: ${relativePath}`, error);
      }
    });

    log.success('Hypernative project initialized successfully!');
    log.info('\nNext steps:');
    log.info('1. Set up authentication:');
    log.info('   - Set environment variables: HN_CLIENT_ID, HN_CLIENT_SECRET');
    log.info('   - Or configure profiles in ~/.hypernative/config.yaml');
    log.info('   - Run "hypernative version --debug" to verify configuration');
    log.info('2. Edit the configuration files in hypernative/ directory');
    log.info('3. Run "hypernative plan" to preview changes');
    log.info('4. Run "hypernative apply" to deploy your configuration');
  });
