---
name: enewbold-third-party-saas-integration
description: Implement or materially revise a third-party SaaS API integration behind the MCP platform's adapter boundary. Use when adding provider operations, OAuth/token lifecycle handling, pagination, rate-limit behavior, request/response mapping, idempotent writes, retries, error normalization, sandbox tests, or vendor API version changes for services such as Square or Clover. Preserve the SaaS system-of-record boundary, verify current vendor documentation when behavior matters, and keep vendor-specific details isolated from public MCP and UI contracts.
---

# ENewbold Third-Party SaaS Integration

Follow the repository root `AGENTS.md`, accepted ADRs, and the approved MCP/platform contract.

Use this skill to implement vendor integration behavior without leaking vendor-specific concerns across the platform.

## Workflow

1. Establish the approved platform contract.
   - Identify the MCP capability or internal service operation being implemented.
   - Confirm inputs, outputs, authorization, tenant context, side effects, and acceptance criteria.
   - Do not redefine the public contract silently.

2. Verify current vendor behavior.
   - Consult authoritative vendor documentation when endpoint shape, authentication, scopes, pagination, throttling, idempotency, versioning, or error behavior matters.
   - Record assumptions that cannot be verified.

3. Identify authentication and token lifecycle.
   - Determine required scopes and account context.
   - Use the approved encrypted token-storage and retrieval path.
   - Keep credentials server-side and tenant-scoped.
   - Never log access tokens, refresh tokens, secrets, or authorization headers.

4. Implement through the adapter boundary.
   - Keep endpoint paths, SDK-specific types, vendor payloads, and vendor error formats inside the integration layer.
   - Map platform inputs to vendor requests deliberately.
   - Map vendor responses to stable internal/platform contracts.

5. Handle pagination and collection semantics.
   - Preserve cursors/tokens only where needed for the approved contract.
   - Bound page sizes and loops.
   - Avoid accidental unbounded data retrieval.

6. Handle throttling, timeouts, and dependency failures.
   - Normalize rate limiting, network errors, vendor outage, authentication failure, authorization failure, and validation failure.
   - Preserve diagnostic correlation without exposing sensitive payloads.

7. Treat writes carefully.
   - Determine idempotency behavior before retrying.
   - Use vendor idempotency keys when supported and architecturally appropriate.
   - Do not blindly retry ambiguous writes that could duplicate side effects.

8. Preserve system-of-record ownership.
   - Do not persist SaaS transactional data merely for convenience.
   - Persist only approved platform/integration state.
   - If caching is required, make ownership, TTL, invalidation, and staleness explicit.

9. Add verification.
   - Prefer unit/contract tests around mapping and error normalization.
   - Use vendor sandbox/test accounts for integration checks when available and approved.
   - Include negative tests for auth failure, rate limiting, malformed data, timeout, and write duplication risks when relevant.

10. Produce an integration implementation summary using `references/integration-checklist.md` as a completion checklist.

## Error normalization

Distinguish, when applicable:

- platform authentication failure;
- platform authorization failure;
- vendor authentication failure;
- vendor authorization/scope failure;
- validation failure;
- tenant integration misconfiguration;
- rate limiting;
- vendor outage;
- network/timeout failure;
- internal platform failure.

Do not expose raw vendor secrets or unnecessary implementation details to MCP callers.

## Boundaries

Do not:

- bypass the approved adapter/service boundary;
- couple public MCP schemas directly to volatile vendor payloads without an approved reason;
- introduce new persistence without architecture justification;
- use production credentials for routine development verification;
- invent undocumented vendor behavior;
- weaken authorization to simplify integration.

## Escalation

Return architecture conflicts, new credential requirements, new persistence needs, or public contract changes to the Engineering Lead and Solution Architect before broad implementation.
