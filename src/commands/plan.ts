import { Command } from 'commander';
import { dirname, join } from 'path';
import { writeFileSync } from 'fs';
import { log } from '../lib/logger.js';
import { loadConfig, redactSensitive, type CommandFlags } from '../lib/config.js';
import { loadHypernativeConfig, ConfigurationValidationError } from '../lib/config-loader.js';
import { StateStore } from '../lib/state-store.js';
import { Planner, createPlanFile } from '../lib/planner.js';
import { formatFieldDiffs } from '../lib/diff-engine.js';
import type { ParsedConfig } from '../schemas/config.schema.js';
import type { StateComparison } from '../types/state.js';
import type { ExecutionPlan, ResourceChange, PlanDisplayOptions } from '../types/plan.js';
import { ChangeType } from '../types/plan.js';

/**
 * Display a summary of the loaded configuration
 */
function displayConfigurationSummary(config: ParsedConfig): void {
  log.info('\n📋 Configuration Summary');
  
  // Notification Channels
  const channels = Object.entries(config.notification_channels);
  if (channels.length > 0) {
    log.info(`\n🔔 Notification Channels (${channels.length}):`);
    channels.forEach(([name, channel]) => {
      const status = channel.enabled ? '✅' : '❌';
      log.info(`  ${status} ${name} (${channel.type})`);
    });
  }

  // Watchlists
  const watchlists = Object.entries(config.watchlists);
  if (watchlists.length > 0) {
    log.info(`\n👀 Watchlists (${watchlists.length}):`);
    watchlists.forEach(([name, watchlist]) => {
      const status = watchlist.enabled ? '✅' : '❌';
      const assetCount = watchlist.assets.length;
      log.info(`  ${status} ${name} (${assetCount} assets)`);
    });
  }

  // Custom Agents
  const agents = Object.entries(config.custom_agents);
  if (agents.length > 0) {
    log.info(`\n🤖 Custom Agents (${agents.length}):`);
    agents.forEach(([name, agent]) => {
      const status = agent.enabled ? '✅' : '❌';
      log.info(`  ${status} ${name} (${agent.type}, ${agent.severity})`);
    });
  }

  // Global Configuration
  if (config.global) {
    log.info('\n🌍 Global Configuration:');
    if (config.global.project) {
      log.info(`  Project: ${config.global.project.name || 'Unnamed'}`);
      log.info(`  Environment: ${config.global.project.environment || 'development'}`);
    }
    if (config.global.defaults) {
      log.info(`  Default timezone: ${config.global.defaults.timezone || 'UTC'}`);
      if (config.global.defaults.notification_channels) {
        log.info(`  Default channels: ${config.global.defaults.notification_channels.join(', ')}`);
      }
    }
  }
}

/**
 * Display the execution plan based on planner output
 */
