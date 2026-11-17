import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

export const maxDuration = 60;

const SYSTEM_PROMPT = `
You are an elite web design AI. You MUST return ONLY a valid JSON object. Do not use markdown. 

You MUST generate exactly 7 sections in this EXACT order:

{
  "theme": "gym",
  "sections": [
    { "type": "Hero", "props": { "headline": "...", "subheadline": "...", "ctaText": "..." } },
    { "type": "Marquee", "props": {} },
    { "type": "AsymmetricAbout", "props": { "title": "...", "desc": "...", "imageUrl": "..." } },
    { "type": "BentoGrid", "props": { "title": "...", "items": [ { "title": "...", "desc": "...", "imageUrl": "..." }, { "title": "...", "desc": "...", "imageUrl": "..." }, { "title": "...", "desc": "...", "imageUrl": "..." } ] } },
    { "type": "Timeline", "props": { "title": "...", "items": [ { "num": "01", "title": "...", "desc": "..." }, { "num": "02", "title": "...", "desc": "..." }, { "num": "03", "title": "...", "desc": "..." } ] } },
    { "type": "FullWidthCTA", "props": { "title": "...", "ctaText": "..." } },
    { "type": "Footer", "props": { "brandName": "...", "address": "...", "email": "...", "phone": "..." } }
  ]
}

Use these exact image IDs for gym imageUrl fields: 1534438327276-14e5300c3a48, 1517836357463-d25dfeac3438, 1581009146145-b5ef050c2e1e, 1574680096145-d05b474e2155
Format: https://images.unsplash.com/photo-{ID}?auto=format&fit=crop&w=1200&q=80
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
