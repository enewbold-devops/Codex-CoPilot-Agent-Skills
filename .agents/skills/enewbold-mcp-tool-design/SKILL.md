---
name: enewbold-mcp-tool-design
description: Design semantic MCP tools, resources, prompts and handoff contracts for public stateless APIs or authenticated/durable integration. Use for new capabilities, API mapping, input/output schema and version changes, public read-only policy, authorization, tool sequencing, optional UI or writes. Define validated contracts, provenance, errors, side effects, state and testable readiness without exposing secrets.
---

# ENewbold MCP Tool Design

Follow the repository root `AGENTS.md`, accepted ADRs, and relevant MCP architecture documentation.

Design the agentic capability before writing or materially changing server code.

## Profile applicability and invariants

Read the [profile selection guide](../../../docs/architecture/profiles/README.md), selected profile and solution record. Tier 1 enforces approved public read-only semantics, validated non-sensitive input, operation allowlists and independent requests with no tenant credentials, business/session persistence or invented identity. Mark truly absent identity/tenant fields N/A; host access or scoped provider keys may apply. Retain all protected-operation checks and durable workflow rules in Tier 2/3.

Document authoritative operation source/version, approved method/path/parameters, rights, quota, provenance and bounded results. Define versioned runtime input/output schemas and stable errors. For each handoff specify producer tool/output field, consumer tool/input field, type/schema, version, precondition, validation, policy and no-result/error behavior. Carry explicit validated values, not hidden server sessions or arbitrary URLs. Treat upstream content as untrusted. Use resources/prompts when intended clients support them; runtime skills and read-only annotations are not enforcement.

Require native ESM JavaScript/OOP/JSDoc and runtime validation. Plan negative tests for malformed input, forbidden operations/URLs, sensitive output, resource bounds, concurrent independent requests and applicable identity/write/recovery risks. READY FOR IMPLEMENTATION is scoped contract readiness, not deployment or publication approval.

## Workflow

1. Define the capability.
   - State what the user or agent needs to accomplish.
   - Prefer a meaningful business or platform capability over a thin mirror of a vendor REST endpoint.

2. Choose the MCP primitive deliberately.
   - Use a tool for an operation or action.
   - Use a resource for addressable context or a prompt for reusable interaction guidance when supported by the intended clients.
   - If current MCP behavior materially affects the choice, consult authoritative current MCP/OpenAI documentation.

3. Define semantic responsibility.
   - Give the capability one clear responsibility.
   - Avoid combining unrelated operations only to reduce tool count.
   - Avoid exposing transport, vendor path, or SDK implementation details unless they are part of the intentional public contract.

4. Define inputs.
   - Specify validated caller-provided inputs.
   - Separate trusted server context from caller inputs.
   - Never make an arbitrary caller-supplied tenant identifier sufficient authorization.
   - Mark optional, required, bounded, paginated, or enumerated inputs clearly.

5. Define authorization and tenant context.
   - For Tier 1, document public-operation policy, host access, and any scoped public-read provider key; justify N/A for absent identity/tenant context.
   - For protected operations, state authenticated identity, trusted tenant context, required entitlements and server-selected credentials/accounts.

6. Define external integration mapping.
   - Identify the approved public API/SaaS adapter or platform service used.
   - Keep vendor-specific response shapes behind the integration boundary unless deliberate coupling is approved.
   - Account for pagination, throttling, timeout, and vendor lifecycle constraints when relevant.

7. Define output contract.
   - Return only data needed by the agent or Tool UI.
   - Prefer stable platform-oriented structures over volatile vendor response passthrough.
   - Exclude access tokens, refresh tokens, secrets, connection strings, encryption keys, and internal credentials.

8. Define errors.
   Distinguish meaningful classes where relevant:
   - validation failure;
   - unauthenticated request;
   - unauthorized operation;
   - tenant/integration configuration failure;
   - vendor authentication/authorization failure;
   - rate limiting;
   - dependency outage/network failure;
   - internal platform failure.

9. Define side effects and idempotency.
   - State whether the operation is read-only or mutating.
   - For writes, define duplicate-execution risk, idempotency behavior, and retry constraints.
   - Do not recommend blind retries for ambiguous write failures.

10. Define persistence behavior.
    - State whether the tool requires durable platform state.
    - Justify any new persistence.
    - Preserve the third-party SaaS system-of-record boundary.

11. Define Tool UI relationship when applicable.
    - Identify which output fields are intended for React/Apps SDK rendering.
    - Keep authorization and authoritative business logic server-side.
    - Define follow-up actions explicitly rather than relying on undocumented UI/server coupling.

12. Define observability without leaking data.
    - Identify correlation and operation metadata useful for diagnosis.
    - Do not require sensitive payload or credential logging.

13. Define acceptance and verification criteria.
    - Include contract tests and negative cases appropriate to authorization, tenant isolation, error behavior, and writes.

14. Produce the contract using `references/mcp-contract-template.md`.

## Contract quality rules

Prefer names and descriptions that explain agent intent.

Avoid:

- names derived mechanically from vendor endpoint paths;
- one tool that performs several unrelated operations;
- raw vendor responses as the default public schema;
- credentials or secrets in inputs/outputs;
- caller-controlled tenant authorization;
- hidden persistence;
- undocumented side effects;
- retry semantics that can duplicate writes.

## Readiness gate

Mark the design `READY FOR IMPLEMENTATION` only when:

- responsibility is unambiguous;
- inputs and trusted context are separated;
- public-operation policy or applicable authorization and tenant behavior are defined;
- runtime input/output schemas, errors, provenance and applicable handoffs are explicit;
- system-of-record and persistence behavior are clear;
- side effects/idempotency are defined when relevant;
- Tool UI contract is defined when relevant;
- acceptance criteria are testable;
- no unresolved architecture decision blocks implementation.

Otherwise mark it `DESIGN BLOCKED` and list the missing decisions.

## Boundaries

Do not:

- implement production code as part of this skill;
- approve architecture decisions;
- invent current external API behavior;
- duplicate vendor business data without a documented reason;
- weaken authorization for convenience.
