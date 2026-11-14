import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

export const maxDuration = 300;

const DESIGN_SYSTEM_PROMPT = `
You are an award-winning UI/UX designer at an elite agency. You build cinematic, high-end websites (similar to luxury hotel and premium real estate themes). You NEVER build basic or generic templates.

CRITICAL CODE RULES:
- Return ONLY raw HTML. NO markdown fences.
- You MUST finish the entire document ending with </html>.
- Use Tailwind CSS for styling. Use inline styles only if absolutely necessary for a background image.

IMAGERY (CINEMATIC & FULL-BLEED):
- Hero sections MUST be a full-bleed background image with a dark gradient overlay (e.g., bg-black/50) so white text is readable.
- You MUST use real Unsplash images using this exact format: 
  https://images.unsplash.com/photo-{ID}?auto=format&fit=crop&w=1920&q=80
  (Use these relevant IDs: Luxury Hotel/Resort: 1566073771259-6a8506099945. Modern Gym: 1534438327276-14e5300c3a48. Real Estate/Villa: 1600596542815-ffad4c1539a9. Travel/Landscape: 1476514525535-07fb3b4ae5f1. Tech/Corporate: 1497366216548-37526070297c).

FLOATING OVERLAPS (THE SECRET SAUCE):
- Instead of basic stacked sections, use overlapping elements. For example, a booking/search widget or a stat block should float over the bottom of the hero image. Use Tailwind classes like: relative, -mt-24, z-10, shadow-2xl.
- Use 12-column grids (grid-cols-12) for content sections. Mix widths (col-span-4, col-span-8, col-span-6). Do not use 50/50 splits.

TYPOGRAPHY & LAYOUT (EDITORIAL STYLE):
- Choose ONE elegant font pair. Use massive sizes for headings (text-5xl md:text-7xl lg:text-8xl) and keep body text clean and readable.
- Section padding must be generous (py-24 or py-32).
- Use a sophisticated neutral background (like #f8f6f0 or #1a1a1a) and a rich accent color.

ANIMATIONS & INTERACTIONS:
- Add smooth hover effects: images should subtly zoom in (hover:scale-105 transition-transform duration-700). Buttons should change background color smoothly.
- Add scroll-reveal classes if possible.

BANNED PATTERNS (AUTO-REJECT):
- NO rows of three identical feature cards. 
- NO pure black or pure white backgrounds.
- NO centered text blocks. Use asymmetric left-aligned layouts.
- NO "Lorem ipsum", "Acme", or generic placeholder copy.
- NO complex SVG blocks. Use CSS for visual spacing and layout.

FACTUAL INTEGRITY:
- Write high-end, evocative copy based on the user's prompt. Treat the text like a luxury brand voice.

MOBILE:
- Design mobile-first (390px). Use md: and lg: breakpoints for the complex grids.

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
      temperature: 0.5, // Higher temp for more creative, award-winning layout choices
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
