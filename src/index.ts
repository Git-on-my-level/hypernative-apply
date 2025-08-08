#!/usr/bin/env node

import { Command } from 'commander';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { planCommand } from './commands/plan.js';
import { applyCommand } from './commands/apply.js';
import { initCommand } from './commands/init.js';
import { doctorCommand } from './commands/doctor.js';
import { versionCommand } from './commands/version.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read package.json to get version
const packageJsonPath = join(__dirname, '..', 'package.json');
const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));

const program = new Command();

program
  .name('hypernative')
  .description('Hypernative configuration management CLI')
  .option('--profile <name>', 'Configuration profile to use')
  .option('--base-url <url>', 'Override base API URL');

// Register commands
program.addCommand(planCommand);
program.addCommand(applyCommand);
program.addCommand(initCommand);
program.addCommand(doctorCommand);
program.addCommand(versionCommand);

// Handle unknown commands
program.on('command:*', () => {
  console.error(
    'Invalid command: %s\nSee --help for a list of available commands.',
    program.args.join(' ')
  );
  process.exit(1);
});

// Parse command line arguments
program.parse();

// Show help if no command provided
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
