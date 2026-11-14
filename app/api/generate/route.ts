import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

export const maxDuration = 300;

const SYSTEM_PROMPT = `
You are an award-winning web designer. Generate a complete, standalone HTML file using Tailwind CSS via CDN.

RULES:
- Return ONLY the raw HTML code. Start with <!DOCTYPE html> and end with </html>. No markdown formatting.
- Use Google Fonts (e.g., Playfair Display for spa, Oswald for gym).
- Theme: Spa = elegant, soft cream/beige, serif fonts. Gym = dark, bold, sans-serif.
- Generate exactly 8 sections: Hero (full screen with background image), Stats, About (asymmetric), Services (Bento grid), Process (Editorial list), Testimonial, CTA, Footer.
- Use real Unsplash images: <img src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1920&q=80" />
- Mobile responsive.
`;

export async function POST(req: Request) {
  try {
    const { description } = await req.json();
    if (!description || description.length < 20) {
      return NextResponse.json({ error: "Please describe your business." }, { status: 400 });
    }

    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const msg = await client.messages.create({
      model: "claude-sonnet-4-6", 
      temperature: 0.3,
      max_tokens: 8192,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: `Generate the website for:\n\n${description}` }]
    });

    let html = msg.content[0].type === 'text' ? msg.content[0].text : "";
    html = html.replace(/^```(?:html)?\s*/i, "").replace(/\s*```\s*$/i, "").trim();

    return NextResponse.json({ html });

  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json({ error: error.message || "Failed to generate." }, { status: 500 });
  }
}
