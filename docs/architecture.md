# Hypernative Apply - Architecture Documentation

## Overview

Hypernative Apply is a Terraform-like CLI tool that enables Infrastructure-as-Code (IaC) management for Hypernative platform resources. It provides idempotent operations to synchronize local YAML configuration files with the remote Hypernative platform state.

### Core Principles

- **Declarative Configuration**: Define desired state in YAML files
- **Idempotent Operations**: Safe to run multiple times with same result
- **State Management**: Track remote resource mappings for efficient diffs
- **Plan-First Workflow**: Review changes before applying
- **Atomic Operations**: All-or-nothing change execution with rollback capability

## Module Architecture

The CLI is built with a modular TypeScript architecture using these core modules:

### Core Module

**Responsibilities:**
- Configuration file discovery and loading
- Schema validation using Zod
- State file management (.hypernative/state.json)
- Error handling and logging
- CLI argument parsing

**Key Components:**
- `ConfigLoader`: Discovers and loads YAML files from `hypernative/` directory
- `SchemaValidator`: Validates configuration against resource schemas
- `StateStore`: Manages local state mapping logical names to remote IDs
- `Logger`: Structured logging with different levels (debug, info, warn, error)

### Provider Module

**Responsibilities:**
- Hypernative API client with authentication
- Resource-specific reconcilers (CRUD operations)
- Rate limiting and retry logic
- API error handling and mapping

**Key Components:**
- `ApiClient`: HTTP client with auth headers and base URL configuration
- `WatchlistReconciler`: Handles watchlist CRUD operations
- `CustomAgentReconciler`: Handles custom agent CRUD operations  
- `NotificationChannelReconciler`: Handles notification channel CRUD operations
- `RateLimiter`: Implements exponential backoff and concurrent request limits

### Planner Module

**Responsibilities:**
- Compute diffs between desired (config files) and current state
- Generate execution plan with ordered operations
- Resource dependency analysis
- Change impact assessment

**Key Components:**
- `DiffEngine`: Compares config vs remote state to identify changes
- `PlanGenerator`: Creates ordered list of operations (create, update, delete)
- `DependencyResolver`: Ensures proper operation ordering
- `ChangeAnalyzer`: Categorizes changes by impact and risk level

### Executor Module

**Responsibilities:**
- Execute planned operations in correct order
- Handle failures with rollback capabilities
- Progress tracking and user feedback
- Parallel execution with concurrency controls

**Key Components:**
- `ExecutionEngine`: Orchestrates operation execution
- `OperationExecutor`: Executes individual resource operations
- `RollbackManager`: Handles failure scenarios and state restoration
- `ProgressReporter`: Provides real-time execution feedback

## State Management Design

### Local State File Structure

The `.hypernative/state.json` file maintains mappings between logical configuration names and remote resource metadata:

```json
{
  "version": "1.0.0",
  "last_sync": "2024-01-15T10:30:00Z",
  "resources": {
    "watchlists": {
      "treasury-monitors": {
        "remote_id": "watchlist_789",
        "fingerprint": "sha256:abc123...",
        "last_updated": "2024-01-15T10:30:00Z",
        "created_by": "cli"
      }
    },
    "custom_agents": {
      "balance-monitor": {
        "remote_id": "agent_456", 
        "fingerprint": "sha256:def456...",
        "last_updated": "2024-01-15T10:25:00Z",
        "created_by": "cli"
      }
    },
    "notification_channels": {
      "prod-webhook": {
        "remote_id": "channel_123",
        "fingerprint": "sha256:ghi789...",
        "last_updated": "2024-01-15T10:20:00Z",
        "created_by": "cli"
      }
    }
  }
}
```

### Fingerprinting Strategy

Each resource configuration is hashed to detect changes:
- **SHA256 hash** of normalized configuration content
- **Excludes metadata** (timestamps, IDs) to focus on business logic
- **Includes all relevant fields** that affect resource behavior
- **Enables efficient change detection** without API calls

## Configuration Model

### Directory Structure

```
hypernative/
├── watchlists/
│   ├── treasury-monitors.yaml
│   └── defi-positions.yaml
├── custom-agents/
│   ├── balance-monitor.yaml
│   └── health-factor-alert.yaml
└── notification-channels/
    ├── production-webhook.yaml
    └── slack-alerts.yaml
```

### Configuration Schema

Each resource type has a standardized YAML schema:

**Common Fields:**
- `name`: Human-readable resource name
- `description`: Optional resource description
- `enabled`: Boolean to enable/disable resource
- `tags`: Key-value pairs for organization

**Type-Specific Fields:**
- Each resource type defines additional required/optional fields
- Validated against Zod schemas before API submission
- Support for environment variable substitution

## Command Structure

### Primary Commands

#### `hypernative plan`

Computes and displays the execution plan without making changes:

```bash
hypernative plan [options]
```

**Process:**
1. Load and validate configuration files
2. Fetch current remote state via API
3. Compare desired vs current state
4. Generate ordered operation plan
5. Display changes with color-coded diff format

