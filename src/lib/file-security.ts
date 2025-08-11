import { chmod, mkdir, writeFile } from 'fs/promises';

/**
 * File security utilities for setting secure permissions on sensitive files
 *
 * This module provides functions to create files and directories with secure
 * permissions, preventing unauthorized access to sensitive state and lock files.
 * Uses 0600 (owner read/write only) for files and 0700 (owner access only) for directories.
 */

/**
 * Secure file permissions - owner read/write only (0600)
 * Binary: 110 000 000 (rw- --- ---)
 */
export const SECURE_FILE_MODE = 0o600;

/**
 * Secure directory permissions - owner access only (0700)
 * Binary: 111 000 000 (rwx --- ---)
 */
export const SECURE_DIR_MODE = 0o700;

/**
 * Write a file with secure permissions (0600)
 *
 * @param filePath - Path to the file to create/write
 * @param content - Content to write to the file
 * @param encoding - Text encoding (default: 'utf-8')
 */
export async function writeSecureFile(
  filePath: string,
  content: string,
  encoding: BufferEncoding = 'utf-8'
): Promise<void> {
  await writeFile(filePath, content, { encoding, mode: SECURE_FILE_MODE });
}

/**
 * Create a directory with secure permissions (0700)
 *
 * @param dirPath - Path to the directory to create
 * @param recursive - Create parent directories if needed (default: true)
 */
export async function createSecureDirectory(
  dirPath: string,
  recursive: boolean = true
): Promise<void> {
  await mkdir(dirPath, { recursive, mode: SECURE_DIR_MODE });
}

/**
 * Set secure permissions on an existing file (0600)
 *
 * @param filePath - Path to the file to secure
 */
export async function setSecureFilePermissions(filePath: string): Promise<void> {
  await chmod(filePath, SECURE_FILE_MODE);
}

/**
 * Set secure permissions on an existing directory (0700)
 *
 * @param dirPath - Path to the directory to secure
 */
export async function setSecureDirectoryPermissions(dirPath: string): Promise<void> {
  await chmod(dirPath, SECURE_DIR_MODE);
}

/**
 * Write a file and ensure it has secure permissions
 * This is safer than writeSecureFile as it applies permissions after write
 * in case the file creation doesn't respect the mode parameter on all platforms
 *
 * @param filePath - Path to the file to create/write
 * @param content - Content to write to the file
 * @param encoding - Text encoding (default: 'utf-8')
 */
export async function writeFileWithSecurePermissions(
  filePath: string,
  content: string,
  encoding: BufferEncoding = 'utf-8'
): Promise<void> {
  // Write the file first
  await writeFile(filePath, content, encoding);

  // Then explicitly set secure permissions
  await setSecureFilePermissions(filePath);
}

/**
 * Create directory and ensure it has secure permissions
 * This is safer than createSecureDirectory as it applies permissions after creation
 * in case the directory creation doesn't respect the mode parameter on all platforms
 *
 * @param dirPath - Path to the directory to create
 * @param recursive - Create parent directories if needed (default: true)
 */
export async function createDirectoryWithSecurePermissions(
  dirPath: string,
  recursive: boolean = true
): Promise<void> {
  // Create the directory first
  await mkdir(dirPath, { recursive });

  // Then explicitly set secure permissions
  await setSecureDirectoryPermissions(dirPath);
}
