import { z } from "zod";

const shortText = z.string().trim().min(1).max(400);
const safeContact = z.string().trim().max(500);

export const IntakeSchema = z.object({
  industry: z.enum(["salon", "restaurant", "it"]),
  description: z.string().trim().min(20).max(4000),
  answers: z.record(z.array(z.string().trim().min(1).max(120)).max(12)),
  suppliedBusinessFacts: safeContact.nullable(),
}).strict();

export const ArtDirectionSchema = z.object({
  concept: shortText,
  audience: shortText,
  differentiation: shortText,
  visualNarrative: shortText,
  typographyDirection: shortText,
  compositionStrategy: shortText,
  desktopStrategy: shortText,
  mobileStrategy: shortText,
  mediaBriefs: z.array(z.object({
    role: z.enum(["hero", "editorial", "service", "detail", "video"]),
    description: shortText,
    source: z.enum(["verified-business-upload", "licensed-stock", "ai-concept"]),
    realBusinessRepresentation: z.boolean(),
  }).strict()).min(1).max(12),
  sections: z.array(z.object({
    purpose: shortText,
    composition: shortText,
    requiredFacts: z.array(shortText).max(15),
  }).strict()).min(3).max(14),
  forbiddenClaims: z.array(shortText).max(20),
}).strict();

export type FormaIntake = z.infer<typeof IntakeSchema>;
export type FormaArtDirection = z.infer<typeof ArtDirectionSchema>;

/** Content used for drafting; never treat unverified fields as customer facts. */
export function safeFacts(input: FormaIntake) {
  return {
    suppliedDescription: input.description,
    selectedAnswers: input.answers,
    confirmedAdditionalFacts: input.suppliedBusinessFacts ?? "",
  };
}
