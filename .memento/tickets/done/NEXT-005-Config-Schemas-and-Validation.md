Title: Config Schemas and Validation

Type: Task

Goal
- Define zod schemas for resource configs and load YAML files from repo.

Scope
- Directory structure under `hypernative/`:
  - `watchlists/*.yaml`
  - `custom-agents/*.yaml`
  - `notification-channels/*.yaml`
- Schema per resource matching API models; allow logical names and cross-resource references (e.g., agents reference channels by logical name)

Acceptance Criteria
- Invalid files reported with path and line numbers
- `hypernative plan` fails fast on invalid config

