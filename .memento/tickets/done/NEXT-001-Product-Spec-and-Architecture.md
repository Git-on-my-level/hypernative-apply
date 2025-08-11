Title: Hypernative Apply – Product Spec and Architecture

Type: Epic

Goal
- Define scope, resource coverage, and architecture for a Terraform-like CLI to sync local config with Hypernative platform state.

Problem
- Manual configuration across multiple chains/resources leads to drift and repetitive work. We need idempotent, code-driven workflows: plan, apply, import, destroy.

In-Scope Resources (MVP)
- Watchlists (CRUD)
- Custom Agents (CRUD)
- Notification Channels (CRUD)

Out-of-Scope (Phase 1)
- Screener policy CRUD (not documented)
- On-chain automated response contracts

Config Model
- YAML in repo under `hypernative/` with per-resource files:
  - `watchlists/*.yaml`
  - `custom-agents/*.yaml`
  - `notification-channels/*.yaml`

State
- Local state file `.hypernative/state.json` mapping logical names → remote IDs + fingerprints to enable diffs and idempotency.

CLI Commands
- `hypernative plan` – compute diff (no changes)
- `hypernative apply` – perform changes with ordered operations and retries

Architecture
- Language: TypeScript (Node 18+)
- Packages: commander, axios, zod, yaml, ora, p-limit, winston, dotenv, ci-info
- Modules:
  - Core (config loader, schema validation, state store)
  - Provider (Hypernative API client, per-resource reconcilers)
  - Planner (diff engine)
  - Executor (apply engine with rate-limit/backoff)

Risks / Constraints
- Rate limits – exponential backoff; concurrency caps.
- Future scope: Guardian Policies and Screener Policies management are currently out of scope for MVP due to API limitations.

Acceptance Criteria
- Documented architecture diagram and module boundaries
- Final list of MVP resources and config schema examples

Dependencies
- None

Definition of Done
- Spec reviewed and approved; checked into repo `docs/architecture.md` + sample configs scaffolded.

## Completion Notes

### Implemented Components

✅ **Architecture Documentation** (`/docs/architecture.md`)
- Comprehensive system overview with module architecture (Core, Provider, Planner, Executor)
- Detailed state management design with `.hypernative/state.json` structure
- Configuration model and directory structure
- Complete command structure documentation
- Error handling and retry strategies with exponential backoff
- Rate limiting approach with token bucket algorithm
- Technology stack and security considerations
- Future extensibility planning

✅ **Sample Configuration Files**
- **Watchlist Example** (`/hypernative/watchlists/example-watchlist.yaml`)
  - Treasury wallet monitoring configuration
  - Multi-chain asset support (Ethereum, Polygon)
  - Asset types: Wallet, Protocol, Token
  - Inline alert configuration with notification channels
  - Advanced monitoring options and maintenance windows

- **Custom Agent Example** (`/hypernative/custom-agents/example-agent.yaml`)
  - USDC balance change monitoring agent
  - Comprehensive configuration with thresholds and time windows
  - Automated response triggers
  - Testing scenarios and performance monitoring
  - Integration options for external services

- **Notification Channels Examples** (`/hypernative/notification-channels/example-channel.yaml`)
  - Multiple channel types: Webhook, Slack, Email, Discord, PagerDuty, Microsoft Teams
  - Rich template configurations for each platform
  - Environment variable usage for secrets
  - Testing and validation configurations
  - Severity-based routing and mentions

### Key Architecture Decisions

1. **State Management**: Local state file (`.hypernative/state.json`) maps logical names to remote IDs with fingerprinting for efficient change detection
2. **Configuration Format**: YAML-based configuration with Zod schema validation
3. **Module Boundaries**: Clear separation between Core (config/state), Provider (API), Planner (diff), and Executor (apply)
4. **Rate Limiting**: Token bucket algorithm with exponential backoff and concurrent request limits
5. **Error Handling**: Categorized errors with appropriate retry strategies and user guidance
6. **Technology Stack**: TypeScript with Node.js 18+, using industry-standard packages

### MVP Scope Confirmed

✅ **In-Scope Resources**:
- Watchlists (CRUD operations)
- Custom Agents (CRUD operations) 
- Notification Channels (CRUD operations)

✅ **Out-of-Scope** (Phase 1):
- Screener policy CRUD (API limitations)
- On-chain automated response contracts

### Next Steps

The architecture and sample configurations are ready for implementation. Next tickets should focus on:
1. CLI scaffold and project setup (NEXT-002)
2. Authentication and configuration management (NEXT-003)
3. Hypernative API client implementation (NEXT-004)

**Status**: ✅ **COMPLETED** - Ready for review and implementation phase.