**Output Format:**
```
Plan: 2 to create, 1 to update, 0 to destroy

+ watchlists.treasury-monitors
  + name: "Treasury Wallet Monitors"
  + assets: [...]

~ custom_agents.balance-monitor
  ~ threshold_value: 10 -> 20

hypernative apply to perform these actions
```

#### `hypernative apply`

Executes the planned changes:

```bash
hypernative apply [options]
```

**Process:**
1. Generate execution plan (same as plan command)
2. Prompt for user confirmation (unless --auto-approve)
3. Execute operations in dependency order
4. Update local state file with results
5. Provide execution summary

### Additional Commands

#### `hypernative init`

Initialize a new configuration directory:
- Creates `hypernative/` directory structure
- Generates example configuration files
- Sets up `.hypernative/` state directory

#### `hypernative validate`

Validates configuration files without API calls:
- Schema validation
- Cross-reference validation
- Configuration completeness checks

#### `hypernative import`

Import existing remote resources into local state:
- Fetches resource from API by ID
- Generates corresponding YAML configuration
- Updates state file with mapping

## Error Handling and Retry Strategies

### Error Categories

1. **Configuration Errors**
   - Invalid YAML syntax
   - Schema validation failures
   - Missing required fields
   - *Resolution*: Fix configuration and retry

2. **Authentication Errors**
   - Invalid API credentials
   - Expired tokens
   - Insufficient permissions
   - *Resolution*: Update credentials or request access

3. **API Errors**
   - Network connectivity issues
   - Server errors (5xx)
   - Resource conflicts
   - *Resolution*: Retry with backoff or manual intervention

4. **State Inconsistency**
   - Local state doesn't match remote
   - Concurrent modifications
   - Resource deleted outside CLI
   - *Resolution*: State refresh or import

### Retry Logic

**Exponential Backoff Strategy:**
- Initial delay: 1 second
- Maximum delay: 60 seconds
- Maximum retries: 5
- Jitter: ±25% to prevent thundering herd

**Retryable Conditions:**
- HTTP 429 (Rate Limited)
- HTTP 500/502/503/504 (Server Errors)
- Network timeouts
- Temporary connection failures

**Non-Retryable Conditions:**
- HTTP 400 (Bad Request)
- HTTP 401/403 (Auth Errors)
- HTTP 404 (Not Found)
- Schema validation errors

## Rate Limiting Approach

### Request Rate Limiting

**Global Rate Limits:**
- Maximum 100 requests per minute
- Maximum 10 concurrent requests
- Separate limits per API endpoint type

**Implementation:**
- Token bucket algorithm
- Per-endpoint rate tracking
- Automatic backoff when limits approached
- Queue-based request management

### Batch Operations

**Optimization Strategies:**
- Group related operations where possible
- Use bulk API endpoints when available
- Minimize redundant API calls through caching
- Parallel execution for independent operations

**Resource-Specific Batching:**
- Watchlist assets: Batch add/remove operations
- Notification channels: Batch test operations
- Custom agents: Group enable/disable operations

### Progress Reporting

**User Experience:**
- Real-time progress indicators (using ora spinner)
- Operation completion percentages
- Time estimates for remaining work
- Detailed error reporting with suggested fixes

**Logging Levels:**
- `DEBUG`: Detailed internal state and API calls
- `INFO`: High-level operation progress
- `WARN`: Non-fatal issues and recoverable errors
- `ERROR`: Fatal errors requiring user action

## Technology Stack

### Core Dependencies

- **TypeScript**: Type-safe development with Node.js 18+
- **Commander.js**: CLI argument parsing and command structure
- **Axios**: HTTP client with interceptors and retry logic
- **Zod**: Runtime schema validation and type inference
- **yaml**: YAML parsing and serialization
- **ora**: Interactive progress spinners and indicators
- **p-limit**: Concurrency control for API requests
- **winston**: Structured logging with multiple transports
- **dotenv**: Environment variable management
- **ci-info**: CI/CD environment detection

### Development Tools

- **Jest**: Unit and integration testing
- **ESLint + Prettier**: Code formatting and linting
- **Husky**: Git hooks for quality checks
- **semantic-release**: Automated versioning and releases

## Security Considerations

### Credential Management

- API credentials stored in environment variables
- Support for credential files with proper permissions
- No credentials in configuration files or state
- Secure credential prompt for interactive use

### Configuration Validation

- Strict schema validation prevents malicious inputs
- Sanitization of user-provided strings
- Validation of external URLs and references
- Protection against path traversal attacks

### State File Security

- State files contain only resource mappings, no secrets
- Proper file permissions on state directory
- Backup and recovery procedures for state corruption
- Audit logging of state modifications

## Future Extensibility

### Plugin Architecture

- Modular resource provider system
- Custom validation rules
- External tool integrations
- Third-party notification channels

### Configuration Enhancements

- Template rendering with variables
- Configuration inheritance and includes
- Multi-environment support
- Configuration drift detection

### Advanced Features

- Resource import/export capabilities
- Configuration migration tools
- Integration with CI/CD pipelines
- Resource dependency visualization

This architecture provides a solid foundation for the MVP while maintaining extensibility for future enhancements and additional Hypernative platform resources.