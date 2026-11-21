import { test } from "node:test";
import assert from "node:assert";
import { parsePuckBlueprint } from "../lib/puck/blueprint";
import { sampleBlueprint } from "../lib/puck/sample";

test("valid fixture passes full-page validation", () => {
  const result = parsePuckBlueprint(sampleBlueprint);
  assert.ok(result);
});

test("invalid email is rejected", () => {
  const invalid = JSON.parse(JSON.stringify(sampleBlueprint));
  invalid.content[2].props.email = "not-an-email";
  assert.throws(() => parsePuckBlueprint(invalid));
});

test("unknown component is rejected", () => {
  const invalid = JSON.parse(JSON.stringify(sampleBlueprint));
  invalid.content[0].type = "UnknownComponent";
  assert.throws(() => parsePuckBlueprint(invalid));
});

test("duplicate component ID is rejected", () => {
  const invalid = JSON.parse(JSON.stringify(sampleBlueprint));
  invalid.content[1].props.id = "hero-demo-1";
  assert.throws(() => parsePuckBlueprint(invalid));
});

test("invented-required email is not necessary", () => {
  const valid = JSON.parse(JSON.stringify(sampleBlueprint));
  delete valid.content[2].props.email;
  assert.doesNotThrow(() => parsePuckBlueprint(valid));
});
