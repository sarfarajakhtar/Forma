import { ArtDirectionSchema, IntakeSchema } from "./contracts";
import { ART_DIRECTOR_SYSTEM_PROMPT } from "./art-director-prompt";
import { evaluateExperimentBudget, FIRST_EXPERIMENT } from "./budget";

/**
 * Server-side one-shot art-direction runner; not connected to an HTTP route.
 * Fail-closed until isolated preview, one-use durable Redis lock, and explicit
 * server-side enable flag are configured. Never return secrets to callers.
 *
 * Lock is claimed BEFORE calling Anthropic. Failed requests burn the one
 * opportunity; there is deliberately no retry/refund/reset path.
 */
export type RunDependencies = {
  env: Record<string, string | undefined>;
  fetcher: typeof fetch;
};

export class PreflightError extends Error {
  constructor(message: string) { super(message); this.name = "PreflightError"; }
}
export function preflightOneShot(env: Record<string, string | undefined>) {
  const issues: string[] = [];
  if (env.FORMA_ONE_SHOT_ENABLED !== "yes-one-salon") issues.push("execution disabled");
  if (env.VERCEL_ENV !== "preview") issues.push("preview deployment required");
  if (env.VERCEL_GIT_COMMIT_REF !== "experiment/ai-generation-gate") issues.push("wrong branch");
  if (!env.FORMA_QUALITY_API_KEY?.startsWith("sk-ant-")) issues.push("dedicated Anthropic key missing");
  if (!env.FORMA_LEDGER_REST_URL?.startsWith("https://")) issues.push("durable ledger URL missing");
  if (!env.FORMA_LEDGER_REST_TOKEN) issues.push("durable ledger token missing");
  if (env.FORMA_PROVIDER_BUDGET_CONFIRMED !== "yes-2-usd") issues.push("provider workspace cap unconfirmed");
  if (!evaluateExperimentBudget().plannedTokenCostCeilingUsd || FIRST_EXPERIMENT.authorizedUsd !== 2)
    issues.push("invalid model budget");
  return { ready: issues.length === 0, issues };
}

const CLAIM_KEY = "forma:quality-lab:art-direction:salon:one-request:v1";
const PREFIX = "Bearer ";

function singleSalonBrief() {
  return IntakeSchema.parse({
    industry: "salon",
    description: "Glow is a premium beauty salon in Muscat, Oman. We offer hair styling, facials, nails and bridal makeup. We want a luxurious, modern website with beautiful photography and WhatsApp booking.",
    answers: {
      services: ["Hair styling", "Facials", "Nails", "Bridal makeup"],
      style: ["Quiet luxury"],
      booking: ["WhatsApp", "Booking form"]
    },
    suppliedBusinessFacts: null,
  });
}

function extractJSON(raw: string): unknown {
  // Parse strict, not a greedy regex extracting arbitrary text
  return JSON.parse(raw);
}

export async function executeOneSalonArtDirection({ env, fetcher }: RunDependencies) {
  const gate = preflightOneShot(env);
  if (!gate.ready) throw new PreflightError(gate.issues.join("; "));
  const endpoint = env.FORMA_LEDGER_REST_URL!.replace(/\/$/, "");
  const auth = PREFIX + env.FORMA_LEDGER_REST_TOKEN!;
  // Reserve the single-use claim atomically in durable storage.
  // Redis REST supports SET key value NX. Never use a TTL: an expired
  // reservation could permit another paid request.
  const reservation = await fetcher(endpoint + "/set/" + encodeURIComponent(CLAIM_KEY) + "/claimed/NX", {
    method: "POST", headers: { Authorization: auth }, redirect: "error", signal: AbortSignal.timeout(8000),
  });
  if (!reservation.ok) throw new PreflightError("Could not claim durable one-shot ledger");
  const claim = await reservation.json() as { result?: string | null };
  if (claim.result !== "OK") throw new PreflightError("One-shot request already consumed");

  const response = await fetcher("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": env.FORMA_QUALITY_API_KEY!,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    redirect: "error",
    signal: AbortSignal.timeout(55000),
    body: JSON.stringify({
      model: FIRST_EXPERIMENT.model,
      max_tokens: FIRST_EXPERIMENT.outputTokenLimit,
      temperature: 0.4,
      system: ART_DIRECTOR_SYSTEM_PROMPT +
        "\nIMPORTANT: Return a single plain JSON object, no code fences. " +
        "Keys: concept, audience, differentiation, visualNarrative, typographyDirection, " +
        "compositionStrategy, desktopStrategy, mobileStrategy, mediaBriefs, sections, forbiddenClaims.",
      messages: [{
        role: "user",
        content: "Create one original art-direction blueprint from this customer's information. Do not invent any business facts.\n" +
          JSON.stringify(singleSalonBrief()),
      }],
    }),
  });
  if (!response.ok) throw new PreflightError("Model returned HTTP " + response.status + " (one-shot spent; no retry)");
  const result = await response.json() as {
    content?: Array<{type: string; text?: string}>;
    usage?: {input_tokens?: number;output_tokens?: number};
    id?: string;
  };
  const raw = result.content?.find(x => x.type === "text")?.text;
  if (!raw) throw new PreflightError("No model text returned (one-shot spent)");
  let parsed: unknown;
  try {parsed = extractJSON(raw);} catch {throw new PreflightError("Invalid JSON from model (one-shot spent)");}
  const validated = ArtDirectionSchema.safeParse(parsed);
  if (!validated.success) {
    throw new PreflightError("Model output failed strict art-direction validation (one-shot spent)");
  }
  const usage = result.usage ?? {};
  const approxCostUsd = (
    (usage.input_tokens ?? 0) * FIRST_EXPERIMENT.inputUsdPerMillion +
    (usage.output_tokens ?? 0) * FIRST_EXPERIMENT.outputUsdPerMillion
  ) / 1_000_000;
  return { blueprint: validated.data, requestId: result.id ?? null,
    usage: { inputTokens: usage.input_tokens ?? null, outputTokens: usage.output_tokens ?? null },
    estimatedBaseTokenCostUsd: approxCostUsd,
    caveat: "Cost estimate excludes other billing adjustments; check provider usage for actual charges." };
}
