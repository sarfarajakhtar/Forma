import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { parsePuckBlueprint } from "../../lib/puck/blueprint";

export const maxDuration = 60;

const SYSTEM_PROMPT = `
You are an elite Art Director. You MUST return ONLY a valid JSON object. No markdown fences, no conversational text.

You must generate a JSON blueprint exactly matching this structure:

{
  "root": { "props": {} },
  "zones": {},
  "content": [
    {
      "type": "HeroImage",
      "props": {
        "id": "hero-1",
        "headline": "...",
        "subheadline": "...",
        "imageUrl": "https://images.unsplash.com/photo-{ID}?auto=format&fit=crop&w=1600&q=80",
        "imageAlt": "...",
        "ctaText": "...",
        "ctaHref": "#services"
      }
    },
    {
      "type": "FeaturesBento",
      "props": {
        "id": "features-1",
        "title": "...",
        "items": [
          { "title": "...", "description": "...", "imageUrl": "https://images.unsplash.com/photo-{ID}?auto=format&fit=crop&w=900&q=80", "imageAlt": "..." },
          { "title": "...", "description": "...", "imageUrl": "https://images.unsplash.com/photo-{ID}?auto=format&fit=crop&w=900&q=80", "imageAlt": "..." },
          { "title": "...", "description": "...", "imageUrl": "https://images.unsplash.com/photo-{ID}?auto=format&fit=crop&w=900&q=80", "imageAlt": "..." }
        ]
      }
    },
    {
      "type": "FooterMinimal",
      "props": {
        "id": "footer-1",
        "brandName": "...",
        "email": "...",
        "address": "..."
      }
    }
  ]
}

RULES:
1. Do NOT invent addresses, phone numbers, or statistics. If not provided, leave them empty or omit them.
2. Use these exact Unsplash IDs based on the industry:
   - Tech/Law: 1497366216548-37526070297c, 1497366811353-6870744d04b2, 1451187580459-43490279c0fa
   - Gym/Spa: 1534438327276-14e5300c3a48, 1540555700478-4be289fbecef, 1570172619644-dfd03ed5d881
   - Bakery/Food: 1509440159596-0249088772ff, 1555507036-ab1f4038808a, 1517433670267-08bbd4be890f
3. Keep descriptions under 15 words.
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
      max_tokens: 4000,
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
      return NextResponse.json({ error: "The AI generated invalid data structure. Please try again." }, { status: 500 });
    }
    return NextResponse.json({ error: error.message || "Failed to generate." }, { status: 500 });
  }
}
