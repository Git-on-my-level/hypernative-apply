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

