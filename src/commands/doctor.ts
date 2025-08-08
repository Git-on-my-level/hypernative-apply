import { Command } from 'commander';
import { existsSync, readFileSync } from 'fs';
import { join, resolve } from 'path';
import { platform, arch } from 'os';
import { exec } from 'child_process';
import { promisify } from 'util';

import { log } from '../lib/logger.js';
import { loadHypernativeConfig } from '../lib/config-loader.js';
import { loadConfig } from '../lib/config.js';
import { ApiClient } from '../lib/api-client.js';

const execAsync = promisify(exec);

interface DiagnosticResult {
  name: string;
  status: 'pass' | 'warn' | 'fail';
  message: string;
  details?: string;
}

interface SystemInfo {
  node_version: string;
  platform: string;
  architecture: string;
  cwd: string;
  cli_version: string;
}

async function checkNodeVersion(): Promise<DiagnosticResult> {
  const current = process.version;
  const major = parseInt(current.slice(1).split('.')[0]);

  if (major >= 18) {
    return {
      name: 'Node.js Version',
      status: 'pass',
      message: `Node.js ${current} (supported)`,
    };
  } else if (major >= 16) {
    return {
      name: 'Node.js Version',
      status: 'warn',
      message: `Node.js ${current} (minimum supported, recommend 18+)`,
    };
  } else {
    return {
      name: 'Node.js Version',
      status: 'fail',
      message: `Node.js ${current} (unsupported, requires 16+)`,
    };
  }
}

