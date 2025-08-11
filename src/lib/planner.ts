/**
 * Planner module for the Hypernative Apply CLI
 *
 * This module provides the core planning functionality:
 * - Resource dependency graph building and topological sorting
 * - CRUD classification (Create, Update, Replace, Delete, No-op)
 * - Field-level diff computation
 * - Drift detection between local and remote state
 * - Plan generation with comprehensive metadata
 */

import { createHash } from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import { log } from './logger.js';
import { generateFingerprint } from './fingerprint.js';
import { LogRedactor } from './log-redaction.js';
import { StateStore } from './state-store.js';
import type { ParsedConfig } from '../schemas/config.schema.js';
import type { StateFile, StateEntry } from '../types/state.js';
import {
  ChangeType,
  type FieldDiff,
  type ResourceChange,
  type ResourceDependency,
  type ExecutionPlan,
  type PlanMetadata,
  type PlanSummary,
  type PlanWarning,
  type DriftDetectionResult,
  type DependencyGraph,
  type DependencyNode,
  type PlannerOptions,
  type PlanFile,
} from '../types/plan.js';

// Current CLI version - should be imported from package.json in real implementation
const CLI_VERSION = '0.1.0';

export class Planner {
  private stateStore: StateStore;
  private baseDir: string;

  constructor(baseDir: string = process.cwd()) {
    this.baseDir = baseDir;
    this.stateStore = new StateStore(baseDir);
  }

  /**
   * Generate a comprehensive execution plan
   */
  async generatePlan(config: ParsedConfig, options: PlannerOptions = {}): Promise<ExecutionPlan> {
    const startTime = Date.now();

    const opts: Required<PlannerOptions> = {
      include_field_diffs: options.include_field_diffs ?? true,
      check_drift: options.check_drift ?? false,
      redact_secrets: options.redact_secrets ?? true,
      include_dependencies: options.include_dependencies ?? true,
      max_diff_depth: options.max_diff_depth ?? 10,
    };

    log.debug('Generating execution plan with options:', LogRedactor.safeLog(opts));

    // Load current state
    const currentState = await this.stateStore.loadState();

    // Build resource dependency graph
    const dependencyGraph = this.buildDependencyGraph(config);

    // Detect changes for each resource
    const resourceChanges = await this.detectResourceChanges(config, currentState, opts);

    // Check for drift if requested
    let driftResult: DriftDetectionResult | undefined;
    if (opts.check_drift) {
      driftResult = await this.detectDrift(currentState, opts);
    }

    // Generate warnings
    const warnings = this.generateWarnings(dependencyGraph, resourceChanges, driftResult);

    // Order changes according to dependencies
    const orderedChanges = this.orderChangesByDependencies(resourceChanges, dependencyGraph);

    // Generate plan metadata
    const metadata = this.generatePlanMetadata(config, orderedChanges);

    // Generate summary statistics
    const summary = this.generatePlanSummary(orderedChanges);

    const plan: ExecutionPlan = {
      metadata,
      changes: orderedChanges,
      summary,
      dependencies: this.extractDependencyList(dependencyGraph),
      warnings: warnings.length > 0 ? warnings : undefined,
    };

    const planTime = Date.now() - startTime;
    log.debug(`Plan generated in ${planTime}ms`);

    return plan;
  }

  /**
   * Build dependency graph from configuration
   */
  private buildDependencyGraph(config: ParsedConfig): DependencyGraph {
    const nodes: Record<string, DependencyNode> = {};

    // Create nodes for all resources - handle undefined collections gracefully
    for (const [name] of Object.entries(config.notification_channels || {})) {
      nodes[name] = {
        name,
        kind: 'notification_channel',
        dependencies: [],
        dependents: [],
        depth: 0,
      };
    }

    for (const [name] of Object.entries(config.watchlists || {})) {
      nodes[name] = {
        name,
        kind: 'watchlist',
        dependencies: [],
        dependents: [],
        depth: 0,
      };
    }

    for (const [name] of Object.entries(config.custom_agents || {})) {
      nodes[name] = {
        name,
        kind: 'custom_agent',
        dependencies: [],
        dependents: [],
        depth: 0,
      };
    }

    // Build dependency relationships
    this.addDependencies(config, nodes);

    // Calculate depths and execution order
    const { executionOrder, hasCycles, cycles } = this.topologicalSort(nodes);

    return {
      nodes,
      execution_order: executionOrder,
      has_cycles: hasCycles,
      cycles,
    };
  }

