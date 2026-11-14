import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

export const maxDuration = 300;

const DESIGN_SYSTEM_PROMPT = `
You are designing for an elite web design studio. Every rule below is enforced.

CRITICAL CODE RULES:
- Return ONLY raw HTML. NO markdown fences, NO HTML comments (<!-- -->), NO massive SVG blocks.
- Keep the code highly optimized and short. Use Tailwind utility classes for everything.
- You MUST finish the entire document ending with </html>.
- Total sections: 3 to 4. (e.g., Nav, Hero, Features, Footer). Do not over-complicate the layout.

TYPOGRAPHY — choose ONE font pair. Never Inter alone:
- Fraunces + Inter Tight · Instrument Serif + Inter Tight · Playfair Display + Source Sans 3 · Space Grotesk + Inter Tight · DM Serif Display + DM Sans · Bricolage Grotesque + Inter Tight

SPACING — strict 8pt grid: 0,4,8,12,16,24,32,40,48,64,80,96,128px. Section padding 96px.

COLOR — neutral base + exactly ONE accent: terracotta, forest, navy, plum, ochre, clay, sage, or ink. Never pure #000 or #fff.

RADII — buttons 8px, cards 12px, media 16px.

SECTION ARCHETYPES — pick from these, do not invent layouts:
Asymmetric split hero (text 55% / visual 45%) · Full-bleed image hero (text bottom-left) · Editorial oversized-type hero · Alternating image/text · Bento grid. Do NOT use three identical icon cards.

ABSOLUTELY BANNED:
- Purple/violet gradients · Inter as the only font · Center-aligning everything · Emoji as icons.
- "Lorem ipsum", "Acme", "Your Company", "Welcome to our website", "Unlock your potential".
- Invented testimonials, statistics, awards, phone numbers, or addresses.
- Pure #000 or #fff for text/backgrounds.

FACTUAL INTEGRITY — Use ONLY what the user supplied. If data is missing, omit the section.

MOBILE — design for 390px width first. Use Tailwind md: and lg: breakpoints.

OUTPUT — A complete standalone HTML file using Tailwind CDN <script src="https://cdn.tailwindcss.com"></script> and Google Fonts. Use flat CSS colors and simple geometry. Do NOT use complex SVGs or external images. Return ONLY the HTML.
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
      model: "claude-3-5-sonnet-20241022",
      temperature: 0.2,
      max_tokens: 8192,
      system: DESIGN_SYSTEM_PROMPT,
      messages: [
        { 
          role: "user", 
          content: `Generate a complete landing page for this business:\n\n${description}\n\nPick the font pair and accent that best fit. Keep the code short and concise.` 
        }
      ]
    });

    let html = "";
    if (msg.content[0].type === 'text') {
      html = msg.content[0].text;
    }

    // Clean up markdown
    html = html.replace(/^```(?:html)?\s*/i, "").replace(/\s*```\s*$/i, "").trim();

    // Safety check: Ensure it starts with <!DOCTYPE and ends with </html>
    if (!html.startsWith("<!DOCTYPE html>") && !html.startsWith("<html")) {
      return NextResponse.json({ error: "AI returned malformed output. Try again." }, { status: 500 });
    }
    
    if (!html.endsWith("</html>")) {
      return NextResponse.json({ error: "The AI got cut off. Please try again or make the business description slightly shorter." }, { status: 500 });
    }

    return NextResponse.json({ html });

  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message || "Generation failed." }, { status: 500 });
  }
}
