import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

export const maxDuration = 60;

const SYSTEM_PROMPT = `
You are an elite web design AI. You MUST return ONLY a valid JSON object. Do not use markdown. 

Available Themes:
- "spa": Elegant serif fonts, soft colors. 
- "gym": Bold sans-serif, dark backgrounds. 

You MUST generate exactly 6 sections to guarantee an elite, art-directed rhythm:

{
  "theme": "spa" | "gym",
  "sections": [
    { "type": "Hero", "props": { "headline": "...", "subheadline": "...", "ctaText": "..." } },
    { "type": "BentoGrid", "props": { "title": "...", "items": [ { "title": "...", "desc": "...", "imageUrl": "..." }, { "title": "...", "desc": "...", "imageUrl": "..." }, { "title": "...", "desc": "...", "imageUrl": "..." } ] } },
    { "type": "Timeline", "props": { "title": "...", "items": [ { "num": "01", "title": "...", "desc": "..." }, { "num": "02", "title": "...", "desc": "..." }, { "num": "03", "title": "...", "desc": "..." } ] } },
    { "type": "AsymmetricAbout", "props": { "title": "...", "desc": "...", "imageUrl": "..." } },
    { "type": "Testimonial", "props": { "quote": "...", "author": "..." } },
    { "type": "Footer", "props": { "brandName": "...", "address": "...", "email": "...", "phone": "..." } }
  ]
}

CRITICAL IMAGE RULES:
- For "gym", use these image IDs: 1534438327276-14e5300c3a48, 1517836357463-d25dfeac3438, 1581009146145-b5ef050c2e1e, 1574680096145-d05b474e2155
- For "spa", use these image IDs: 1570172619644-dfd03ed5d881, 1616394584738-fc6e612e71b9, 1512290923902-8a9f81dc236c, 1540555700478-4be289fbecef
- Format: https://images.unsplash.com/photo-{ID}?auto=format&fit=crop&w=1200&q=80

Keep text descriptions under 15 words.
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
      temperature: 0.2,
      max_tokens: 8192,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: `Generate the JSON blueprint for:\n\n${description}` }]
    });

    let text = msg.content[0].type === 'text' ? msg.content[0].text : "";
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("AI did not return valid JSON.");

    const jsonBlueprint = JSON.parse(jsonMatch[0]);
    return NextResponse.json({ blueprint: jsonBlueprint });

  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json({ error: error.message || "Failed to generate." }, { status: 500 });
  }
}
