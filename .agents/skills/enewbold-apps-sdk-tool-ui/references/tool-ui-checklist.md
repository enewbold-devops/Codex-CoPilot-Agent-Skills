# Apps SDK / Tool UI Completion Checklist

## Contract
- Approved MCP/server contract identified.
- UI consumes explicit structured fields.
- Follow-up actions map to explicit server operations.

## OpenAI Platform
- Current official Apps SDK/ChatGPT requirements verified where material.
- Platform assumptions documented when they affect compatibility.

## Security
- Authorization remains server-side.
- No credentials/secrets are exposed to UI payloads or browser logs.
- Consequential write flows preserve confirmation/idempotency requirements.

## States
- Loading/initial state handled.
- Empty state handled where applicable.
- Success state handled.
- Recoverable/terminal error states handled.
- Unauthorized/unavailable state handled where applicable.

## Accessibility
- Semantic structure and labels are appropriate.
- Keyboard/focus behavior is verified for critical interactions.
- Status and error feedback is perceivable.

## Browser Verification
- Primary flow exercised in browser when available.
- Console/runtime errors checked.
- Important responsive/constrained state checked when applicable.

## Verification Status
Record `PASS`, `FAIL`, `BLOCKED`, `NOT VERIFIED`, or justified `N/A` for material acceptance criteria.

## Profile and Runtime Compatibility
- Profile, approved user value and target clients recorded.
- Native JavaScript/JSX and JSDoc verified; no TS/TSX.
- Tier 1 only approved public reads, safe rendering, provenance, no sensitive inputs/writes/durable user state.
- Applicable enterprise authorization, confirmation and durable status controls retained.
- Actual target client/bridge and plugin access evidence separated from local browser/build.
- Record status and justified N/A.
