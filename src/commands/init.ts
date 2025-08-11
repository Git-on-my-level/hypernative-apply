import { Command } from 'commander';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { log } from '../lib/logger.js';
import { createInterface } from 'readline';

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
enabled: true
assets:
  - chain: ethereum
    type: Wallet
    address: "0x742d35Cc6637C0532D4B8B1D96A4Bb7E6ad77e3A"
    name: "Example Treasury Wallet"
    tags: ["treasury", "example"]
  - chain: polygon
    type: Contract
    address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"
    name: "USDC Contract"
    symbol: "USDC"
alert_config:
  severity_threshold: medium
  notification_channels: ["example-slack-channel"]
  enabled: true
  rules:
    - conditions:
        - type: balance_change
          threshold: 1000000
          direction: decrease
          timeframe: "1h"
      severity: critical
      enabled: true
    - conditions:
        - type: transaction_volume
          threshold: 10000000
          timeframe: "24h"
      severity: high
      enabled: true
`,
  'hypernative/notification-channels/example-channel.yaml': `# Example Notification Channel Configuration
name: example-slack-channel
type: slack
description: "Example Slack notification channel"
configuration:
  webhook_url: "https://hooks.slack.com/services/YOUR/WEBHOOK/URL"
  channel: "#alerts"
  username: "Hypernative Bot"
enabled: true
`,
  'hypernative/custom-agents/example-agent.yaml': `# Example Custom Agent Configuration
name: example-agent
description: "Example custom monitoring agent"
type: large_transaction_monitor
chain: ethereum
severity: high
enabled: true
configuration:
  addresses: ["0x742d35Cc6637C0532D4B8B1D96A4Bb7E6ad77e3A"]
  threshold_value: 100000
  direction: both
  time_window: "1h"
notification_channels: ["example-slack-channel"]
`,
};

// Interactive prompt helper
async function askQuestion(question: string): Promise<string> {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

export const initCommand = new Command()
  .name('init')
  .description('Initialize Hypernative project structure')
  .option('--yes', 'Create files without confirmation (skip dry-run)')
  .option('--force', 'Overwrite existing files')
  .option('--interactive', 'Interactive mode with guided setup')
  .action(async (options) => {
    const isDryRun = !options.yes;
    const cwd = process.cwd();

    log.info('Initializing Hypernative project structure...');

    // Interactive mode setup
    if (options.interactive && isDryRun) {
      log.info('\n📋 Interactive Setup Mode');
      log.info('Answer the following questions to customize your project:');

      const projectName = await askQuestion('\n🏷️  Project name (for documentation): ');
      const monitorType = await askQuestion(
        '🔍 What do you want to monitor?\n   1) Treasury wallets\n   2) Smart contracts\n   3) Both\n   Choose (1-3): '
      );
      const notifyChannel = await askQuestion(
        '📢 Notification preference?\n   1) Slack only\n   2) Email only\n   3) Both\n   Choose (1-3): '
      );

      log.info(`\n✅ Configuration:`);
      log.info(`   Project: ${projectName || 'Unnamed Project'}`);
      log.info(
        `   Monitoring: ${monitorType === '1' ? 'Treasury wallets' : monitorType === '2' ? 'Smart contracts' : 'Both'}`
      );
      log.info(
        `   Notifications: ${notifyChannel === '1' ? 'Slack' : notifyChannel === '2' ? 'Email' : 'Both'}`
      );
      log.info('\n📝 The following files will be created with your preferences:');
    }

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

    // Enhanced next steps with better guidance
    log.info('\n🚀 Next Steps:');
    log.info('');
    log.info('1️⃣  Set up authentication:');
    log.info('   export HN_CLIENT_ID="your_client_id"');
    log.info('   export HN_CLIENT_SECRET="your_client_secret"');
    log.info('   OR create ~/.hypernative/config.yaml with profiles');
    log.info('');
    log.info('2️⃣  Verify your setup:');
    log.info('   hypernative doctor');
    log.info('');
    log.info('3️⃣  Customize configurations:');
    log.info('   - Update addresses in hypernative/watchlists/');
    log.info('   - Set webhook URLs in hypernative/notification-channels/');
    log.info('   - Adjust thresholds in hypernative/custom-agents/');
    log.info('');
    log.info('4️⃣  Test and deploy:');
    log.info('   hypernative plan    # Preview changes');
    log.info('   hypernative apply   # Deploy configuration');
    log.info('');
    log.info('📚 For more examples, check the samples/ directory in the CLI repository');
    log.info('🔧 Run "hypernative doctor" anytime to diagnose issues');
  });
