# Tier 1 Qualification Rules

Use the ten gates in the [Tier 1 profile](../../../../docs/architecture/profiles/tier-1-public-stateless-mcp.md) as authoritative. Evaluate current requirements and evidence, not aspirations. Mandatory gates cannot be waived by a score.

| Gate | Required evidence | Typical failure or unknown |
|---|---|---|
| Business fit | Defined audience, actual journey friction, bounded value and measurable success | No user outcome |
| Source | Authoritative public information API/source, official operations/version | Unverified endpoint or unreliable authority |
| Rights | Terms, license, permitted use, attribution, redistribution and quota | Prohibited use or unclear rights |
| Data | Non-sensitive public data and non-sensitive validated query fields | PHI, personal profiles, private records |
| Identity | No application-required end-user OAuth/tenant credentials/private resources; permitted scoped public-read key if needed | Private entitlement/identity required |
| Operations | Approved read-only semantics and allowlisted operations, including read-only POST if documented | Business mutation or uncontrolled destination |
| State | Independent requests, no durable user/business/session/credential/workflow state | Persistent business or workflow state required |
| Runtime | Actual Sites-compatible ESM JavaScript runtime, SDK, transport and egress demonstrated | Only documentation/local tests or incompatible dependency |
| Access | Intended audience can access each required Site, external MCP endpoint and plugin independently | Public Site assumed to imply anonymous MCP/plugin access |
| Safety | Reviewed data-use boundaries, allowlists, SSRF, budgets, rate limits, privacy-safe monitoring and operational controls | Missing controls or untested enforcement |

## Evidence statuses
PASS: sufficient direct evidence for the criterion. FAIL: evidence contradicts requirement. BLOCKED: concrete missing dependency/access prevents assessment. NOT VERIFIED: insufficient evidence. N/A: genuine nonapplicability with rationale for a subcheck; do not mark an applicable mandatory gate N/A. For an access gate, record individual required/not-required channels and verify every required one. Do not declare PASS on runtime/access/safety based solely on a proposed architecture.

## Decision order
1. Reject prohibited or intrinsically unsafe uses; redesign if a safe narrower scope is feasible.
2. Reclassify if identity/private data/business writes or durable workflow requirements demand Tier 2/3. Route to the Architect and Principal Engineer. A host limitation alone is not a reason to reclassify.
3. If required source/rights/data/operation evidence is missing, keep discovery blocked or limit work to offline non-sensitive fixtures; never live-test unapproved operations.
4. If requirements fit but runtime/access/safety evidence is still unknown, define bounded non-sensitive prototype with explicit approval, test limits and evidence milestones; no release.
5. Recommend proceeding to design for a supported requirements fit with documented open engineering gates; reserve release-ready for all applicable mandatory gates PASS plus required review and approval.

## Optional prioritization score (proposed planning aid, not policy)
Score each dimension 0 (no supporting evidence), 1 (partial), or 2 (strong). Unknown = 0 for ranking only; retain unknown gate status. Weighted points = weight * rating / 2. Record evidence and rationale. Do not apply an automatic pass threshold; compare only similarly scoped opportunities.

| Dimension | Weight |
|---|---:|
| Customer engagement impact (risk/time/navigation) | 25 |
| Authoritative API coverage and rights clarity | 20 |
| Stateless/read-only/data fit | 20 |
| JavaScript/runtime feasibility | 15 |
| Operational cost and quota sustainability | 10 |
| Adoption/access feasibility | 10 |

Use the score to order discovery work, never to override a failed or unknown mandatory gate. Keep uncertain costs labeled and dated.
