/**
 * Accounting preflight for the first paid art-direction experiment.
 * It is NOT a provider-side spending cap or a durable concurrency lock.
 * No paid calls must be made unless the external workspace budget is verified.
 */
export const FIRST_EXPERIMENT = Object.freeze({
  authorizedUsd: 2,
  model: "claude-sonnet-4-6",
  // Published base token pricing in USD per million tokens (verify immediately before execution).
  inputUsdPerMillion: 3,
  outputUsdPerMillion: 15,
  conservativeInputTokenCeiling: 12000,
  outputTokenLimit: 4096,
  permittedRequests: 1,
  permittedRetries: 0,
  providerBudgetVerified: false,
  // Explicitly fail closed; never use this flag to authorize requests on its own.
  enabled: false,
});
export function theoreticalTokenCostCeiling(
  inputTokenCeiling: number,
  outputTokenCeiling: number,
  inputUsdPerMillion: number,
  outputUsdPerMillion: number,
) {
  if (![inputTokenCeiling,outputTokenCeiling,inputUsdPerMillion,outputUsdPerMillion]
    .every(v => Number.isFinite(v) && v >= 0)) throw new Error("Invalid cost input");
  return (inputTokenCeiling * inputUsdPerMillion + outputTokenCeiling * outputUsdPerMillion) / 1_000_000;
}
export function evaluateExperimentBudget() {
  const c = FIRST_EXPERIMENT;
  const plannedUsd = theoreticalTokenCostCeiling(
    c.conservativeInputTokenCeiling, c.outputTokenLimit, c.inputUsdPerMillion, c.outputUsdPerMillion
  );
  return {
    authorizedUsd: c.authorizedUsd,
    plannedTokenCostCeilingUsd: plannedUsd,
    headroomUsd: c.authorizedUsd - plannedUsd,
    externalBudgetVerified: c.providerBudgetVerified,
    executeAllowed: c.enabled && c.providerBudgetVerified && plannedUsd <= c.authorizedUsd,
    note: "Token arithmetic is an estimate; provider billing and accounting may differ. An independent external hard cap and durable one-use ledger are mandatory.",
  };
}
