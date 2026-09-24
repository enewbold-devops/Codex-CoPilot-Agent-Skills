# AGENTS.md

## 1. Purpose

This repository contains an agentic integration platform centered on a Node.js Model Context Protocol (MCP) server, React-based MCP Tool UIs, third-party SaaS integrations, Azure-hosted infrastructure, secure tenant credential persistence, and CRM/support integration through Microsoft Dataverse.

This file defines repository-wide engineering rules for GitHub Copilot, OpenAI Codex, repository-local agents, skills, and human engineers using agent-assisted workflows.

- Role-specific behavior belongs in `.github/agents/`.
- Reusable procedures belong in `.agents/skills/`.
- Detailed system design belongs in `docs/architecture/`.
- Durable architecture decisions belong in `docs/adr/`.

Do not duplicate those sources unnecessarily in this file.

## 2. Normative Language

- **MUST** indicates a required engineering or architectural constraint.
- **MUST NOT** indicates prohibited behavior.
- **SHOULD** indicates the expected default unless a documented reason justifies another approach.
- **MAY** indicates an acceptable option.

When a requested change conflicts with a MUST or MUST NOT rule, identify the conflict rather than silently bypassing it.

## 3. Engineering Authority

The human Principal Engineer retains authority over significant architectural decisions.

Agents MAY investigate current architecture, propose alternatives, implement approved architecture, create tests, perform reviews, propose ADRs, and identify inconsistencies.

Agents MUST NOT silently establish new platform-wide architectural patterns when the change warrants an architectural decision.

Significant architecture decisions SHOULD be surfaced before broad implementation, including changes to authentication, authorization, tenant isolation, credential storage, persistence technology, system-of-record boundaries, MCP contract conventions, frontend/backend trust boundaries, infrastructure topology, or major cross-service dependencies.

## 4. Source-of-Truth Hierarchy

Treat repository state as the durable engineering record.

Use this hierarchy when determining intended behavior:

1. accepted ADRs in `docs/adr/`;
2. architecture documentation in `docs/architecture/`;
3. this `AGENTS.md`;
4. current application contracts and tests;
5. implementation details;
6. conversational context.

Conversation history MUST NOT become the only record of an architectural decision.

If implementation contradicts an accepted ADR or architecture document, surface the inconsistency.

## 5. System Architecture Principles

The platform is an integration and orchestration system.

Third-party SaaS platforms remain the authoritative systems of record for their domain data unless an accepted ADR explicitly establishes otherwise.

The MCP server MUST NOT become an unnecessary replica of third-party SaaS business data.

Persist only information required to operate the integration platform, such as tenant configuration, SaaS account identifiers, encrypted authorization material, token metadata, integration state, platform configuration, and support correlation identifiers.

Transactional business data SHOULD normally be retrieved from the authoritative SaaS service rather than copied into the platform database.

Caching MAY be introduced when justified by performance, resiliency, rate limits, or vendor constraints, but ownership, TTL, invalidation, and staleness behavior MUST be explicit.

## 6. Major Platform Boundaries

### MCP Server

The Node.js MCP server owns MCP tool/resource definitions, tool execution orchestration, authorization enforcement, third-party SaaS coordination, tenant-context resolution, structured error normalization, and integration with approved platform services.

### Third-Party SaaS Adapter Layer

SaaS-specific behavior SHOULD be isolated behind integration boundaries. MCP implementations SHOULD NOT scatter vendor-specific API behavior across unrelated code.

Vendor adapters SHOULD encapsulate authentication behavior, endpoint invocation, request/response transformation, pagination, throttling, retries where safe, API version concerns, and vendor error normalization.

### React / MCP Tool UI

The frontend owns presentation and interactive agentic application experiences. Tool UI components MUST consume explicit contracts and MUST NOT depend on undocumented internal server behavior.

### SQL Persistence

SQL persistence owns approved durable platform state. The database MUST NOT become an uncontrolled replica of third-party SaaS systems.

### Microsoft Dataverse

Dataverse supports CRM, feedback, support, case-management, and escalation workflows. Dataverse SHOULD NOT become the transactional system of record for SaaS operational data unless explicitly approved.