function displayExecutionPlan(plan: ExecutionPlan, options: PlanDisplayOptions = {}): void {
  const opts: Required<PlanDisplayOptions> = {
    use_colors: options.use_colors ?? true,
    show_field_diffs: options.show_field_diffs ?? true,
    show_dependencies: options.show_dependencies ?? false,
    max_field_diffs: options.max_field_diffs ?? 5,
    compact_arrays: options.compact_arrays ?? true
  };

  const { summary } = plan;
  const totalChanges = summary.to_create + summary.to_update + summary.to_replace + summary.to_delete;
  
  if (totalChanges === 0) {
    log.success('\n✅ No changes required - configuration matches current state');
    if (summary.no_change > 0) {
      log.info('\nAll resources are up to date:');
      const noChangeResources = plan.changes.filter(c => c.change_type === ChangeType.NO_CHANGE);
      noChangeResources.forEach(resource => {
        const hash = resource.current_hash?.substring(0, 12) || 'unknown';
        log.info(`  = ${resource.kind}.${resource.name} (${hash}...)`);
      });
    }
    return;
  }

  // Display plan summary
  const summaryParts: string[] = [];
  if (summary.to_create > 0) summaryParts.push(`${summary.to_create} to create`);
  if (summary.to_update > 0) summaryParts.push(`${summary.to_update} to update`);
  if (summary.to_replace > 0) summaryParts.push(`${summary.to_replace} to replace`);
  if (summary.to_delete > 0) summaryParts.push(`${summary.to_delete} to delete`);
  
  log.info(`\n📋 Execution Plan: ${summaryParts.join(', ')}\n`);

  // Group changes by type
  const changesByType = {
    [ChangeType.CREATE]: plan.changes.filter(c => c.change_type === ChangeType.CREATE),
    [ChangeType.UPDATE]: plan.changes.filter(c => c.change_type === ChangeType.UPDATE),
    [ChangeType.REPLACE]: plan.changes.filter(c => c.change_type === ChangeType.REPLACE),
    [ChangeType.DELETE]: plan.changes.filter(c => c.change_type === ChangeType.DELETE),
    [ChangeType.NO_CHANGE]: plan.changes.filter(c => c.change_type === ChangeType.NO_CHANGE)
  };

  // Display creates
  if (changesByType[ChangeType.CREATE].length > 0) {
    log.info('Resources to CREATE:');
    changesByType[ChangeType.CREATE].forEach(resource => {
      const color = opts.use_colors ? '\x1b[32m' : '';
      const reset = opts.use_colors ? '\x1b[0m' : '';
      log.info(`  ${color}+ ${resource.kind}.${resource.name}${reset}`);
      
      if (resource.desired_hash) {
        log.info(`    Hash: ${resource.desired_hash.substring(0, 12)}...`);
      }
      
      if (resource.dependencies.length > 0 && opts.show_dependencies) {
        log.info(`    Dependencies: ${resource.dependencies.join(', ')}`);
      }
    });
    log.info('');
  }

  // Display updates
  if (changesByType[ChangeType.UPDATE].length > 0) {
    log.info('Resources to UPDATE:');
    changesByType[ChangeType.UPDATE].forEach(resource => {
      const color = opts.use_colors ? '\x1b[33m' : '';
      const reset = opts.use_colors ? '\x1b[0m' : '';
      log.info(`  ${color}~ ${resource.kind}.${resource.name}${reset}`);
      
      if (resource.current_hash && resource.desired_hash) {
        log.info(`    Hash: ${resource.current_hash.substring(0, 12)}... -> ${resource.desired_hash.substring(0, 12)}...`);
      }
      
      // Show field diffs if available
      if (opts.show_field_diffs && resource.field_diffs && resource.field_diffs.length > 0) {
        const diffLines = formatFieldDiffs(resource.field_diffs, { 
          maxDiffs: opts.max_field_diffs,
          useColors: opts.use_colors 
        });
        diffLines.forEach(line => log.info(`      ${line}`));
      }
      
      if (resource.dependencies.length > 0 && opts.show_dependencies) {
        log.info(`    Dependencies: ${resource.dependencies.join(', ')}`);
      }
    });
    log.info('');
  }

  // Display replaces
  if (changesByType[ChangeType.REPLACE].length > 0) {
    log.info('Resources to REPLACE:');
    changesByType[ChangeType.REPLACE].forEach(resource => {
      const color = opts.use_colors ? '\x1b[35m' : '';
      const reset = opts.use_colors ? '\x1b[0m' : '';
      log.info(`  ${color}± ${resource.kind}.${resource.name}${reset}`);
      
      if (resource.current_hash && resource.desired_hash) {
        log.info(`    Hash: ${resource.current_hash.substring(0, 12)}... -> ${resource.desired_hash.substring(0, 12)}...`);
      }
    });
    log.info('');
  }

  // Display deletes
  if (changesByType[ChangeType.DELETE].length > 0) {
    log.info('Resources to DELETE:');
    changesByType[ChangeType.DELETE].forEach(resource => {
      const color = opts.use_colors ? '\x1b[31m' : '';
      const reset = opts.use_colors ? '\x1b[0m' : '';
      log.info(`  ${color}- ${resource.kind}.${resource.name}${reset}`);
      
      if (resource.remote_id) {
        log.info(`    Remote ID: ${resource.remote_id}`);
      }
    });
    log.info('');
  }

  // Display no-change resources (only if requested)
  if (changesByType[ChangeType.NO_CHANGE].length > 0 && opts.show_dependencies) {
    log.info('Resources with NO CHANGE:');
    changesByType[ChangeType.NO_CHANGE].forEach(resource => {
      const hash = resource.current_hash?.substring(0, 12) || 'unknown';
      log.info(`  = ${resource.kind}.${resource.name} (${hash}...)`);
    });
    log.info('');
  }

  // Display warnings
  if (plan.warnings && plan.warnings.length > 0) {
    log.info('⚠️  Warnings:');
    plan.warnings.forEach(warning => {
      const color = warning.severity === 'error' ? (opts.use_colors ? '\x1b[31m' : '') : 
                   warning.severity === 'warning' ? (opts.use_colors ? '\x1b[33m' : '') : '';
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
      const flags: CommandFlags = {
        profile: parentOpts.profile,
        baseUrl: parentOpts.baseUrl,
      };

      // Load CLI configuration
      const cliConfig = await loadConfig(flags);
      log.debug('CLI Configuration loaded', redactSensitive(cliConfig));

      log.info('Planning changes...');

      // Determine base directory for hypernative configs
      const baseDir = options.config ? dirname(options.config) : process.cwd();
      
      // Load and validate hypernative resource configurations
      log.info('Loading Hypernative resource configurations...');
      const configResult = await loadHypernativeConfig(baseDir, {
        strict: true,
        validateReferences: true,
        interpolateEnv: false, // Disable for testing
      });

      const { config: hypernativeConfig, metadata } = configResult;

      // Report loaded resources
      log.info(`Loaded ${metadata.total_resources} resources from ${metadata.files_loaded.length} files:`);
      log.info(`  - ${metadata.resource_counts.notification_channels} notification channels`);
      log.info(`  - ${metadata.resource_counts.watchlists} watchlists`);
      log.info(`  - ${metadata.resource_counts.custom_agents} custom agents`);
      
      if (metadata.load_time) {
        log.info(`Configuration loaded in ${metadata.load_time}ms`);
      }

      if (options.dryRun) {
        log.info('Running in dry-run mode');
      }

      log.info(`Using profile: ${cliConfig.profile}`);
      log.info(`API endpoint: ${cliConfig.baseUrl}`);

      // Display configuration summary if not JSON output
      if (!options.json) {
        displayConfigurationSummary(hypernativeConfig);
      }

      // Initialize planner
      log.info('\nGenerating execution plan...');
      const planner = new Planner(baseDir);
      
      // Check for existing lock
      const stateStore = new StateStore(baseDir);
      const lockCheck = await stateStore.isLocked();
      if (lockCheck.locked) {
        log.error(`Another hypernative operation is in progress (PID: ${lockCheck.lockInfo?.pid}, operation: ${lockCheck.lockInfo?.operation})`);
        log.info('If you believe this is an error, you can remove the lock file manually:');
        log.info(`  rm ${stateStore.getStateDir()}/.lock`);
        process.exit(1);
      }

      // Generate comprehensive execution plan
      const executionPlan = await planner.generatePlan(hypernativeConfig, {
        include_field_diffs: options.showFieldDiffs,
        check_drift: options.checkDrift,
        redact_secrets: true,
        include_dependencies: options.showDependencies,
        max_diff_depth: 10
      });

      // Handle output format
      if (options.json) {
        const planFile = await createPlanFile(executionPlan);
        const jsonOutput = JSON.stringify(planFile, null, 2);
        
        if (options.out) {
          if (options.out === '-') {
            console.log(jsonOutput);
          } else {
            const outputPath = options.out.endsWith('.json') ? options.out : `${options.out}.json`;
            writeFileSync(outputPath, jsonOutput, 'utf-8');
            log.info(`Plan saved to: ${outputPath}`);
          }
        } else {
          console.log(jsonOutput);
        }
      } else {
        // Human-readable output
        const displayOptions: PlanDisplayOptions = {
          use_colors: !options.noColors,
          show_field_diffs: options.showFieldDiffs,
          show_dependencies: options.showDependencies,
          max_field_diffs: 10,
          compact_arrays: true
        };
        
        displayExecutionPlan(executionPlan, displayOptions);
        
        // Save plan file if requested
        if (options.out) {
          const planFile = await createPlanFile(executionPlan);
          const outputPath = options.out === '-' ? '/dev/stdout' : options.out;
          
          if (outputPath !== '/dev/stdout') {
            const finalPath = outputPath.endsWith('.json') ? outputPath : `${outputPath}.json`;
            writeFileSync(finalPath, JSON.stringify(planFile, null, 2), 'utf-8');
            log.info(`\nPlan saved to: ${finalPath}`);
          }
        }
      }
      
      // Display summary
      const { summary } = executionPlan;
      const totalChanges = summary.to_create + summary.to_update + summary.to_replace + summary.to_delete;
      
      if (!options.json) {
        log.success('\nPlan completed successfully');
        
        if (totalChanges > 0) {
          log.info('\nNext steps:');
          log.info('  Run `hypernative apply` to execute the planned changes');
        }
      }
      
      // Set appropriate exit code
      if (executionPlan.warnings?.some(w => w.severity === 'error')) {
        process.exit(1); // Errors found
      } else if (totalChanges > 0) {
        process.exit(2); // Changes present
      } else {
        process.exit(0); // No changes
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
        log.error('Configuration error:', error.message);
      } else {
        log.error('Unknown configuration error:', String(error));
      }
      process.exit(1);
    }
  });
