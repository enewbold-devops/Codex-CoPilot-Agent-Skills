---
name: enewbold-tenant-security-review
description: Independently review actual multi-tenant or protected account trust boundaries for MCP integrations, especially Tier 2 and Tier 3. Use when identity, authorization, account selection, credentials, tenant-scoped persistence, caching, writes or asynchronous workers could enable cross-tenant access. Trace trusted context and negative cases. Do not activate solely for anonymous public reads without tenant boundaries.
---

# ENewbold Tenant Security Review

Follow the repository root `AGENTS.md`, accepted ADRs, and relevant authentication/persistence architecture.

Review whether tenant identity and authorization remain trustworthy across the entire operation path.

## Profile applicability and invariants

Read the [profile selection guide](../../../docs/architecture/profiles/README.md) and selected solution record. Establish applicability before reviewing. If Tier 1 genuinely has no private/customer data, account selection, tenant context or tenant-owned credentials, record N/A with evidence and route public trust-boundary assessment to the Security Reviewer under the Tier 1 profile. Absence of tenancy does not prove security. If protected resources are discovered, escalate reclassification; never invent a tenant model or waive isolation. Preserve the review below for applicable Tier 2/3 paths, including asynchronous workers, callbacks, approval/status lookups, replay and duplicate events. Distinguish inspected, exercised and unverified paths.

## Workflow

1. Identify the protected operation.
   - State the resource/action being protected.
   - Identify authentication source, trusted tenant source, resource ownership, and required authorization.

2. Trace tenant context end to end.
   Follow the path through applicable layers:
   - AI/client request;
   - authentication boundary;
   - MCP tool/resource;
   - application/service layer;
   - SQL/token store;
   - SaaS adapter/account mapping;
   - Dataverse/support correlation;
   - logs/cache/telemetry.

3. Separate caller input from trusted context.
   - Identify every tenant/account/resource identifier supplied by the caller.
   - Verify server-side ownership checks before such values influence credential lookup or resource access.
   - Flag any path where a caller-controlled tenant identifier is sufficient authorization.

4. Test cross-tenant substitution mentally and, when assigned and safe, through available tests.
   Consider:
   - tenant A using tenant B's identifier;
   - tenant A referencing tenant B's SaaS account/resource;
   - credential lookup with mismatched tenant and integration IDs;
   - cache keys missing tenant scope;
   - SQL queries missing tenant predicates;
   - Dataverse/customer correlation collisions;
   - errors that reveal existence of another tenant's resources.

5. Review authorization consistency.
   - Compare similar tools/endpoints for missing or weaker checks.
   - Separate authenticated identity from permission to perform the operation.
   - Review write operations for stronger privilege and confirmation requirements where applicable.

6. Review credential selection.
   - Verify credentials are selected from trusted server-side tenant/integration context.
   - Verify token records cannot be enumerated or selected across tenants.
   - Check decrypted credential scope and lifetime.

7. Review data exposure.
   - Check MCP outputs, UI payloads, errors, logs, telemetry, caches, and support records for cross-tenant leakage.
   - Minimize identifiers that allow probing another tenant's existence.

8. Review persistence enforcement.
   - Verify tenant ownership is explicit in schemas and query paths.
   - Do not assume an ORM, repository class, or UI filter automatically enforces tenant isolation.

9. Produce findings using `references/tenant-security-report.md`.

## Finding quality

For each finding, include:

- affected boundary;
- verified evidence;
- abuse/failure path;
- security impact;
- required security property;
- recommended remediation;
- verification method.

Use severity only when supported by a clear impact and exploit/failure path.

## Boundaries

Do not:

- modify production code during independent security review;
- treat UI controls as authorization enforcement;
- treat agent personas or prompts as security controls;
- assume tenant isolation because happy-path tests pass;
- expose real secrets while proving a finding.

## Escalation

Return critical trust-boundary findings to the Engineering Lead immediately. Route architecture-level remediation through the Solution Architect and implementation remediation through the responsible engineer.
