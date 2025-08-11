import { Command } from 'commander';
import { dirname } from 'path';
import { writeFileSync } from 'fs';
import { log } from '../lib/logger.js';
import { output } from '../lib/output-manager.js';
import { loadConfig, redactSensitive } from '../lib/config.js';
import { loadHypernativeConfig, ConfigurationValidationError } from '../lib/config-loader.js';
import { StateStore } from '../lib/state-store.js';
import { Planner, createPlanFile } from '../lib/planner.js';
import { formatFieldDiffs } from '../lib/diff-engine.js';
import { ChangeType } from '../types/plan.js';
/**
 * Build details string for a resource change
 */
function buildResourceDetails(resource, opts) {
    const details = [];
    if (resource.current_hash && resource.desired_hash) {
        details.push(`${resource.current_hash.substring(0, 8)}...→${resource.desired_hash.substring(0, 8)}...`);
    }
    else if (resource.desired_hash) {
        details.push(`hash: ${resource.desired_hash.substring(0, 8)}...`);
    }
    else if (resource.current_hash) {
        details.push(`hash: ${resource.current_hash.substring(0, 8)}...`);
    }
    if (resource.remote_id) {
        details.push(`id: ${resource.remote_id}`);
    }
    if (resource.dependencies.length > 0 && opts.show_dependencies) {
        details.push(`deps: ${resource.dependencies.join(', ')}`);
    }
    return details.join(', ');
}
/**
 * Display a summary of the loaded configuration
 */
function displayConfigurationSummary(config) {
    log.info('\n📋 Configuration Summary');
    // Build summary data
    const summaryItems = [];
    // Notification Channels
    const channels = Object.entries(config.notification_channels);
    if (channels.length > 0) {
        summaryItems.push(`🔔 ${channels.length} Notification Channels`);
        const enabledChannels = channels.filter(([, channel]) => channel.enabled).length;
        summaryItems.push(`   └─ ${enabledChannels} enabled, ${channels.length - enabledChannels} disabled`);
    }
    // Watchlists
    const watchlists = Object.entries(config.watchlists);
    if (watchlists.length > 0) {
        summaryItems.push(`👀 ${watchlists.length} Watchlists`);
        const totalAssets = watchlists.reduce((sum, [, watchlist]) => sum + watchlist.assets.length, 0);
        const enabledWatchlists = watchlists.filter(([, watchlist]) => watchlist.enabled).length;
        summaryItems.push(`   └─ ${totalAssets} total assets, ${enabledWatchlists} enabled`);
    }
    // Custom Agents
    const agents = Object.entries(config.custom_agents);
    if (agents.length > 0) {
        summaryItems.push(`🤖 ${agents.length} Custom Agents`);
        const enabledAgents = agents.filter(([, agent]) => agent.enabled).length;
        summaryItems.push(`   └─ ${enabledAgents} enabled, ${agents.length - enabledAgents} disabled`);
    }
    // Global Configuration
    if (config.global) {
        summaryItems.push('🌍 Global Configuration');
        if (config.global.project) {
            summaryItems.push(`   └─ Project: ${config.global.project.name || 'Unnamed'} (${config.global.project.environment || 'development'})`);
        }
    }
    // Display using output manager
    if (summaryItems.length > 0) {
        output.displayBox('Configuration Summary', summaryItems);
    }
}
/**
 * Display the execution plan based on planner output
 */
