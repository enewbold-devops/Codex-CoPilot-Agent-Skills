# Azure MCP DevOps Agents - Unified Copilot/Codex Workspace

## AI Engine | developer@e-newbold.com

This bundle is designed to be copied into the root of the Azure MCP DevOps Agents repository.

It provides a shared engineering constitution, six specialist workspace agents, and eight reusable skills that can be used from GitHub Copilot and OpenAI Codex in VS Code.

## Included

### Repository constitution

- `AGENTS.md`

### Workspace agents

- `.github/agents/enewbold-engineering-lead.agent.md`
- `.github/agents/enewbold-solution-architect.agent.md`
- `.github/agents/enewbold-mcp-platform-engineer.agent.md`
- `.github/agents/enewbold-agentic-ui-engineer.agent.md`
- `.github/agents/enewbold-security-reviewer.agent.md`
- `.github/agents/enewbold-verification-engineer.agent.md`

### Shared skills

- `.agents/skills/enewbold-architecture-impact-analysis/`
- `.agents/skills/enewbold-adr-authoring/`
- `.agents/skills/enewbold-mcp-tool-design/`
- `.agents/skills/enewbold-third-party-saas-integration/`
- `.agents/skills/enewbold-tenant-security-review/`
- `.agents/skills/enewbold-azure-identity-review/`
- `.agents/skills/enewbold-apps-sdk-tool-ui/`
- `.agents/skills/enewbold-code-change-verification/`

### Setup guidance

- `CONFIGURE-COPILOT-CODEX.md`
- `WORKSPACE-MANIFEST.md`
- `setup-examples/`

## Import

Extract this archive and copy its contents into the **repository root**. Preserve the hidden `.github` and `.agents` directories.

If your repository already contains `AGENTS.md`, `.github/agents/`, `.agents/skills/`, or VS Code/MCP configuration, merge deliberately instead of overwriting existing project guidance.

Do not copy `setup-examples/*` into active configuration locations blindly. The examples are templates to merge with existing settings.

## Recommended first test

1. Open the repository root in VS Code.
2. Start a GitHub Copilot or Codex session.
3. Select **ENewbold Engineering Lead**.
4. Ask: `Inspect the repository customization only. Summarize your role, the other available engineering roles, and the relevant skills. Do not modify files.`
5. Verify that the root `AGENTS.md`, agents, and skills are discovered before starting implementation work.

See `CONFIGURE-COPILOT-CODEX.md` for detailed setup.
