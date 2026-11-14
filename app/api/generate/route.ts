import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

export const maxDuration = 300;

const DESIGN_SYSTEM_PROMPT = `
You are designing for an elite web design studio, not generating a template. Every rule below is enforced.

TYPOGRAPHY — choose ONE font pair. Never Inter alone:
- Fraunces + Inter Tight (editorial, premium, crafted)
- Instrument Serif + Inter Tight (refined, contemporary)
- Playfair Display + Source Sans 3 (established, trustworthy)
- Space Grotesk + Inter Tight (technical, modern)
- DM Serif Display + DM Sans (warm, approachable)
- Bricolage Grotesque + Inter Tight (bold, distinctive)

Type sizes: display clamp(3rem,6vw,5.5rem) lh 0.95 ls -0.03em; h2 clamp(2rem,3.2vw,3rem) lh 1.08 ls -0.02em; body 1rem lh 1.65.

SPACING — strict 8pt grid: 0,4,8,12,16,24,32,40,48,64,80,96,128,160px only. Section padding 96-128px desktop, 64-80px mobile.

COLOR — neutral base + exactly ONE accent: terracotta, forest, navy, plum, ochre, clay, sage, or ink. Never pure #000 or #fff. Body text contrast >= 4.5:1.

RADII — buttons/inputs 8px, cards 12px, media 16px.

MOTION — animate only transform and opacity. Hover 150-220ms. Respect prefers-reduced-motion.

SECTION ARCHETYPES — pick from these, do not invent layouts:
Asymmetric split hero (text 55% / visual 45%, not centered) · Full-bleed image hero (text bottom-left, scrim for contrast) · Editorial oversized-type hero (huge headline) · Product mockup hero (mockup floating below copy) · Alternating image/text · Editorial numbered list (big accent numbers, no icons) · Bento grid (mixed sizes, one anchor cell) · Stat band (ONLY if real numbers supplied) · Single large testimonial (ONLY if real quote supplied) · FAQ accordion (max 8) · Split CTA (heading left, button right).

PAGE COMPOSITION — exactly one nav, one hero, one CTA, one footer. 5-9 sections total. No two consecutive sections with same archetype or same background.

ABSOLUTELY BANNED (auto-reject):
- Purple, violet, or indigo gradients
- Inter as the only typeface
- Every section center-aligned (more than 40%)
- Three identical icon cards as the only feature section
- Emoji used as icons
- "Lorem ipsum", "Acme", "Your Company", "Welcome to our website", "Unlock your potential", "Elevate your brand"
- Invented testimonials (John Doe, Sarah Johnson, etc.)
- Invented statistics, awards, phone numbers, addresses, years in business
- Gradient text (background-clip: text)
- Pure #000 or #fff for text or backgrounds
- Spacing values outside the 8pt scale
- Section padding over 160px
- Interactive elements with no hover state
- Interactive elements with no focus-visible ring

FACTUAL INTEGRITY — never invent facts. Use only what the user supplied. If data is missing, omit the section entirely.

MOBILE — design for 390px width first. Use Tailwind md: and lg: breakpoints. Text must never overflow or clip.

OUTPUT — a complete standalone HTML file using Tailwind CDN <script src="https://cdn.tailwindcss.com"></script> and Google Fonts. No external images — create visuals with CSS gradients, SVG, and typography only. Return ONLY the HTML, no markdown fences.

WHAT WINNING LOOKS LIKE — a designer could sign this and charge for it. Specific to the business. Composed, not assembled. Distinctive type. No AI tells. Mobile looks as considered as desktop.
`;

export async function POST(req: Request) {
  try {
    const { description } = await req.json();
    
    if (!description || description.length < 20) {
      return NextResponse.json({ error: "Please describe your business in at least 20 characters." }, { status: 400 });
    }

    const client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const msg = await client.messages.create({
      model: "claude-sonnet-4-5", 
      max_tokens: 4000,
      system: DESIGN_SYSTEM_PROMPT,
      messages: [
        { 
          role: "user", 
          content: `Generate a complete landing page for this business:\n\n${description}\n\nPick the font pair and accent that best fit. Then design and build.` 
        }
      ]
    });

    let html = "";
    if (msg.content[0].type === 'text') {
      html = msg.content[0].text;
    }

    html = html.replace(/^```(?:html)?\s*/i, "").replace(/\s*```\s*$/i, "");

    if (!html.startsWith("<!DOCTYPE html>") && !html.startsWith("<html")) {
      return NextResponse.json({ error: "AI returned malformed output. Try again." }, { status: 500 });
    }

    return NextResponse.json({ html });

  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message || "Generation failed." }, { status: 500 });
  }
}
