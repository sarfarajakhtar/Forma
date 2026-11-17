# Forma — engine selection, November 2026

## Decision
Run two tracks before choosing the paid generation stack:
- **Commercial benchmark:** Duda AI Site Generation API, then 10Web and Brizy if commercially accessible.
- **Owned hybrid benchmark:** Forma-guided intake + structured pages + independent art direction + media curation + rendering and visual QA.

**Never confuse the hand-authored pages at /quality-benchmark with outputs from an automated engine.** They are visual references only.

## Verified official entry points
- Duda: https://developer.duda.co/docs/how-to-generate-sites-with-ai
- Duda API overview and rate limits: https://developer.duda.co/reference/getting-started-with-the-duda-api
- Duda pricing: https://www.duda.co/pricing
- 10Web API: https://help.10web.io/hc/en-us/articles/27304964365586-Introduction-to-10Web-API
- 10Web white label: https://10web.io/white-label-website-builder/
- Brizy AI white label: https://www.brizy.io/white-label-ai-website-builder
- Brizy integration: https://support.brizy.io/hc/en-us/articles/18537815092370-AI-Builder

## Known commercial risks
Duda site-level published hosting charges shown on public pricing can exceed Forma's previously proposed $9.99/month lower tier; published pricing is not a verified custom partnership quotation. Check partner minimum, generation fees, published site recurring charge, API plan requirement, branding rights, client ownership, migration/export limits, and usage overages.

10Web offers an API and white label but its WordPress infrastructure and negotiated integration pricing require direct verification.

Brizy advertises an API explorer in white-label setups, but the required commercial plan and API rights need direct validation.

## Owned engine research
- OpenPage: https://github.com/buildingopen/openpage — JSON-first multi-page composition, 19 block types; Vite/React19/Tailwind4, so not drop-in for Forma's Next14/React18/Tailwind3.
- WebViSE: https://github.com/YifeiSun-0710/WebViSE — visual skill retrieval research; not a turnkey SaaS generation engine; commercial reuse rights unresolved.
- Puck: https://github.com/puckeditor/puck — structured rendering and editing, not automatic art direction.

## Required objective comparisons
For the same verified salon / restaurant / IT briefs, score each _automatically generated_ site independently on 1–5 rubric:
1. Unique art direction and layout, not recolored shared composition
2. Desktop and mobile typography, spacing, composition, crop
3. Media appropriateness and honesty; optional video only when valuable
4. Functional navigation, links, forms and accessibility
5. Factual accuracy: no invented business data
6. Cost: AI/media generation, revisions, hosting, support, payment fees and margin
7. Editable and publishable output with data portability

## Present evidence and boundaries
- Current /quality-benchmark pages are handcrafted reference designs; they only demonstrate frontend compositional freedom.
- No vendor API keys, paid demos, sign-ups, contracts or subscription purchases have been executed.
- No pricing proposal should be approved until all-in unit economics pass.
- Public site and main branch must remain unchanged.
- Do not launch publicly until secure usage limits, functional publishing, content integrity and real independent multi-industry results are validated.

## Next engineering gate
Implement a no-cost **guided intake schema + deterministic mock** with dynamic questions for three industries. Then wire it to generation behind disabled-by-default feature flag only after approval of budget and endpoint protections. Preserve results in a reusable test fixture.
