Title: Provider – Custom Agents (CRUD)

Type: Task

Goal
- Manage custom agents lifecycle from YAML specs.

Scope
- Endpoints: List, Create, Update, Delete, Status (read-only)
- Model: name, type, enabled, severity, chain, configuration{}, notification_channels[]
- Diff rules: changing `type` requires replace; others update
 - Validate `configuration` shape by `type` where feasible; pass-through unknown keys
 - Resolve `notification_channels` by logical names to IDs

Acceptance Criteria
- Apply creates/updates/deletes agents correctly
- Plan shows replace when `type` changes
 - Channel references resolved; failures reported with actionable hints

References
- GET/POST/PATCH/DELETE `/api/v2/custom-agents`
- GET `/api/v2/custom-agents/{id}/status`