### Azure Services

Azure provides hosting, identity, secret management, monitoring, and related platform capabilities. Azure-managed identity SHOULD be preferred over embedded platform credentials when supported.

## 7. MCP Design Rules

MCP tools MUST have clearly defined contracts.

Every tool SHOULD have a specific responsibility, validated inputs, predictable structured outputs, normalized errors, documented authorization expectations, and clear tenant-context behavior.

Tool names and descriptions SHOULD communicate intent clearly enough for an AI client to select the correct tool.

Avoid tools that combine unrelated operations merely to reduce tool count.

MCP results MUST NOT expose access tokens, refresh tokens, API secrets, encryption keys, connection strings, internal credentials, or sensitive platform configuration.

MCP operations SHOULD behave statelessly from the caller's perspective even when secure server-side persistence supports the operation.

A tool MUST NOT trust tenant identity solely because a tenant identifier was supplied as an arbitrary tool argument.

Tenant and authorization context MUST come from trusted authenticated platform context.

## 8. Third-Party SaaS Integration Rules

The third-party SaaS API remains authoritative for the SaaS domain.

Integration code MUST respect vendor authentication, authorization, pagination, rate limiting, API lifecycle, and version constraints.

External API responses SHOULD be translated into stable platform contracts where doing so prevents vendor implementation details from leaking throughout the application.

Do not couple MCP contracts directly to vendor response shapes unless that coupling is deliberate and documented.

Vendor failures SHOULD be normalized into meaningful platform errors.

Retries MUST NOT be introduced blindly. Before retrying a write operation, consider idempotency, duplicate transaction risk, vendor request semantics, and timeout ambiguity.

Integration code SHOULD distinguish authentication failure, authorization failure, validation failure, rate limiting, vendor outage, network failure, tenant configuration failure, and internal platform failure.

## 9. Authentication, Authorization, and Tenant Isolation

The platform is multi-tenant. Tenant boundaries MUST be treated as security boundaries.

Every operation involving tenant-specific resources MUST establish trusted tenant context before accessing tokens, SaaS accounts, configuration, persisted integration data, Dataverse correlation data, or third-party API operations.

Tenant identifiers supplied by a client MUST NOT alone establish authorization.

Authorization checks MUST occur server-side.

Cross-tenant credential access or data leakage is a critical defect.

Data-access code SHOULD make tenant scoping explicit and difficult to omit accidentally.

Changes affecting tenant-context resolution, authentication, authorization, or credential lookup require security review.

## 10. Secret and Token Handling

Platform-owned secrets SHOULD be stored in Azure Key Vault where appropriate.

Secrets MUST NOT be committed to the repository or appear in source code, committed configuration, logs, telemetry, MCP responses, Tool UI payloads, exception messages, test snapshots, screenshots, or prompts.

Tenant-specific SaaS authorization material may require durable storage. Persisted credential material MUST use the approved encrypted-storage design.

Token storage and lifecycle behavior MUST distinguish access tokens, refresh tokens, expiration metadata, vendor account identifiers, scopes, and token status where applicable.

Sensitive values SHOULD be decrypted only within the smallest practical execution boundary.

Never log decrypted credentials.

Key rotation and token rotation SHOULD be considered when designing storage formats.

## 11. Azure Identity and Key Vault

Prefer identity-based Azure access over embedded credentials.

Local development SHOULD use approved developer identities or explicitly scoped development credentials.

Hosted workloads SHOULD use appropriate Azure-managed identities when supported.

Production credentials MUST NOT be broadly available to development agents or local tooling.

Access to Key Vault SHOULD follow least-privilege principles.

An agent instruction such as "do not modify production" MUST NOT be treated as a security control. Enforcement must come from identity, permissions, environment separation, networking, sandboxing, approval controls, or equivalent mechanisms.

## 12. SQL Persistence Rules

Schema changes MUST be intentional and reviewable.

Persistent entities SHOULD have clear ownership and lifecycle semantics.

Tenant-owned records MUST be tenant scoped, and queries involving tenant-owned information MUST enforce tenant boundaries.

Before introducing a persisted field, determine why it must be durable, who owns it, whether the SaaS provider already owns the authoritative value, sensitivity, retention/deletion requirements, and encryption requirements.