  /**
   * Add dependency relationships to the graph
   */
  private addDependencies(config: ParsedConfig, nodes: Record<string, DependencyNode>): void {
    // Watchlists depend on notification channels - handle undefined collections gracefully
    for (const [watchlistName, watchlistConfig] of Object.entries(config.watchlists || {})) {
      const watchlistNode = nodes[watchlistName];
      if (!watchlistNode) continue;

      const channels = watchlistConfig.alert_config?.notification_channels || [];
      for (const channelName of channels) {
        if (nodes[channelName]) {
          watchlistNode.dependencies.push(channelName);
          nodes[channelName].dependents.push(watchlistName);
        }
      }
    }

    // Custom agents depend on notification channels - handle undefined collections gracefully
    for (const [agentName, agentConfig] of Object.entries(config.custom_agents || {})) {
      const agentNode = nodes[agentName];
      if (!agentNode) continue;

      const channels = agentConfig.notification_channels || [];
      for (const channelName of channels) {
        if (nodes[channelName]) {
          agentNode.dependencies.push(channelName);
          nodes[channelName].dependents.push(agentName);
        }
      }
    }
  }

  /**
   * Perform topological sort to determine execution order
   */
  private topologicalSort(nodes: Record<string, DependencyNode>): {
    executionOrder: string[];
    hasCycles: boolean;
    cycles: string[][];
  } {
    const visited = new Set<string>();
    const visiting = new Set<string>();
    const executionOrder: string[] = [];
    const cycles: string[][] = [];

    const visit = (nodeName: string, path: string[] = []): boolean => {
      if (visiting.has(nodeName)) {
        // Found cycle
        const cycleStart = path.indexOf(nodeName);
        if (cycleStart >= 0) {
          cycles.push(path.slice(cycleStart).concat([nodeName]));
        }
        return true; // Has cycle
      }

      if (visited.has(nodeName)) {
        return false; // No cycle from this path
      }

      visiting.add(nodeName);
      const node = nodes[nodeName];

      if (node) {
        let hasCycle = false;
        for (const depName of node.dependencies) {
          if (visit(depName, [...path, nodeName])) {
            hasCycle = true;
          }
        }

        // Calculate depth (maximum dependency depth + 1)
        node.depth = Math.max(
          0,
          ...node.dependencies.map((dep) => (nodes[dep] ? nodes[dep].depth + 1 : 0))
        );

        if (hasCycle) {
          return true;
        }
      }

      visiting.delete(nodeName);
      visited.add(nodeName);
      executionOrder.push(nodeName);
      return false;
    };

    let hasCycles = false;
    for (const nodeName of Object.keys(nodes)) {
      if (!visited.has(nodeName)) {
        if (visit(nodeName)) {
          hasCycles = true;
        }
      }
    }

    // Sort by depth (dependencies first) and then alphabetically
    executionOrder.sort((a, b) => {
      const depthA = nodes[a]?.depth || 0;
      const depthB = nodes[b]?.depth || 0;

      if (depthA !== depthB) {
        return depthA - depthB;
      }

      return a.localeCompare(b);
    });

    return { executionOrder, hasCycles, cycles };
  }

