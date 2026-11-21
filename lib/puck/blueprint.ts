import { z } from "zod";

const nonEmpty = z.string().trim().min(1).max(300);
const imageUrl = z.string().url().refine((url) => {
  try { return new URL(url).protocol === "https:"; } catch { return false; }
}, "Only HTTPS image URLs are permitted");

export const HeroCinematicSchema = z.object({
  id: nonEmpty,
  headline: nonEmpty,
  subheadline: z.string().max(1000),
  imageUrl,
  ctaText: nonEmpty,
}).strict();

export const HeroSplitSchema = z.object({
  id: nonEmpty,
  headline: nonEmpty,
  subheadline: z.string().max(1000),
  imageUrl,
  ctaText: nonEmpty,
}).strict();

export const FeaturesBentoSchema = z.object({
  id: nonEmpty,
  title: nonEmpty,
  items: z.array(z.object({
    title: nonEmpty,
    description: z.string().max(600),
    imageUrl,
  }).strict()).min(3).max(6),
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

export const FooterMinimalSchema = z.object({
  id: nonEmpty,
  brandName: nonEmpty,
  email: z.union([z.string().email(), z.literal("")]).default(""),
  address: z.string().max(300).optional(),
}).strict();

export const PageBlueprintSchema = z.object({
  root: z.object({ props: z.object({}).passthrough() }).strict(),
  content: z.array(z.discriminatedUnion("type", [
    z.object({ type: z.literal("HeroCinematic"), props: HeroCinematicSchema }).strict(),
    z.object({ type: z.literal("HeroSplit"), props: HeroSplitSchema }).strict(),
    z.object({ type: z.literal("FeaturesBento"), props: FeaturesBentoSchema }).strict(),
    z.object({ type: z.literal("FeaturesTimeline"), props: FeaturesTimelineSchema }).strict(),
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
