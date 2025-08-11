import { Command } from 'commander';
import { readFileSync, existsSync } from 'fs';
import { dirname } from 'path';
import { log } from '../lib/logger.js';
import { output } from '../lib/output-manager.js';
import { loadConfig, redactSensitive } from '../lib/config.js';
import { loadHypernativeConfig, ConfigurationValidationError } from '../lib/config-loader.js';
import { ApiClient } from '../lib/api-client.js';
import { Planner } from '../lib/planner.js';
import { Executor } from '../lib/executor.js';
import { SafeJsonParser } from '../lib/safe-json-parser.js';
import { basicPlanFileSchema } from '../lib/basic-validation.js';
/**
 * Load execution plan from file
 */
function loadExecutionPlan(planPath) {
    if (!existsSync(planPath)) {
        throw new Error(`Plan file not found: ${planPath}`);
    }
    try {
        const planContent = readFileSync(planPath, 'utf-8');
        const planFile = SafeJsonParser.parse(planContent, basicPlanFileSchema);
        // Validate plan file structure
        if (!planFile.plan || !planFile.version) {
            throw new Error('Invalid plan file format');
        }
        log.info(`Loaded execution plan: ${planFile.plan.metadata.plan_id}`);
        log.info(`Plan created: ${planFile.plan.metadata.created_at}`);
        return planFile.plan;
    }
    catch (error) {
        throw new Error(`Failed to load plan file: ${error}`);
    }
}
/**
 * Prompt user for confirmation
 */
