# JavaScript OOP Scaffold Conventions

## Reference layout

Adapt to the approved consuming project rather than generating empty folders.

| Boundary | Responsibility |
|---|---|
| src/core | MCP application, static tool registry, safe errors, optional contract/policy registries |
| src/services | Semantic domain orchestration, injected API service interfaces |
| src/adapters | Approved provider and host transports, separate Node-only and Web-standard entrypoints |
| src/tools | Focused tool classes with semantic metadata, runtime validation and explicit execution |
| src/contracts | Versioned schemas, registry and checked handoff mappings when needed |
| src/policies | Reusable operation/data/budget controls when multiple tools justify extraction |
| src/createApplication.js | Composition root; explicit dependencies, no server side effects |
| tests | Native JS unit, adapter, contracts, protocol and negative cases |
| docs | Selected profile, ADRs, API orchestration and verification evidence |
| plugin/skills | Optional domain runtime guidance, separate from shared engineering skills |

Use one documented class per focused responsibility, private fields for owned state, constructor-injected dependencies, named exports, explicit extensions for relative imports, meaningful JSDoc on public classes/methods, and simple pure functions where appropriate. Favor composition, not mandatory inheritance or interface classes without value. No .ts/.tsx, tsconfig or TypeScript compilation requirement. Use runtime schemas, not JSDoc as runtime enforcement. Select dependencies based on verified runtime support; pin versions and commit a generated lockfile where dependencies exist.

## Minimum implementation acceptance

- Approved operation inventory and semantic tool/handoff contracts consumed; schema/metadata agree with runtime validators.
- No arbitrary URL forwarding, undocumented endpoints, hidden sessions or unsafe default live calls.
- Tier 1 independent calls and read-only server enforcement; non-sensitive scope, approved upstream, finite budgets, source provenance and safe errors.
- Relevant Tier 2/3 auth/tenant/credential/state/side-effect controls preserved.
- Tests cover success, malformed input/output, missing handoff fields, upstream errors and independent concurrent requests.
- MCP SDK/protocol and actual host tested separately from domain tests; release gates and exceptions documented.
- Documentation distinguishes fixture, implementation, hosted and distribution evidence.

Do not introduce SQL, Azure, Dataverse, OAuth, workflow engine, cache, UI or generic framework without approved justification. Keep class and module naming consistent with the existing project.