  /**
   * Detect changes for all resources
   */
  private async detectResourceChanges(
    config: ParsedConfig,
    currentState: StateFile,
    options: Required<PlannerOptions>
  ): Promise<ResourceChange[]> {
    const changes: ResourceChange[] = [];
    const desiredResources = new Map<string, { kind: string; config: any; hash: string }>();

    // Collect all desired resources - handle undefined collections gracefully
    for (const [name, channelConfig] of Object.entries(config.notification_channels || {})) {
      desiredResources.set(name, {
        kind: 'notification_channel',
        config: channelConfig,
        hash: generateFingerprint(channelConfig),
      });
    }

    for (const [name, watchlistConfig] of Object.entries(config.watchlists || {})) {
      desiredResources.set(name, {
        kind: 'watchlist',
        config: watchlistConfig,
        hash: generateFingerprint(watchlistConfig),
      });
    }

    for (const [name, agentConfig] of Object.entries(config.custom_agents || {})) {
      desiredResources.set(name, {
        kind: 'custom_agent',
        config: agentConfig,
        hash: generateFingerprint(agentConfig),
      });
    }

    // Analyze each desired resource
    for (const [name, desired] of desiredResources) {
      const existingState = currentState.resources[name];
      const change = await this.analyzeResourceChange(name, desired, existingState, options);
      changes.push(change);
    }

    // Find resources that exist in state but not in config (to delete)
    for (const [name, stateEntry] of Object.entries(currentState.resources)) {
      if (!desiredResources.has(name)) {
        changes.push({
          kind: stateEntry.kind,
          name,
          remote_id: stateEntry.remote_id,
          change_type: ChangeType.DELETE,
          current_hash: stateEntry.last_applied_hash,
          dependencies: [],
          dependents: [],
          risk_level: 'medium', // Deletions are generally medium risk
        });
      }
    }

    return changes;
  }

  /**
   * Analyze a single resource change
   */
  private async analyzeResourceChange(
    name: string,
    desired: { kind: string; config: any; hash: string },
    existingState: StateEntry | undefined,
    options: Required<PlannerOptions>
  ): Promise<ResourceChange> {
    if (!existingState) {
      // New resource
      return {
        kind: desired.kind,
        name,
        change_type: ChangeType.CREATE,
        desired_hash: desired.hash,
        dependencies: this.getResourceDependencies(name, desired.config, desired.kind),
        dependents: [],
        risk_level: 'low', // Creates are generally low risk
      };
    }

    if (existingState.last_applied_hash === desired.hash) {
      // No change needed
      return {
        kind: desired.kind,
        name,
        remote_id: existingState.remote_id,
        change_type: ChangeType.NO_CHANGE,
        current_hash: existingState.last_applied_hash,
        desired_hash: desired.hash,
        dependencies: this.getResourceDependencies(name, desired.config, desired.kind),
        dependents: [],
        risk_level: 'low',
      };
    }

    // Check for type changes in custom agents (requires REPLACE instead of UPDATE)
    let changeType = ChangeType.UPDATE;
    let requiresReplace = false;

    if (desired.kind === 'custom_agent') {
      requiresReplace = await this.requiresCustomAgentReplace(
        name,
        desired.config,
        existingState.remote_id
      );

      if (requiresReplace) {
        changeType = ChangeType.REPLACE;
        log.debug(`Custom agent '${name}' type changed, marking as REPLACE`);
      }
    }

    // Resource has changes
    let fieldDiffs: FieldDiff[] | undefined;
    let riskLevel: 'low' | 'medium' | 'high' = requiresReplace ? 'high' : 'medium';

    if (options.include_field_diffs) {
      // We don't have the old config here, but we can note that diffs are available
      // In a real implementation, we might store the last applied config

      // For now, we'll create a placeholder since we don't have old config stored
      fieldDiffs = [
        {
          path: 'config',
          old_value: '[Previous configuration]',
          new_value: '[New configuration]',
          change_type: 'changed',
        },
      ];

      // Add specific field diff for type change if it's a replace
      if (requiresReplace) {
        fieldDiffs.unshift({
          path: 'type',
          old_value: '[Previous type]',
          new_value: desired.config.type,
          change_type: 'changed',
          is_sensitive: false,
        });
      }

      // Assess risk based on the type of changes (replaces are always high risk)
      riskLevel = requiresReplace ? 'high' : this.assessChangeRisk(desired.kind, fieldDiffs);
    }

    return {
      kind: desired.kind,
      name,
      remote_id: existingState.remote_id,
      change_type: changeType,
      current_hash: existingState.last_applied_hash,
      desired_hash: desired.hash,
      field_diffs: fieldDiffs,
      dependencies: this.getResourceDependencies(name, desired.config, desired.kind),
      dependents: [],
      risk_level: riskLevel,
    };
  }

