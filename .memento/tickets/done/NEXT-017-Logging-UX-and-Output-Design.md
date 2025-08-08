Title: Logging, UX, and Output Design

Type: Task

Goal
- Provide clear, actionable CLI output and logs.

Scope
- Structured logs (winston) with `--json` flag
- Human-readable plan/apply output with spinners (ora) and colors (chalk)
- `--quiet`, `--debug` flags
- Redact secrets; include request_id on errors

Acceptance Criteria
- JSON mode suitable for CI parsing
- Debug mode includes HTTP timings and rate-limit info

