# ADR-001: Hosting-independent engineering constitution and tiered architecture profiles

## Status

Proposed. The Principal Engineer requested implementation and specified native ESM JavaScript, OOP, meaningful documentation and immediate Tier 1 focus. This records the proposed governance details for review; it does not assert approval of every project migration or host capability.

## Context

The existing constitution assumes Azure, multi-tenant SaaS authentication, encrypted persistence, SQL, Dataverse and React Tool UI. These are useful enterprise controls but not universal prerequisites for public read-only APIs. Sites-hosted MCP/plugin support is documented; anonymous remote access and native JavaScript deployment require independent verification.

## Decision

Use one shared constitution and a selected profile per consuming solution: Tier 1 public stateless MCP (Sites candidate); Tier 2 authenticated request-driven enterprise MCP (Azure preferred); Tier 3 durable orchestration (Azure plus approved durable services). Require explicit profile record, applicable gates, native ESM JavaScript/OOP/JSDoc, runtime schemas, portable application and host adapters. Do not weaken real security boundaries. Separate public Site, anonymous MCP and plugin access evidence. Seek Principal Engineer approval for significant decisions, exceptions and reclassifications.

## Alternatives considered

- Retain Azure-first governance: preserves enterprise controls but over-scaffolds public projects.
- Separate frameworks per tier: duplicates rules and increases drift.
- Undifferentiated optional infrastructure: lacks explicit classification and release gates.

## Consequences

Shared specialist roles remain; Tier 1 avoids unnecessary identity/persistence. Runtime compatibility and API rights must be verified. JavaScript-only scaffolding requires documented contracts and runtime checks. Existing enterprise projects retain their accepted architecture and applicable controls.

## Security implications

Public data only, read-only allowlists, bounded execution, server enforcement and independent security review. Private data or writes require appropriate trusted identity, authorization and state controls. Skills/UI are not enforcement. Verify platform data-use restrictions.

## Operational implications

Record dated hosting, SDK, access, cost, quota and rollback evidence. Local success or a public Site URL does not prove external MCP access or plugin publication. No Sites deployment is part of this documentation change.

## Migration and compatibility

Introduce the profiles and constitution, then update specialist agents and existing skills in separate reviewable changes. Existing solutions must classify using actual requirements and accepted ADRs; do not silently migrate or downgrade. Subsequent Tier 1 skills and reference implementations are separate work.

## Related documents

- [AGENTS.md](../../AGENTS.md)
- [Architecture profiles](../architecture/profiles/README.md)