  /**
   * Get dependencies for a resource
   */
  private getResourceDependencies(name: string, config: any, kind: string): string[] {
    const dependencies: string[] = [];

    if (kind === 'watchlist' && config.alert_config?.notification_channels) {
      dependencies.push(...config.alert_config.notification_channels);
    }

    if (kind === 'custom_agent' && config.notification_channels) {
      dependencies.push(...config.notification_channels);
    }

    return dependencies;
  }

  /**
   * Assess the risk level of a change based on field diffs
   */
  private assessChangeRisk(kind: string, fieldDiffs: FieldDiff[]): 'low' | 'medium' | 'high' {
    // High-risk changes
    const highRiskPatterns = [
      /enabled/i,
      /threshold/i,
      /condition/i,
      /webhook/i,
      /api_key/i,
      /secret/i,
    ];

    // Medium-risk changes
    const mediumRiskPatterns = [/name/i, /description/i, /assets/i, /channels/i];

    let hasHighRisk = false;
    let hasMediumRisk = false;

    for (const diff of fieldDiffs) {
      if (diff.is_sensitive) {
        hasHighRisk = true;
        break;
      }

      if (highRiskPatterns.some((pattern) => pattern.test(diff.path))) {
        hasHighRisk = true;
        break;
      }

      if (mediumRiskPatterns.some((pattern) => pattern.test(diff.path))) {
        hasMediumRisk = true;
      }
    }

    if (hasHighRisk) return 'high';
    if (hasMediumRisk) return 'medium';
    return 'low';
  }

  /**
   * Order changes according to dependency graph
   */
  private orderChangesByDependencies(
    changes: ResourceChange[],
    dependencyGraph: DependencyGraph
  ): ResourceChange[] {
    const changeMap = new Map(changes.map((change) => [change.name, change]));
    const orderedChanges: ResourceChange[] = [];

    // Process in dependency order
    for (const resourceName of dependencyGraph.execution_order) {
      const change = changeMap.get(resourceName);
      if (change) {
        // Update dependents list
        const node = dependencyGraph.nodes[resourceName];
        if (node) {
          change.dependents = node.dependents;
        }
        orderedChanges.push(change);
      }
    }

    // Add any changes not in the dependency graph (shouldn't happen normally)
    for (const change of changes) {
      if (!orderedChanges.some((c) => c.name === change.name)) {
        orderedChanges.push(change);
      }
    }

    return orderedChanges;
  }

  /**
   * Detect drift from remote state (placeholder implementation)
   */
  private async detectDrift(
    _currentState: StateFile,
    _options: Required<PlannerOptions>
  ): Promise<DriftDetectionResult> {
    // This is a placeholder - in a real implementation, this would:
    // 1. Fetch current remote state for all resources
    // 2. Compare with expected state based on last_applied_hash
    // 3. Generate field-level diffs for any drift detected

    return {
      has_drift: false,
      drifted_resources: [],
      detected_at: new Date().toISOString(),
    };
  }

