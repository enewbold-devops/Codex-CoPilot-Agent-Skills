# Architecture profile selection

Governed by [AGENTS.md](../../../AGENTS.md). Select the minimum profile satisfying the actual requirements. Profiles are engineering constraints, not claims of hosting entitlement or compliance.

| Profile | Qualification | Preferred hosting |
| --- | --- | --- |
| [Tier 1 – Public stateless MCP](tier-1-public-stateless-mcp.md) | Approved public non-sensitive information, read-only, independent requests | ChatGPT Sites (candidate; verify) |
| [Tier 2 – Enterprise MCP](tier-2-enterprise-mcp.md) | Authenticated private/tenant data or authorized business writes; request-driven | Azure-hosted Node.js |
| [Tier 3 – Durable orchestration](tier-3-durable-orchestration.md) | Durable workflows, long-running processing, approvals, asynchronous recovery or transactions | Azure plus justified durable services |

## Decision procedure

1. Inspect existing accepted ADRs, actual data flows, source rights, operation semantics, intended audience and constraints. Do not change existing classifications silently.
2. If durable business execution, approvals, recovery or asynchronous workflow state is essential, select Tier 3 candidate.
3. Otherwise if private/customer data, user identity, tenant authorization or business writes are required, select Tier 2 candidate.
4. Otherwise evaluate every Tier 1 qualification gate. Do not introduce enterprise services by default.
5. Missing evidence means Candidate/Blocked, not release-ready. Failed gates require redesign, rejection or reclassification. A hosting incompatibility alone does not imply Tier 2: consider an approved alternative stateless runtime via ADR.
6. Record the selected primary profile, constraints, evidence, and Principal Engineer approval for significant decisions. Mixed designs use the highest required control level for each affected boundary and a reviewed ADR. Reclassify if identity, data sensitivity, side effects, state or operational requirements materially change.

Report PASS, FAIL, BLOCKED, NOT VERIFIED or justified N/A for individual checks. Mandatory gates cannot be waived by a score. Do not label a genuine security obligation N/A. Production release requires applicable gates passed.

## Consuming solution record

Copy the following to `docs/architecture/solution-profile.md` in the consuming repository; record links to the framework revision and evidence. This is a template, not an accepted project decision.

- Solution/opportunity:
- Status: Candidate | Approved | Blocked
- Selected profile and framework revision:
- Principal Engineer approval / ADR:
- Business outcome, intended audience and measurable value:
- Authoritative API sources, operation inventory, versions:
- Usage rights, redistribution, attribution and quota evidence:
- Data classification, privacy and permitted parameters:
- Allowed operations and side effects:
- Identity, tenancy and authorization:
- State and persistence:
- Runtime, transport, hosting and deployment:
- Site access, external MCP access, plugin distribution:
- Contract and handoff registry:
- Security and operational constraints:
- Applicable roles and skills:
- Required verification gates, status and evidence:
- Assumptions, blockers and unresolved decisions:
- Escalation/reclassification triggers:

## Shared engineering rules

Native ESM JavaScript with documented object-oriented classes, composition, runtime validation and JS tests is mandatory across tiers. No TypeScript source or compilation requirement. Separate transport, domain services, contracts, policy and adapters. Runtime plugin skills are not engineering-time skills or security controls. Consult only relevant reference documents; never invent capability or approval. See [ADR-001](../../adr/ADR-001-tiered-engineering-profiles.md).
