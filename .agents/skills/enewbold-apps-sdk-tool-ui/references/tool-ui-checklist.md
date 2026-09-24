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
Record `PASS`, `FAIL`, `BLOCKED`, or `NOT VERIFIED` for material acceptance criteria.
