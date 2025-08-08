Title: Documentation and Samples

Type: Task

Goal
- Provide clear docs and sample configurations for MVP resources.

Scope
- README with quickstart; docs/ with detailed guides
- Samples for each MVP resource in `examples/`
- Limitations section: Screener policy CRUD not supported (reference-only); Guardian policies out of scope for MVP
 - Document plan file workflow: save (`plan -out`), review, consume (`apply --plan`), and CI usage
 - Document `init` (scaffold) and `doctor` (preflight) commands with examples

Acceptance Criteria
- `hypernative --help` aligns with docs
- Examples validate with `hypernative plan`
 - Plan/Apply docs demonstrate end-to-end CI pattern using saved plan files

