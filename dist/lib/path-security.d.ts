/**
 * Path security utility for preventing path traversal attacks
 *
 * This module provides functions to validate file paths and ensure they
 * stay within designated base directories, preventing unauthorized access
 * to files outside the intended configuration directories.
 */
/**
 * Validates a file path to prevent path traversal attacks
 *
 * @param filePath - The file path to validate
 * @param baseDir - The base directory that the path must stay within
 * @returns The resolved path if valid
 * @throws Error if path traversal is detected or path is outside base directory
 */
export declare function validateConfigPath(filePath: string, baseDir: string): string;
/**
 * Validates multiple file paths (useful for glob results)
 *
 * @param filePaths - Array of file paths to validate
 * @param baseDir - The base directory that all paths must stay within
 * @returns Array of validated resolved paths
 * @throws Error if any path fails validation
 */
export declare function validateConfigPaths(filePaths: string[], baseDir: string): string[];
/**
 * Checks if a path is safe without throwing (for conditional logic)
 *
 * @param filePath - The file path to check
 * @param baseDir - The base directory that the path must stay within
 * @returns Object with validation result and error message if invalid
 */
export declare function isPathSafe(filePath: string, baseDir: string): {
    safe: boolean;
    error?: string;
    resolvedPath?: string;
};
//# sourceMappingURL=path-security.d.ts.map