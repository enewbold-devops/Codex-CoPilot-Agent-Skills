---
name: enewbold-tenant-security-review
description: Perform a threat-oriented review of multi-tenant behavior in the MCP integration platform. Use when changes affect authentication, authorization, tenant resolution, SaaS account selection, token lookup, SQL tenant scoping, MCP tools, Dataverse correlation, caching, write operations, or any path where one customer might influence access to another customer's data or credentials. Trace trusted tenant context end to end, test substitution and cross-tenant abuse cases, and produce evidence-based findings without modifying production code.
---

# ENewbold Tenant Security Review

Follow the repository root `AGENTS.md`, accepted ADRs, and relevant authentication/persistence architecture.

Review whether tenant identity and authorization remain trustworthy across the entire operation path.

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