  /**
   * Generate plan warnings
   */
  private generateWarnings(
    dependencyGraph: DependencyGraph,
    changes: ResourceChange[],
    driftResult?: DriftDetectionResult
  ): PlanWarning[] {
    const warnings: PlanWarning[] = [];

    // Check for dependency cycles
    if (dependencyGraph.has_cycles) {
      warnings.push({
        type: 'dependency_cycle',
        message: `Dependency cycles detected: ${dependencyGraph.cycles.map((cycle) => cycle.join(' -> ')).join(', ')}`,
        affected_resources: dependencyGraph.cycles.flat(),
        severity: 'error',
      });
    }

    // Check for missing dependencies
    const allResourceNames = new Set(Object.keys(dependencyGraph.nodes));
    for (const change of changes) {
      for (const dep of change.dependencies) {
        if (!allResourceNames.has(dep)) {
          warnings.push({
            type: 'missing_dependency',
            message: `Resource '${change.name}' depends on '${dep}' which is not defined`,
            affected_resources: [change.name],
            severity: 'error',
          });
        }
      }
    }

    // Check for high-risk changes
    const highRiskChanges = changes.filter((c) => c.risk_level === 'high');
    if (highRiskChanges.length > 0) {
      warnings.push({
        type: 'high_risk_change',
        message: `${highRiskChanges.length} high-risk change${highRiskChanges.length === 1 ? '' : 's'} detected`,
        affected_resources: highRiskChanges.map((c) => c.name),
        severity: 'warning',
      });
    }

    // Check for drift
    if (driftResult?.has_drift) {
      warnings.push({
        type: 'configuration_drift',
        message: `Configuration drift detected in ${driftResult.drifted_resources.length} resource${driftResult.drifted_resources.length === 1 ? '' : 's'}`,
        affected_resources: driftResult.drifted_resources.map((r) => r.name),
        severity: 'warning',
      });
    }

    return warnings;
  }

  /**
   * Generate plan metadata
   */
  private generatePlanMetadata(config: ParsedConfig, changes: ResourceChange[]): PlanMetadata {
    const configHash = this.generateConfigHash(config);
    const contentHash = this.generateContentHash(changes);

    return {
      plan_id: uuidv4(),
      created_at: new Date().toISOString(),
      cli_version: CLI_VERSION,
      config_hash: configHash,
      content_hash: contentHash,
      base_directory: this.baseDir,
      config_files: this.getConfigFiles(config),
    };
  }

  /**
   * Generate hash of the configuration
   */
  private generateConfigHash(config: ParsedConfig): string {
    // Generate a stable hash of the entire configuration
    const configString = JSON.stringify({
      notification_channels: Object.keys(config.notification_channels || {})
        .sort()
        .reduce(
          (acc, key) => {
            acc[key] = generateFingerprint(config.notification_channels![key]);
            return acc;
          },
          {} as Record<string, string>
        ),
      watchlists: Object.keys(config.watchlists || {})
        .sort()
        .reduce(
          (acc, key) => {
            acc[key] = generateFingerprint(config.watchlists![key]);
            return acc;
          },
          {} as Record<string, string>
        ),
      custom_agents: Object.keys(config.custom_agents || {})
        .sort()
        .reduce(
          (acc, key) => {
            acc[key] = generateFingerprint(config.custom_agents![key]);
            return acc;
          },
          {} as Record<string, string>
        ),
    });

    return createHash('sha256').update(configString).digest('hex');
  }

  /**
   * Generate hash of the plan content
   */
  private generateContentHash(changes: ResourceChange[]): string {
    const contentString = JSON.stringify(
      changes
        .map((change) => ({
          name: change.name,
          kind: change.kind,
          change_type: change.change_type,
          current_hash: change.current_hash,
          desired_hash: change.desired_hash,
        }))
        .sort((a, b) => a.name.localeCompare(b.name))
    );

    return createHash('sha256').update(contentString).digest('hex');
  }

  /**
   * Get list of config files (placeholder)
   */
  private getConfigFiles(config: ParsedConfig): string[] {
    // In a real implementation, this would track which files were loaded
    const files: string[] = [];

    if (Object.keys(config.notification_channels || {}).length > 0) {
      files.push('hypernative/notification-channels/*.yaml');
    }
    if (Object.keys(config.watchlists || {}).length > 0) {
      files.push('hypernative/watchlists/*.yaml');
    }
    if (Object.keys(config.custom_agents || {}).length > 0) {
      files.push('hypernative/custom-agents/*.yaml');
    }

    return files;
  }

