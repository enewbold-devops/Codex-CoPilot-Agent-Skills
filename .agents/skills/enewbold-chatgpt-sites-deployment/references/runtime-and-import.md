# Sites runtime and import qualification

Official documentation reviewed 2026-11-28; recheck actual package releases, platform capability and account availability at implementation:
- [Sites overview and limits](https://learn.chatgpt.com/docs/sites)
- [Creating and using Sites](https://help.openai.com/en/articles/20001339-creating-and-using-chatgpt-sites)
- [Hosting a plugin with Sites](https://help.openai.com/en/articles/20001547-hosting-a-plugin-with-chatgpt-sites)
- [OpenAI Sites tooling](https://github.com/openai/sites)
- [Create Sites CLI](https://github.com/openai/sites/tree/main/packages/create-sites)
- [MCP SDK Web-standard runtimes](https://ts.sdk.modelcontextprotocol.io/v2/serving/web-standard)
- [MCP SDK protocol migration](https://ts.sdk.modelcontextprotocol.io/v2/migration/support-2026-07-28)

## Supported evidence versus unknowns
The Sites docs support HTTP/HTTPS/WebSockets, not raw TCP, and warn that some frameworks and hosting patterns are unsupported. The open-source tooling describes @openai/create-sites and @openai/sites-vite-plugin, Node 22.13+ and Vite 8 for local development. These facts do not establish a conventional persistent Node process or arbitrary package compatibility on Sites. The initializer creates project metadata; it does not provision hosted resources.

Use an empty scratch directory to inspect a pinned compatible CLI version and actual generated template. The documented initializer pattern is npm create @openai/sites@latest my-site; resolve/pin a reviewed release before reproducible builds. Inspect CLI help and output; do not assume a JS-only option or import format not documented. Do not add D1/R2/auth add-ons merely because offered. Do not overwrite an existing repository or silently require TypeScript. Convert to native ESM JavaScript only if the actual verified build supports it without TS compilation; otherwise escalate. Preserve generated supported hosting metadata (the initializer describes .openai/hosting.json for bindings). Verify exact import/build/upload steps in current platform UI/docs; never invent a deployment CLI command or editable platform capability.

## Transport adapter
Phase 6's RuntimeAdapter and fixture tests are not a real MCP server. The v2 SDK documentation describes createMcpHandler from @modelcontextprotocol/server, request-scoped McpServer factories, Web-standard fetch and legacy stateless handling. Verify actual installed package and client protocol compatibility before choosing it. The SDK docs explicitly describe Host/Origin helpers for bare Web-standard handlers; select verified APIs for the pinned release. Guard the actual MCP endpoint before delegating, validate trusted proxy behavior, enforce body/time/concurrency/budget limits, and keep Node-only listening code out of the portable application. Do not disable origin validation merely to get a browser client working; missing Origin for a legitimate nonbrowser client is different from invalid/present Origin. CORS is not authorization.

Use actual approved schemas and result/error mappings at registration, not the Phase 6 synthetic fixture. Verify intended modern and legacy clients, resources/prompts/UI only as required, stream/response behavior, cancellation and no session affinity. Use a new instance for independent requests where the verified SDK expects it. No unsupported raw socket or local filesystem dependency.

## Compatibility decision
Document template/CLI/build versions, host/runtime, SDK and supported dependency evidence; record unverified features and next test. If actual Sites constraints cannot meet JavaScript, security, cost or access requirements, block release. An approved alternative stateless host is a hosting ADR, not automatic Tier 2. Do not claim anonymous MCP is supported just because a Site can host a plugin.
