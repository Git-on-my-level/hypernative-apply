Title: Planner / Diff Engine

Type: Task

Goal
- Compute desired vs. actual changes with clear plan output.

Scope
- Build resource graph by dependencies (e.g., agents reference channels by logical name)
- CRUD classification: Create, Update, Replace, Delete, No-op
- Human-readable plan with counts and colored summary; `--json` output
- Exit codes: 0 (no changes), 2 (changes present), >0 (errors)
 - Drift detection: compare remote fetched state vs local desired; highlight fields with deltas
 - Plan file workflow: `hypernative plan -out plan.json` writes a signed, canonical JSON plan; support `-out -` for stdout
 - Diff noise reduction: ignore server-managed fields (timestamps, IDs, pagination artifacts); stable array ordering for semantic sets (e.g., assets)
 - Secret redaction: ensure values substituted from env remain redacted in plan and diffs

Acceptance Criteria
- `hypernative plan` shows adds/changes/deletes by resource
- JSON plan contains stable resource IDs/names and change types
 - Field-level diff (added/removed/changed) included in JSON output
 - `-out` produces a plan with content-hash and config-hash; redacted secrets

