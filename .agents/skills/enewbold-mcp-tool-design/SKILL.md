---
name: enewbold-mcp-tool-design
description: Design or materially revise MCP tool and resource contracts for the repository before implementation. Use when adding a new agentic capability, changing MCP inputs or outputs, mapping third-party SaaS operations into MCP, defining authorization or tenant context for a tool, connecting a tool to React/Apps SDK UI, introducing write operations, or reviewing an existing tool contract. Produce an implementation-ready semantic contract with explicit security, error, persistence, idempotency, and verification requirements without exposing vendor internals or secrets.
---

# ENewbold MCP Tool Design

Follow the repository root `AGENTS.md`, accepted ADRs, and relevant MCP architecture documentation.

Design the agentic capability before writing or materially changing server code.

## Workflow

1. Define the capability.
   - State what the user or agent needs to accomplish.
   - Prefer a meaningful business or platform capability over a thin mirror of a vendor REST endpoint.

2. Choose the MCP primitive deliberately.
   - Use a tool for an operation or action.
   - Use a resource when the capability is primarily addressable/readable context and the repository architecture supports that pattern.
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
   - State how authenticated identity is established.
   - State how trusted tenant context is resolved.
   - State required permissions or entitlement checks.
   - Identify which credentials or SaaS account mappings are selected server-side.

6. Define external integration mapping.
   - Identify the SaaS adapter operation or platform service used.
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
- authorization and tenant behavior are defined;
- output and error contracts are explicit;
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
