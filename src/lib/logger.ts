import winston from 'winston';
import chalk from 'chalk';

const { combine, timestamp, printf, errors } = winston.format;

// Custom format for console output
const consoleFormat = printf(({ level, message, timestamp: ts, ...meta }) => {
  const metaString = Object.keys(meta).length ? JSON.stringify(meta, null, 2) : '';
  return `${chalk.gray(ts)} ${level.toUpperCase()} ${message} ${metaString}`;
});

// Create logger instance
export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(errors({ stack: true }), timestamp({ format: 'HH:mm:ss' }), consoleFormat),
  transports: [
    new winston.transports.Console({
      format: consoleFormat,
    }),
  ],
});

// Convenience methods for different log levels with colors
export const log = {
  info: (message: string, ...args: unknown[]) => {
    console.log(chalk.blue('ℹ'), message, ...args);
  },
  success: (message: string, ...args: unknown[]) => {
    console.log(chalk.green('✓'), message, ...args);
  },
  warn: (message: string, ...args: unknown[]) => {
    console.log(chalk.yellow('⚠'), message, ...args);
  },
  error: (message: string, ...args: unknown[]) => {
    console.log(chalk.red('✗'), message, ...args);
  },
  debug: (message: string, ...args: unknown[]) => {
    if (process.env.DEBUG) {
      console.log(chalk.gray('🐛'), message, ...args);
    }
  },
};
