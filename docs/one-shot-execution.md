# Forma: One-shot experimental art-direction connector

**This is prepared code, NOT an accessible public route and NOT yet an AI-generated website.**

## Safe execution design
- Script is not exposed as an HTTP endpoint.
- Checks Preview branch, dedicated API key, $2 provider budget confirmation, explicit launch switch.
- Claims a durable single-use atomic Redis key with SET NX *before* the first model request; no TTL; no retries.
- If provider returns invalid data, the request stays consumed. Do not delete/reset the ledger entry.
- Sends the exact fixed and prevalidated salon intake, not arbitrary visitor prompts.
- Strictly validates model response using ArtDirectionSchema.
- Returns art-direction data and estimated base token cost, not a finished rendered website.
- No secrets are embedded in GitHub files.

## Still missing (DO NOT EXECUTE YET)
1. Dedicated Redis REST ledger reachable over HTTPS and tested with exclusive SET NX.
2. Secure owner-only execution mechanism (non-public job/command, not a GET web endpoint).
3. Verified workspace remaining balance and current model/pricing from provider before request.
4. Authorize feature enable values solely in the isolated execution context, not broadly in Vercel production.
5. Render actual site based on the returned blueprint, then inspect real desktop/mobile.
6. Provider's $2 workspace cap may be soft/delayed; keep one call with zero retries.

## Important
The existing unrelated /api/generate in the original project is not part of this experiment and may still use the older shared Anthropic key. Do not invoke it for this test. Never deploy the experiment to main.
