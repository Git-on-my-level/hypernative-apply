import ora, { type Ora } from 'ora';
import chalk from 'chalk';
import { log } from './logger.js';

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

export class OutputManager {
  private options: Required<OutputOptions>;
  private activeSpinner: Ora | null = null;
  private progressTracker: Map<string, { current: number; total: number }> = new Map();

  constructor(options: OutputOptions = {}) {
    this.options = {
      useSpinners: options.useSpinners ?? true,
      useColors: options.useColors ?? true,
      quiet: options.quiet ?? false,
      json: options.json ?? false
    };
  }

  updateOptions(options: Partial<OutputOptions>): void {
    this.options = { ...this.options, ...options };
  }

  /**
   * Start a spinner with the given text
   */
  startSpinner(text: string): void {
    if (this.options.json || this.options.quiet || !this.options.useSpinners) {
      // In JSON/quiet mode, just log the start
      if (this.options.json) {
        log.info('Operation started', { operation: text });
      }
      return;
    }

    // Stop any existing spinner
    this.stopSpinner();

    this.activeSpinner = ora({
      text,
      color: this.options.useColors ? 'cyan' : undefined
    }).start();
  }

  /**
   * Update spinner text
   */
  updateSpinner(text: string): void {
    if (this.activeSpinner) {
      this.activeSpinner.text = text;
    } else if (this.options.json) {
      log.info('Operation update', { status: text });
    }
  }

  /**
   * Stop spinner with success
   */
  succeedSpinner(text?: string): void {
    if (this.activeSpinner) {
      this.activeSpinner.succeed(text);
      this.activeSpinner = null;
    } else if (this.options.json && text) {
      log.success('Operation completed', { result: text });
    }
  }

  /**
   * Stop spinner with failure
   */
  failSpinner(text?: string): void {
    if (this.activeSpinner) {
      this.activeSpinner.fail(text);
      this.activeSpinner = null;
    } else if (this.options.json && text) {
      log.error('Operation failed', { error: text });
    }
  }

  /**
   * Stop spinner with warning
   */
  warnSpinner(text?: string): void {
    if (this.activeSpinner) {
      this.activeSpinner.warn(text);
      this.activeSpinner = null;
    } else if (this.options.json && text) {
      log.warn('Operation warning', { warning: text });
    }
  }

  /**
   * Stop current spinner
   */
  stopSpinner(): void {
    if (this.activeSpinner) {
      this.activeSpinner.stop();
      this.activeSpinner = null;
    }
  }

  /**
   * Display progress for a multi-step operation
   */
  showProgress(id: string, options: ProgressOptions): void {
    if (options.total !== undefined && options.current !== undefined) {
      this.progressTracker.set(id, { current: options.current, total: options.total });
    }

    const progress = this.progressTracker.get(id);
    if (progress && this.options.useSpinners && !this.options.json && !this.options.quiet) {
      const percentage = Math.round((progress.current / progress.total) * 100);
      const progressBar = this.createProgressBar(progress.current, progress.total);
      this.updateSpinner(`${options.text} ${progressBar} ${percentage}% (${progress.current}/${progress.total})`);
    } else if (this.options.json) {
      log.info('Progress update', {
        operation: id,
        text: options.text,
        current: options.current,
        total: options.total
      });
    } else {
      this.updateSpinner(options.text);
    }
  }

  /**
   * Create a simple ASCII progress bar
   */
  private createProgressBar(current: number, total: number, width: number = 20): string {
    const percentage = current / total;
    const filled = Math.round(width * percentage);
    const empty = width - filled;
    
    if (!this.options.useColors) {
      return `[${'='.repeat(filled)}${' '.repeat(empty)}]`;
    }
    
    return chalk.gray('[') + 
           chalk.green('='.repeat(filled)) + 
           chalk.gray(' '.repeat(empty)) + 
           chalk.gray(']');
  }

  /**
   * Display a table-like structure for resource summaries
   */
  displayTable(headers: string[], rows: string[][]): void {
    if (this.options.json) {
      log.info('Table data', { headers, rows });
      return;
    }

    if (this.options.quiet) return;

    // Calculate column widths
    const columnWidths = headers.map((header, index) => {
      const maxContentWidth = Math.max(...rows.map(row => (row[index] || '').length));
      return Math.max(header.length, maxContentWidth);
    });

    // Display header
    const headerRow = headers.map((header, index) => 
      header.padEnd(columnWidths[index])
    ).join(' | ');
    
    console.log(this.options.useColors ? chalk.bold(headerRow) : headerRow);
    console.log('-'.repeat(headerRow.length));

    // Display rows
    rows.forEach(row => {
      const formattedRow = row.map((cell, index) => 
        (cell || '').padEnd(columnWidths[index])
      ).join(' | ');
      console.log(formattedRow);
    });
  }

  /**
   * Display a resource summary with proper formatting
   */
  displayResourceSummary(resources: Array<{
    name: string;
    type: string;
    status: 'create' | 'update' | 'delete' | 'no-change';
    details?: string;
  }>): void {
    if (this.options.json) {
      log.info('Resource summary', { resources });
      return;
    }

    if (this.options.quiet) return;

    console.log('\n' + (this.options.useColors ? chalk.bold('Resources:') : 'Resources:'));
    
    resources.forEach(resource => {
      const statusIcon = this.getStatusIcon(resource.status);
      const statusText = this.getStatusText(resource.status);
      const details = resource.details ? ` (${resource.details})` : '';
      
      console.log(`  ${statusIcon} ${resource.type}.${resource.name}${details}`);
    });
  }

  /**
   * Get status icon based on operation type
   */
  private getStatusIcon(status: string): string {
    if (!this.options.useColors) {
      return {
        'create': '+',
        'update': '~',
        'delete': '-',
        'no-change': '='
      }[status] || '?';
    }

    return {
      'create': chalk.green('+'),
      'update': chalk.yellow('~'),
      'delete': chalk.red('-'),
      'no-change': chalk.gray('=')
    }[status] || chalk.gray('?');
  }

  /**
   * Get status text with appropriate coloring
   */
  private getStatusText(status: string): string {
    if (!this.options.useColors) {
      return status.toUpperCase();
    }

    return {
      'create': chalk.green('CREATE'),
      'update': chalk.yellow('UPDATE'),
      'delete': chalk.red('DELETE'),
      'no-change': chalk.gray('NO CHANGE')
    }[status] || chalk.gray('UNKNOWN');
  }

  /**
   * Display a box with title and content
   */
  displayBox(title: string, content: string[]): void {
    if (this.options.json) {
      log.info(title, { content });
      return;
    }

    if (this.options.quiet) return;

    const maxWidth = Math.max(title.length, ...content.map(line => line.length)) + 4;
    const border = '─'.repeat(maxWidth);
    
    const coloredBorder = this.options.useColors ? chalk.gray(border) : border;
    const coloredTitle = this.options.useColors ? chalk.bold(title) : title;
    
    console.log(`┌${coloredBorder}┐`);
    console.log(`│ ${coloredTitle}${' '.repeat(maxWidth - title.length - 1)}│`);
    console.log(`├${coloredBorder}┤`);
    
    content.forEach(line => {
      const padding = ' '.repeat(Math.max(0, maxWidth - line.length - 1));
      console.log(`│ ${line}${padding}│`);
    });
    
    console.log(`└${coloredBorder}┘`);
  }

  /**
   * Clean up resources
   */
  cleanup(): void {
    this.stopSpinner();
    this.progressTracker.clear();
  }
}

// Global output manager instance
export const output = new OutputManager();