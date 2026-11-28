---
name: enewbold-code-change-verification
description: Independently verify changes for all MCP profiles against acceptance criteria, JavaScript standards and architecture gates. Use for code, documentation, contracts, public API/enterprise integrations, durable workflows, Sites, UI or security verification. Execute focused checks and negative cases; distinguish local, hosted, external MCP and plugin evidence using PASS, FAIL, BLOCKED, NOT VERIFIED or justified N/A.
---

# Code Change Verification

Follow the repository root `AGENTS.md` and the task's explicit acceptance criteria.

Independently establish whether the implementation satisfies the requested behavior. Verification evidence matters more than optimistic inspection.

## Status vocabulary

Use only these statuses for verification claims:

- `PASS`: the check executed successfully and supports the claim.
- `FAIL`: the check executed and demonstrated incorrect behavior.
- `BLOCKED`: the check should be performed but cannot run because of a concrete dependency or environment blocker.
- `NOT VERIFIED`: the claim was not tested or otherwise established.
- `N/A`: the criterion genuinely does not apply; document evidence/rationale. Never use N/A for an untested mandatory gate.

Never convert `BLOCKED` or `NOT VERIFIED` into `PASS` based on code appearance.

## Profile applicability and invariants

Read the [profile selection guide](../../../docs/architecture/profiles/README.md), selected profile and solution record. Map verification criteria to mandatory profile gates. Documentation-only work verifies actual files, links, identifiers and consistency; runtime and harness discovery require separate execution evidence.

For implementation check native ESM JavaScript, documented classes/contracts, runtime schemas, absence of TS/TSX source or TypeScript compilation, runtime/SDK compatibility and actual MCP initialization, discovery, calls and errors where applicable. Tier 1 additionally verify public read-only allowlists, data scope/rights, SSRF/redirects, malformed/oversized inputs and responses, upstream errors, quotas, timeouts, safe logs and independent concurrent requests. Separate local Node tests, deployed Sites execution/live approved read, public Site access, anonymous external MCP access (when required) and intended plugin distribution/installation. Record actual runtime/client/SDK and flow; one boundary does not prove another.

Tier 2/3 retain applicable auth, tenant, credential, write, migration and hosting checks. Tier 3 additionally tests duplicates/out-of-order events, restart/recovery, stale approvals, ambiguous writes, compensation, worker isolation and audit. Use safe approved environments. Mandatory unresolved gates block release; N/A requires evidence.

## Workflow

1. Reconstruct the verification target.
   - Read the task goal and acceptance criteria.
   - Identify the changed components and public contracts.
   - Read relevant architecture constraints and ADRs only when needed to validate behavior.

2. Inspect the actual change.
   - Determine what files and interfaces changed.
   - Identify behavior not covered by the stated acceptance criteria but required by repository invariants.
   - Do not assume the implementation agent's summary is complete.

3. Select the smallest sufficient verification set.
   Choose applicable checks from:
   - linting;
   - formatting checks when enforced by the repository;
   - JavaScript static analysis and runtime contract validation;
   - build validation;
   - unit tests;
   - integration tests;
   - MCP contract tests;
   - SaaS adapter tests or sandbox tests;
   - database/migration tests;
   - security-focused negative tests;
   - React/UI tests;
   - browser interaction checks.

4. Prefer repository-defined commands.
   - Inspect package scripts, test configuration, CI definitions, and existing conventions.
   - Do not invent a new verification framework when existing commands cover the task.

5. Add risk-driven negative verification.
   When the change affects security-sensitive behavior, test applicable failure cases such as:
   - missing authentication;
   - unauthorized operation;
   - wrong or substituted tenant context;
   - expired or unavailable credential;
   - malformed input;
   - vendor authorization failure;
   - dependency outage or timeout;
   - duplicate/retried write where idempotency matters.

6. Verify MCP contracts explicitly when changed.
   - Validate input rejection and output shape.
   - Validate public policy or applicable authorization/tenant behavior.
   - Validate stable error semantics.
   - Validate that sensitive credentials are absent from outputs and logs available to the test.

7. Verify Tool UI behavior when changed.
   - Exercise loading, success, empty, and error states when applicable.
   - Use available browser tooling for interactive flows when practical.
   - Check console/runtime errors and critical accessibility behavior supported by the test environment.
   - Treat server authorization separately from UI behavior.

8. Capture evidence.
   - Record the exact command or interaction used for each material check.
   - Record success/failure output concisely.
   - Identify environmental blockers precisely.

9. Do not repair production implementation during independent verification.
   - Report failures to the Engineering Lead.
   - Allow the responsible implementation agent to fix the issue.
   - Re-run the relevant verification after the fix.
   - Test-only artifacts may be added only when the assigned verification role and harness explicitly permit editing; do not change production behavior silently.

10. Produce the report using `references/verification-report-template.md`.

## Verification discipline

Do not claim:

- tests passed when they were not run;
- production behavior is safe because mocks passed;
- browser behavior is correct from static code inspection alone;
- an external integration works when it was blocked by credentials or network access.

Distinguish simulated, sandbox, and production-adjacent verification where relevant.

## Completion rule

The overall result is:

- `PASS` only when all applicable acceptance-critical checks pass and no blocking required check remains; justified N/A criteria are excluded;
- `FAIL` when any acceptance-critical check fails;
- `BLOCKED` when completion depends on a required check that cannot be executed;
- `NOT VERIFIED` when requested verification was not performed sufficiently to establish the result.

Report non-blocking observations separately from the overall status.

## Escalation

Return failures, blockers, and unverified areas to the Engineering Lead. Route implementation defects back to the responsible implementation agent rather than fixing production code during verification.
