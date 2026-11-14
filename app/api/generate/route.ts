import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

export const maxDuration = 300;

const DESIGN_SYSTEM_PROMPT = `
You are an award-winning UI/UX designer. You build cinematic, high-end websites. 

CRITICAL LENGTH LIMIT (DO NOT IGNORE):
- You MUST output exactly 7 to 8 distinct sections.
- CRITICAL: You MUST write the HTML in a MINIFIED format (no newlines, no extra spaces between tags, NO HTML comments). This is required to save memory. 
- Keep paragraphs to 1-2 sentences max. 
- You MUST finish the entire document ending with </html>.

MULTI-PAGE FEEL (ANCHOR NAVIGATION):
- Navbar must have 4 links using anchor tags (<a href="#section-id">).
- Add "scroll-smooth" class to the <html> tag.

IMAGERY (CINEMATIC):
- Hero MUST be full-bleed background image using inline styles with a dark gradient overlay.
- Use Unsplash: https://images.unsplash.com/photo-{ID}?auto=format&fit=crop&w=1920&q=80
- (IDs: Spa/Wellness: 1540555700478-4be289fbecef. Hotel: 1566073771259-6a8506099945. Tech: 1497366216548-37526070297c).

FLOATING OVERLAPS & GRIDS:
- Use overlapping elements (e.g., floating stat block using: relative, -mt-16, z-10, shadow-2xl).
- Use 12-column grids (grid-cols-12) for content. Mix widths (col-span-4, col-span-8). NEVER use 3 identical cards in a row.

TYPOGRAPHY & COLOR:
- Use ONE elegant font pair (e.g., Playfair Display + Inter).
- Massive headings (text-5xl md:text-7xl).
- Sophisticated neutral background (#f8f6f0) and a rich accent color.

ABSOLUTELY BANNED:
- 3 identical feature cards.
- Purple/violet gradients.
- "Lorem ipsum", "Acme", "Welcome to our website".
- Invented stats or fake testimonials.

FACTUAL INTEGRITY:
- Use ONLY what the user supplied.

OUTPUT:
- Complete standalone HTML using Tailwind CDN <script src="https://cdn.tailwindcss.com"></script> and Google Fonts. Return ONLY the HTML.
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
      temperature: 0.3, 
      max_tokens: 8192,
      system: DESIGN_SYSTEM_PROMPT,
      messages: [
        { 
          role: "user", 
          content: `Generate a comprehensive, cinematic landing page for this business:\n\n${description}` 
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
      return NextResponse.json({ error: "The AI ran out of memory. Please try again." }, { status: 500 });
    }

    return NextResponse.json({ html });

  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message || "Generation failed." }, { status: 500 });
  }
}
