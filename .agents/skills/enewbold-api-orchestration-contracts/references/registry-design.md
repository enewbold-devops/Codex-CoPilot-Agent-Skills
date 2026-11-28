# API Registry Design

Use the bundled [registry schema](../assets/registry.schema.json) and synthetic [example](../assets/example-registry.json). Preserve the registry version and stable identifiers; do not store secrets. The schema validates structure only. Review semantic compatibility, approved scope and actual runtime enforcement independently.

## Contract layers

| Layer | Responsibility |
|---|---|
| Sources | Authority, base origin, official docs, evidence date, version, rights and access |
| Operations | Documented method/path, parameter locations, schemas, pagination, quotas, side effects and bounds |
| Tools | User-facing semantics, exact upstream mapping, input/output schemas, error and provenance policy |
| Handoffs | Explicit source and target fields, types/versions, transforms, preconditions, failure handling |
| Intents | Topic/user intent to approved tool sequence, optional runtime guidance |
| Policies | Approved operations, data classification, trust model, bounded execution, applicable identity and state |

Document schema dialect and use JSON Pointer (RFC 6901) for instance paths; use a separate schema pointer when needed. Resolve pointers to actual properties; verify required/optional fields, nested arrays, nullability, enums, units, formats, cardinality and length constraints. A matching primitive type is not enough. For transformations, use an explicitly named, documented deterministic function with test vectors. Never use eval, arbitrary expressions or unchecked vendor strings. Declare who invokes the consumer: agent or server. For Tier 1 cap total steps and calls, reject cycles unless a finite approved pagination strategy is separately documented, and carry explicit values between calls.

## Compatibility

Use stable tool IDs and separate contract versions from vendor API versions. Additive optional fields may be compatible; changed required inputs, output paths, semantics, nullability or units may break consumers. Document affected handoffs and consumers; require approved migration/ADR when material. Preserve source provenance and distinguish no data from dependency failure. Never invent a successful empty result after upstream failure.

## Recommended output

- docs/architecture/api-orchestration.md: scope, evidence, conceptual flow, authority/rights, tradeoffs and gates.
- contracts/api-orchestration-registry.json: validated machine-readable registry.
- Versioned schemas and synthetic fixtures, embedded or repository-local.
- docs/architecture/contract-verification.md: evidence and planned positive/negative cases.

Use accepted project paths if they already exist. The example uses example.invalid; replace with verified provider endpoints only after approval.
