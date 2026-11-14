import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

export const maxDuration = 300;

const DESIGN_SYSTEM_PROMPT = `
You are an award-winning UI/UX designer. You build cinematic, high-end, COMPREHENSIVE websites. 

CRITICAL LENGTH LIMIT (DO NOT IGNORE):
- You MUST output exactly 8 to 10 distinct sections (e.g., Nav, Hero, Intro, Features, Services, Stats, Gallery, Testimonials, CTA, Footer).
- To fit this in memory, your HTML must be EXTREMELY compact. Do NOT use HTML comments (<!-- -->). Do not use unnecessary line breaks. 
- You MUST finish the entire document ending with </html>.

MULTI-PAGE FEEL (ANCHOR NAVIGATION):
- The Navbar must have 4-5 links. Use anchor tags (<a href="#section-id">) to link to the different sections on the page.
- Add the CSS class "scroll-smooth" to the <html> or <body> tag so clicking the links glides down the page.

IMAGERY (CINEMATIC & FULL-BLEED):
- Hero MUST be a full-bleed background image using inline styles with a dark gradient overlay.
- Use real Unsplash images: https://images.unsplash.com/photo-{ID}?auto=format&fit=crop&w=1920&q=80
- (IDs: Hotel: 1566073771259-6a8506099945. Gym: 1534438327276-14e5300c3a48. Real Estate: 1600596542815-ffad4c1539a9. Tech: 1497366216548-37526070297c).

FLOATING OVERLAPS & GRIDS:
- Use overlapping elements (e.g., a booking widget floating over the hero using: relative, -mt-16, z-10, shadow-2xl).
- Use 12-column grids (grid-cols-12) for content. Mix widths (col-span-4, col-span-8). NEVER use 3 identical cards in a row.

TYPOGRAPHY & COLOR:
- Choose ONE elegant font pair (e.g., Playfair Display + Inter).
- Use massive headings (text-5xl md:text-7xl).
- Use a sophisticated neutral background (#f8f6f0) and a rich accent color.

ABSOLUTELY BANNED:
- 3 identical feature cards.
- Purple/violet gradients.
- "Lorem ipsum", "Acme", "Welcome to our website".
- Invented statistics.

FACTUAL INTEGRITY:
- Use ONLY what the user supplied. Write short, evocative copy.

MOBILE:
- Mobile-first (390px). Use md: and lg: breakpoints.

OUTPUT:
- A complete standalone HTML file using Tailwind CDN <script src="https://cdn.tailwindcss.com"></script> and Google Fonts. Return ONLY the HTML.
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
      model: "claude-sonnet-4-6", 
      temperature: 0.4, 
      max_tokens: 8192,
      system: DESIGN_SYSTEM_PROMPT,
      messages: [
        { 
          role: "user", 
          content: `Generate a comprehensive, 8-10 section, cinematic landing page for this business:\n\n${description}` 
        }
      ]
    });

    let html = "";
    if (msg.content[0].type === 'text') {
      html = msg.content[0].text;
    }

    html = html.replace(/^```(?:html)?\s*/i, "").replace(/\s*```\s*$/i, "").trim();

    if (!html.startsWith("<!DOCTYPE html>") && !html.startsWith("<html")) {
      return NextResponse.json({ error: "AI returned malformed output. Try again." }, { status: 500 });
    }
    
    if (!html.endsWith("</html>")) {
      return NextResponse.json({ error: "The AI ran out of memory before finishing 8 sections. Please try again." }, { status: 500 });
    }

    return NextResponse.json({ html });

  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message || "Generation failed." }, { status: 500 });
  }
}
