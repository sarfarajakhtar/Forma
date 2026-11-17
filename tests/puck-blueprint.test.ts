import assert from "node:assert/strict";
import { test } from "node:test";
import { parsePuckBlueprint, PageBlueprintSchema } from "../lib/puck/blueprint";
import { sampleBlueprint } from "../lib/puck/sample";

test("valid fixture passes full-page validation", () => {
  assert.equal(PageBlueprintSchema.safeParse(sampleBlueprint).success, true);
  assert.equal(parsePuckBlueprint(sampleBlueprint).content.length, 3);
});

test("invalid email is rejected", () => {
  const invalid: any = structuredClone(sampleBlueprint);
  invalid.content[2].props.email = "not-an-email";
  assert.equal(PageBlueprintSchema.safeParse(invalid).success, false);
});

test("unknown component is rejected", () => {
  const invalid: any = structuredClone(sampleBlueprint);
  invalid.content[0].type = "MadeUpHero";
  assert.equal(PageBlueprintSchema.safeParse(invalid).success, false);
});

test("duplicate component ID is rejected", () => {
  const invalid: any = structuredClone(sampleBlueprint);
  invalid.content[2].props.id = "hero-demo-1";
  assert.equal(PageBlueprintSchema.safeParse(invalid).success, false);
});

test("unsafe links are rejected", () => {
  const invalid: any = structuredClone(sampleBlueprint);
  invalid.content[0].props.ctaHref = "javascript:alert(1)";
  assert.equal(PageBlueprintSchema.safeParse(invalid).success, false);
});

test("invented-required email is not necessary", () => {
  assert.equal(PageBlueprintSchema.safeParse(sampleBlueprint).success, true);
});
