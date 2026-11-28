---
name: enewbold-architecture-impact-analysis
description: Analyze architecture impact and profile fit for public stateless MCP, enterprise integrations and durable orchestration. Use before substantial changes to boundaries, MCP contracts, APIs, data ownership, identity, state, hosting, UI or other cross-cutting behavior. Identify gates, risks, alternatives, ADR/security review needs and Principal Engineer decisions; do not implement production code.
---

# ENewbold Architecture Impact Analysis Skill

Follow the repository root `AGENTS.md` and accepted ADRs as governing constraints.

Use this skill to determine what a proposed change affects before implementation. Do not use it as a substitute for implementation, security review, or acceptance testing.

## Profile applicability and invariants

Read the [profile selection guide](../../../docs/architecture/profiles/README.md), selected profile and solution record. For new public opportunities test Tier 1 candidacy before introducing infrastructure; for existing systems preserve accepted constraints. Separate non-sensitive public reads, protected resources/writes and durable execution. Mandatory gates override scoring; unknown evidence limits work to discovery or bounded safe prototypes.

For Tier 1 evaluate authoritative API docs/rights, data classification, approved read semantics, independent requests, user value, host compatibility, and public abuse controls. Verify Site access, Sites execution, external anonymous MCP and plugin distribution separately when required. Do not invent Azure, tenancy, SQL, Dataverse or UI. A hosting incompatibility alone does not imply Tier 2; propose an approved stateless alternative. Retain applicable Tier 2/3 controls, including workflow durability, authorization, idempotency, recovery and audit in Tier 3.

Evaluate native ESM JavaScript classes, JSDoc, runtime schemas, composition, isolated adapters and justified dependencies; no TypeScript source/compilation. Distinguish API inventory, semantic tool contracts, handoff fields and runtime plugin guidance from server enforcement. Record gate status, evidence source/date, N/A rationale, owners and decisions.

## Workflow

1. Establish the task envelope.
   - State the requested capability or change.
   - Identify the observable outcome.
   - Record explicit constraints and acceptance criteria already provided.

2. Establish current state before proposing future state.
   - Inspect the relevant implementation.
   - Read only the architecture documents and ADRs relevant to the affected area.
   - Identify external contracts that already exist.
   - Surface any conflict between code, tests, architecture docs, and ADRs.

3. Map affected boundaries.
   Evaluate only dimensions relevant to the task:
   - MCP server and tool/resource contracts
   - public API and third-party SaaS adapters
   - authentication and authorization
   - trusted tenant context and tenant isolation
   - token or secret handling
   - SQL persistence
   - Dataverse CRM/support flows
   - React/MCP Tool UI contracts
   - Azure identity, Key Vault, hosting, or deployment
   - logging, telemetry, and support correlation
   - compatibility with existing callers and persisted state

4. Trace data ownership and trust.
   - Identify the system of record for each affected data class.
   - Identify where untrusted input becomes trusted context.
   - Where protected resources exist, identify where tenant-scoped data or credentials are selected; otherwise explain N/A.
   - Challenge unnecessary replication of third-party SaaS business data.

5. Identify contract impact.
   - Determine whether MCP schemas, UI data contracts, database schemas, SaaS adapter contracts, or Dataverse mappings change.
   - Distinguish additive changes from breaking changes.
   - Identify migration or compatibility requirements when applicable.

6. Analyze security and reliability implications.
   - Identify authentication, authorization, tenant, token, secret, privacy, and logging implications.
   - Identify meaningful dependency failure modes.
   - Do not perform a full security review here; flag when the dedicated security review is required.

7. Determine decision level.
   Classify the change as one of:
   - implementation within accepted architecture;
   - implementation with documented architecture constraints;
   - architectural decision requiring Principal Engineer approval.

8. Determine documentation obligations.
   - Recommend an ADR when the change establishes or materially changes a durable architecture decision.
   - Identify architecture documents that must be updated after approval.

9. Produce the impact report using `references/impact-report-template.md`.

## Decision discipline

Keep these categories explicit:

- **Verified fact**: observed in repository state or authoritative documentation.
- **Accepted architecture**: established by `AGENTS.md`, architecture docs, or accepted ADRs.
- **Assumption**: not yet verified.
- **Proposal**: suggested future design.
- **Decision required**: requires Principal Engineer approval.

Do not convert a proposal into accepted architecture.

## External technology

When the analysis depends on current behavior of OpenAI, MCP, Azure, Dataverse, Node.js libraries, or a third-party SaaS API, consult authoritative current documentation if the available agent has web or documentation access. Separate verified external behavior from repository assumptions.

## Boundaries

Do not:

- implement production code;
- approve an ADR or architecture decision on behalf of the Principal Engineer;
- treat existing code as authoritative when accepted architecture says otherwise;
- load every architecture document indiscriminately;
- introduce persistence merely for convenience;
- treat an agent instruction or persona as a security boundary.

## Escalation

Return the analysis to the Engineering Lead with clearly marked decisions, required specialist roles, and implementation constraints. Escalate significant architecture decisions to the Principal Engineer before broad implementation.
