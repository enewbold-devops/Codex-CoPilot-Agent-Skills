# Contract Readiness and Verification Checklist

Record profile, framework/registry revision, evidence date and owner for each result. Status vocabulary: PASS, FAIL, BLOCKED, NOT VERIFIED, justified N/A. Distinguish design evidence from executable tests and release readiness.

| Check | Evidence / expected behavior |
|---|---|
| Source authority and usage rights | Official docs, version, terms, access and redistribution constraints verified |
| Registry shape | JSON Schema 2020-12 validation succeeds |
| IDs and references | Unique source, operation, tool, handoff and intent IDs; every reference resolves |
| Operation policy | Every exposed operation is approved and permitted for selected profile |
| Input and output schemas | Required fields, constraints, additional properties, bounded collections and null/error handling reviewed |
| Handoff compatibility | Both versions/pointers resolve, required target inputs covered, transformations and cardinality tested/planned |
| Sequencing | Explicit invocation ownership and finite steps; no hidden sessions or unbounded cycles |
| Provenance | Source identity, version and retrieval/freshness semantics; no invented or stale unlabeled result |
| Error behavior | Invalid input, no result, quota, timeout, malformed upstream, dependency failure and safe retry cases |
| Tier 1 public policy | No private data, user OAuth, business writes or durable state; fixed operation allowlist, SSRF and request budgets |
| Tier 2/3 | Applicable auth/tenant/credential/write/durable recovery controls retained |
| Implementation constraints | Native ES modules, documented OOP classes, runtime validation, host adapter separation |
| Review/handoff | Principal Engineer decisions, independent security/verification and downstream owners recorded |

Include sample producer output and consumer input for each handoff, plus missing/null/invalid/out-of-bounds cases. Reject unresolved required fields, unverified API paths and arbitrary caller destinations. Keep actual hosted execution, anonymous external MCP and plugin distribution as separate release gates.
