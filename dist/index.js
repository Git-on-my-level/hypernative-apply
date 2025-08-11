#!/usr/bin/env node
import { Command } from 'commander';
import { planCommand } from './commands/plan.js';
import { applyCommand } from './commands/apply.js';
import { initCommand } from './commands/init.js';
import { doctorCommand } from './commands/doctor.js';
import { versionCommand } from './commands/version.js';
import { updateGlobalFlags } from './lib/logger.js';
// Note: Package version is handled by the version command
const program = new Command();
program
    .name('hypernative')
    .description('Hypernative configuration management CLI')
    .option('--profile <name>', 'Configuration profile to use')
    .option('--base-url <url>', 'Override base API URL')
    .option('--json', 'Output in JSON format for machine parsing')
    .option('--quiet', 'Suppress non-essential output')
    .option('--debug', 'Enable debug output including HTTP timings')
    .option('--no-colors', 'Disable colored output');
// Register commands
program.addCommand(planCommand);
program.addCommand(applyCommand);
program.addCommand(initCommand);
program.addCommand(doctorCommand);
program.addCommand(versionCommand);
// Handle unknown commands
program.on('command:*', () => {
    console.error('Invalid command: %s\nSee --help for a list of available commands.', program.args.join(' '));
    process.exit(1);
});
// Set up global flags before parsing
program.hook('preAction', (thisCommand) => {
    const opts = thisCommand.parent?.opts() || thisCommand.opts();
    updateGlobalFlags({
        json: opts.json,
        quiet: opts.quiet,
        debug: opts.debug,
        noColors: opts.noColors,
    });
});
// Parse command line arguments
program.parse();
// Show help if no command provided
if (!process.argv.slice(2).length) {
    program.outputHelp();
}
//# sourceMappingURL=index.js.map