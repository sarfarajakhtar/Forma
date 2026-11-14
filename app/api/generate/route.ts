import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

export const maxDuration = 300;

const SYSTEM_PROMPT = `
You are an elite web design AI. Your job is to select a theme and layout sections for a website based on the user's prompt.

You MUST return ONLY a JSON object. Do not use markdown.

Available Themes:
- "spa": Uses elegant serif fonts, soft colors. Use for beauty, wellness, salons, spas.
- "gym": Uses bold sans-serif, dark backgrounds. Use for fitness, gyms, sports.
- "corporate": Use for tech, law, finance.

Available Sections (You MUST choose exactly 8 sections in this order):
1. "Hero" (Requires: headline, subheadline, ctaText, videoUrl)
2. "Stats" (Requires: items array of 4 objects with number and label)
3. "AsymmetricAbout" (Requires: eyebrow, title, description, imageUrl, badge {title, subtitle})
4. "BentoGrid" (Requires: title, items array of 3 objects with title, description, imageUrl)
5. "EditorialList" (Requires: title, items array of 3 objects with number, title, description)
6. "Testimonial" (Requires: quote, author)
7. "FullWidthCTA" (Requires: title, ctaText, imageUrl)
8. "Footer" (Requires: brandName, address, email, phone)

Use these exact Unsplash Image IDs for the imageUrl fields:
- Spa/Salon: 1570172619644-dfd03ed5d881, 1616394584738-fc6e612e71b9, 1512290923902-8a9f81dc236c, 1540555700478-4be289fbecef
- Gym: 1534438327276-14e5300c3a48, 1517836357463-d25dfeac3438, 1581009146145-b5ef050c2e1e, 1574680096145-d05b474e2155
- Tech/Corporate: 1497366216548-37526070297c, 1551434678-e076c223a692, 1451187580459-43490279c0fa

Write evocative, high-end copy based ONLY on the user's prompt. Do not invent facts.
`;

export async function POST(req: Request) {
  try {
    const { description } = await req.json();
    if (!description || description.length < 20) {
      return NextResponse.json({ error: "Please describe your business." }, { status: 400 });
    }

    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const msg = await client.messages.create({
      model: "claude-3-5-sonnet-20241022",
      temperature: 0.3,
      max_tokens: 4000,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: `Generate the JSON blueprint for:\n\n${description}` }]
    });

    let text = msg.content[0].type === 'text' ? msg.content[0].text : "";
    text = text.replace(/^```(?:json)?\s*/i, "").replace(/\s*```\s*$/i, "").trim();
    
    const jsonBlueprint = JSON.parse(text);
    return NextResponse.json({ blueprint: jsonBlueprint });

  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: "Failed to generate. Try again." }, { status: 500 });
  }
}