  /**
   * Generate plan summary statistics
   */
  private generatePlanSummary(changes: ResourceChange[]): PlanSummary {
    const summary = {
      total_resources: changes.length,
      to_create: 0,
      to_update: 0,
      to_replace: 0,
      to_delete: 0,
      no_change: 0,
      by_resource_type: {} as Record<string, any>,
    };

    const typeCounters: Record<string, any> = {};

    for (const change of changes) {
      // Initialize type counter if needed
      if (!typeCounters[change.kind]) {
        typeCounters[change.kind] = {
          to_create: 0,
          to_update: 0,
          to_replace: 0,
          to_delete: 0,
          no_change: 0,
        };
      }

      // Count by change type
      switch (change.change_type) {
        case ChangeType.CREATE:
          summary.to_create++;
          typeCounters[change.kind].to_create++;
          break;
        case ChangeType.UPDATE:
          summary.to_update++;
          typeCounters[change.kind].to_update++;
          break;
        case ChangeType.REPLACE:
          summary.to_replace++;
          typeCounters[change.kind].to_replace++;
          break;
        case ChangeType.DELETE:
          summary.to_delete++;
          typeCounters[change.kind].to_delete++;
          break;
        case ChangeType.NO_CHANGE:
          summary.no_change++;
          typeCounters[change.kind].no_change++;
          break;
      }
    }

    summary.by_resource_type = typeCounters;
    return summary;
  }

  /**
   * Extract dependency list from graph
   */
  private extractDependencyList(dependencyGraph: DependencyGraph): ResourceDependency[] {
    const dependencies: ResourceDependency[] = [];

    for (const [resourceName, node] of Object.entries(dependencyGraph.nodes)) {
      for (const depName of node.dependencies) {
        const depNode = dependencyGraph.nodes[depName];
        if (depNode) {
          dependencies.push({
            resource_name: resourceName,
            resource_kind: node.kind,
            depends_on_name: depName,
            depends_on_kind: depNode.kind,
            dependency_type: 'references', // This could be more sophisticated
          });
        }
      }
    }

    return dependencies;
  }

  /**
   * Check if a custom agent requires replacement (due to type change)
   * This method uses state metadata to track the previous agent type
   */
  private async requiresCustomAgentReplace(
    name: string,
    desiredConfig: any,
    remoteId?: string
  ): Promise<boolean> {
    if (!remoteId || !desiredConfig.type) {
      return false;
    }

    try {
      // Check if we have the previous type stored in state metadata
      const currentState = await this.stateStore.loadState();
      const existingState = currentState.resources[name];

      if (!existingState || !existingState.metadata) {
        return false; // No previous state to compare
      }

      // Look for stored agent type in metadata
      const storedType = (existingState.metadata as any).agent_type;
      if (storedType && storedType !== desiredConfig.type) {
        log.debug(
          `Custom agent '${name}' type changed from '${storedType}' to '${desiredConfig.type}', marking as REPLACE`
        );
        return true;
      }

      return false;
    } catch (error) {
      log.warn(`Failed to check type change for custom agent '${name}':`, error);
      return false; // If we can't determine, default to UPDATE to avoid data loss
    }
  }

  /**
   * Create a plan file for serialization
   */
  async createPlanFile(plan: ExecutionPlan): Promise<PlanFile> {
    const planJson = JSON.stringify(plan, null, 2);
    const signature = createHash('sha256').update(planJson).digest('hex');

    return {
      version: '1.0.0',
      plan,
      signature,
    };
  }
}

/**
 * Convenience function to generate a plan
 */
export async function generateExecutionPlan(
  config: ParsedConfig,
  baseDir?: string,
  options?: PlannerOptions
): Promise<ExecutionPlan> {
  const planner = new Planner(baseDir);
  return planner.generatePlan(config, options);
}

/**
 * Convenience function to create a plan file
 */
export async function createPlanFile(plan: ExecutionPlan): Promise<PlanFile> {
  const planner = new Planner();
  return planner.createPlanFile(plan);
}
