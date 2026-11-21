"use client";
import { useState } from "react";
import { Render } from "@puckeditor/core";
import { puckConfig } from "../../lib/puck/registry";

export default function TestAIPage() {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [blueprint, setBlueprint] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  async function generate() {
    setLoading(true);
    setError(null);
    setBlueprint(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to generate.");
      setBlueprint(data.blueprint);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (blueprint) {
    return (
      <div className="relative w-full min-h-screen">
        <Render config={puckConfig} data={blueprint} />
        <button 
          onClick={() => setBlueprint(null)}
          className="fixed bottom-6 right-6 bg-black text-white px-6 py-3 rounded-full text-sm font-bold shadow-2xl hover:bg-gray-800 transition-colors z-50"
        >
          ← Generate Another
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-6 font-sans">
      <div className="max-w-2xl w-full">
        <h1 className="text-3xl font-bold mb-2 text-neutral-900">Forma AI Engine Test</h1>
        <p className="text-neutral-600 mb-8">Powered by Puck & Zod Validation.</p>
        <textarea
          className="block w-full h-40 p-6 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 bg-white mb-6 text-lg shadow-sm"
          placeholder="Describe your business... (e.g. A luxury gym in NY called Iron & Oak)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          onClick={generate}
          disabled={loading || description.length < 20}
          className="bg-black text-white px-8 py-4 rounded-xl font-medium hover:bg-neutral-800 transition-colors disabled:opacity-50 w-full text-lg shadow-lg"
        >
          {loading ? "Assembling Website..." : "Generate Website"}
        </button>
        {error && <div className="mt-6 p-4 bg-red-50 text-red-700 border border-red-200 rounded-xl">{error}</div>}
      </div>
    </div>
  );
}
