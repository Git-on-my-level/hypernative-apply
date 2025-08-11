export interface OutputOptions {
    useSpinners?: boolean;
    useColors?: boolean;
    quiet?: boolean;
    json?: boolean;
}
export interface ProgressOptions {
    text: string;
    total?: number;
    current?: number;
}
export declare class OutputManager {
    private options;
    private activeSpinner;
    private progressTracker;
    constructor(options?: OutputOptions);
    updateOptions(options: Partial<OutputOptions>): void;
    /**
     * Start a spinner with the given text
     */
    startSpinner(text: string): void;
    /**
     * Update spinner text
     */
    updateSpinner(text: string): void;
    /**
     * Stop spinner with success
     */
    succeedSpinner(text?: string): void;
    /**
     * Stop spinner with failure
     */
    failSpinner(text?: string): void;
    /**
     * Stop spinner with warning
     */
    warnSpinner(text?: string): void;
    /**
     * Stop current spinner
     */
    stopSpinner(): void;
    /**
     * Display progress for a multi-step operation
     */
    showProgress(id: string, options: ProgressOptions): void;
    /**
     * Create a simple ASCII progress bar
     */
    private createProgressBar;
    /**
     * Display a table-like structure for resource summaries
     */
    displayTable(headers: string[], rows: string[][]): void;
    /**
     * Display a resource summary with proper formatting
     */
    displayResourceSummary(resources: Array<{
        name: string;
        type: string;
        status: 'create' | 'update' | 'delete' | 'no-change';
        details?: string;
    }>): void;
    /**
     * Get status icon based on operation type
     */
    private getStatusIcon;
    /**
     * Get status text with appropriate coloring
     */
    private getStatusText;
    /**
     * Display a box with title and content
     */
    displayBox(title: string, content: string[]): void;
    /**
     * Clean up resources
     */
    cleanup(): void;
}
export declare const output: OutputManager;
//# sourceMappingURL=output-manager.d.ts.map