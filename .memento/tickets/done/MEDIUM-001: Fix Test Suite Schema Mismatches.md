# MEDIUM-001: Fix Test Suite Schema Mismatches

## Description
The test suite currently has 83 failing tests due to schema mismatches between test data fixtures and the current Zod schema definitions. The schemas have evolved over time while test fixtures and golden files remain using outdated data structures, causing widespread test failures across unit tests, provider tests, and golden file comparisons.

## Problem Analysis
This issue affects multiple test categories:
- **Unit Tests**: State store, config loader, and planner tests fail due to schema validation errors
- **Provider Tests**: Watchlist, custom agent, and notification channel provider tests use deprecated data structures
- **Golden Tests**: Snapshot comparisons fail because expected outputs use old schema formats
- **E2E Tests**: Integration tests fail when validating API responses against current schemas

## Impact
- **Severity**: Medium (blocks testing confidence but doesn't affect production)
- **Scope**: 83 test failures across 8 test files
- **Risk**: Prevents reliable CI/CD pipeline and reduces development velocity

## Root Cause
Schemas have been updated to support new features and improved validation, but test fixtures were not updated to match:
1. Zod schema refinements and new validation rules
2. Updated TypeScript interfaces for resources
3. New required fields and changed optional fields
4. Modified data structures for state management

## Tasks
- [ ] Audit all test fixtures in `tests/` directory for schema compliance
- [ ] Update unit test data in `src/lib/*.test.ts` files to match current schemas
- [ ] Regenerate provider test fixtures in `src/providers/*.test.ts` files
- [ ] Update golden files in `tests/golden/` with current schema-compliant outputs
- [ ] Fix test expectations and assertions to match new data structures
- [ ] Validate all tests pass with updated fixtures
- [ ] Add schema validation to test helpers to prevent future mismatches

## Technical Details

### Affected Files
- `/src/lib/state-store.test.ts` - State management test data
- `/src/lib/config-loader.test.ts` - Configuration parsing test fixtures
- `/src/lib/planner.test.ts` - Planning logic test scenarios
- `/src/providers/*.test.ts` - Provider-specific test data
- `/tests/golden/planner-golden.test.ts` - Golden file snapshots
- `/tests/e2e/smoke.test.ts` - End-to-end test scenarios

### Schema Files to Reference
- `/src/schemas/config.schema.ts` - Main configuration schema
- `/src/schemas/watchlist.schema.ts` - Watchlist resource schema
- `/src/schemas/custom-agent.schema.ts` - Custom agent schema
- `/src/schemas/notification-channel.schema.ts` - Notification channel schema

### Testing Framework
- Uses Vitest as the test runner
- Test commands: `npm run test:unit`, `npm run test:golden`, `npm run test:e2e`
- Coverage tracking with `npm run test:coverage`

## Implementation Strategy
1. **Phase 1**: Fix unit test fixtures to match current schemas
2. **Phase 2**: Update provider test data and expectations
3. **Phase 3**: Regenerate and validate golden files
4. **Phase 4**: Add schema validation guards to test utilities

## Success Criteria
- [ ] All 83 failing tests pass
- [ ] Test coverage maintained or improved
- [ ] Golden files accurately represent current schema outputs
- [ ] Test fixtures use current schema-compliant data structures
- [ ] CI pipeline runs without test failures

## Notes
- Consider adding automated schema validation to test setup to catch future mismatches early
- Update test documentation to reference current schema requirements
- May need to update mock data generators to produce schema-compliant test data

---
Created: 2025-08-09T17:10:29.422Z