async function checkDependencies(_verbose: boolean): Promise<DiagnosticResult> {
  try {
    const packageJsonPath = resolve(__dirname, '../../package.json');
    if (!existsSync(packageJsonPath)) {
      return {
        name: 'Dependencies',
        status: 'warn',
        message: 'Cannot verify dependencies (package.json not found)',
      };
    }

    // Check critical dependencies are available
    const criticalDeps = ['axios', 'yaml', 'commander'];
    const missing = [];

    for (const dep of criticalDeps) {
      try {
        require.resolve(dep);
      } catch {
        missing.push(dep);
      }
    }

    if (missing.length === 0) {
      return {
        name: 'Dependencies',
        status: 'pass',
        message: 'All critical dependencies available',
      };
    } else {
      return {
        name: 'Dependencies',
        status: 'fail',
        message: `Missing dependencies: ${missing.join(', ')}`,
      };
    }
  } catch (error) {
    return {
      name: 'Dependencies',
      status: 'warn',
      message: `Error checking dependencies: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}

async function checkConfiguration(verbose: boolean): Promise<DiagnosticResult> {
  const cwd = process.cwd();
  const hypernativeDir = join(cwd, 'hypernative');

  if (!existsSync(hypernativeDir)) {
    return {
      name: 'Configuration',
      status: 'warn',
      message: 'No hypernative/ directory found (run "hypernative init" to create one)',
      details: verbose ? `Checked path: ${hypernativeDir}` : undefined,
    };
  }

  try {
    const configResult = await loadHypernativeConfig(cwd);
    const totalResources = configResult.metadata.total_resources;

    if (totalResources === 0) {
      return {
        name: 'Configuration',
        status: 'warn',
        message: 'Configuration directory found but no resources defined',
        details: verbose ? `Files loaded: ${configResult.metadata.files_loaded.length}` : undefined,
      };
    }

    return {
      name: 'Configuration',
      status: 'pass',
      message: `Configuration loaded (${totalResources} resources)`,
      details: verbose
        ? `Files: ${configResult.metadata.files_loaded.length}, Resources: ${JSON.stringify(configResult.metadata.resource_counts)}`
        : undefined,
    };
  } catch (error) {
    return {
      name: 'Configuration',
      status: 'fail',
      message: 'Configuration validation failed',
      details: verbose ? (error instanceof Error ? error.message : String(error)) : undefined,
    };
  }
}

async function checkAuthentication(verbose: boolean): Promise<DiagnosticResult> {
  try {
    const config = await loadConfig();

    if (!config.clientId || !config.clientSecret) {
      return {
        name: 'Authentication',
        status: 'fail',
        message: 'Missing credentials (HN_CLIENT_ID and HN_CLIENT_SECRET required)',
        details: verbose ? 'Set environment variables or configure profiles' : undefined,
      };
    }

    return {
      name: 'Authentication',
      status: 'pass',
      message: 'Credentials configured',
      details: verbose ? `Client ID: ${config.clientId.slice(0, 8)}****` : undefined,
    };
  } catch (error) {
    return {
      name: 'Authentication',
      status: 'fail',
      message: 'Failed to resolve authentication configuration',
      details: verbose ? (error instanceof Error ? error.message : String(error)) : undefined,
    };
  }
}

async function checkApiConnectivity(verbose: boolean): Promise<DiagnosticResult> {
  try {
    const config = await loadConfig();
    const client = ApiClient.fromConfig(config, { timeout: 10000 });

    // Try a simple API call to test connectivity
    await client.get('/health', { timeout: 5000 });

    return {
      name: 'API Connectivity',
      status: 'pass',
      message: `Connected to ${config.baseUrl}`,
      details: verbose
        ? `Timeout: 10s, Rate limit status: ${JSON.stringify(client.getRateLimitStatus())}`
        : undefined,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);

    if (errorMessage.includes('ENOTFOUND') || errorMessage.includes('ECONNREFUSED')) {
      return {
        name: 'API Connectivity',
        status: 'fail',
        message: 'Cannot connect to API server',
        details: verbose ? errorMessage : undefined,
      };
    } else if (errorMessage.includes('401') || errorMessage.includes('403')) {
      return {
        name: 'API Connectivity',
        status: 'fail',
        message: 'Authentication failed',
        details: verbose ? 'Verify your client ID and secret' : undefined,
      };
    } else if (errorMessage.includes('timeout')) {
      return {
        name: 'API Connectivity',
        status: 'warn',
        message: 'API connection timeout (may be temporary)',
        details: verbose ? errorMessage : undefined,
      };
    } else {
      return {
        name: 'API Connectivity',
        status: 'fail',
        message: 'API connection failed',
        details: verbose ? errorMessage : undefined,
      };
    }
  }
}

async function checkNetworkConnectivity(verbose: boolean): Promise<DiagnosticResult> {
  try {
    // Test basic internet connectivity
    await execAsync('ping -c 1 8.8.8.8', { timeout: 5000 });
    return {
      name: 'Network Connectivity',
      status: 'pass',
      message: 'Internet connectivity available',
    };
  } catch (error) {
    return {
      name: 'Network Connectivity',
      status: 'warn',
      message: 'Cannot verify internet connectivity',
      details: verbose ? 'Basic network test failed' : undefined,
    };
  }
}

async function checkPermissions(verbose: boolean): Promise<DiagnosticResult> {
  const cwd = process.cwd();

  try {
    // Check if we can read/write in current directory
    const testFile = join(cwd, '.hypernative-test');
    require('fs').writeFileSync(testFile, 'test');
    require('fs').unlinkSync(testFile);

    return {
      name: 'File Permissions',
      status: 'pass',
      message: 'Read/write permissions available',
    };
  } catch (error) {
    return {
      name: 'File Permissions',
      status: 'fail',
      message: 'Cannot write to current directory',
      details: verbose ? (error instanceof Error ? error.message : String(error)) : undefined,
    };
  }
}

async function getSystemInfo(): Promise<SystemInfo> {
  const packageJsonPath = resolve(__dirname, '../../package.json');
  let cliVersion = 'unknown';

  try {
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
    cliVersion = packageJson.version;
  } catch {
    // Ignore if we can't read package.json
  }

  return {
    node_version: process.version,
    platform: `${platform()} ${arch()}`,
    architecture: arch(),
    cwd: process.cwd(),
    cli_version: cliVersion,
  };
}

export const doctorCommand = new Command()
  .name('doctor')
  .description('Run diagnostics and health checks')
  .option('--verbose', 'Show detailed diagnostic information')
  .option('--json', 'Output results in JSON format')
  .action(async (options) => {
    const verbose = options.verbose || false;
    const jsonOutput = options.json || false;

    if (!jsonOutput) {
      log.info('🔍 Running Hypernative CLI diagnostics...\n');
    }

    // Run all diagnostic checks
    const results: DiagnosticResult[] = [];

    results.push(await checkNodeVersion());
    results.push(await checkDependencies(verbose));
    results.push(await checkPermissions(verbose));
    results.push(await checkConfiguration(verbose));
    results.push(await checkAuthentication(verbose));
    results.push(await checkNetworkConnectivity(verbose));
    results.push(await checkApiConnectivity(verbose));

    // Get system information
    const systemInfo = await getSystemInfo();

    if (jsonOutput) {
      // JSON output for programmatic use
      console.log(
        JSON.stringify(
          {
            timestamp: new Date().toISOString(),
            system: systemInfo,
            diagnostics: results,
            summary: {
              total: results.length,
              passed: results.filter((r) => r.status === 'pass').length,
              warnings: results.filter((r) => r.status === 'warn').length,
              failed: results.filter((r) => r.status === 'fail').length,
            },
          },
          null,
          2
        )
      );
    } else {
      // Human-readable output
      if (verbose) {
        log.info('📊 System Information:');
        log.info(`   Node.js: ${systemInfo.node_version}`);
        log.info(`   Platform: ${systemInfo.platform}`);
        log.info(`   CLI Version: ${systemInfo.cli_version}`);
        log.info(`   Working Directory: ${systemInfo.cwd}`);
        log.info('');
      }

      log.info('📋 Diagnostic Results:');
      log.info('');

      let hasFailures = false;
      let hasWarnings = false;

      results.forEach((result) => {
        const icon = result.status === 'pass' ? '✅' : result.status === 'warn' ? '⚠️' : '❌';

        if (result.status === 'fail') hasFailures = true;
        if (result.status === 'warn') hasWarnings = true;

        log.info(`${icon} ${result.name}: ${result.message}`);

        if (result.details && verbose) {
          log.info(`   Details: ${result.details}`);
        }
      });

      log.info('');

      // Summary
      const passed = results.filter((r) => r.status === 'pass').length;
      const warnings = results.filter((r) => r.status === 'warn').length;
      const failed = results.filter((r) => r.status === 'fail').length;

      if (hasFailures) {
        log.error(`❌ ${failed} check(s) failed, ${warnings} warning(s), ${passed} passed`);
        log.info('');
        log.info('🔧 To fix issues:');
        log.info(
          '   • Authentication: Set HN_CLIENT_ID and HN_CLIENT_SECRET environment variables'
        );
        log.info('   • Configuration: Run "hypernative init" to create project structure');
        log.info('   • Dependencies: Run "npm install" or check Node.js version');
        log.info('   • Network: Check internet connection and firewall settings');
      } else if (hasWarnings) {
        log.warn(`⚠️  ${warnings} warning(s), ${passed} passed`);
        log.info('\n💡 Run with --verbose for more details');
      } else {
        log.success(`✅ All ${passed} diagnostic checks passed!`);
        log.info('\n🚀 Your Hypernative CLI is ready to use');
        log.info('   Next: hypernative plan');
      }
    }

    // Exit with appropriate code
    const exitCode = results.some((r) => r.status === 'fail') ? 1 : 0;
    if (exitCode !== 0) {
      process.exit(exitCode);
    }
  });
