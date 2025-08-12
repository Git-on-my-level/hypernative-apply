# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Documentation
There are several documents that dive deeper into the codebase and the Hypernative platform in `docs/`
For the official documentation on the Hypernative platform and API, see: `docs/reference/platform-api.md`

## Common Development Commands

### Build and Development
```bash
npm run build         # Compile TypeScript to JavaScript
npm run dev          # Run CLI in development mode with tsx
npm run prebuild     # Pre-build checks (lint + format check)
```

### Testing Commands
```bash
npm test             # Run tests in watch mode
npm run test:run     # Run all tests once
npm run test:unit    # Run unit tests only (excludes e2e)
npm run test:coverage # Generate coverage report
npm run test:e2e     # Run end-to-end tests
npm run test:golden  # Run golden file tests
npm run test:all     # Run all tests (unit + e2e)
npm run test:ci      # CI testing pipeline (unit + coverage)
```

### Code Quality
```bash
npm run lint         # Run ESLint on TypeScript files
npm run lint:fix     # Auto-fix linting issues  
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
```

### CLI Development Testing
```bash
# Run CLI in development mode
npm run dev -- plan
npm run dev -- apply --auto-approve
npm run dev -- doctor --verbose

# Run specific commands with tsx
npx tsx src/cli.ts plan
npx tsx src/cli.ts apply
```

### Run Single Test File
```bash
npx vitest run src/lib/planner.test.ts  # Run single test file
npx vitest watch src/lib/planner.test.ts # Watch single test file
```

## High-Level Architecture

### Core Workflow Architecture
The codebase implements a terraform-like plan/apply workflow for managing Hypernative platform resources:

1. **Configuration Loading**: YAML files are loaded from `hypernative/` directory, validated with Zod schemas, and environment variables are interpolated
2. **Planning**: Current state is compared with desired configuration to generate a plan of changes (add/update/delete operations)
3. **Execution**: Plan is executed with API calls, rate limiting, and state updates
4. **State Management**: Local JSON state tracks resource mappings and prevents drift

### Key Architectural Components

#### Command Layer (`src/commands/`)
- Commander.js-based CLI commands (plan, apply, init, doctor, version)
- Commands orchestrate the workflow between configuration, planning, and execution
- Handle user input/output, formatting, and error presentation

#### Business Logic Layer (`src/lib/`)
- **Planner**: Core planning engine that compares desired vs actual state
- **Executor**: Executes plans with concurrency control and error handling
- **ConfigLoader**: Loads and validates YAML configurations with schema validation
- **StateStore**: Manages local state with file locking for concurrent safety
- **ApiClient**: HTTP client with authentication, rate limiting, and retry logic

#### Provider Layer (`src/providers/`)
- Resource-specific CRUD operations (watchlists, custom agents, notification channels)
- Each provider implements `BaseProvider` interface with standard operations
- Handles resource-specific API endpoints and transformations

#### Type System (`src/types/` and `src/schemas/`)
- Zod schemas provide runtime validation and TypeScript type inference
- Separate types for API responses, internal state, and plan operations
- Strong typing throughout ensures type safety

### Resource Management Flow
1. **Load Config** → YAML files parsed and validated against Zod schemas
2. **Fetch Remote State** → Current resources fetched from API
3. **Generate Plan** → Diff between desired and actual state
4. **Execute Plan** → Apply changes via API calls with rate limiting
5. **Update State** → Local state updated with new resource mappings

### Concurrency and Rate Limiting
- P-limit controls concurrent API operations (default: 5)
- Built-in exponential backoff for rate limit handling
- Lock files prevent concurrent CLI operations

### Error Handling Strategy
- Structured error types for different failure scenarios
- Graceful degradation with partial success tracking
- Detailed error reporting with context and suggestions

## Testing Architecture

### Test Organization
- **Unit Tests**: Component isolation with mocked dependencies
- **E2E Tests**: Full workflow testing with real file operations
- **Golden Tests**: Snapshot testing for plan generation consistency
- **Coverage Requirements**: 80% global, 90% for planner.ts, 85% for providers

### Key Testing Patterns
- Use `nock` for HTTP mocking in API tests
- Temp directories for file system testing
- Fixtures provide consistent test data
- Separate test configurations for different environments

## Security Considerations
- Environment variables for sensitive data (API credentials)
- Secrets are never logged or included in plans
- Validation prevents injection attacks
- State files should be version controlled but credentials excluded