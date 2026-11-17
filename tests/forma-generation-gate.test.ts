import assert from "node:assert/strict";
import { test } from "node:test";
import { IntakeSchema, ArtDirectionSchema } from "../lib/forma-generation/contracts";
import { checkGenerationGate, GenerationDisabledError } from "../lib/forma-generation/guard";

const validIntake = {
  industry: "salon",
  description: "Glow is a premium beauty salon located in Muscat, Oman.",
  answers: { services: ["Hair", "Nails"], style: ["Quiet luxury"] },
  suppliedBusinessFacts: null,
};

test("accepts bounded guided customer brief", () => {
  assert.equal(IntakeSchema.safeParse(validIntake).success, true);
});
test("rejects arbitrary unknown customer fields", () => {
  assert.equal(IntakeSchema.safeParse({ ...validIntake, apiKey: "do-not-store" }).success, false);
});
test("rejects empty or short briefs", () => {
  assert.equal(IntakeSchema.safeParse({ ...validIntake, description: "salon" }).success, false);
});
test("paid model access always refused by prototype gate", () => {
  assert.throws(() => checkGenerationGate(validIntake), GenerationDisabledError);
});
test("rejects undefined visual composition plans", () => {
  assert.equal(ArtDirectionSchema.safeParse({ concept: "beautiful website", sections: [] }).success, false);
});
test("requires distinct desktop and mobile strategies", () => {
  const sample = {
    concept: "Considered beauty", audience: "Premium local clients",
    differentiation: "Calm editorial experience",
    visualNarrative: "Warm, tactile, composed imagery", typographyDirection: "Expressive serif and quiet body",
    compositionStrategy: "Asymmetric image-led opening and generous editorial sections",
    desktopStrategy: "Offset columns and negative space", mobileStrategy: "Reart-directed image crops and single column text",
    mediaBriefs: [{role:"hero", description:"Warm abstract beauty interior",source:"licensed-stock",realBusinessRepresentation:false}],
    sections: [
      {purpose:"Story",composition:"Offset photography",requiredFacts:[]},
      {purpose:"Services",composition:"Image editorial",requiredFacts:["Verified services"]},
      {purpose:"Contact",composition:"Minimal form",requiredFacts:["Verified contact route"]}
    ],
    forbiddenClaims:["invented reviews"],
  };
  assert.equal(ArtDirectionSchema.safeParse(sample).success, true);
  assert.equal(ArtDirectionSchema.safeParse({ ...sample, mobileStrategy: undefined }).success, false);
});
