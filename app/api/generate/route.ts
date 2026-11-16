import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

export const maxDuration = 60;

const SYSTEM_PROMPT = `
You are an elite web design AI. You MUST return ONLY a valid JSON object. Do not use markdown. Do not write conversational text.

You MUST generate exactly 8 sections in the "sections" array to save memory.

Available Themes:
- "spa": Elegant serif fonts, soft colors. (Beauty, wellness, salons)
- "gym": Bold sans-serif, dark backgrounds. (Fitness, gyms, sports)

Here is the EXACT schema you must follow. Fill in the data based on the user's prompt:

{
  "theme": "spa" | "gym",
  "sections": [
    { "type": "Hero", "props": { "headline": "...", "subheadline": "...", "ctaText": "..." } },
    { "type": "OverlappingStats", "props": { "items": [ { "num": "10+", "label": "Years" }, { "num": "5k", "label": "Clients" }, { "num": "20", "label": "Experts" }, { "num": "100%", "label": "Satisfaction" } ] } },
    { "type": "BentoGrid", "props": { "title": "...", "items": [ { "title": "...", "description": "...", "imageUrl": "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=1200&q=80" }, { "title": "...", "description": "...", "imageUrl": "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=800&q=80" }, { "title": "...", "description": "...", "imageUrl": "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80" } ] } },
    { "type": "Gallery", "props": { "title": "...", "images": ["...", "...", "...", "..."] } },
    { "type": "EditorialList", "props": { "title": "...", "items": [ { "num": "01", "title": "...", "desc": "..." }, { "num": "02", "title": "...", "desc": "..." }, { "num": "03", "title": "...", "desc": "..." } ] } },
    { "type": "FAQ", "props": { "items": [ { "q": "...", "a": "..." }, { "q": "...", "a": "..." }, { "q": "...", "a": "..." } ] } },
    { "type": "Testimonial", "props": { "quote": "...", "author": "..." } },
    { "type": "Footer", "props": { "brandName": "...", "address": "...", "email": "...", "phone": "..." } }
  ]
}

Use these exact Unsplash Image IDs for the imageUrl fields:
- Spa/Salon: 1570172619644-dfd03ed5d881, 1616394584738-fc6e612e71b9, 1512290923902-8a9f81dc236c, 1540555700478-4be289fbecef, 1519823551278-64ac92734fb1, 1515377905703-c4788e51af15
- Gym: 1534438327276-14e5300c3a48, 1517836357463-d25dfeac3438, 1581009146145-b5ef050c2e1e, 1574680096145-d05b474e2155, 1541534741688-6078c6bfb5c5

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
      model: "claude-sonnet-4-6", // Stable model
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
