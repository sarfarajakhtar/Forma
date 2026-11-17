import { IntakeSchema, type FormaIntake } from "./contracts";

/**
 * The no-spend gate deliberately refuses every paid generation request.
 * To run a paid experiment, a future approved implementation must replace
 * this guard with authenticated per-user quotas, persistent atomic spend
 * reservations, idempotency, abuse controls and a hard provider cap.
 */
export class GenerationDisabledError extends Error {
  constructor() {
    super("Paid AI generation is disabled. This lab has no active model connector.");
  }
}

export function checkGenerationGate(input: unknown): FormaIntake {
  const parsed = IntakeSchema.parse(input);
  void parsed;
  throw new GenerationDisabledError();
}
