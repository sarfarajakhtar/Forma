import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

export const maxDuration = 300;

const DESIGN_SYSTEM_PROMPT = `
You are an award-winning UI/UX designer. You build cinematic, high-end websites. 

CRITICAL LENGTH LIMIT (DO NOT IGNORE):
- You MUST output exactly 3 sections: 1. Nav, 2. Hero, 3. Content/Footer.
- Keep the HTML extremely concise. Do NOT write long paragraphs.
- The total code MUST be under 250 lines. If it is longer, you will be cut off and fail.
- You MUST finish the entire document ending with </html>.

IMAGERY (CINEMATIC & FULL-BLEED):
- Hero sections MUST be a full-bleed background image using inline styles with a dark gradient overlay.
- Use real Unsplash images: 
  https://images.unsplash.com/photo-{ID}?auto=format&fit=crop&w=1920&q=80
  (Use these IDs: Luxury Hotel: 1566073771259-6a8506099945. Modern Gym: 1534438327276-14e5300c3a48. Real Estate: 1600596542815-ffad4c1539a9. Travel: 1476514525535-07fb3b4ae5f1. Tech: 1497366216548-37526070297c).

FLOATING OVERLAPS:
- Use overlapping elements. For example, a small stat block should float over the bottom of the hero image. Use Tailwind classes like: relative, -mt-24, z-10, shadow-2xl.

TYPOGRAPHY & LAYOUT:
- Choose ONE elegant font pair (e.g., Playfair Display + Inter). Use massive sizes for headings (text-6xl md:text-8xl).
- Section padding must be generous (py-24).
- Use a sophisticated neutral background (like #f8f6f0) and a rich accent color.

ABSOLUTELY BANNED:
- 3 identical feature cards.
- Purple/violet gradients.
- "Lorem ipsum", "Acme", "Welcome to our website".
- Invented stats or fake testimonials.

FACTUAL INTEGRITY:
- Use ONLY what the user supplied. Write short, evocative copy.

MOBILE:
- Design mobile-first (390px). Use md: and lg: breakpoints for grids.

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
          content: `Generate a cinematic, elite landing page for this business:\n\n${description}` 
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
      return NextResponse.json({ error: "The AI got cut off. Please try again." }, { status: 500 });
    }

    return NextResponse.json({ html });

  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message || "Generation failed." }, { status: 500 });
  }
}
