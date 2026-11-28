# Verification Report Template

## Overall Status
`PASS`, `FAIL`, `BLOCKED`, or `NOT VERIFIED` (overall); individual criteria may be justified `N/A`.

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

## Profile-Gate Matrix
| Gate / criterion | Applicable? | Environment and exact command/flow | Evidence | Status / N/A rationale |
|---|---|---|---|---|
| ESM JavaScript / runtime schemas | | | | |
| MCP initialization/discovery/call | | | | |
| Tier 1 public policy/statelessness/negative tests | | | | |
| Actual Sites execution and live read | | | | |
| Public Site access | | | | |
| Anonymous external MCP access | | | | |
| Intended plugin distribution | | | | |
| Tier 2/3 applicable tenant/auth/write controls | | | | |
| Tier 3 durable recovery/duplicates | | | | |

Record profile, framework revision, runtime/client/SDK and date. A local build or document check is not runtime discovery/deployment proof. Required unresolved gates block release.
