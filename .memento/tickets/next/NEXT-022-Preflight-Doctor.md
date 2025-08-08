Title: Preflight / Doctor Command

Type: Task

Goal
- Provide `hypernative doctor` to validate environment, credentials, and minimal API access.

Scope
- Checks: env vars present; base URL reachable; auth works
- Make safe read calls: list notification channels (limit 1) and watchlists (limit 1)
- Optional permission checks per resource with clear guidance on missing perms
- Output actionable hints (e.g., how to set env vars)

Acceptance Criteria
- Exit code 0 on pass; >0 on failure with clear messages
- Shows request IDs and timings in `--debug` mode; secrets redacted

