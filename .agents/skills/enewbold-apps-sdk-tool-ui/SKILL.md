---
name: enewbold-apps-sdk-tool-ui
description: Design, implement or verify optional JavaScript/JSX MCP Tool UI and ChatGPT Apps SDK experiences when they materially improve engagement. Use for structured tool results, interactive public-information navigation, permitted follow-up actions, verified client metadata, error/accessibility behavior or UI contract review. Preserve profile-specific server enforcement and verify actual target client/runtime behavior.
---

# Apps SDK Tool UI

Follow the repository root `AGENTS.md`, accepted ADRs, and relevant Tool UI architecture.

Build the UI as a client of explicit MCP/server contracts. Do not move trust or authorization into React.

## Profile applicability and invariants

Read the [profile selection guide](../../../docs/architecture/profiles/README.md), selected profile and approved server contract. UI is optional and needs user-value justification. Use native ESM JavaScript/JSX and meaningful JSDoc; no TypeScript/TSX source or TypeScript compilation. Use focused classes for domain/client adapters and appropriate React functions for components.

Tier 1 presents approved public read-only results, provenance, freshness, limitations and safe follow-up retrieval. Do not collect sensitive inputs, implement writes, require end-user OAuth or persist user/business state. Treat upstream content as untrusted; render safely and validate actions server-side. Tier 2/3 preserve protected-operation contracts, authorization, confirmation and applicable durable approval/status semantics. UI, annotations and runtime skills are not enforcement.

Consult current official Apps SDK/ChatGPT/Sites documentation; verify target client behavior separately from local rendering and Site/MCP/plugin access. Do not fabricate bridge APIs, metadata or deployment claims.

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

7. Implement using repository native JavaScript/JSX conventions.
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
