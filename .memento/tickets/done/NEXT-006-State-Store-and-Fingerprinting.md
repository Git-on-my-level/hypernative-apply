Title: State Store and Fingerprinting

Type: Task

Goal
- Maintain local state for idempotency and drift detection.

Scope
- File `.hypernative/state.json` with entries: kind, name, remote_id, last_applied_hash, last_seen_remote_hash, metadata
- Hashing strategy: stable JSON canonicalization of effective spec
- Lock file for concurrent runs

Acceptance Criteria
- First run creates state; subsequent plan detects no-op if unchanged
- State survives interrupted runs; lock prevents concurrent apply

