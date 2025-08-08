import { Command } from 'commander';
import { readFileSync, existsSync } from 'fs';
import { dirname } from 'path';
import { log } from '../lib/logger.js';
import { loadConfig, redactSensitive, type CommandFlags } from '../lib/config.js';
import { loadHypernativeConfig, ConfigurationValidationError } from '../lib/config-loader.js';
import { ApiClient } from '../lib/api-client.js';
import { Planner } from '../lib/planner.js';
import { Executor } from '../lib/executor.js';
import type { ParsedConfig } from '../schemas/config.schema.js';
import type { ExecutionPlan, PlanFile, ExecutionOptions } from '../types/plan.js';

/**
 * Load execution plan from file
 */
function loadExecutionPlan(planPath: string): ExecutionPlan {
  if (!existsSync(planPath)) {
    throw new Error(`Plan file not found: ${planPath}`);
  }

  try {
    const planContent = readFileSync(planPath, 'utf-8');
    const planFile: PlanFile = JSON.parse(planContent);
    
    // Validate plan file structure
    if (!planFile.plan || !planFile.version) {
      throw new Error('Invalid plan file format');
    }

    log.info(`Loaded execution plan: ${planFile.plan.metadata.plan_id}`);
    log.info(`Plan created: ${planFile.plan.metadata.created_at}`);
    
    return planFile.plan;
  } catch (error) {
    throw new Error(`Failed to load plan file: ${error}`);
  }
}

/**
 * Prompt user for confirmation
 */
async function confirmExecution(plan: ExecutionPlan): Promise<boolean> {
  const { summary } = plan;
  const totalChanges = summary.to_create + summary.to_update + summary.to_replace + summary.to_delete;
  
  if (totalChanges === 0) {
    log.info('No changes to apply');
    return true;
  }

  log.info(`\nThis will make the following changes:`);
  if (summary.to_create > 0) log.info(`  - Create ${summary.to_create} resources`);
  if (summary.to_update > 0) log.info(`  - Update ${summary.to_update} resources`);
  if (summary.to_replace > 0) log.info(`  - Replace ${summary.to_replace} resources`);
  if (summary.to_delete > 0) log.info(`  - Delete ${summary.to_delete} resources`);

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
      const flags: CommandFlags = {
        profile: parentOpts.profile,
        baseUrl: parentOpts.baseUrl,
      };

      // Load CLI configuration
      const cliConfig = await loadConfig(flags);
      log.debug('CLI Configuration loaded', redactSensitive(cliConfig));

      let executionPlan: ExecutionPlan;
      let hypernativeConfig: ParsedConfig;
      let baseDir: string;

      if (options.plan) {
        // Execute from saved plan
        log.info(`Loading execution plan from: ${options.plan}`);
        executionPlan = loadExecutionPlan(options.plan);
        baseDir = executionPlan.metadata.base_directory;
        
        // Reload configuration from the base directory
        const configResult = await loadHypernativeConfig(baseDir, {
          strict: true,
          validateReferences: true,
          interpolateEnv: false,
        });
        hypernativeConfig = configResult.config;
        
      } else {
        // Generate fresh plan
        log.info('Generating fresh execution plan...');
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
          max_diff_depth: 10
        });
      }

      const { summary } = executionPlan;
      const totalChanges = summary.to_create + summary.to_update + summary.to_replace + summary.to_delete;

      if (totalChanges === 0) {
        log.success('No changes required - configuration matches current state');
        return;
      }

      log.info(`Ready to apply ${totalChanges} changes`);

      if (options.dryRun) {
        log.info('Running in dry-run mode - no changes will be made');
      }

      // Confirm execution unless forced
      if (!options.force && !options.dryRun) {
        const confirmed = await confirmExecution(executionPlan);
        if (!confirmed) {
          log.info('Execution cancelled by user');
          process.exit(0);
        }
      }

      // Initialize API client and executor
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
        continueOnError: options.continueOnError
      });

      // Check if execution can proceed
      const canExecute = await executor.canExecute();
      if (!canExecute.canExecute) {
        log.error(`Cannot execute: ${canExecute.reason}`);
        process.exit(1);
      }

      // Execute the plan
      log.info('Starting execution...');
      const executionOptions: ExecutionOptions = {
        continueOnError: options.continueOnError,
        parallelism: parseInt(options.parallelism)
      };

      const result = await executor.execute(executionPlan, hypernativeConfig, executionOptions);

      // Report results
      const { summary: execSummary } = result;
      
      if (result.success) {
        log.success(`All changes applied successfully!`);
        log.info(`Summary: ${execSummary.successful}/${execSummary.total_resources} resources processed`);
        log.info(`  - Created: ${execSummary.by_change_type.created}`);
        log.info(`  - Updated: ${execSummary.by_change_type.updated}`);
        log.info(`  - Replaced: ${execSummary.by_change_type.replaced}`);
        log.info(`  - Deleted: ${execSummary.by_change_type.deleted}`);
        log.info(`Execution completed in ${execSummary.duration_ms}ms`);
      } else {
        log.error(`Execution completed with errors: ${execSummary.failed}/${execSummary.total_resources} failed`);
        
        // Show failed resources
        const failedResults = result.results.filter(r => !r.success);
        failedResults.forEach(r => {
          log.error(`  Failed: ${r.resource_kind}.${r.resource_name} - ${r.error}`);
        });
        
        if (result.rolled_back && result.rolled_back.length > 0) {
          log.warn(`Rolled back changes: ${result.rolled_back.join(', ')}`);
        }
        
        process.exit(1);
      }

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
        log.error('Apply failed:', error.message);
      } else {
        log.error('Unknown apply error:', String(error));
      }
      process.exit(1);
    }
  });
