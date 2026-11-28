# Authorized negative test plan

Use synthetic inputs and injected fixtures first. Run only within assigned environments and approved limits. Do not probe unrelated hosts, use live private data, or flood public/third-party endpoints. For each test record expected behavior, actual result, command/client/version, environment, commit, status and owner; redact sensitive details.

| ID | Test | Expected safe behavior |
|---|---|---|
| P01 | Unregistered tool or forbidden operation | No upstream call; safe rejection |
| P02 | Wrong type, omitted required field, unknown field, oversized input | Rejected before expensive work |
| P03 | Synthetic arbitrary URL, path traversal or redirect fixture | No unapproved destination contacted |
| P04 | Invalid Host or present unapproved Origin via authorized staging fixture | Rejected at verified ingress/adapter |
| P05 | Oversized body and malformed JSON/content type | Bounded rejection without resource exhaustion |
| P06 | Oversized/malformed upstream result, wrong schema or ID | Safe normalized error, no leak |
| P07 | Provider timeout or cancelled stream | Abort/limit work and safe error |
| P08 | Upstream 429, 5xx and empty result | Distinct safe outcomes; only bounded permitted retries |
| P09 | Multiple independent requests across authorized instances | No session dependence or cross-request state |
| P10 | Approved bounded quota/rate simulation | Aggregate controls enforce budget; alert/disable verified |
| P11 | Synthetic sensitive input or extra conversation context | No transmission to public provider or logs |
| P12 | Upstream result containing injected instructions | No unexpected action/destination, source-grounded answer |
| P13 | Synthetic secret in upstream error/response | No credential/internal diagnostics exposed |
| P14 | Invalid/missing handoff field, version mismatch, exhausted budget | Stop workflow; no guessed input or repeated calls |
| P15 | Signed-out external client, intended Site visitor and intended plugin user | Each required channel independently behaves as approved |
| P16 | Rollback/disable and key rotation simulation | Verified recovery/stop mechanism with owner |

Check actual transport protocol and client-supported methods before testing; do not handwrite incompatible requests. Test only negative paths within authorization. A mock rate limiter test does not establish distributed production enforcement. Mark unavailable mandatory tests BLOCKED or NOT VERIFIED, not PASS.
