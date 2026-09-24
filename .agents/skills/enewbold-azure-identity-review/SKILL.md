---
name: enewbold-azure-identity-review
description: Review Azure identity and access design for the MCP platform. Use when changes affect App Service or workload identity, managed identity, Key Vault, Azure SQL access, environment separation, service principals, developer/local authentication, RBAC, secrets, or agent access to cloud resources. Determine which principal accesses which resource for what operation, prefer identity-based access where supported, verify least privilege and dev/test/prod separation, and identify permissions that exceed the workload's required capabilities.
---

# Azure Identity Review

Follow the repository root `AGENTS.md`, accepted ADRs, and relevant deployment/authentication architecture.

Review real technical access controls rather than relying on agent instructions as protection.

## Workflow

1. Build the access matrix.
   For each relevant flow identify:
   - principal/workload/developer identity;
   - target Azure resource;
   - required operation;
   - credential mechanism;
   - environment;
   - current role/permission where known.

2. Prefer identity-based access.
   - Determine whether managed identity or another approved Azure identity mechanism can replace embedded credentials.
   - Flag long-lived platform secrets that exist only because identity-based access was not considered.

3. Review least privilege.
   - Compare granted permissions with actual required operations.
   - Flag broad subscription/resource-group permissions when a narrower resource/data-plane role is sufficient.
   - Distinguish management-plane and data-plane access.

4. Review Key Vault access.
   - Identify who can read, write, rotate, or administer secrets/keys.
   - Ensure runtime workloads receive only required operations.
   - Separate application access from administrative access.
   - Review whether secret values can leak to logs, environment dumps, or agent context.

5. Review SQL access.
   - Prefer approved identity-based database authentication where supported by the architecture.
   - Review database-level permissions separately from Azure resource permissions.
   - Ensure runtime identity does not receive schema/admin privileges unless required.

6. Review local development identity.
   - Distinguish developer convenience from production workload identity.
   - Ensure local agents and developers do not automatically inherit production permissions.
   - Prefer dev/test resources and explicitly scoped identities.

7. Review environment isolation.
   - Verify dev, test, and production identities/resources are separated appropriately.
   - Identify credential or role reuse across environments.
   - Review CI/CD identity separately from runtime identity.

8. Review operational flows.
   Consider rotation, revocation, break-glass access, deployment, and incident response when relevant.

9. Verify current Azure behavior from authoritative documentation when role semantics or service capabilities materially affect the conclusion.

10. Produce the review using `references/azure-access-report.md`.

## Access-control principle

An instruction such as "do not access production" is guidance, not enforcement. Security must come from identity, RBAC, database permissions, network/environment controls, sandboxing, and approval mechanisms.

## Boundaries

Do not:

- grant or broaden permissions during review;
- recommend Owner/Contributor as a default shortcut;
- put secrets in source control or agent prompts;
- assume managed identity alone establishes tenant authorization inside the application;
- conflate Azure RBAC with application-level tenant authorization.

## Escalation

Return excessive permissions, production-access exposure, or architecture changes to the Engineering Lead and Security Reviewer. Route infrastructure changes requiring durable platform decisions through the Solution Architect.
