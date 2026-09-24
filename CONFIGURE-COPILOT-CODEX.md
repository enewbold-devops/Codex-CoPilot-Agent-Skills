# Configure the Unified Agents for GitHub Copilot and Codex in VS Code

## AI Engine | developer@e-newbold.com

This repository layout is intentionally compatible with both GitHub Copilot and OpenAI Codex in VS Code.

Current VS Code guidance recognizes:

- `AGENTS.md` as project instructions for multi-agent/Codex workflows;
- `.github/agents/*.agent.md` as workspace custom-agent role files;
- `.agents/skills/*/SKILL.md` as project Agent Skills for Codex and as a supported shared skills location in VS Code.

## 1. Import the bundle

Extract the ZIP and copy the contents into the **root of your existing repository**.

Expected layout:

```text
your-repository/
├── AGENTS.md
├── .github/
│   └── agents/
│       ├── enewbold-engineering-lead.agent.md
│       ├── enewbold-solution-architect.agent.md
│       ├── enewbold-mcp-platform-engineer.agent.md
│       ├── enewbold-agentic-ui-engineer.agent.md
│       ├── enewbold-security-reviewer.agent.md
│       └── enewbold-verification-engineer.agent.md
├── .agents/
│   └── skills/
│       ├── enewbold-architecture-impact-analysis/
│       ├── enewbold-adr-authoring/
│       ├── enewbold-mcp-tool-design/
│       ├── enewbold-third-party-saas-integration/
│       ├── enewbold-tenant-security-review/
│       ├── enewbold-azure-identity-review/
│       ├── enewbold-apps-sdk-tool-ui/
│       └── enewbold-code-change-verification/
└── ... your application code ...
```

If any of these paths already exist, merge intentionally. Do not overwrite existing repository policy without review.

---

# GitHub Copilot configuration

## 2. Prerequisites

Use a current VS Code build with GitHub Copilot/Copilot Chat enabled and authenticated.

Open the repository **root folder** in VS Code. The root is important because agent and instruction discovery is workspace-relative.

## 3. Confirm `AGENTS.md` support

VS Code supports root `AGENTS.md` as always-on project guidance. The setting is normally enabled by default.

To make the intended configuration explicit, you can merge the values from:

`setup-examples/vscode-settings.json`

into your workspace `.vscode/settings.json`.

Do not replace unrelated existing workspace settings.

## 4. Confirm the custom agents

Open the Command Palette and run:

`Chat: Open Customizations`

Open the **Agents** view and confirm these workspace agents are discovered:

- ENewbold Engineering Lead
- ENewbold Solution Architect
- ENewbold MCP Platform Engineer
- ENewbold Agentic UI Engineer
- ENewbold Security Reviewer
- ENewbold Verification Engineer

You can also type `/agents` in chat to open agent configuration.

For normal feature work, start with **ENewbold Engineering Lead**. Select specialist agents directly when you intentionally want a focused architecture, implementation, security, or verification session.

## 5. Confirm the skills

Open the Agent Customizations editor and verify the project skills under `.agents/skills/` are discovered.

You can type `/skills` to open the skill configuration UI. In a new session, use `/` and select a skill explicitly when you want deterministic activation, or ask for a task that clearly matches the skill description and let the agent select it automatically.

Recommended initial checks:

- `enewbold-architecture-impact-analysis`
- `enewbold-mcp-tool-design`
- `enewbold-code-change-verification`

## 6. Tool availability and permissions

The agent files contain deliberate tool sets. For example, implementation agents receive editing/execution capabilities, while the Security Reviewer is configured with read/search/web tools.

For Copilot, review the tool list in the Agent Customizations editor. Tool availability and tool approval are separate controls: a tool can be available while still requiring your approval to run.

Do not enable broad auto-approval merely because an agent role has restrictive instructions.

## 7. Optional: OpenAI developer documentation MCP for Copilot

The bundle includes:

`setup-examples/vscode-mcp.json`

If your repository does not already have `.vscode/mcp.json`, copy the example there. If it does, merge the `openaiDeveloperDocs` server entry with the existing `servers` object.

Then:

1. reopen/reload VS Code if needed;
2. open Copilot Chat in Agent mode;
3. enable the `openaiDeveloperDocs` MCP server in the tools picker;
4. ask an OpenAI/Apps SDK question and verify the agent consults the documentation server.

The server is read-only documentation access and does not call the OpenAI API on your behalf.

## 8. Test Copilot discovery

Start a **new** Copilot session with **ENewbold Engineering Lead** and ask:

> Inspect only the repository customizations. Summarize your role, the specialist agents you can coordinate with, and the relevant skills. Do not modify files or run implementation commands.

Then test one explicit skill invocation, for example:

> Use the enewbold-architecture-impact-analysis skill to analyze a hypothetical new read-only merchant catalog tool. Do not implement it.

Review the tool activity and output, not only the final summary.

---

# OpenAI Codex configuration in VS Code

## 9. Prerequisites

Install/use the current Codex VS Code integration and authenticate with the supported ChatGPT/OpenAI account flow for your environment.

