import assert from "node:assert/strict";
import { test } from "node:test";
import { preflightOneShot, executeOneSalonArtDirection, PreflightError } from "../lib/forma-generation/one-shot-runner";

const safeEnv = {
  FORMA_ONE_SHOT_ENABLED: "yes-one-salon",
  VERCEL_ENV: "preview",
  VERCEL_GIT_COMMIT_REF: "experiment/ai-generation-gate",
  FORMA_QUALITY_API_KEY: "sk-ant-test-key-do-not-use",
  FORMA_LEDGER_REST_URL: "https://ledger.example.test",
  FORMA_LEDGER_REST_TOKEN: "test-only",
  FORMA_PROVIDER_BUDGET_CONFIRMED: "yes-2-usd",
};
test("fails closed with missing credentials and enable flag", () => {
  const result = preflightOneShot({});
  assert.equal(result.ready, false);
  assert.ok(result.issues.includes("execution disabled"));
});
test("rejects running from production even if other flags exist", () => {
  assert.equal(preflightOneShot({...safeEnv, VERCEL_ENV:"production"}).ready, false);
});
test("rejects incorrect experimental branch", () => {
  assert.equal(preflightOneShot({...safeEnv, VERCEL_GIT_COMMIT_REF:"main"}).ready, false);
});
test("refuses duplicate paid requests before provider call", async () => {
  let calls = 0, modelCalls = 0;
  const fakeFetch = (async (url: string) => {
    calls++;
    if (url.startsWith("https://api.anthropic.com")) modelCalls++;
    return {ok:true,json:async () => ({result:null})} as Response;
  }) as typeof fetch;
  await assert.rejects(() => executeOneSalonArtDirection({env:safeEnv,fetcher:fakeFetch}), PreflightError);
  assert.equal(calls,1);
  assert.equal(modelCalls,0);
});
test("refuses if durable ledger is unreachable", async () => {
  const fakeFetch = (async () => ({ok:false}) as Response) as typeof fetch;
  await assert.rejects(() => executeOneSalonArtDirection({env:safeEnv,fetcher:fakeFetch}),PreflightError);
});
test("never calls provider when safety preflight fails", async () => {
  let called = false;
  const fakeFetch = (async () => {called = true; throw Error("not expected");}) as typeof fetch;
  await assert.rejects(() => executeOneSalonArtDirection({env:{},fetcher:fakeFetch}),PreflightError);
  assert.equal(called,false);
});
