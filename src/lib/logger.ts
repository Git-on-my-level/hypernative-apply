import winston from 'winston';
import chalk from 'chalk';

const { combine, timestamp, printf, errors, json } = winston.format;

export interface LogEntry {
  level: string;
  message: string;
  timestamp: string;
  requestId?: string;
  httpTiming?: {
    method: string;
    url: string;
    duration: number;
    status?: number;
  };
  rateLimit?: {
    limit: number;
    remaining: number;
    resetTime: Date;
  };
  [key: string]: any;
}

export interface GlobalFlags {
  json?: boolean;
  quiet?: boolean;
  debug?: boolean;
  noColors?: boolean;
}

// Global flags that affect logging behavior
let globalFlags: GlobalFlags = {};

export function setGlobalFlags(flags: GlobalFlags): void {
  globalFlags = { ...flags };
  // Update winston logger level based on flags
  if (flags.debug) {
    logger.level = 'debug';
  } else if (flags.quiet) {
    logger.level = 'warn';
  } else {
    logger.level = process.env.LOG_LEVEL || 'info';
  }
}

// Custom format for human-readable console output
const humanFormat = printf((info: any) => {
  const { level, message, timestamp: ts, requestId, httpTiming, rateLimit, ...meta } = info;
  const useColors = !globalFlags.noColors;
  const metaString = Object.keys(meta).length ? JSON.stringify(meta, null, 2) : '';
  
  let formattedMessage = useColors ? `${chalk.gray(ts)} ${level.toUpperCase()} ${message}` : `${ts} ${level.toUpperCase()} ${message}`;
  
  if (requestId && typeof requestId === 'string') {
    formattedMessage += ` [req:${requestId.substring(0, 8)}]`;
  }
  
  if (httpTiming && typeof httpTiming === 'object' && httpTiming !== null && globalFlags.debug) {
    const timing = ` (${httpTiming.method} ${httpTiming.url} - ${httpTiming.duration}ms${httpTiming.status ? ` [${httpTiming.status}]` : ''})`;
    formattedMessage += useColors ? chalk.gray(timing) : timing;
  }
  
  if (rateLimit && typeof rateLimit === 'object' && rateLimit !== null && globalFlags.debug) {
    const rateLimitInfo = ` [rate-limit: ${rateLimit.remaining}/${rateLimit.limit}]`;
    formattedMessage += useColors ? chalk.yellow(rateLimitInfo) : rateLimitInfo;
  }
  
  return `${formattedMessage} ${metaString}`;
});

// JSON format for structured output
const structuredFormat = combine(
  errors({ stack: true }),
  timestamp(),
  json()
);

// Create logger instance
export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(errors({ stack: true }), timestamp({ format: 'HH:mm:ss' })),
  transports: [
    new winston.transports.Console({
      format: globalFlags.json ? structuredFormat : humanFormat,
    }),
  ],
});

// Update transport format when global flags change
function updateLoggerFormat(): void {
  logger.clear();
  logger.add(new winston.transports.Console({
    format: globalFlags.json ? structuredFormat : humanFormat,
  }));
}

// Helper to redact sensitive information from logs
function redactSensitiveFields(obj: any): any {
  if (!obj || typeof obj !== 'object') return obj;
  
  const redacted = { ...obj };
  const sensitiveKeys = ['password', 'secret', 'token', 'key', 'authorization', 'clientSecret'];
  
  for (const [key, value] of Object.entries(redacted)) {
    if (sensitiveKeys.some(sk => key.toLowerCase().includes(sk.toLowerCase()))) {
      redacted[key] = '[REDACTED]';
    } else if (typeof value === 'object') {
      redacted[key] = redactSensitiveFields(value);
    }
  }
  
  return redacted;
}

// Enhanced logging interface
export const log = {
  info: (message: string, meta: any = {}) => {
    if (globalFlags.quiet && !globalFlags.json) return;
    
    if (globalFlags.json) {
      logger.info(message, redactSensitiveFields(meta));
    } else {
      const useColors = !globalFlags.noColors;
      console.log(useColors ? chalk.blue('ℹ') : 'ℹ', message);
    }
  },
  
  success: (message: string, meta: any = {}) => {
    if (globalFlags.quiet && !globalFlags.json) return;
    
    if (globalFlags.json) {
      logger.info(message, { ...redactSensitiveFields(meta), success: true });
    } else {
      const useColors = !globalFlags.noColors;
      console.log(useColors ? chalk.green('✓') : '✓', message);
    }
  },
  
  warn: (message: string, meta: any = {}) => {
    if (globalFlags.json) {
      logger.warn(message, redactSensitiveFields(meta));
    } else {
      const useColors = !globalFlags.noColors;
      console.log(useColors ? chalk.yellow('⚠') : '⚠', message);
    }
  },
  
  error: (message: string, meta: any = {}) => {
    if (globalFlags.json) {
      logger.error(message, redactSensitiveFields(meta));
    } else {
      const useColors = !globalFlags.noColors;
      console.log(useColors ? chalk.red('✗') : '✗', message);
    }
  },
  
  debug: (message: string, meta: any = {}) => {
    if (!globalFlags.debug) return;
    
    if (globalFlags.json) {
      logger.debug(message, redactSensitiveFields(meta));
    } else {
      const useColors = !globalFlags.noColors;
      console.log(useColors ? chalk.gray('🐛') : '🐛', message);
    }
  },
  
  // Special method for HTTP requests with timing info
  httpRequest: (method: string, url: string, duration: number, status?: number, requestId?: string) => {
    if (!globalFlags.debug) return;
    
    const meta = {
      httpTiming: { method, url, duration, status },
      requestId
    };
    
    if (globalFlags.json) {
      logger.debug(`HTTP ${method} ${url}`, meta);
    } else {
      const useColors = !globalFlags.noColors;
      const statusColor = status && status >= 400 ? (useColors ? chalk.red : (s: string) => s) : 
                         status && status >= 300 ? (useColors ? chalk.yellow : (s: string) => s) : 
                         (useColors ? chalk.green : (s: string) => s);
      const timing = `${duration}ms`;
      const statusText = status ? ` [${statusColor(status.toString())}]` : '';
      const reqId = requestId ? ` [req:${requestId.substring(0, 8)}]` : '';
      console.log(
        useColors ? chalk.gray('🌐') : '🌐', 
        `${method} ${url} - ${timing}${statusText}${reqId}`
      );
    }
  },
  
  // Special method for rate limit info
  rateLimit: (limit: number, remaining: number, resetTime: Date, requestId?: string) => {
    if (!globalFlags.debug) return;
    
    const meta = {
      rateLimit: { limit, remaining, resetTime },
      requestId
    };
    
    if (globalFlags.json) {
      logger.debug('Rate limit status', meta);
    } else {
      const useColors = !globalFlags.noColors;
      const percentage = (remaining / limit) * 100;
      const color = percentage < 20 ? (useColors ? chalk.red : (s: string) => s) : 
                   percentage < 50 ? (useColors ? chalk.yellow : (s: string) => s) : 
                   (useColors ? chalk.green : (s: string) => s);
      const reqId = requestId ? ` [req:${requestId.substring(0, 8)}]` : '';
      console.log(
        useColors ? chalk.gray('📊') : '📊',
        `Rate limit: ${color(`${remaining}/${limit}`)} (resets at ${resetTime.toISOString()})${reqId}`
      );
    }
  }
};

// Update logger format when global flags are set
export function updateGlobalFlags(flags: GlobalFlags): void {
  setGlobalFlags(flags);
  updateLoggerFormat();
}
