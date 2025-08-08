# Authentication Guide

Complete guide to setting up authentication for the Hypernative CLI.

## Authentication Methods

The Hypernative CLI supports multiple authentication methods to fit different workflows and security requirements.

### Method 1: Environment Variables (Recommended)

The simplest and most secure method for most users.

```bash
export HN_CLIENT_ID="your_client_id_here"
export HN_CLIENT_SECRET="your_client_secret_here"

# Optional: Override default API endpoint
export HN_BASE_URL="https://api.hypernative.com"
```

**Pros:**
- Simple setup
- Works well in CI/CD
- Secrets not stored in files
- Easy to rotate credentials

**Cons:**
- Must be set in every shell session
- Not automatically persisted

### Method 2: Profile Configuration

Use configuration files for persistent authentication setup.

Create `~/.hypernative/config.yaml`:

```yaml
# Single profile (default)
default:
  client_id: "your_client_id"
  client_secret: "your_client_secret"
  base_url: "https://api.hypernative.com"

# Multiple profiles for different environments
profiles:
  staging:
    client_id: "staging_client_id"
    client_secret: "staging_secret"
    base_url: "https://api-staging.hypernative.com"
    
  production:
    client_id: "production_client_id"
    client_secret: "production_secret"
    base_url: "https://api.hypernative.com"
    
  testing:
    client_id: "test_client_id"
    client_secret: "test_secret"
    base_url: "https://localhost:8080"
```

**Usage:**
```bash
# Use default profile
hypernative plan

# Use specific profile
hypernative plan --profile staging
hypernative apply --profile production
```

**Pros:**
- Persistent configuration
- Multiple environment support
- Easy switching between environments
- Good for development workflows

**Cons:**
- Credentials stored in files
- Need to secure config file permissions

### Method 3: Command Line Options

Pass credentials directly via command line options.

```bash
hypernative plan \
  --base-url "https://api.hypernative.com" \
  --client-id "your_client_id" \
  --client-secret "your_client_secret"
```

**Pros:**
- No file configuration needed
- Good for scripts and testing

**Cons:**
- Credentials visible in shell history
- Verbose command lines
- Not suitable for production

## Getting API Credentials

