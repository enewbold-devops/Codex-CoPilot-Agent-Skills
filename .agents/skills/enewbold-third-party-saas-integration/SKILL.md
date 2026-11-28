---
name: enewbold-third-party-saas-integration
description: Implement approved public REST API or authenticated SaaS integration behind the MCP adapter boundary. Use for Tier 1 live read-only retrieval, allowlists, runtime schemas, response normalization, provider keys, quotas, pagination, timeouts and safe retries, or Tier 2/3 OAuth, token lifecycle, authorized writes and recovery. Preserve authoritative data ownership and verify provider documentation, rights, security and runtime compatibility.
---

# ENewbold Third-Party SaaS Integration

Follow the repository root `AGENTS.md`, accepted ADRs, and the approved MCP/platform contract.

Use this skill to implement vendor integration behavior without leaking vendor-specific concerns across the platform.

## Profile applicability and invariants

Read the [profile selection guide](../../../docs/architecture/profiles/README.md), selected profile and approved contract. Use native ESM JavaScript, documented focused adapter/service classes, constructor-injected fetch/client, composition and runtime validation; no TypeScript source/compilation. Prefer portable Web APIs when supported; verify actual runtime/SDK.

Tier 1: inventory source documentation, rights, data scope, version, quota and approved read-only operations. Use fixed allowlisted origin/path/method mappings, validated parameters, no arbitrary URLs or URL credentials, and safe redirect handling. Bound input/result bytes, content type, JSON schemas, pagination, timeouts, concurrency and retries. Treat upstream text as untrusted, preserve provenance. No end-user OAuth, tenant token store, business writes or durable user/business state. Scoped keys only if permitted for public reads and protected by host mechanism. Verify with injected fixtures, an approved live read and actual runtime where available.

Tier 2/3: preserve trusted account/tenant context, approved credentials, encrypted integration state, least privilege and authorized writes where required; Tier 3 recovery/idempotency. Do not bypass controls or expose raw sensitive responses.

## Workflow

1. Establish the approved platform contract.
   - Identify the MCP capability or internal service operation being implemented.
   - Confirm inputs, outputs, authorization, tenant context, side effects, and acceptance criteria.
   - Do not redefine the public contract silently.

2. Verify current vendor behavior.
   - Consult authoritative vendor documentation when endpoint shape, authentication, scopes, pagination, throttling, idempotency, versioning, or error behavior matters.
   - Record assumptions that cannot be verified.

3. Identify access model and applicable credential lifecycle.
   - For public reads record anonymous/provider-key access and rights; avoid tenant identity/token persistence.
   - For protected operations determine scopes/account context, use approved encrypted storage when required and keep credentials server-side and tenant-scoped.
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

7. Treat writes carefully (Tier 2/3 only; Tier 1 prohibits business writes).
   - Determine idempotency behavior before retrying.
   - Use vendor idempotency keys when supported and architecturally appropriate.
   - Do not blindly retry ambiguous writes that could duplicate side effects.

8. Preserve system-of-record ownership.
   - Do not persist SaaS transactional data merely for convenience.
   - Persist only approved platform/integration state in Tier 2/3; Tier 1 must not depend on durable state.
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
