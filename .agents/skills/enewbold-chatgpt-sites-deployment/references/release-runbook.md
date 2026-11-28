# Restricted staging, release and rollback

## Before deployment
Confirm explicit deployment authority, Site owner and role permissions. Inventory intended users and access channels; check Use plugins, Upload plugins, Create plugins with MCPs, Site publishing, and any separate sharing/workspace publication permissions. Ensure API rights, approved public data and operation scope, secret handling, source version, local SDK tests and public threat review. Use synthetic fixtures when rights/access are unverified. No PHI, private records, sensitive profiles or payment data for Tier 1. Set measurable traffic/cost limits, incident contact, release commit and rollback target.

## Stage
Use the actual supported Sites UI or import/build route. Verify approved JavaScript-only build and hosted runtime, first with synthetic data and restrictive access if available. Record exact deployment revision and evidence. Confirm the Site owner publishes to create/update its associated plugin if authorized; Site publication is an explicit action. If no safe staging mechanism exists, do not publicly expose an unverified implementation.

## Verify access independently
1. Local SDK: list/call tools with compatible MCP Inspector or equivalent client; pin the tested client version. Check protocol version/headers/initialization as applicable, invalid input, unsupported tools, errors and independent concurrency.
2. Hosted execution: test the actual Sites-hosted handler and an approved live non-sensitive upstream read, result/schema/provenance and bounds.
3. Site access: authorized intended visitor or signed-out public browser, if required; no implicit proof of MCP endpoint.
4. Anonymous external MCP: if required, test concrete HTTPS MCP URL directly from a fresh independent client without account tokens, Site cookies or proxy bypass. Record discovered protocol and actual results. If unavailable or access restricted, mark gate BLOCKED/FAIL as appropriate; do not circumvent.
5. Plugin: test the actual Site-associated or portable plugin, installed and connected by an intended user; verify skill revision, tools, live safe workflow and access. Workspace sharing/publishing is distinct from public directory review.
6. Public submission: only if required and authorized; follow current [remote review requirements](https://developers.openai.com/plugins/deploy/app-review) and [connect/test guide](https://developers.openai.com/plugins/deploy/connect-chatgpt). Use real approved HTTPS endpoint, matching metadata, accurate annotations, privacy/support details and compatible contract. Do not use a fixture or development tunnel as public submission proof.

## Release and rollback
Review independent security findings and verification matrix. All mandatory gates must pass. Record approval, audience, published revision, actual limits and safe operational alerts. For updates keep current live tool schemas/UI resource contracts compatible during review; verify metadata refresh or new version review as required. On policy, cost, data exposure or functional failure, stop traffic or disable public sharing using verified controls, restore the prior compatible artifact if supported, revoke/rotate scoped keys when needed, notify incident owner and re-run gates. Document actual available recovery mechanisms; do not assume an unverified one-click rollback exists. No public action without authority.
