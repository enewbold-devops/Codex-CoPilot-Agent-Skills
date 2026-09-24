# MCP Contract Template

## Capability
Describe the user/agent outcome.

## Primitive
`Tool` or `Resource`, with rationale when non-obvious.

## Proposed Name
Use a semantic platform-oriented name.

## Description
Write a concise description suitable for agent discovery.

## Inputs
List caller-provided fields, validation, optionality, bounds, and pagination controls.

## Trusted Context
Describe authenticated identity, tenant context, entitlement, and server-resolved integration context.

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
