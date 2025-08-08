Title: Hypernative API Client and Rate Limiting

Type: Task

Goal
- Implement axios-based client with auth headers and resilient retries.

Scope
- Default base URL `https://api.hypernative.xyz`
- Auth headers: `x-client-id`, `x-client-secret` (per docs)
- Exponential backoff, respect `X-RateLimit-Remaining/Reset`
- Concurrency cap via p-limit; retry on 429/5xx with jitter
- Request/response logging at debug level
- Pagination helpers: iterate `limit/offset` until `has_more` false

References
- Rate limiting headers in docs; common error schema

Acceptance Criteria
- Backoff triggered on 429; waits until reset when provided
- All requests include request_id in error messages when available
- List helpers return full collections (not just first page)

