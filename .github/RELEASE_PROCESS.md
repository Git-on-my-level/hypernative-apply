# Release Process Documentation

This document outlines the automated release process for the Hypernative CLI using semantic-release and conventional commits.

## Overview

The CI/CD pipeline automatically handles:
- ✅ Semantic versioning with conventional commits
- ✅ Standalone binary creation for Linux, macOS, and Windows
- ✅ NPM package publishing to `@hypernative/cli`
- ✅ Docker image publishing to Docker Hub and GitHub Container Registry
- ✅ SLSA provenance generation for supply chain security
- ✅ GitHub releases with automated changelog generation
- ✅ Homebrew formula updates
- ✅ Security scanning with Trivy

## Conventional Commits

We use [Conventional Commits](https://www.conventionalcommits.org/) specification for commit messages:

### Commit Types

| Type | Description | Version Bump |
|------|-------------|--------------|
| `feat` | New features | Minor |
| `fix` | Bug fixes | Patch |
| `perf` | Performance improvements | Patch |
| `refactor` | Code refactoring | Patch |
| `docs` | Documentation changes | None |
| `test` | Adding/updating tests | None |
| `chore` | Maintenance tasks | None |
| `ci` | CI/CD changes | None |
| `build` | Build system changes | None |

### Breaking Changes

Add `BREAKING CHANGE:` in the commit body or `!` after the type to trigger a major version bump:

```bash
feat!: remove deprecated API endpoints

BREAKING CHANGE: The /v1/legacy endpoints have been removed
```

### Examples

```bash
feat: add support for custom notification templates
fix: resolve memory leak in config loader
perf: optimize API response caching
docs: update installation instructions
chore: update dependencies
```

## Release Workflow

### Automatic Releases

Releases are triggered automatically when commits are pushed to:
- `main` - Stable releases (1.0.0, 1.1.0, etc.)
- `develop` - Alpha prereleases (1.1.0-alpha.1, etc.)
- `beta` - Beta prereleases (1.1.0-beta.1, etc.)

### Manual Release

You can trigger a manual release using GitHub's workflow dispatch:

1. Go to Actions → Release
2. Click "Run workflow"
3. Choose the branch
4. Optionally enable dry-run mode for testing

### Release Process Steps

1. **Test and Build** 📝
   - Runs linting and formatting checks
   - Executes full test suite with coverage
   - Builds TypeScript to JavaScript

2. **Build Binaries** 🔨
   - Creates standalone binaries for:
     - Linux x64
     - macOS x64 and ARM64
     - Windows x64
   - Tests each binary for basic functionality

3. **Semantic Release** 🚀
   - Analyzes commits since last release
   - Determines next version number
   - Generates changelog
   - Creates Git tags
   - Publishes to NPM registry

4. **SLSA Provenance** 🔐
   - Generates cryptographic attestation
   - Links artifacts to source commit
   - Provides supply chain transparency

5. **Publish Assets** 📦
   - Uploads binaries to GitHub release
   - Creates SHA256 checksums
   - Publishes Docker images

6. **Update Distribution** 🍺
   - Updates Homebrew formula
   - Notifies via Slack (if configured)

## Installation Methods

After a successful release, the CLI is available through multiple channels:

### NPM (Recommended)

```bash
# Install globally
npm install -g @hypernative/cli

# Use the CLI
hypernative --version
hn --version  # Short alias
```

### Docker

```bash
# Pull and run
docker run --rm hypernative/cli:latest --version

# Or from GitHub Container Registry
docker run --rm ghcr.io/hypernative/cli:latest --version

# Mount workspace for file operations
docker run --rm -v $(pwd):/workspace hypernative/cli:latest plan
```

### Direct Binary Download

Download platform-specific binaries from the [releases page](https://github.com/hypernative/cli/releases):

- `hypernative-linux-x64` - Linux 64-bit
- `hypernative-macos-x64` - macOS Intel
- `hypernative-macos-arm64` - macOS Apple Silicon
- `hypernative-windows-x64.exe` - Windows 64-bit

### Homebrew (macOS/Linux)

```bash
brew install hypernative/tap/hypernative
```

## Security Features

### SLSA Provenance

Every release includes SLSA Level 3 provenance attestation:
- Verifies the integrity of build artifacts
- Links binaries to their source code commit
- Enables supply chain verification

### Vulnerability Scanning

- Docker images are scanned with Trivy
- NPM packages are audited during CI
- Security advisories are automatically checked

### Supply Chain Security

- All dependencies are pinned and verified
- Build process runs in isolated GitHub runners
- Cryptographic signatures verify artifact integrity

## Troubleshooting Releases

### Failed Release

If a release fails:

1. Check the [Actions tab](https://github.com/hypernative/cli/actions) for errors
2. Review the failing job logs
3. Common issues:
   - Test failures: Fix the failing tests
   - Build errors: Check TypeScript compilation
   - NPM publishing: Verify NPM_TOKEN secret
   - Docker publishing: Check DOCKER_USERNAME and DOCKER_PASSWORD secrets

### Skip Release

To skip a release for a commit, add `[skip ci]` to the commit message:

```bash
git commit -m "docs: update README [skip ci]"
```

### Hotfix Release

For urgent hotfixes:

1. Create a hotfix branch from main
2. Make the fix with a `fix:` commit
3. Create PR to main
4. After merge, the patch release will be automatic

## Required Secrets

Configure these secrets in GitHub repository settings:

| Secret | Description |
|--------|-------------|
| `NPM_TOKEN` | NPM authentication token for publishing |
| `DOCKER_USERNAME` | Docker Hub username |
| `DOCKER_PASSWORD` | Docker Hub password or access token |
| `HOMEBREW_TAP_TOKEN` | GitHub token for Homebrew tap updates |
| `SLACK_WEBHOOK_URL` | (Optional) Slack webhook for notifications |

## Monitoring and Analytics

### Release Metrics

- Release frequency and success rate
- Download statistics from NPM and GitHub
- Docker image pull statistics

### Health Monitoring

- Binary size tracking (warn if >100MB)
- Docker image size tracking (warn if >500MB)
- Build time monitoring
- Test coverage trends

## Development Workflow

### For Contributors

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/amazing-feature`
3. Make changes with conventional commits
4. Create a pull request to `develop` branch
5. After review and merge, changes will be included in the next alpha release

### For Maintainers

1. Merge features to `develop` for alpha testing
2. When ready for beta, create PR from `develop` to `beta`
3. When ready for stable, create PR from `beta` to `main`
4. All releases are automatic based on conventional commits

## Version Strategy

We follow [semantic versioning](https://semver.org/):

- **Major** (X.0.0): Breaking changes
- **Minor** (0.X.0): New features, backward compatible
- **Patch** (0.0.X): Bug fixes, backward compatible

### Prerelease Channels

- `main` → Stable releases (1.0.0)
- `beta` → Beta releases (1.1.0-beta.1)
- `develop` → Alpha releases (1.1.0-alpha.1)

## Support

For questions about the release process:
- Create an issue with the `release` label
- Contact the maintainers in Slack
- Review the workflow files in `.github/workflows/`