async function confirmExecution(plan) {
    const { summary } = plan;
    const totalChanges = summary.to_create + summary.to_update + summary.to_replace + summary.to_delete;
    if (totalChanges === 0) {
        log.info('No changes to apply');
        return true;
    }
    log.info(`\nThis will make the following changes:`);
    if (summary.to_create > 0)
        log.info(`  - Create ${summary.to_create} resources`);
    if (summary.to_update > 0)
        log.info(`  - Update ${summary.to_update} resources`);
    if (summary.to_replace > 0)
        log.info(`  - Replace ${summary.to_replace} resources`);
    if (summary.to_delete > 0)
        log.info(`  - Delete ${summary.to_delete} resources`);
    // For now, auto-confirm in non-interactive environments
    // In a real CLI, you'd use a proper prompt library
    const isInteractive = process.stdin.isTTY && process.stdout.isTTY;
    if (!isInteractive) {
        log.warn('Non-interactive mode - auto-confirming execution');
        return true;
    }
    // Simple confirmation prompt
    return new Promise((resolve) => {
        process.stdout.write('\nDo you want to apply these changes? (y/N): ');
        process.stdin.once('data', (data) => {
            const response = data.toString().trim().toLowerCase();
            resolve(response === 'y' || response === 'yes');
        });
    });
}
export const applyCommand = new Command()
    .name('apply')
    .description('Apply configuration changes')
    .option('-c, --config <path>', 'Configuration file path')
    .option('-p, --plan <path>', 'Execute from saved plan file (JSON)')
    .option('--force', 'Force apply changes without confirmation')
    .option('--dry-run', 'Show what would be done without making changes')
    .option('--continue-on-error', 'Continue applying other resources if one fails')
    .option('--parallelism <number>', 'Maximum number of resources to process in parallel', '1')
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
            useColors: !parentOpts.noColors,
            quiet: parentOpts.quiet,
            json: parentOpts.json,
            useSpinners: !parentOpts.json && !parentOpts.quiet,
        });
        output.startSpinner('Initializing apply operation...');
        // Load CLI configuration
        const cliConfig = await loadConfig(flags);
        log.debug('CLI Configuration loaded', redactSensitive(cliConfig));
        let executionPlan;
        let hypernativeConfig;
        let baseDir;
        if (options.plan) {
            // Execute from saved plan
            output.updateSpinner(`Loading execution plan from: ${options.plan}`);
            executionPlan = loadExecutionPlan(options.plan);
            baseDir = executionPlan.metadata.base_directory;
            // Reload configuration from the base directory
            output.updateSpinner('Reloading configuration from base directory...');
            const configResult = await loadHypernativeConfig(baseDir, {
                strict: true,
                validateReferences: true,
                interpolateEnv: false,
            });
            hypernativeConfig = configResult.config;
            output.succeedSpinner('Loaded saved execution plan');
        }
        else {
            // Generate fresh plan
            output.updateSpinner('Generating fresh execution plan...');
            baseDir = options.config ? dirname(options.config) : process.cwd();
            const configResult = await loadHypernativeConfig(baseDir, {
                strict: true,
                validateReferences: true,
                interpolateEnv: false,
            });
            hypernativeConfig = configResult.config;
            const planner = new Planner(baseDir);
            executionPlan = await planner.generatePlan(hypernativeConfig, {
                include_field_diffs: true,
                check_drift: false,
                redact_secrets: true,
                include_dependencies: true,
                max_diff_depth: 10,
            });
            output.succeedSpinner('Generated fresh execution plan');
        }
        const { summary } = executionPlan;
        const totalChanges = summary.to_create + summary.to_update + summary.to_replace + summary.to_delete;
        if (totalChanges === 0) {
            log.success('No changes required - configuration matches current state');
            output.cleanup();
            return;
        }
        // Display summary of changes to be applied
        if (!parentOpts.json) {
            const changesDisplay = [
                `${totalChanges} total changes to apply`,
                summary.to_create > 0 ? `• ${summary.to_create} resources to create` : '',
                summary.to_update > 0 ? `• ${summary.to_update} resources to update` : '',
                summary.to_replace > 0 ? `• ${summary.to_replace} resources to replace` : '',
                summary.to_delete > 0 ? `• ${summary.to_delete} resources to delete` : '',
            ].filter(Boolean);
            output.displayBox('Changes to Apply', changesDisplay);
        }
        if (options.dryRun) {
            log.warn('Running in dry-run mode - no changes will be made');
        }
        // Confirm execution unless forced
        if (!options.force && !options.dryRun) {
            output.stopSpinner(); // Stop spinner for user interaction
            const confirmed = await confirmExecution(executionPlan);
            if (!confirmed) {
                log.info('Execution cancelled by user');
                output.cleanup();
                process.exit(0);
            }
        }
        // Initialize API client and executor
        output.startSpinner('Initializing API client...');
        const apiClient = new ApiClient({
            baseUrl: cliConfig.baseUrl,
            clientId: cliConfig.clientId,
            clientSecret: cliConfig.clientSecret,
        });
        const executor = new Executor({
            apiClient,
            baseDir,
            dryRun: options.dryRun,
            parallelism: parseInt(options.parallelism),
            continueOnError: options.continueOnError,
        });
        // Check if execution can proceed
        output.updateSpinner('Validating execution prerequisites...');
        const canExecute = await executor.canExecute();
        if (!canExecute.canExecute) {
            output.failSpinner(`Cannot execute: ${canExecute.reason}`);
            log.error(`Cannot execute: ${canExecute.reason}`);
            output.cleanup();
            process.exit(1);
        }
        output.succeedSpinner('Prerequisites validated');
        // Execute the plan
        output.startSpinner('Starting execution...');
        const executionOptions = {
            continueOnError: options.continueOnError,
            parallelism: parseInt(options.parallelism),
        };
        // Set up progress tracking for execution
        let processedResources = 0;
        const progressId = 'apply-execution';
        // Mock progress tracking - in real implementation, executor would emit progress events
        const progressInterval = setInterval(() => {
            output.showProgress(progressId, {
                text: 'Applying changes',
                current: processedResources,
                total: totalChanges,
            });
        }, 1000);
        const result = await executor.execute(executionPlan, hypernativeConfig, executionOptions);
        clearInterval(progressInterval);
        if (result.success) {
            output.succeedSpinner(`Successfully applied ${totalChanges} changes`);
        }
        else {
            output.failSpinner('Execution completed with errors');
        }
        // Report results
        const { summary: execSummary } = result;
        if (result.success) {
            if (parentOpts.json) {
                log.success('All changes applied successfully', {
                    summary: execSummary,
                    duration_ms: execSummary.duration_ms,
                });
            }
            else {
                // Display success summary with table
                const summaryData = [
                    `✅ All changes applied successfully!`,
                    `📊 ${execSummary.successful}/${execSummary.total_resources} resources processed`,
                    `⏱️  Completed in ${execSummary.duration_ms}ms`,
                ];
                if (execSummary.by_change_type.created > 0)
                    summaryData.push(`🆕 Created: ${execSummary.by_change_type.created}`);
                if (execSummary.by_change_type.updated > 0)
                    summaryData.push(`📝 Updated: ${execSummary.by_change_type.updated}`);
                if (execSummary.by_change_type.replaced > 0)
                    summaryData.push(`🔄 Replaced: ${execSummary.by_change_type.replaced}`);
                if (execSummary.by_change_type.deleted > 0)
                    summaryData.push(`🗑️ Deleted: ${execSummary.by_change_type.deleted}`);
                output.displayBox('Execution Results', summaryData);
            }
        }
        else {
            if (parentOpts.json) {
                log.error('Execution completed with errors', {
                    summary: execSummary,
                    failed_resources: result.results
                        .filter((r) => !r.success)
                        .map((r) => ({
                        resource: `${r.resource_kind}.${r.resource_name}`,
                        error: r.error,
                    })),
                });
            }
            else {
                const errorSummary = [
                    `❌ Execution completed with errors`,
                    `📊 ${execSummary.failed}/${execSummary.total_resources} resources failed`,
                ];
                output.displayBox('Execution Results', errorSummary);
                // Show failed resources
                const failedResults = result.results.filter((r) => !r.success);
                if (failedResults.length > 0) {
                    console.log('\nFailed Resources:');
                    failedResults.forEach((r) => {
                        log.error(`  • ${r.resource_kind}.${r.resource_name}: ${r.error}`);
                    });
                }
                if (result.rolled_back && result.rolled_back.length > 0) {
                    console.log('\nRolled Back:');
                    result.rolled_back.forEach((resource) => {
                        log.warn(`  • ${resource}`);
                    });
                }
            }
            output.cleanup();
            process.exit(1);
        }
        output.cleanup();
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
            log.error('Apply failed:', error.message);
        }
        else {
            log.error('Unknown apply error:', String(error));
        }
        process.exit(1);
    }
});
//# sourceMappingURL=apply.js.map