Open the repository root in VS Code and start a Codex session for that repository.

VS Code supports selecting the Codex harness/session target alongside other harnesses. Keep the working folder at repository root for the baseline configuration.

## 10. Root instructions

Codex uses `AGENTS.md` as repository guidance. Keep the Codex session working directory at the repository root unless you intentionally want directory-specific instruction behavior.

This bundle uses only the root `AGENTS.md` initially, so no nested instruction setup is required.

## 11. Codex skills

Codex project skills live in:

`.agents/skills/`

The skill metadata tells Codex when each workflow applies, and the full `SKILL.md` is loaded only when selected.

You can invoke a skill explicitly from the VS Code skill UI/slash workflow where available, or instruct Codex directly to use the named skill. You can also test automatic activation by describing a matching task without naming the skill.

## 12. Codex custom-agent roles

VS Code's Codex integration can load the role instructions from the same `.github/agents/*.agent.md` files used by this bundle.

Important security difference:

**Codex in VS Code does not use the `tools` frontmatter in these role files as a hard tool allowlist.**

Therefore:

- treat the Security Reviewer's read-only role as behavioral guidance under Codex;
- review Codex permissions/approvals separately;
- do not rely on `.agent.md` role configuration to prevent filesystem, terminal, network, or production access;
- enforce real security through environment separation, filesystem/network controls, Azure identity/RBAC, sandboxing, and approval settings.

Start with conservative/default permissions. Avoid Full Access for routine repository work, especially for architecture/security-review sessions.

## 13. Optional: OpenAI developer documentation MCP for Codex

Codex CLI and the Codex IDE extension share MCP configuration.

Option A - CLI:

```bash
codex mcp add openaiDeveloperDocs --url https://developers.openai.com/mcp
codex mcp list
```

Option B - configuration file:

Merge the contents of:

`setup-examples/codex-config.toml`

into:

`~/.codex/config.toml`

Then restart/reload the Codex VS Code extension if necessary.

Do not overwrite existing Codex configuration such as model/provider, sandbox, approval, or other MCP settings.

## 14. Test Codex discovery

Start a **new** Codex session at the repository root and select **Engineering Lead** if the role appears in the agent picker.

Ask:

> Read the root AGENTS.md and inspect the repository agent and skill customization. Summarize the engineering-team responsibilities and which skill you would use for architecture analysis. Do not modify files.

Then test:

> Use the mcp-tool-design skill to design, but not implement, a read-only merchant catalog MCP capability.

Confirm that Codex uses the repository constitution and the skill output contract.

---

# Recommended operating model

Use **ENewbold Engineering Lead** as the normal front door for substantial work.

A typical flow is:

```text
You / ENewbold Principal Engineer
        |
ENewbold Engineering Lead
        |
ENewbold Solution Architect + enewbold-architecture-impact-analysis (when needed)
        |
ENewbold MCP Platform Engineer / ENewbold Agentic UI Engineer
        |
ENewbold Security Reviewer (when triggered)
        |
ENewbold Verification Engineer + enewbold-code-change-verification
        |
ENewbold Engineering Lead synthesis
        |
You approve architecture/merge direction
```

For small focused work, use the implementation agent directly and then hand off to Verification Engineer.

# Security recommendations

- Use development/test Azure identities for agent-assisted development.
- Keep production credentials out of local agent environments.
- Do not put secrets in `AGENTS.md`, agent files, skills, prompts, logs, screenshots, or test fixtures.
- Treat Copilot/Codex permissions, Azure RBAC, Key Vault policy, SQL permissions, and environment separation as the actual security controls.
- Review any agent-suggested command before approving it when it touches credentials, infrastructure, database migrations, deployment, or external write APIs.

# Troubleshooting discovery

If an agent or skill does not appear:

1. confirm you opened the repository root;
2. confirm the file paths and extensions exactly match the bundle;
3. start a new session after adding customization files;
4. use `Chat: Open Customizations` and the VS Code chat customization diagnostics to inspect discovery;
5. confirm `chat.useAgentsMdFile` is enabled;
6. confirm the selected harness is the one you intended to test;
7. for Codex, confirm the session working directory is the repository root.

# Official references used for this configuration

- VS Code: Custom agents - https://code.visualstudio.com/docs/agent-customization/custom-agents
- VS Code: Custom instructions / AGENTS.md - https://code.visualstudio.com/docs/agent-customization/custom-instructions
- VS Code: Agent Skills - https://code.visualstudio.com/docs/agent-customization/agent-skills
- VS Code: Configure AI for your codebase - https://code.visualstudio.com/docs/agents/guides/customize-copilot-guide
- VS Code: Agent tools - https://code.visualstudio.com/docs/agents/reference/tools-reference
- VS Code: Permissions/approvals - https://code.visualstudio.com/docs/agents/run/approvals
- OpenAI: Docs MCP - https://developers.openai.com/learn/docs-mcp
- OpenAI: Skills - https://developers.openai.com/api/docs/guides/tools-skills
