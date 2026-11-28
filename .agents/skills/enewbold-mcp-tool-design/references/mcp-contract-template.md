# MCP Contract Template

## Capability
Describe the user/agent outcome.

## Primitive
`Tool`, `Resource` or `Prompt`, with rationale when non-obvious.

## Proposed Name
Use a semantic platform-oriented name.

## Description
Write a concise description suitable for agent discovery.

## Inputs
List caller-provided fields, validation, optionality, bounds, and pagination controls.

## Trusted Context
Describe public policy and host access, or applicable authenticated identity, tenant context, entitlement and server-resolved context; justify N/A.

## Authorization
State required checks and where they are enforced.

## External Operation
Identify the SaaS adapter or platform operation without leaking unnecessary vendor details into the public contract.

## Output
Define the stable structured result.

## Error Semantics
Define meaningful error classes and caller-visible behavior.

## Side Effects
State `Read-only` or describe mutations.

## Idempotency and Retry
Describe duplicate-execution behavior and retry constraints.

## Persistence
State what, if anything, is persisted and why.

## Tool UI Relationship
Describe UI rendering fields, follow-up actions, and client/server responsibility when applicable.

## Observability
Describe safe correlation and operational signals.

## Security Considerations
List tenant, credential, authorization, privacy, and data-exposure concerns.

## Verification Criteria
List tests required to establish the contract.

## Status
`READY FOR IMPLEMENTATION` or `DESIGN BLOCKED`.

## Decisions Required
List unresolved Principal Engineer decisions, or `None`.

## Profile, Operation Inventory and Handoff
- Selected profile/revision and solution record:
- Source authority, official docs URL, API version and evidence date:
- Approved method/path/parameter mapping, rights, quota and pagination:
- Allowed data, provenance/freshness, input/result bounds:
- Runtime input/output schema locations and versions:
- Handoff mapping (producer output -> consumer input, schema/version, required/optional, validation, preconditions, policy, no-result/error):
- Public-operation allowlist, SSRF/redirect and resource-budget controls:
- Trusted identity/tenant resolution or justified N/A:
- Stateless concurrency or approved durable state/side-effect behavior:
- Target runtime/transport/client and optional prompt/resource/UI:
- Negative tests, gates, blockers and approval:

Prompt/resource descriptions and read-only annotations are not authorization.
