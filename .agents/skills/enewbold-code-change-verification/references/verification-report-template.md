# Verification Report Template

## Overall Status
`PASS`, `FAIL`, `BLOCKED`, or `NOT VERIFIED`.

## Scope
State the change and acceptance criteria being verified.

## Environment
Identify relevant local/test/sandbox context and material limitations.

## Checks
Use a table when useful:

| Check | Evidence | Status |
|---|---|---|
| Example: build | `npm run build` | PASS |

For each material check, include the exact command or interaction when practical.

## Acceptance Criteria
Map each acceptance criterion to evidence and status.

## Negative / Security Cases
List applicable negative cases and their results.

## Failures
For each failure, state observed behavior and the contract/criterion violated.

## Blockers
State the concrete missing dependency or environment constraint.

## Not Verified
List any material behavior that remains untested.

## Non-Blocking Observations
Record useful issues that do not determine the overall status.

## Required Follow-up
Identify the responsible role and the next verification that must run after remediation.
