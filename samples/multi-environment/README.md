# Multi-Environment Sample

Example of managing multiple environments (staging, production) with shared configurations.

## Structure

```
multi-environment/
├── shared/                    # Shared configurations
│   └── notification-channels/ # Common notification channels
├── staging/
│   └── hypernative/          # Staging-specific configs
└── production/
    └── hypernative/          # Production-specific configs
```

## Environment Management

### Staging Environment
- Uses testnet addresses
- Lower alert thresholds for testing
- Separate notification channels to avoid spam
- More verbose logging and debugging

### Production Environment  
- Uses mainnet addresses
- Production alert thresholds
- Critical notification channels
- Optimized for reliability

### Shared Resources
- Common notification channel templates
- Reusable configuration snippets
- Shared documentation and standards

## Usage

### Deploy to Staging
```bash
cd staging/
export ENVIRONMENT=staging
export HN_CLIENT_ID="staging_client_id"
export HN_CLIENT_SECRET="staging_secret"
hypernative plan
hypernative apply
```

### Deploy to Production
```bash  
cd production/
export ENVIRONMENT=production
export HN_CLIENT_ID="prod_client_id"
export HN_CLIENT_SECRET="prod_secret"
hypernative plan --verbose
hypernative apply --auto-approve=false  # Always review prod changes
```

### Using Profiles
Set up profiles in `~/.hypernative/config.yaml`:

```yaml
profiles:
  staging:
    client_id: "staging_client_id"
    client_secret: "staging_secret"
    base_url: "https://api-staging.hypernative.com"
    
  production:
    client_id: "prod_client_id" 
    client_secret: "prod_secret"
    base_url: "https://api.hypernative.com"
```

Then deploy with:
```bash
hypernative apply --profile staging --config staging/
hypernative apply --profile production --config production/
```