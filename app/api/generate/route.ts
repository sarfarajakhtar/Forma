import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

export const maxDuration = 300;

const SYSTEM_PROMPT = `
You are an elite web design AI. Your job is to output a valid JSON blueprint for a website.

CRITICAL INSTRUCTION: You MUST generate exactly 8 sections. Do not stop after the first one. If you do not generate all 8 sections, the application will crash and fail. 

You MUST return ONLY a valid JSON object. Do not use markdown. Do not write any conversational text.

Here is the exact schema you must follow. Fill in the data based on the user's prompt:

{
  "theme": "spa",
  "sections": [
    { "type": "Hero", "props": { "headline": "...", "subheadline": "...", "ctaText": "...", "videoUrl": "" } },
    { "type": "Stats", "props": { "items": [ { "number": "...", "label": "..." }, { "number": "...", "label": "..." }, { "number": "...", "label": "..." }, { "number": "...", "label": "..." } ] } },
    { "type": "AsymmetricAbout", "props": { "eyebrow": "...", "title": "...", "description": "...", "imageUrl": "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=80", "badge": { "title": "...", "subtitle": "..." } } },
    { "type": "BentoGrid", "props": { "title": "...", "items": [ { "title": "...", "description": "...", "imageUrl": "..." }, { "title": "...", "description": "...", "imageUrl": "..." }, { "title": "...", "description": "...", "imageUrl": "..." } ] } },
    { "type": "EditorialList", "props": { "title": "...", "items": [ { "number": "01", "title": "...", "description": "..." }, { "number": "02", "title": "...", "description": "..." }, { "number": "03", "title": "...", "description": "..." } ] } },
    { "type": "Testimonial", "props": { "quote": "...", "author": "..." } },
    { "type": "FullWidthCTA", "props": { "title": "...", "ctaText": "...", "imageUrl": "..." } },
    { "type": "Footer", "props": { "brandName": "...", "address": "...", "email": "...", "phone": "..." } }
  ]
}

Available Themes:
- "spa": Elegant serif fonts, soft colors.
- "gym": Bold sans-serif, dark backgrounds.
- "corporate": Clean, structured.

Use these exact Unsplash Image IDs for the imageUrl fields:
- Spa/Salon: 1570172619644-dfd03ed5d881, 1616394584738-fc6e612e71b9, 1512290923902-8a9f81dc236c, 1540555700478-4be289fbecef
- Gym: 1534438327276-14e5300c3a48, 1517836357463-d25dfeac3438, 1581009146145-b5ef050c2e1e, 1574680096145-d05b474e2155
- Tech/Corporate: 1497366216548-37526070297c, 1551434678-e076c223a692, 1451187580459-43490279c0fa

Keep text descriptions under 15 words to save memory. Do not miss any sections.
`;

export async function POST(req: Request) {
  try {
    const { description } = await req.json();
    if (!description || description.length < 20) {
      return NextResponse.json({ error: "Please describe your business." }, { status: 400 });
    }

    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const msg = await client.messages.create({
      model: "claude-3-opus-20240229", // Upgraded to Opus for strict JSON adherence
      temperature: 0.1, // Low temp to force it to follow the JSON list exactly
      max_tokens: 4096, 
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: `Generate the complete JSON blueprint for:\n\n${description}` }]
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
