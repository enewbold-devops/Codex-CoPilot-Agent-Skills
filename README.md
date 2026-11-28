# AI Engine Agentic Solution Engineering Framework - Unified Copilot/Codex Workspace

## AI Engine | developer@e-newbold.com

This shared engineering framework can be imported into MCP solution repositories. Select the applicable architecture profile before substantial work. Tier 1 public stateless MCP is the preferred candidate for public opportunities; enterprise and durable controls remain available.

It provides a shared engineering constitution, six specialist workspace agents, and nine reusable skills that can be used from GitHub Copilot and OpenAI Codex in VS Code.

## Included

### Repository constitution

- `AGENTS.md`
- [Architecture profiles](docs/architecture/profiles/README.md)
- [ADR-001 (Proposed)](docs/adr/ADR-001-tiered-engineering-profiles.md)

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
- `.agents/skills/enewbold-tier1-opportunity-assessment/`

### Setup guidance

- `CONFIGURE-COPILOT-CODEX.md`
- `setup-examples/`

## Import

Extract this archive and copy its contents into the **repository root**. Preserve the hidden `.github` and `.agents` directories, and include `docs/architecture/profiles/` and applicable ADRs. Record the consuming solution profile; do not overwrite accepted project decisions.

If your repository already contains `AGENTS.md`, `.github/agents/`, `.agents/skills/`, or VS Code/MCP configuration, merge deliberately instead of overwriting existing project guidance.

Do not copy `setup-examples/*` into active configuration locations blindly. The examples are templates to merge with existing settings.

## Recommended first test

1. Open the repository root in VS Code.
2. Start a GitHub Copilot or Codex session.
3. Select **ENewbold Engineering Lead**.
4. Ask: `Inspect the repository customization only. Summarize your role, the other available engineering roles, and the relevant skills. Do not modify files.`
5. Verify that the root `AGENTS.md`, agents, and skills are discovered before starting implementation work.

See `CONFIGURE-COPILOT-CODEX.md` for detailed setup.

## Tier 1 discovery entrypoint

Ask the Engineering Lead: `Use enewbold-tier1-opportunity-assessment to assess this organization and public API documentation. Produce the evidence-backed opportunity brief and gate matrix; do not implement code.`

Use the actual source URLs and non-sensitive inputs. A candidate or bounded prototype is not a release approval. Verify skill discovery in both harnesses separately.
