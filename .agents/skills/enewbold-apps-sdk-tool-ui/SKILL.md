---
name: apps-sdk-tool-ui
description: Design, implement, or materially revise a React-based MCP Tool UI and ChatGPT Apps SDK experience for this repository. Use when a tool result needs interactive rendering, a user flow invokes follow-up MCP actions, Apps SDK or ChatGPT integration metadata changes, embedded UI state/error/accessibility behavior is added, or a Tool UI contract is reviewed. Start from the approved MCP/server contract, verify current official OpenAI requirements when platform behavior matters, keep authorization server-side, and verify the real UI flow with browser tooling when available.
---

# Apps SDK Tool UI

Follow the repository root `AGENTS.md`, accepted ADRs, and relevant Tool UI architecture.

Build the UI as a client of explicit MCP/server contracts. Do not move trust or authorization into React.

## Workflow

1. Establish the server contract.
   - Identify the MCP tool/resource, inputs, structured result, errors, authorization behavior, and follow-up actions.
   - If the UI requires a missing or changed server contract, return that requirement to the Engineering Lead/MCP Platform Engineer before creating hidden client workarounds.

2. Verify current OpenAI platform requirements.
   - Consult current official OpenAI documentation when Apps SDK, ChatGPT app metadata, bridges, component APIs, MCP UI behavior, or client integration conventions materially affect the implementation.
   - Separate verified platform behavior from repository assumptions.

3. Define the UI data contract.
   - Select only fields needed for rendering and interaction.
   - Avoid exposing credentials, internal identifiers, or vendor payload detail unnecessarily.
   - Treat server/external text as untrusted input.

4. Define interaction states.
   Handle applicable states deliberately:
   - initial/loading;
   - empty;
   - success;
   - partial data;
   - recoverable error;
   - terminal error;
   - unauthorized/unavailable state;
   - mutation in progress and confirmed completion where applicable.

5. Keep authoritative behavior server-side.
   - Client state may improve interaction but must not determine authorization, tenant ownership, or authoritative business state.
   - Do not rely on hidden/disabled controls as the only security control.

6. Design follow-up actions.
   - Map user actions to explicit MCP/server operations.
   - For consequential writes, preserve confirmation, idempotency, and server authorization requirements.
   - Avoid blind client retries for ambiguous writes.

7. Implement using repository React conventions.
   - Prefer clear component boundaries and local state.
   - Avoid speculative global state or major UI dependencies.
   - Keep embedded/constrained rendering in mind.

8. Implement accessibility.
   Consider semantic structure, accessible names, labels, keyboard flow, focus management, status/error announcements, and non-pointer interaction.

9. Verify in the browser when available.
   - Exercise the actual rendered flow.
   - Check console/runtime errors.
   - Test important loading/error/empty states.
   - Verify keyboard and constrained/responsive behavior when relevant.

10. Produce a concise implementation/verification summary using `references/tool-ui-checklist.md`.

## Security rules

Never expose:
- access or refresh tokens;
- API secrets;
- connection strings;
- encryption keys;
- trusted tenant authorization state that should remain server-side.

Do not log sensitive payloads to the browser console.

## Boundaries

Do not:
- invent undocumented Apps SDK behavior;
- bypass server authorization;
- couple the UI to undocumented implementation details;
- move authoritative SaaS/domain logic to the client;
- use production credentials for routine browser verification.

## Escalation

Return server-contract gaps to the MCP Platform Engineer through the Engineering Lead. Route architecture changes to the Solution Architect and security concerns to the Security Reviewer.