### Step 1: Log in to Hypernative Platform
Visit [https://app.hypernative.com](https://app.hypernative.com) and sign in to your account.

### Step 2: Navigate to API Settings
1. Go to **Settings** → **API Keys**
2. Click **Create New API Key**

### Step 3: Configure API Key
1. **Name**: Enter a descriptive name (e.g., "CLI Production", "CI/CD Pipeline")
2. **Permissions**: Select required permissions:
   - `read:watchlists` - Read watchlist configurations
   - `write:watchlists` - Create/update/delete watchlists
   - `read:agents` - Read custom agent configurations
   - `write:agents` - Create/update/delete custom agents
   - `read:channels` - Read notification channels
   - `write:channels` - Create/update/delete notification channels
   - `test:channels` - Test notification channels

3. **Environment**: Choose the environment (staging/production)
4. **Expiration**: Set an appropriate expiration date

### Step 4: Save Credentials
Copy the generated `Client ID` and `Client Secret` immediately - the secret won't be shown again.

## Security Best Practices

### Credential Management
1. **Never commit credentials** to version control
2. **Use environment variables** in production
3. **Rotate credentials regularly** (at least every 90 days)  
4. **Use least-privilege access** - only grant necessary permissions
5. **Monitor API key usage** in the Hypernative dashboard

### File Permissions
If using profile configuration, secure the config file:

```bash
# Create secure config directory
mkdir -p ~/.hypernative
chmod 700 ~/.hypernative

# Create and secure config file
touch ~/.hypernative/config.yaml
chmod 600 ~/.hypernative/config.yaml
```

### Environment Variables in CI/CD

#### GitHub Actions
```yaml
# .github/workflows/deploy.yml
env:
  HN_CLIENT_ID: ${{ secrets.HN_CLIENT_ID }}
  HN_CLIENT_SECRET: ${{ secrets.HN_CLIENT_SECRET }}
```

Store secrets in GitHub Settings → Secrets and variables → Actions.

#### GitLab CI/CD
```yaml
# .gitlab-ci.yml
variables:
  HN_CLIENT_ID: $CI_SECRET_HN_CLIENT_ID
  HN_CLIENT_SECRET: $CI_SECRET_HN_CLIENT_SECRET
```

Store secrets in GitLab Settings → CI/CD → Variables.

#### Jenkins
```groovy
// Jenkinsfile
environment {
  HN_CLIENT_ID = credentials('hypernative-client-id')
  HN_CLIENT_SECRET = credentials('hypernative-client-secret')
}
```

## Multi-Environment Authentication

### Approach 1: Environment-Specific Variables
```bash
# Staging
export HN_CLIENT_ID="$STAGING_CLIENT_ID"
export HN_CLIENT_SECRET="$STAGING_CLIENT_SECRET"
export HN_BASE_URL="https://api-staging.hypernative.com"

# Production  
export HN_CLIENT_ID="$PRODUCTION_CLIENT_ID"
export HN_CLIENT_SECRET="$PRODUCTION_CLIENT_SECRET"
export HN_BASE_URL="https://api.hypernative.com"
```

### Approach 2: Profile-Based
```yaml
# ~/.hypernative/config.yaml
profiles:
  staging:
    client_id: "${STAGING_CLIENT_ID}"
    client_secret: "${STAGING_CLIENT_SECRET}"
    base_url: "https://api-staging.hypernative.com"
    
  production:
    client_id: "${PRODUCTION_CLIENT_ID}"
    client_secret: "${PRODUCTION_CLIENT_SECRET}"
    base_url: "https://api.hypernative.com"
```

```bash
hypernative apply --profile staging
hypernative apply --profile production
```

### Approach 3: Directory-Based
```bash
# staging/
cd staging/
export HN_CLIENT_ID="$STAGING_CLIENT_ID"
export HN_CLIENT_SECRET="$STAGING_CLIENT_SECRET"
hypernative apply

# production/
cd ../production/
export HN_CLIENT_ID="$PRODUCTION_CLIENT_ID"  
export HN_CLIENT_SECRET="$PRODUCTION_CLIENT_SECRET"
hypernative apply
```

## Authentication Priority

The CLI resolves authentication in this order:

1. **Command line options** (`--client-id`, `--client-secret`)
2. **Environment variables** (`HN_CLIENT_ID`, `HN_CLIENT_SECRET`)
3. **Profile configuration** (`--profile name` or default profile)
4. **Error if none found**

```bash
# This command uses environment variables even if profiles exist
HN_CLIENT_ID=override hypernative plan

# This command uses the staging profile
hypernative plan --profile staging

# This command uses command line credentials
hypernative plan --client-id abc --client-secret xyz
```

## Troubleshooting Authentication

### Debug Authentication Resolution
```bash
# Show how authentication is resolved
hypernative version --debug

# Test API connectivity
hypernative doctor --verbose

# Show configuration (credentials redacted)
hypernative config show
```

### Common Authentication Errors

#### "Invalid client credentials"
- Verify client ID and secret are correct
- Check if credentials have expired
- Ensure you're using the right environment (staging vs production)

#### "Insufficient permissions"
- Check API key permissions in Hypernative dashboard
- Ensure API key has required scopes for your operations
- Some operations require admin permissions

#### "Rate limit exceeded"
- Wait and retry (CLI does this automatically)
- Check if multiple processes are using the same credentials
- Consider using multiple API keys for high-volume usage

### Testing Authentication
```bash
# Quick auth test
hypernative version --debug

# Full connectivity test
hypernative doctor

# Test with minimal configuration
mkdir test-auth && cd test-auth
hypernative init --yes
hypernative plan
```

## API Key Management

### Rotation Strategy
1. **Create new API key** with same permissions
2. **Test new credentials** in staging environment
3. **Update all systems** with new credentials
4. **Verify functionality** across all environments
5. **Revoke old credentials** in Hypernative dashboard

### Monitoring Usage
- Monitor API key usage in Hypernative dashboard
- Set up alerts for unusual activity
- Regularly audit which keys are in use
- Remove unused or expired keys

### Emergency Procedures
If credentials are compromised:

1. **Immediately revoke** the compromised API key in Hypernative dashboard
2. **Generate new credentials** with different name
3. **Update all systems** with new credentials
4. **Audit recent activity** for unauthorized changes
5. **Review security practices** to prevent future incidents

## Environment Variable Templates

### Development
```bash
# .env.development
HN_CLIENT_ID=dev_client_id_here
HN_CLIENT_SECRET=dev_client_secret_here  
HN_BASE_URL=https://api-staging.hypernative.com
DEBUG=1
```

### Production
```bash
# .env.production
HN_CLIENT_ID=prod_client_id_here
HN_CLIENT_SECRET=prod_client_secret_here
HN_BASE_URL=https://api.hypernative.com
```

### CI/CD
```bash
# .env.ci
HN_CLIENT_ID=${HYPERNATIVE_CLIENT_ID}
HN_CLIENT_SECRET=${HYPERNATIVE_CLIENT_SECRET}
HN_BASE_URL=https://api.hypernative.com
JSON_OUTPUT=true
AUTO_APPROVE=false
```

Remember: Never commit `.env` files with real credentials to version control!