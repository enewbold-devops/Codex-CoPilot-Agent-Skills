# MCP Runtime Adapter Selection

## Evidence and selection

Check the current official [MCP HTTP SDK guide](https://github.com/modelcontextprotocol/typescript-sdk/blob/main/docs/serving/http.md), [protocol versions](https://github.com/modelcontextprotocol/typescript-sdk/blob/main/docs/protocol-versions.md), [Web-standard guide](https://github.com/modelcontextprotocol/typescript-sdk/blob/main/docs/serving/web-standard.md), [ChatGPT Sites documentation](https://learn.chatgpt.com/docs/sites) and official OpenAI developer documentation. Record SDK/package release, date, tested runtime and intended clients. These links are documentation, not proof of installed dependencies or Sites support.

Current SDK repository documentation consulted 2026-11-28 describes v2 createMcpHandler from @modelcontextprotocol/server, a Web-standard fetch handler with a fresh server factory per request and default legacy stateless handling; Node bridges use @modelcontextprotocol/node. The modern protocol uses per-request discovery and legacy clients use initialization. Verify published package versions and supported protocol eras before implementation. If an existing compatible project is pinned to a different SDK version, consult its official version-specific docs rather than mixing imports.

## Candidate transport integration (not executed)

For a verified v2 package, mount the SDK using native JavaScript. The following sketch deliberately delegates real registration to project code so schemas and result/error mapping come from the approved registry:

```javascript
import { McpServer, createMcpHandler } from '@modelcontextprotocol/server';
import { RuntimeAdapter } from './src/adapters/RuntimeAdapter.js';

/**
 * Compose a request-scoped SDK server using an approved tool registrar.
 * @param {() => object} createApplication Create portable application.
 * @param {(server: object, application: object) => void} registerTools Register verified schemas and tool handlers.
 * @returns {RuntimeAdapter} Web-standard routing adapter.
 */
export function createRuntime(createApplication, registerTools) {
  const handler = createMcpHandler(() => {
    const server = new McpServer({ name: 'approved-public-mcp', version: '1.0.0' });
    registerTools(server, createApplication());
    return server;
  });
  return new RuntimeAdapter(handler);
}
```

Do not copy the illustrative server name/version blindly. Implement registration against actual SDK schema and result APIs; map success to supported structured MCP results and errors to safe protocol/tool errors. Test discovery metadata, input/output validation and tool calls with the actual client. The reference core has no SDK dependency, no actual server listener and no registrar; its routing adapter accepts a stub solely for offline tests.

For local Node, use the verified SDK's supported Node adapter or framework, bind loopback during development, and enforce host/origin and request bounds. For Web-standard hosts, mount the verified handler in the supported fetch entrypoint. For Sites, derive actual entrypoint, build/import/publish and plugin metadata from verified current templates; do not assume a generic worker can be uploaded unchanged. Validate cancellation, streaming, request size, egress, rate/cost controls and supported dependencies. Do not expose a public endpoint before required controls are verified.

## Independent verification gates

1. Offline domain/core tests.
2. Installed SDK protocol tests (modern discovery and/or legacy initialize as applicable), tool list/call, invalid input and concurrency.
3. Actual hosted Sites runtime, approved live public read and host abuse controls.
4. Public Site access, if required.
5. Independent anonymous external MCP access, if required.
6. Intended plugin installation/distribution, if required.

Mark each PASS, FAIL, BLOCKED, NOT VERIFIED or justified N/A with evidence. Do not infer another gate from local tests.