Database migrations SHOULD be repeatable and reviewable.

Application behavior MUST NOT depend on manually edited production schema.

## 13. Dataverse CRM and Support Boundary

Dataverse supports customer relationship, feedback, case-management, and escalation workflows.

Dataverse MAY contain customer and tenant correlation information required to support those workflows.

Support records SHOULD reference platform or SaaS identifiers rather than unnecessarily duplicating complete SaaS transactional datasets.

Changes affecting Dataverse schemas or synchronization SHOULD identify source of truth, synchronization direction, correlation identifiers, retry behavior, duplicate prevention, customer-data implications, and support lifecycle.

## 14. React and MCP Tool UI Rules

React Tool UI components MUST treat server-provided data as external input.

UI code MUST NOT contain trusted secrets.

Authorization MUST NOT depend solely on UI behavior. The backend remains responsible for security enforcement.

Tool UI contracts SHOULD be explicit and version-conscious.

Components SHOULD handle applicable loading, empty, partial, recoverable error, terminal error, unauthorized/unavailable, and success states, plus accessibility and constrained/embedded rendering.

Security-sensitive or authoritative business logic SHOULD remain server-side.

## 15. ChatGPT, Apps SDK, and OpenAI Integration

OpenAI, ChatGPT, Apps SDK, Codex, MCP client integration, and related platform capabilities evolve over time.

When implementing or changing behavior that depends on OpenAI platform APIs or current product requirements, consult current official OpenAI documentation rather than relying exclusively on model knowledge or historical repository assumptions.

When the OpenAI developer documentation MCP server is configured, use it for current OpenAI API, ChatGPT, Apps SDK, plugin, Codex, and MCP platform questions.

Avoid coupling core business logic unnecessarily to one AI client when the behavior belongs at the MCP or platform layer.

## 16. Error Handling

Errors SHOULD be useful without exposing sensitive implementation information.

Do not leak secrets, tokens, sensitive SQL statements, internal stack traces to external callers, infrastructure credentials, or unnecessary tenant information.

External errors SHOULD use stable structured representations where practical.

Integration boundaries SHOULD preserve enough internal context to diagnose vendor failures safely.

## 17. Logging and Observability

Observability SHOULD support request correlation, tenant-safe diagnostics, MCP operation tracing, third-party API diagnostics, latency analysis, failure categorization, and support escalation.

Sensitive values MUST be redacted before logging.

Correlation identifiers SHOULD be preferred over logging large request/response payloads.

Logging changes involving external payloads or authentication flows require explicit consideration of data exposure.

## 18. Coding and Module Design

Prefer clear module boundaries over large multifunctional files.

Separate protocol, business orchestration, vendor integration, persistence, and presentation concerns where practical.

Avoid unnecessary abstractions.

Do not introduce a new framework, architectural pattern, or major dependency when an existing project pattern adequately solves the problem.

New dependencies SHOULD have clear justification.

Changes SHOULD be limited to the scope necessary to satisfy the task. Avoid unrelated refactoring unless required for correctness or security.

## 19. Investigation Before Modification

Before making a nontrivial change, inspect the relevant implementation and architecture documentation.

Do not assume file locations, APIs, schemas, or behavior when they can be verified from the repository.

For architecture-sensitive changes, determine current behavior, intended behavior, affected components/contracts, security implications, testing requirements, and whether an ADR is required.

## 20. Architecture Documentation Routing

Consult detailed documentation selectively when it exists:

- MCP server architecture: `docs/architecture/mcp-server.md`
- authentication/authorization/tenancy: `docs/architecture/authentication.md`
- persistence: `docs/architecture/persistence.md`
- React/MCP Tool UI: `docs/architecture/tool-ui.md`
- Dataverse CRM/support: `docs/architecture/dataverse-support.md`
- hosting/deployment: `docs/architecture/deployment.md`

Do not load every architecture document for every task.

## 21. Architecture Decision Records

Create or propose an ADR when a change establishes or modifies a significant durable architecture decision, including authentication strategy, authorization model, tenant isolation, token encryption architecture, system-of-record boundaries, persistence strategy, major external-service integration, MCP contract conventions, deployment topology, or cross-cutting reliability strategy.

