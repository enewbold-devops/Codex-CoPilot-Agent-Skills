# Public MCP threat and control matrix

Consult current official [Sites responsibilities](https://help.openai.com/en/articles/20001337-understanding-responsibilities-for-your-chatgpt-sites), [Sites data protection](https://help.openai.com/en/articles/20001340-complying-with-data-protection-laws-for-chatgpt-sites), [plugin security and privacy](https://developers.openai.com/plugins/guides/security-privacy), [remote MCP review requirements](https://developers.openai.com/plugins/deploy/app-review), [MCP specification](https://modelcontextprotocol.io/) and installed SDK docs. Sources reviewed 2026-11-28; verify at use.

| Threat | Required control and evidence |
|---|---|
| Misclassified private data or mutation | Approved source rights, data flow and actual provider operation semantics; no sensitive input, private records, writes or durable business state |
| Unauthorized tool/operation | Explicit tool registry and fixed approved operation allowlists; reject unknown tool or method |
| Schema/parameter abuse | Strict bounded runtime input/output schemas, no unchecked extra fields, validate each handoff and bounded collections |
| SSRF and redirect abuse | Approved fixed HTTPS destinations/path templates, validated parameters, no arbitrary destinations/URL credentials, reject unsafe redirects, enforce appropriate DNS/egress controls; verify actual host |
| Host/Origin manipulation and rebinding | Actual trusted ingress or SDK/adapter Host and present Origin validation; correct proxy trust; no blanket wildcard or disabled control without verified equivalent enforcement |
| Prompt injection in user or upstream text | External content remains data; bounded tool policy independent of model instructions; no arbitrary tool or destination, validate output and safely render |
| Resource exhaustion | Reject oversize requests before costly work, bound body reads/results/pages, finite timeouts/cancellation, request and concurrency limits |
| Quota or cost amplification | Bounded per-request upstream calls/retries; enforce aggregate limits across instances; verified alerts and stop/disable action |
| Credential or privacy leakage | Host-managed scoped public-read key, no key in manifests/UI/errors/logs; no private data or raw prompts, minimize retention and telemetry |
| Dependency or artifact drift | Pinned reviewed SDK/runtime/dependencies and lockfile; artifact hashes and vulnerability review; compatible live tool contracts |
| Invalid output or source failure | Validate and minimize payloads; source provenance and freshness where relevant, safe errors, no fabricated success |
| Public access mismatch | Independently verify hosted execution, Site access, external MCP and plugin install/distribution; no unauthorized access bypass |
| Unsafe optional UI | CSP limited to required domains, safe rendering, no credentials, headless operation, no UI-only policy |
| Operational failure | Named incident owner, privacy-safe monitoring, approved budget, verified shutdown/rollback and remediation/retest |

For each control state exact evidence, environment, revision, owner and status. A documented control or local mock is not proof of enforcement at deployed ingress. Applicable mandatory gates must pass before public release.
