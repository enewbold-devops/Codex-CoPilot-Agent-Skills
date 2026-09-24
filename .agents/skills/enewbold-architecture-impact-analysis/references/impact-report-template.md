# Architecture Impact Report Template

Use this structure for substantial analyses. Omit sections that are genuinely not applicable.

## Problem
State the requested engineering outcome and architecture question.

## Current State
Summarize verified relevant implementation and accepted architecture.

## Affected Components
Identify modules, services, data stores, external services, and UI surfaces affected.

## Affected Contracts
Identify MCP, UI, adapter, database, Dataverse, or deployment contracts that change.

## Data Ownership
State the system of record for affected data and whether new persistence is proposed.

## Trust and Tenant Boundaries
Describe how identity, tenant context, credentials, and untrusted input flow through the change.

## Security Impact
List security-relevant implications and whether dedicated security review is required.

## Reliability and Failure Modes
List meaningful dependency or partial-failure scenarios.

## Compatibility and Migration
Describe breaking changes, migrations, rollout constraints, or state transitions if applicable.

## Proposed Architecture
Describe the recommended component responsibilities and interactions. Label this as a proposal until approved.

## ADR
State `Required`, `Not Required`, or `Pending Decision`, with a short rationale.

## Implementation Constraints
List invariants the implementation agents must preserve.

## Required Roles
Identify which specialist agents should participate.

## Decisions Required
List decisions requiring Principal Engineer approval. Write `None` when there are none.
