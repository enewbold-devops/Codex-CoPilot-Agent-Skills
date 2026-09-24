---
name: enewbold-adr-authoring
description: Draft or update an Architecture Decision Record for the Azure-hosted MCP integration platform after an architectural decision has been proposed or approved. Use when architecture-impact analysis identifies a durable decision involving authentication, authorization, tenant isolation, credential storage, system-of-record ownership, persistence, MCP contract conventions, deployment topology, service boundaries, or another cross-cutting platform choice. Capture context, realistic alternatives, the decision, consequences, security/operational implications, and related records without inventing approval status.
---

# ADR Authoring

Follow the repository root `AGENTS.md`, relevant architecture documents, and existing ADR conventions.

Use this skill to create a durable record of an architectural decision. Do not use it to silently make the decision itself.

## Workflow

1. Establish decision provenance.
   - Identify the architecture question and the analysis or discussion that produced it.
   - Distinguish a proposed decision from one already approved by the Principal Engineer.
   - Do not mark an ADR `Accepted` unless approval is explicit in the task or durable repository record.

2. Inspect related records.
   - Read relevant ADRs and architecture documents.
   - Identify whether the new record supersedes, amends, or depends on an existing decision.
   - Preserve repository numbering and naming conventions when they exist.

3. State the context.
   - Describe the concrete problem, constraints, and forces that made a decision necessary.
   - Include only details needed to understand the decision later.
   - Separate current facts from assumptions.

4. Record realistic alternatives.
   - Include alternatives that were genuinely viable.
   - For each, capture material advantages, costs, security effects, operational effects, and migration impact when relevant.
   - Do not manufacture options merely to fill a template.

5. State the decision precisely.
   - Define ownership, boundaries, contracts, or technology choices clearly enough for implementation agents to follow.
   - Record important invariants and exclusions.
   - Avoid low-level implementation detail unless it is itself architectural.

6. Capture consequences.
   - Record positive and negative consequences.
   - Include new constraints, coupling, operational burden, migration work, or future flexibility.
   - Call out security and tenant-isolation implications explicitly when applicable.

7. Record compatibility and migration.
   - Identify affected APIs, schemas, persisted state, deployment, or client contracts.
   - State whether rollout or migration steps are required.

8. Link related decisions and documentation.
   - Reference superseded or dependent ADRs.
   - Identify architecture documents that should be updated to reflect the decision.

9. Produce the ADR using `references/adr-template.md`.

## Status discipline

Use status values according to repository convention. If no convention exists, use:

- `Proposed` when awaiting Principal Engineer approval;
- `Accepted` only when approval is explicit;
- `Superseded` when replaced by a later accepted ADR;
- `Deprecated` when intentionally retired without a direct replacement.

Do not infer acceptance from implementation alone.

## Boundaries

Do not:

- approve an architectural decision;
- rewrite unrelated ADRs;
- hide material tradeoffs;
- record speculative implementation detail as a platform invariant;
- contradict accepted ADRs without explicitly describing the conflict and supersession path.

## Escalation

Return unresolved decision points to the Engineering Lead and Principal Engineer. After approval, ensure the ADR status and related architecture documentation are updated consistently.
