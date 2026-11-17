import assert from "node:assert/strict";
import { test } from "node:test";
import { FIRST_EXPERIMENT, theoreticalTokenCostCeiling, evaluateExperimentBudget } from "../lib/forma-generation/budget";

test("first experiment is disabled and fail-closed", () => {
  const c = evaluateExperimentBudget();
  assert.equal(c.executeAllowed, false);
  assert.equal(c.externalBudgetVerified, false);
  assert.equal(FIRST_EXPERIMENT.permittedRetries, 0);
  assert.equal(FIRST_EXPERIMENT.permittedRequests, 1);
});
test("proposed token ceiling fits the authorized budget on published base rates", () => {
  const c = evaluateExperimentBudget();
  assert.ok(c.plannedTokenCostCeilingUsd > 0);
  assert.ok(c.plannedTokenCostCeilingUsd < 2);
});
test("rejects invalid negative or nonfinite cost inputs", () => {
  assert.throws(() => theoreticalTokenCostCeiling(-1,100,3,15));
  assert.throws(() => theoreticalTokenCostCeiling(Infinity,100,3,15));
});
test("large outputs are appropriately flagged by arithmetic", () => {
  assert.ok(theoreticalTokenCostCeiling(12000,1_000_000,3,15) > FIRST_EXPERIMENT.authorizedUsd);
});
