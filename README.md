## Hypernative Apply

Define your Hypernative configuration as code and safely synchronize it with the Hypernative platform. Think “terraform plan/apply” but for Hypernative resources.

### Why use this?
- Eliminate manual setup across chains and environments
- Review changes before they happen (plan), then apply idempotently
- Keep configurations consistent and avoid state drift

### Supported resources
- Watchlists (CRUD, optional CSV upload)
- Custom Agents (CRUD)
- Notification Channels (CRUD + test)

## Installation
Install from source (until packages are published):
```
pnpm i
pnpm build
pnpm dev -- --help
```

## Authentication
Set environment variables (recommended):
- `HN_CLIENT_ID`
- `HN_CLIENT_SECRET`

Optional flags:
- `--base-url https://api.hypernative.xyz`
- `--profile <name>` if you support profiles in `~/.hypernative/config.yaml`

## Project layout
```
hypernative/
  watchlists/
    treasury.yaml
  custom-agents/
    aave_health.yaml
  notification-channels/
    slack_critical.yaml
```

## Configuration examples
```yaml
# hypernative/watchlists/treasury.yaml
name: Treasury Wallets
description: Monitor treasury addresses
assets:
  - { chain: ethereum, type: Wallet, address: "0x123..." }
alert_policy_id: policy_789
```

```yaml
# hypernative/notification-channels/slack_critical.yaml
name: Slack Critical
type: slack
enabled: true
configuration:
  webhook_url: ${SLACK_WEBHOOK_URL}
  channel: "#security-alerts"
validate: true
```

```yaml
# hypernative/custom-agents/aave_health.yaml
name: Aave Health Monitor
type: position_health_deviation
enabled: true
severity: high
chain: ethereum
configuration:
  addresses: ["0xabc..."]
  threshold_type: percentage
  threshold_value: 10
  direction: decrease
notification_channels: ["Slack Critical"] # resolves to channel ID by name
```

Environment variables like `${SLACK_WEBHOOK_URL}` are substituted at runtime. Secrets are redacted in logs.

## Usage
Plan (dry-run):
```
hypernative plan
```

Apply:
```
hypernative apply
```

Common flags:
- `--json` machine-readable output (CI)
- `--debug` verbose logs (secrets redacted)
- `--concurrency <n>` cap parallel calls
- Targeting (planned): `--only watchlist:treasury` or `--dir hypernative/custom-agents`

Example plan output:
```
Plan: 2 to add, 1 to change, 0 to delete

~ custom-agent.aave_health
  enabled: true -> false

+ notification-channel.slack_critical
+ watchlist.treasury
```

## State
- The CLI keeps `.hypernative/state.json` with mappings (logical name → remote ID) and fingerprints so repeated runs are no-ops when nothing changed.
- Locks prevent concurrent applies; safe to rerun after partial failures.

## CI/CD
- Use `hypernative plan --json` to gate changes.
- Exit codes: 0 (no changes), 2 (changes present), >0 (errors).
- Non-interactive apply: pass `--auto-approve` (if prompted flows are added later).

## Reliability and rate limiting
- Automatic retries with exponential backoff; respects `X-RateLimit-*` headers.
- Pagination helpers fetch full collections.

## Troubleshooting
- Auth errors: ensure `HN_CLIENT_ID`/`HN_CLIENT_SECRET` are set.
- 429s: tool backs off automatically; lower `--concurrency` if persistent.
- Schema errors: the CLI reports file path and field names; fix YAML and re-run `plan`.
- Debugging: add `--debug` to include HTTP timings and request IDs (secrets redacted).

## Roadmap
- Targeted operations (by resource, directory, labels)
- Save/consume plans (plan file)
- Import/destroy
