# Forma — First controlled AI experiment

Authorization: The user approved **up to $2 USD total paid AI usage**, contingent on verified security and spending safeguards. This is NOT permission to exceed $2.

## Current status (do not misrepresent)
- Model key exists in the Forma Vercel project environment, but it is shared between preview and production targets.
- We have not verified the independent Anthropic workspace hard limit or remaining headroom.
- We have not verified a persistent atomic one-use reservation/accounting ledger.
- Consequently the fail-closed budget guard intentionally prevents any paid calls.
- A preview build does not prove authorization security or cost containment.
- The existing /api/generate endpoint predates this experiment. DO NOT call it for this test.

## Proposed test
One luxury salon brief from the successful guided-flow fixture:
"Glow is a premium beauty salon in Muscat, Oman. We offer hair styling, facials, nails and bridal makeup. We want a luxurious, modern website with beautiful photography and WhatsApp booking."
The user confirmed women as audience, quiet luxury as direction and both WhatsApp and form as booking preferences, but no real phone number or business location details were confirmed. Omit unknown facts; do not invent reviews or statistics.

## Strict intended scope
- ONE AI art-direction response, zero retries, no vision/tool calls, no image/video purchases, no autonomous follow-up calls.
- Anthropic Claude Sonnet 4.6 remains a candidate only; model and pricing are subject to re-verification.
- Input ceiling 12,000 tokens and output cap 4,096 tokens, estimated base token spend $0.09744 if both ceilings were used (0.036 + 0.06144); not a guarantee of real billing.
- Never permit public web clients to call the provider directly.
- Run from a dedicated authenticated single-use execution context with persistent ledger, strict external workspace budget, audit log, and independent kill switch.
- Separate project/workspace key from the current shared production key if possible.
- If any of these controls are unavailable, do not spend. Instead carry on with nonpaid validation and alternative-provider evaluation.

## Expected result
A validated art-direction JSON, with industry-specific composition, visual narrative, typography and desktop/mobile plans, not a rendered website. Additional work will be needed to generate valid UI and perform browser visual assessment; do not imply 5/5 from one JSON response.

## Operational acceptance checklist
- [x] User authorized aggregate experiment cap $2
- [x] Typed intake and art direction output schemas committed
- [x] Budget estimation and disable-by-default guard committed
- [ ] Dedicated provider workspace budget and remaining available balance VERIFIED
- [ ] Persistent atomic spend/idempotency guard VERIFIED
- [ ] Secure single-use execution path VERIFIED
- [ ] One actual provider response VERIFIED
- [ ] Rendered desktop/mobile output VERIFIED
