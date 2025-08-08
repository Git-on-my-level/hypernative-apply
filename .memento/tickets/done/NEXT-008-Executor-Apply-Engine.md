Title: Executor / Apply Engine

Type: Task

Goal
- Execute plan with ordering, retries, and partial failure recovery.

Scope
- Topological sort over resource graph
- Retries with backoff on transient errors
- Transaction-like behavior: continue where possible; summarize failures
- `--auto-approve` flag for non-interactive CI
 - Pagination-aware reconciliation for large collections
 - Partial updates for resources that support PATCH
 - Plan file consumption: `hypernative apply --plan plan.json` executes only the serialized actions; verify signature and config-hash match current workspace

Acceptance Criteria
- Apply respects dependencies and concurrency caps
- Clear summary: created/updated/replaced/deleted/failed
 - Idempotent reruns after partial failure complete successfully
 - When `--plan` is provided, only actions in the plan are executed; mismatch in config-hash causes a hard error unless `--force` is specified

