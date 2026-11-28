# Tier 1 JavaScript Reference Core

Offline, dependency-free teaching scaffold. Node.js 22+; native ESM JavaScript, focused classes and JSDoc. No TypeScript, database, session, credentials, external API dependency or actual MCP protocol listener. The example.invalid endpoint is synthetic. Explicit fetch injection is required; the tests use fixtures and never perform network requests.

From this directory run:

```sh
npm test
```

The composition root creates McpApplication, ToolRegistry, PublicApiService and PublicTopicTool. RuntimeAdapter delegates to an injected Web-standard handler; tests inject a stub, not an MCP implementation. The single tool uses manual validation for a small example schema. Replace it with approved real tool contracts and runtime validation before generating a solution. The source field labels synthetic data. The example registry in the separate API orchestration skill is a design illustration, not an automatically consumed executable configuration.

## Limitations

Response limits and timeouts are demonstrated with compliant fixture transport; actual SDK/host cancellation, request limits, distributed abuse controls, DNS/egress, privacy and deployment gates require separate verification. Do not use the example as a deployable public server. Implement actual SDK registration, pinned dependencies and host adapter using current documentation; then exercise protocol/client, live approved API, Sites and plugin distribution separately. See the scaffolding skill's references/runtime-adapters.md.

Reference core validation: Node.js v22.16.0, npm test, 11 tests passed in the local offline environment on 2026-11-28. This does not establish MCP protocol, external API or Sites deployment readiness.
