# Public API / Third-Party SaaS Integration Completion Checklist

## Contract
- Approved platform/MCP contract identified.
- Vendor details remain behind the integration boundary.

## Authentication
- Public access or applicable vendor scopes/account context verified.
- Tenant-scoped credential selection enforced where applicable; justify N/A.
- Sensitive credentials excluded from logs and responses.

## Vendor Behavior
- Current endpoint/version behavior verified from authoritative documentation where material.
- Pagination and rate limits handled deliberately.
- Timeout/failure behavior normalized.

## Writes (Tier 2/3 only)
- Side effects documented.
- Idempotency/retry behavior defined.
- Ambiguous write retries do not risk uncontrolled duplication.

## Data Ownership
- SaaS remains system of record for domain data.
- New persistence/caching is explicitly justified.

## Verification
- Mapping and error tests added/updated.
- Negative cases covered where relevant.
- Sandbox/integration verification status recorded.

## Profile-aware completion
- Profile, contract, official API docs/version/date, rights, quota, data classification, operation mappings and provenance recorded.
- Native ESM JS, JSDoc classes, dependency injection and runtime schemas; no TypeScript requirement.
- Tier 1: independent reads, no tenant token store/business writes/durable state; scoped public-read key if applicable; SSRF/redirect, timeout, payload, pagination, quota/retry and malformed-response tests.
- Tier 2/3: applicable trusted account context, protected credentials and authorized writes; Tier 3 recovery/idempotency.
- Local and actual host compatibility, safe diagnostics, verification status and N/A rationale recorded. Untested gates are not passed.
