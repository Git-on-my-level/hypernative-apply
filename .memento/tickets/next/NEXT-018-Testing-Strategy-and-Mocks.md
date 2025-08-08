Title: Testing Strategy and Mocks

Type: Task

Goal
- Ensure high confidence via unit and integration tests with mocked API.

Scope
- Vitest + nock for HTTP mocking
- Golden tests for plan output
- E2E smoke with real credentials behind `E2E=1` and org sandbox

Acceptance Criteria
- >80% coverage on planner and providers
- CI runs unit tests on PRs; E2E nightly/opt-in

