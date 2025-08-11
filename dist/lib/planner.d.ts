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
import type { ParsedConfig } from '../schemas/config.schema.js';
import { type ExecutionPlan, type PlannerOptions, type PlanFile } from '../types/plan.js';
export declare class Planner {
    private stateStore;
    private baseDir;
    constructor(baseDir?: string);
    /**
     * Generate a comprehensive execution plan
     */
    generatePlan(config: ParsedConfig, options?: PlannerOptions): Promise<ExecutionPlan>;
    /**
     * Build dependency graph from configuration
     */
    private buildDependencyGraph;
    /**
     * Add dependency relationships to the graph
     */
    private addDependencies;
    /**
     * Perform topological sort to determine execution order
     */
    private topologicalSort;
    /**
     * Detect changes for all resources
     */
    private detectResourceChanges;
    /**
     * Analyze a single resource change
     */
    private analyzeResourceChange;
    /**
     * Get dependencies for a resource
     */
    private getResourceDependencies;
    /**
     * Assess the risk level of a change based on field diffs
     */
    private assessChangeRisk;
    /**
     * Order changes according to dependency graph
     */
    private orderChangesByDependencies;
    /**
     * Detect drift from remote state (placeholder implementation)
     */
    private detectDrift;
    /**
     * Generate plan warnings
     */
    private generateWarnings;
    /**
     * Generate plan metadata
     */
    private generatePlanMetadata;
    /**
     * Generate hash of the configuration
     */
    private generateConfigHash;
    /**
     * Generate hash of the plan content
     */
    private generateContentHash;
    /**
     * Get list of config files (placeholder)
     */
    private getConfigFiles;
    /**
     * Generate plan summary statistics
     */
    private generatePlanSummary;
    /**
     * Extract dependency list from graph
     */
    private extractDependencyList;
    /**
     * Check if a custom agent requires replacement (due to type change)
     * This method uses state metadata to track the previous agent type
     */
    private requiresCustomAgentReplace;
    /**
     * Create a plan file for serialization
     */
    createPlanFile(plan: ExecutionPlan): Promise<PlanFile>;
}
/**
 * Convenience function to generate a plan
 */
export declare function generateExecutionPlan(config: ParsedConfig, baseDir?: string, options?: PlannerOptions): Promise<ExecutionPlan>;
/**
 * Convenience function to create a plan file
 */
export declare function createPlanFile(plan: ExecutionPlan): Promise<PlanFile>;
//# sourceMappingURL=planner.d.ts.map