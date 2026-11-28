# Domain runtime skill template (not an activatable skill)

Create skills/<approved-name>/SKILL.md with YAML frontmatter name and description. Describe the user goal, triggers and exclusions. Replace every placeholder with approved domain-specific content.

## Workflow
1. Confirm the user intent and minimum permitted inputs.
2. Select the documented tool by registered name and validated arguments.
3. If the result is valid and the approved handoff preconditions hold, pass only the explicit mapped values to the next tool.
4. Stop on missing data, errors, unsupported intent or budget exhaustion.
5. Summarize retrieved facts, source, limitations and useful next steps.

Include exact approved tool versions in the navigation registry, not guessed tool names in instructions. Add representative prompts and tests in references/. Never embed credentials or engineering policies as supposed runtime enforcement. No sensitive input or private data for Tier 1. Do not ship this template unchanged.
