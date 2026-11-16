import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

export const maxDuration = 60; // Ask Vercel for 60s, but we will finish in 5s

const SYSTEM_PROMPT = `
You are an elite web design AI. You MUST return ONLY a valid JSON object. Do not use markdown.

You MUST generate exactly 5 sections to ensure fast generation.
Available Themes:
- "spa": Elegant serif fonts, soft colors.
- "gym": Bold sans-serif, dark backgrounds.
- "corporate": Clean, structured.

Required Sections (Exactly 5):
1. "Hero" (Requires: headline, subheadline, ctaText)
2. "AsymmetricAbout" (Requires: eyebrow, title, description, imageUrl, badge {title, subtitle})
3. "BentoGrid" (Requires: title, items array of 3 objects with title, description, imageUrl)
4. "Testimonial" (Requires: quote, author)
5. "Footer" (Requires: brandName, address, email, phone)

Use these exact Unsplash Image IDs for the imageUrl fields:
- Spa/Salon: 1570172619644-dfd03ed5d881, 1616394584738-fc6e612e71b9, 1512290923902-8a9f81dc236c, 1540555700478-4be289fbecef
- Gym: 1534438327276-14e5300c3a48, 1517836357463-d25dfeac3438, 1581009146145-b5ef050c2e1e, 1574680096145-d05b474e2155
- Tech/Corporate: 1497366216548-37526070297c, 1551434678-e076c223a692, 1451187580459-43490279c0fa

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
      model: "claude-3-haiku-20240307", // The fastest model
      temperature: 0.2,
      max_tokens: 4000,
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
