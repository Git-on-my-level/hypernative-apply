Title: Auth and Config Management

Type: Task

Goal
- Manage credentials and per-environment config for Hypernative API.

Scope
- Support env vars `HN_CLIENT_ID`, `HN_CLIENT_SECRET`, `.env` loading
- Profiles via `~/.hypernative/config.yaml` (default, staging, prod)
- Command flags `--profile`, `--base-url`
- Secure storage suggestion, but default to file/env

Deliverables
- Config loader `src/lib/config.ts` with precedence: flags > env > profile
- Validation with zod
- Redaction in logs

Acceptance Criteria
- Misconfig exits with clear error
- `hypernative version --debug` prints active base URL and profile (redacted secrets)

