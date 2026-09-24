# Third-Party SaaS Integration Completion Checklist

## Contract
- Approved platform/MCP contract identified.
- Vendor details remain behind the integration boundary.

## Authentication
- Required vendor scopes/account context verified.
- Tenant-scoped credential selection enforced.
- Sensitive credentials excluded from logs and responses.

## Vendor Behavior
- Current endpoint/version behavior verified from authoritative documentation where material.
- Pagination and rate limits handled deliberately.
- Timeout/failure behavior normalized.

## Writes
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
