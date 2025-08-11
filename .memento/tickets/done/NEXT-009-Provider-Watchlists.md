Title: Provider – Watchlists (CRUD + CSV Upload)

Type: Task

Goal
- Implement reconciliation for watchlists per REST API.

Scope
- Endpoints used: List, Create, Update, Delete, Upload CSV
- Model: name, description, assets[], alert_policy_id
- Import strategy by name match or explicit id
 - Asset reconciliation: compute add/remove set; warn for unknown chain/type

Acceptance Criteria
- Create/update/delete mapped correctly; CSV upload optional block
- Plan shows asset count diffs; apply updates assets idempotently
 - CSV upload supports dry-run mode to preview import counts

References
- GET/POST/PATCH/DELETE `/watchlists`
- POST `/watchlists/{id}/upload-csv`

