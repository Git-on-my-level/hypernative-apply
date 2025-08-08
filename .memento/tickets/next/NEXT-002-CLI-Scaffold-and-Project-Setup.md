Title: CLI Scaffold and Project Setup

Type: Task

Goal
- Initialize a TypeScript CLI project `hypernative` with core scaffolding and DX tooling.

Scope
- Node 18+, TypeScript, ESM
- Dependencies: commander, axios, zod, yaml, ora, chalk, winston, p-limit, dotenv, fast-glob
- Scripts: build, dev (ts-node), test (vitest), lint (eslint+prettier)
- Binary: `bin/hypernative` entry with commands stubbed: plan/apply/init/doctor/version/help

Deliverables
- Package.json with bin mapping `hypernative`
- tsconfig.json, eslint, prettier
- src/index.ts wiring commander; subcommands in `src/commands/*`
- Basic logger `src/lib/logger.ts`

Acceptance Criteria
- `npx tsx src/index.ts --help` shows commands
- `pnpm build` emits `dist/`
- Version printed from package.json
 - `hypernative init` prints scaffold actions in dry-run and can create files with `--yes`

