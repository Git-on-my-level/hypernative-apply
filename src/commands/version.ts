import { Command } from 'commander';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { log } from '../lib/logger.js';
import { getConfigDebugInfo, type CommandFlags } from '../lib/config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read package.json to get version
const packageJsonPath = join(__dirname, '..', '..', 'package.json');
const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));

export const versionCommand = new Command()
  .name('version')
  .description('Display version information')
  .option('--debug', 'Show configuration debug information')
  .action(async (options, command) => {
    // Get global options from parent command
    const parentOpts = command.parent?.opts() || {};
    const flags: CommandFlags = {
      profile: parentOpts.profile,
      baseUrl: parentOpts.baseUrl,
    };

    console.log(`hypernative v${packageJson.version}`);

    if (options.debug) {
      console.log('');
      try {
        const debugInfo = await getConfigDebugInfo(flags);
        
        console.log('Configuration:');
        console.log(`  Profile: ${debugInfo.profile}`);
        console.log(`  Base URL: ${debugInfo.baseUrl}`);
        console.log(`  Client ID: ${debugInfo.clientId}`);
        console.log(`  Client Secret: ${debugInfo.clientSecret}`);
        console.log('');
        console.log('Configuration Sources:');
        console.log(`  Command flags: ${debugInfo.configSources.flags ? 'yes' : 'no'}`);
        console.log(`  Environment variables: ${debugInfo.configSources.environment ? 'yes' : 'no'}`);
        console.log(`  Profile file: ${debugInfo.configSources.profileFile || 'not found'}`);
        console.log(`  Environment file: ${debugInfo.configSources.envFile || 'not found'}`);
      } catch (error) {
        log.error('Failed to load configuration debug info:');
        if (error instanceof Error) {
          log.error(error.message);
        } else {
          log.error(String(error));
        }
        process.exit(1);
      }
    }
  });