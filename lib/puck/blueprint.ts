import { z } from "zod";

const nonEmpty = z.string().trim().min(1).max(300);
const imageUrl = z.string().url().refine((url) => {
  try { return new URL(url).protocol === "https:"; } catch { return false; }
}, "Only HTTPS image URLs are permitted");
const ctaHref = z.string().refine(
  (value) => /^#[a-zA-Z][\w-]*$/.test(value) || /^https:\/\//i.test(value),
  "Use a safe section anchor or HTTPS link"
);

// --- 1. Original Schemas ---
export const HeroImageSchema = z.object({
  id: nonEmpty,
  headline: nonEmpty,
  subheadline: z.string().max(1000),
  imageUrl,
  imageAlt: z.string().max(200),
  ctaText: nonEmpty,
  ctaHref,
}).strict();

export const FeaturesBentoSchema = z.object({
  id: nonEmpty,
  title: nonEmpty,
  items: z.array(z.object({
    title: nonEmpty,
    description: z.string().max(600),
    imageUrl,
    imageAlt: z.string().max(200),
  }).strict()).min(3).max(6),
}).strict();

export const FooterMinimalSchema = z.object({
  id: nonEmpty,
  brandName: nonEmpty,
  email: z.union([z.string().email(), z.literal("")]).default(""),
  address: z.string().max(300).optional(),
}).strict();

// --- 2. NEW ELITE SCHEMAS ---
export const HeroSplitSchema = z.object({
  id: nonEmpty,
  headline: nonEmpty,
  subheadline: z.string().max(1000),
  imageUrl,
  imageAlt: z.string().max(200),
  ctaText: nonEmpty,
  ctaHref,
}).strict();

export const FeaturesTimelineSchema = z.object({
  id: nonEmpty,
  title: nonEmpty,
  items: z.array(z.object({
    num: z.string().max(10),
    title: nonEmpty,
    description: z.string().max(600),
  }).strict()).min(3).max(4),
}).strict();

export const TestimonialSplitSchema = z.object({
  id: nonEmpty,
  quote: z.string().min(10).max(1000),
  author: nonEmpty,
  imageUrl,
  imageAlt: z.string().max(200),
}).strict();

// --- 3. Update the Master Blueprint ---
export const PageBlueprintSchema = z.object({
  root: z.object({ props: z.object({}).passthrough() }).strict(),
  content: z.array(z.discriminatedUnion("type", [
    z.object({ type: z.literal("HeroImage"), props: HeroImageSchema }).strict(),
    z.object({ type: z.literal("HeroSplit"), props: HeroSplitSchema }).strict(),
    z.object({ type: z.literal("FeaturesBento"), props: FeaturesBentoSchema }).strict(),
    z.object({ type: z.literal("FeaturesTimeline"), props: FeaturesTimelineSchema }).strict(),
    z.object({ type: z.literal("TestimonialSplit"), props: TestimonialSplitSchema }).strict(),
    z.object({ type: z.literal("FooterMinimal"), props: FooterMinimalSchema }).strict(),
  ])).min(1).max(20),
  zones: z.record(z.array(z.never())).default({}),
}).strict().superRefine((data, ctx) => {
  const seen = new Set<string>();
  data.content.forEach((block, index) => {
    if (seen.has(block.props.id)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["content", index, "props", "id"], message: "Duplicate block ID" });
    }
    seen.add(block.props.id);
  });
});

export function parsePuckBlueprint(value: unknown) {
  return PageBlueprintSchema.parse(value);
}
