Title: Init / Scaffold Command

Type: Task

Goal
- Provide `hypernative init` to scaffold the project structure and sample configs.

Scope
- Create directories if missing: `hypernative/{watchlists,custom-agents,notification-channels}`
- Optionally generate sample YAMLs with placeholders and comments
- Flags: `--yes` (no prompt), `--dir <path>` (default cwd), `--with-samples`
- Dry-run prints planned changes; `--yes` writes files

Acceptance Criteria
- Running `hypernative init --with-samples --yes` creates the folders and 3 sample files
- Running without `--yes` performs dry-run only