An ADR SHOULD describe context, problem, considered options, decision, consequences, and security/operational implications where relevant.

Agents MAY draft ADRs. Final architectural approval remains with the Principal Engineer.

## 22. Testing and Verification

Code changes are incomplete until appropriate verification has occurred.

Verification SHOULD include the smallest relevant set of static analysis, linting, type checking, builds, unit tests, integration tests, contract tests, UI tests, browser tests, and security-focused negative tests.

Tests SHOULD validate externally meaningful behavior rather than implementation details alone.

Third-party SaaS integrations SHOULD be testable without uncontrolled production API access.

Security-sensitive flows SHOULD include negative tests such as wrong tenant, missing authorization, expired token, inaccessible secret, malformed request, and vendor authorization failure.

Do not claim tests passed unless they were actually executed successfully. If verification cannot be performed, state what remains unverified.

## 23. Security Review Triggers

A dedicated security review SHOULD occur when a change affects authentication, authorization, tenant resolution, credential storage, token refresh, encryption, Key Vault, tenant-sensitive SQL access, third-party API credentials, logging of sensitive payloads, externally reachable endpoints, write-capable MCP tools, or customer-sensitive Dataverse data.

Security review SHOULD consider both intended flows and abuse cases.

## 24. Agent Collaboration

Agents are engineering collaborators, not independent architectural authorities.

Role-specific agents SHOULD operate within their defined responsibility and delegate or hand off when work materially crosses role boundaries.

Typical collaboration:

Engineering Lead -> Solution Architect -> Implementation Engineer -> Security Reviewer -> Verification Engineer.

Not every task requires every role. Use the minimum collaboration necessary for the risk and complexity of the change.

Agents SHOULD distinguish verified repository facts, assumptions, proposed changes, unresolved decisions, and recommendations.

## 25. Harness Independence

Repository instructions MUST NOT depend on behavior unique to one AI harness unless explicitly documented.

GitHub Copilot and Codex may differ in tool permissions, handoffs, approvals, sandboxing, context handling, and execution environment.

Agent configuration metadata MUST NOT be treated as a security boundary unless the execution environment actually enforces it.

## 26. Work Planning

Substantial changes SHOULD begin with a short implementation plan identifying goal, affected components, architecture constraints, implementation sequence, testing strategy, security considerations, and decisions requiring human approval.

Small and obvious changes do not require ceremonial planning.

## 27. Change Discipline

Agents MUST NOT commit secrets, bypass tenant isolation, disable security controls merely to make tests pass, suppress errors without understanding them, weaken authorization for convenience, silently change public contracts, introduce production credentials into local development, claim verification that did not occur, or overwrite accepted architecture without surfacing the conflict.

Agents SHOULD avoid speculative abstraction, unnecessary dependencies, unrelated refactoring, duplicate implementations, and vendor-specific logic leaking across platform layers.

## 28. Definition of Done

A change is complete when applicable requirements are satisfied:

- requested behavior is implemented;
- architecture invariants remain intact;
- tenant boundaries remain enforced;
- authentication and authorization behavior is correct;
- secrets and tokens are protected;
- MCP contracts are explicit;
- SaaS system-of-record boundaries are respected;
- relevant tests/build/static validation pass;
- errors and logging are safe;
- relevant architecture documentation is updated;
- an ADR is created or proposed when required;
- unresolved risks are explicitly reported.

Completion does not mean merely producing compilable code.

## 29. When Uncertain

Do not invent platform behavior, repository conventions, external API behavior, or architecture decisions.

Inspect repository and applicable documentation first. For current external technologies, consult authoritative documentation where necessary.

When multiple implementations satisfy accepted architecture, prefer the simplest design that preserves security, clear boundaries, testability, maintainability, and minimal unnecessary coupling.

When a choice would materially change system architecture, present the decision for human review rather than silently selecting it.

## 30. Core Engineering Principle

Optimize for a system that is secure, explicit, testable, observable, maintainable, and portable across AI-assisted engineering environments.

The repository, not an individual chat session, is the durable source of engineering truth.