function displayExecutionPlan(plan, options = {}) {
    const opts = {
        use_colors: options.use_colors ?? true,
        show_field_diffs: options.show_field_diffs ?? true,
        show_dependencies: options.show_dependencies ?? false,
        max_field_diffs: options.max_field_diffs ?? 5,
        compact_arrays: options.compact_arrays ?? true,
    };
    const { summary } = plan;
    const totalChanges = summary.to_create + summary.to_update + summary.to_replace + summary.to_delete;
    if (totalChanges === 0) {
        log.success('\n✅ No changes required - configuration matches current state');
        if (summary.no_change > 0) {
            const noChangeResources = plan.changes
                .filter((c) => c.change_type === ChangeType.NO_CHANGE)
                .map((resource) => ({
                name: resource.name,
                type: resource.kind,
                status: 'no-change',
                details: `${resource.current_hash?.substring(0, 12) || 'unknown'}...`,
            }));
            output.displayResourceSummary(noChangeResources);
        }
        return;
    }
    // Display plan summary header
    const summaryParts = [];
    if (summary.to_create > 0)
        summaryParts.push(`${summary.to_create} to create`);
    if (summary.to_update > 0)
        summaryParts.push(`${summary.to_update} to update`);
    if (summary.to_replace > 0)
        summaryParts.push(`${summary.to_replace} to replace`);
    if (summary.to_delete > 0)
        summaryParts.push(`${summary.to_delete} to delete`);
    output.displayBox('Execution Plan', [`📋 ${summaryParts.join(', ')}`]);
    // Group changes by type and display using resource summary
    const allChanges = plan.changes.map((resource) => ({
        name: resource.name,
        type: resource.kind,
        status: resource.change_type === ChangeType.CREATE
            ? 'create'
            : resource.change_type === ChangeType.UPDATE
                ? 'update'
                : resource.change_type === ChangeType.REPLACE
                    ? 'update'
                    : resource.change_type === ChangeType.DELETE
                        ? 'delete'
                        : 'no-change',
        details: buildResourceDetails(resource, opts),
    }));
    // Filter out no-change unless explicitly requested
    const filteredChanges = allChanges.filter((change) => change.status !== 'no-change' || opts.show_dependencies);
    output.displayResourceSummary(filteredChanges);
    // Show field diffs for updates if requested
    if (opts.show_field_diffs) {
        const updatesWithDiffs = plan.changes.filter((c) => c.change_type === ChangeType.UPDATE && c.field_diffs && c.field_diffs.length > 0);
        if (updatesWithDiffs.length > 0) {
            console.log('\nField-level changes:');
            updatesWithDiffs.forEach((resource) => {
                console.log(`\n${resource.kind}.${resource.name}:`);
                const diffLines = formatFieldDiffs(resource.field_diffs, {
                    maxDiffs: opts.max_field_diffs,
                    useColors: opts.use_colors,
                });
                diffLines.forEach((line) => console.log(`  ${line}`));
            });
        }
    }
    // Display warnings
    if (plan.warnings && plan.warnings.length > 0) {
        log.info('⚠️  Warnings:');
        plan.warnings.forEach((warning) => {
            const color = warning.severity === 'error'
                ? opts.use_colors
                    ? '\x1b[31m'
                    : ''
                : warning.severity === 'warning'
                    ? opts.use_colors
                        ? '\x1b[33m'
                        : ''
                    : '';
            const reset = opts.use_colors ? '\x1b[0m' : '';
            log.info(`  ${color}${warning.message}${reset}`);
            if (warning.affected_resources.length > 0) {
                log.info(`    Affected: ${warning.affected_resources.join(', ')}`);
            }
        });
        log.info('');
    }
}
export const planCommand = new Command()
    .name('plan')
    .description('Plan configuration changes')
    .option('-c, --config <path>', 'Configuration file path')
    .option('-o, --out <path>', 'Output plan to file (use "-" for stdout)')
    .option('--json', 'Output plan in JSON format')
    .option('--show-field-diffs', 'Show detailed field-level changes', true)
    .option('--show-dependencies', 'Show resource dependencies')
    .option('--check-drift', 'Check for configuration drift from remote state')
    .option('--no-colors', 'Disable colored output')
    .option('--dry-run', 'Show what would be done without making changes', true)
    .action(async (options, command) => {
    try {
        // Get global options from parent command
        const parentOpts = command.parent?.opts() || {};
        const flags = {
            profile: parentOpts.profile,
            baseUrl: parentOpts.baseUrl,
        };
        // Update output manager with current options
        output.updateOptions({
            useColors: !options.noColors,
            quiet: parentOpts.quiet,
            json: parentOpts.json,
            useSpinners: !parentOpts.json && !parentOpts.quiet,
        });
        output.startSpinner('Loading configuration...');
        // Load CLI configuration
        const cliConfig = await loadConfig(flags);
        log.debug('CLI Configuration loaded', redactSensitive(cliConfig));
        // Determine base directory for hypernative configs
        const baseDir = options.config ? dirname(options.config) : process.cwd();
        // Load and validate hypernative resource configurations
        output.updateSpinner('Loading Hypernative resource configurations...');
        const configResult = await loadHypernativeConfig(baseDir, {
            strict: true,
            validateReferences: true,
            interpolateEnv: false, // Disable for testing
        });
        const { config: hypernativeConfig, metadata } = configResult;
        output.succeedSpinner(`Loaded ${metadata.total_resources} resources from ${metadata.files_loaded.length} files`);
        // Report loaded resources (detailed info)
        log.info(`Resource breakdown: ${metadata.resource_counts.notification_channels} channels, ${metadata.resource_counts.watchlists} watchlists, ${metadata.resource_counts.custom_agents} agents`);
        if (metadata.load_time) {
            log.debug(`Configuration loaded in ${metadata.load_time}ms`);
        }
        if (options.dryRun) {
            log.info('Running in dry-run mode');
        }
        log.info(`Using profile: ${cliConfig.profile}`);
        log.debug(`API endpoint: ${cliConfig.baseUrl}`);
        // Display configuration summary if not JSON output
        if (!parentOpts.json) {
            displayConfigurationSummary(hypernativeConfig);
        }
        // Check for existing lock
        output.startSpinner('Checking for operation locks...');
        const stateStore = new StateStore(baseDir);
        const lockCheck = await stateStore.isLocked();
        if (lockCheck.locked) {
            output.failSpinner(`Another operation is in progress (PID: ${lockCheck.lockInfo?.pid})`);
            log.error(`Another hypernative operation is in progress (PID: ${lockCheck.lockInfo?.pid}, operation: ${lockCheck.lockInfo?.operation})`);
            log.info('If you believe this is an error, you can remove the lock file manually:');
            log.info(`  rm ${stateStore.getStateDir()}/.lock`);
            process.exit(1);
        }
        output.succeedSpinner('No operation locks found');
        // Initialize planner and generate execution plan
        output.startSpinner('Generating execution plan...');
        const planner = new Planner(baseDir);
        const executionPlan = await planner.generatePlan(hypernativeConfig, {
            include_field_diffs: options.showFieldDiffs,
            check_drift: options.checkDrift,
            redact_secrets: true,
            include_dependencies: options.showDependencies,
            max_diff_depth: 10,
        });
        const { summary } = executionPlan;
        const totalChanges = summary.to_create + summary.to_update + summary.to_replace + summary.to_delete;
        if (totalChanges === 0) {
            output.succeedSpinner('Plan generated - no changes required');
        }
        else {
            output.succeedSpinner(`Plan generated - ${totalChanges} changes required`);
        }
        // Handle output format
        if (parentOpts.json || options.json) {
            const planFile = await createPlanFile(executionPlan);
            const jsonOutput = JSON.stringify(planFile, null, 2);
            if (options.out) {
                if (options.out === '-') {
                    console.log(jsonOutput);
                }
                else {
                    const outputPath = options.out.endsWith('.json') ? options.out : `${options.out}.json`;
                    writeFileSync(outputPath, jsonOutput, 'utf-8');
                    log.info('Plan saved', { path: outputPath });
                }
            }
            else {
                console.log(jsonOutput);
            }
        }
        else {
            // Human-readable output
            const displayOptions = {
                use_colors: !options.noColors && !parentOpts.noColors,
                show_field_diffs: options.showFieldDiffs,
                show_dependencies: options.showDependencies,
                max_field_diffs: 10,
                compact_arrays: true,
            };
            displayExecutionPlan(executionPlan, displayOptions);
            // Save plan file if requested
            if (options.out) {
                output.startSpinner('Saving plan file...');
                const planFile = await createPlanFile(executionPlan);
                const outputPath = options.out === '-' ? '/dev/stdout' : options.out;
                if (outputPath !== '/dev/stdout') {
                    const finalPath = outputPath.endsWith('.json') ? outputPath : `${outputPath}.json`;
                    writeFileSync(finalPath, JSON.stringify(planFile, null, 2), 'utf-8');
                    output.succeedSpinner(`Plan saved to: ${finalPath}`);
                }
            }
        }
        // Display final summary
        if (!(parentOpts.json || options.json)) {
            if (totalChanges > 0) {
                log.success('\nPlan completed successfully');
                log.info('Next steps:');
                log.info('  Run `hypernative apply` to execute the planned changes');
            }
            else {
                log.success('\nPlan completed - no changes required');
            }
        }
        // Clean up
        output.cleanup();
        // Set appropriate exit code
        if (executionPlan.warnings?.some((w) => w.severity === 'error')) {
            process.exit(1); // Errors found
        }
        else if (totalChanges > 0) {
            process.exit(2); // Changes present
        }
        else {
            process.exit(0); // No changes
        }
    }
    catch (error) {
        output.cleanup();
        if (error instanceof ConfigurationValidationError) {
            log.error('Configuration validation failed:');
            error.errors.forEach((err) => {
                const location = err.line_number ? `${err.file_path}:${err.line_number}` : err.file_path;
                const resource = err.resource_name ? ` (${err.resource_type}: ${err.resource_name})` : '';
                log.error(`  ${location}${resource}: ${err.message}`);
            });
            process.exit(1);
        }
        else if (error instanceof Error) {
            log.error('Configuration error:', error.message);
        }
        else {
            log.error('Unknown configuration error:', String(error));
        }
        process.exit(1);
    }
});
//# sourceMappingURL=plan.js.map