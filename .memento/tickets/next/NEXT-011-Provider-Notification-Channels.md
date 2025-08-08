Title: Provider – Notification Channels (CRUD + Test)

Type: Task

Goal
- Manage notification channels and validate via test endpoint.

Scope
- Endpoints: List, Create, Update, Delete, Test
- Model: name, type (slack|webhook|...), enabled, configuration{}
- Optional `validate: true` to call test endpoint during apply
 - Secret handling: allow configuration to reference env vars `${ENV_NAME}` that are substituted at runtime

Acceptance Criteria
- Channel changes are idempotent; test results surfaced in output
 - Secrets are never logged; redactions verified in debug logs

References
- GET/POST/PATCH/DELETE `/api/v2/notification-channels`
- POST `/api/v2/notification-channels/{id}/test`

