# Plugin packaging and distribution

Documentation reviewed 2026-11-28; recheck before implementation:
- [Skills concepts](https://developers.openai.com/plugins/concepts/skills)
- [Build skills](https://developers.openai.com/plugins/build/skills)
- [Package your plugin](https://developers.openai.com/plugins/build/plugins)
- [Hosting a plugin with ChatGPT Sites](https://help.openai.com/en/articles/20001547-hosting-a-plugin-with-chatgpt-sites)
- [Remote MCP review requirements](https://developers.openai.com/plugins/deploy/app-review)

## Select the distribution route
A Site owner can publish a Site containing MCP tools to create its associated plugin, then install/connect it on a supported surface. Do not assume arbitrary imported plugin files are synchronized with this plugin. Verify actual skills and tool revision in the installed package; use the supported edit/import path if needed. Site access, plugin access, connection and publication permissions are separate.

For a portable plugin, current docs recommend root plugin.json with Agent Plugins schema, root skills/ and optional mcp.json. Existing registered MCP mappings use extensions.com.openai.apps pointing to a supported .app.json; do not invent IDs. Legacy manifest conventions differ; use current documentation and avoid incompatible duplicate declarations. An explicit skill MCP dependency in agents/openai.yaml may be appropriate for a verified transport/name/URL; resolve it against the intended package and client. Never declare an unverified anonymous endpoint or store credentials.

Illustrative portable shape (not a deployable package): plugin.json declares "$schema": "https://agent-plugins.org/schemas/1.0.0/plugin.schema.json", name, version, description; mcp.json uses "$schema": "https://agent-plugins.org/schemas/1.0.0/mcp.schema.json" and mcpServers.<name> with type "streamable-http" and verified HTTPS URL. Select extensions.com.openai.auth under the server according to actual connection requirements; use type "none" only when proven. Root skills/<domain>/SKILL.md contains domain guidance. Optional metadata and sample prompts use current documented fields. Keep paths relative inside package. Do not package repository engineering skills, test credentials or fixtures as real data.

## Evidence
Record actual target surface, package version/hash, permissions and manifest validation. Test direct/indirect activation, nonactivation, tool selection, source grounding, failures and exact installed skill/tool list. Confirm intended users can install and connect. Public directory submission is a separate review; verify current submission requirements, privacy policy, ownership, real endpoint, tool annotations and compatibility. Keep existing published contract compatible through review. Do not submit or publish without separate explicit approval.
