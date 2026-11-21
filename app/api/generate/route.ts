import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { parsePuckBlueprint } from "../../../lib/puck/blueprint";

export const maxDuration = 60;

const SYSTEM_PROMPT = `
You are an elite Art Director. You MUST return ONLY a valid JSON object. No markdown fences.

You must generate a complete website blueprint. You have a specific library of components. DO NOT invent components.

Available Components:
1. "HeroCinematic": Full-screen dark image, huge aggressive text. (Use for Gyms, Cinemas, impactful brands).
2. "HeroSplit": White background, text on left, large image on right. (Use for Law Firms, Tech, Corporate, Spas).
3. "FeaturesBento": A 3-column grid of image cards. (Best for visual businesses).
4. "FeaturesTimeline": A sleek 3-step process. (Use for Services, Methodologies).
5. "FooterMinimal": Standard footer.

RULES FOR ASSEMBLY:
- The FIRST component MUST be either "HeroCinematic" (if dark/aggressive) OR "HeroSplit" (if corporate/elegant).
- Include "FeaturesBento" OR "FeaturesTimeline" in the middle.
- ALWAYS end with "FooterMinimal".
- IDs must be unique (e.g., "hero-1", "features-1").
- DO NOT generate Testimonials. DO NOT invent quotes, statistics, or names. 

AVAILABLE IMAGE IDs (Use these EXACT Unsplash IDs based on industry):
- IF GYM: 1534438327276-14e5300c3a48, 1517836357463-d25dfeac3438, 1581009146145-b5ef050c2e1e
- IF LAW/FINANCE: 1589829545856-d10d557cf95f, 1454165804606-c3d57bc86b40, 1505664194779-8beaceb93744
- IF TECH: 1497366216548-37526070297c, 1497366811353-6870744d04b2, 1451187580459-43490279c0fa
- IF SPA/BAKERY: 1540555700478-4be289fbecef, 1509440159596-0249088772ff, 1517433670267-08bbd4be890f

OUTPUT SCHEMA:
{
  "root": { "props": {} },
  "zones": {},
  "content": [
    // Array of selected components
  ]
}

Below is the exact JSON structure for every component:

HeroCinematic:
{ "type": "HeroCinematic", "props": { "id": "...", "headline": "...", "subheadline": "...", "imageUrl": "https://images.unsplash.com/photo-{ID}?auto=format&fit=crop&w=1600&q=80", "ctaText": "..." } }

HeroSplit:
{ "type": "HeroSplit", "props": { "id": "...", "headline": "...", "subheadline": "...", "imageUrl": "https://images.unsplash.com/photo-{ID}?auto=format&fit=crop&w=1600&q=80", "ctaText": "..." } }

FeaturesBento:
{ "type": "FeaturesBento", "props": { "id": "...", "title": "...", "items": [ { "title": "...", "description": "...", "imageUrl": "https://images.unsplash.com/photo-{ID}?auto=format&fit=crop&w=900&q=80" }, { "title": "...", "description": "...", "imageUrl": "https://images.unsplash.com/photo-{ID}?auto=format&fit=crop&w=900&q=80" }, { "title": "...", "description": "...", "imageUrl": "https://images.unsplash.com/photo-{ID}?auto=format&fit=crop&w=900&q=80" } ] } }

FeaturesTimeline:
{ "type": "FeaturesTimeline", "props": { "id": "...", "title": "...", "items": [ { "num": "01", "title": "...", "description": "..." }, { "num": "02", "title": "...", "description": "..." }, { "num": "03", "title": "...", "description": "..." } ] } }

FooterMinimal:
{ "type": "FooterMinimal", "props": { "id": "...", "brandName": "...", "email": "...", "address": "..." } }

CRITICAL:
- Do NOT invent addresses, phone numbers, or statistics. If not provided, leave them empty or omit them.
- Keep descriptions under 15 words.
`;

export async function POST(req: Request) {
  try {
    const { description } = await req.json();
    if (!description || description.length < 20) {
      return NextResponse.json({ error: "Please describe your business in at least 20 characters." }, { status: 400 });
    }

    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const msg = await client.messages.create({
      model: "claude-sonnet-4-6", 
      temperature: 0.2,
      max_tokens: 8000, 
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: `Generate the JSON blueprint for:\n\n${description}` }]
    });

    let text = msg.content[0].type === 'text' ? msg.content[0].text : "";
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("AI did not return valid JSON.");

    const rawJson = JSON.parse(jsonMatch[0]);
    const validatedBlueprint = parsePuckBlueprint(rawJson);

    return NextResponse.json({ blueprint: validatedBlueprint });

  } catch (error: any) {
    console.error("API Error:", error);
    if (error.name === "ZodError") {
      return NextResponse.json({ error: "The AI generated an invalid layout. Please try again." }, { status: 500 });
    }
    return NextResponse.json({ error: error.message || "Failed to generate." }, { status: 500 });
  }
}
