import winston from 'winston';
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
export declare function setGlobalFlags(flags: GlobalFlags): void;
export declare const logger: winston.Logger;
export declare const log: {
    info: (message: string, meta?: any) => void;
    success: (message: string, meta?: any) => void;
    warn: (message: string, meta?: any) => void;
    error: (message: string, meta?: any) => void;
    debug: (message: string, meta?: any) => void;
    httpRequest: (method: string, url: string, duration: number, status?: number, requestId?: string) => void;
    rateLimit: (limit: number, remaining: number, resetTime: Date, requestId?: string) => void;
};
export declare function updateGlobalFlags(flags: GlobalFlags): void;
//# sourceMappingURL=logger.d.ts.map