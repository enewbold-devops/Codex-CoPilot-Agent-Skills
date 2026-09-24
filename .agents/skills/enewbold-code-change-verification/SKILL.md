---
name: enewbold-code-change-verification
description: Independently verify code changes against stated acceptance criteria and repository engineering requirements. Use after implementation, before declaring work complete, or when asked to validate a fix, refactor, MCP contract, SaaS integration, security-sensitive change, or React/Tool UI behavior. Determine the smallest sufficient verification set, execute available builds/tests/static checks/browser flows, include negative cases where risk requires them, and report each claim as PASS, FAIL, BLOCKED, or NOT VERIFIED without silently repairing production code.
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

Never convert `BLOCKED` or `NOT VERIFIED` into `PASS` based on code appearance.

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
   - type checking/static analysis;
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
   - Validate authorization/tenant behavior.
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

- `PASS` only when all acceptance-critical checks pass and no blocking required check remains;
- `FAIL` when any acceptance-critical check fails;
- `BLOCKED` when completion depends on a required check that cannot be executed;
- `NOT VERIFIED` when requested verification was not performed sufficiently to establish the result.

Report non-blocking observations separately from the overall status.

## Escalation

Return failures, blockers, and unverified areas to the Engineering Lead. Route implementation defects back to the responsible implementation agent rather than fixing production code during verification.
