"use client";

import { useState } from "react";

export default function Home() {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [html, setHtml] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function generate() {
    setLoading(true);
    setError(null);
    setHtml(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description }),
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to generate.");
      
      setHtml(data.html);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <div className="max-w-3xl mx-auto p-8">
        <h1 className="text-3xl font-semibold mb-2">Forma</h1>
        <p className="text-neutral-600 mb-8">AI website generator with elite design constraints.</p>
        
        <textarea
          className="block w-full h-32 p-4 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 bg-white mb-4"
          placeholder="Describe your business... (e.g. A specialty coffee roaster in Lisbon called Fábrica.)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        
        <button 
          onClick={generate}
          disabled={loading || description.length < 20}
          className="bg-neutral-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-neutral-700 transition-colors disabled:opacity-50"
        >
          {loading ? "Generating... (Please wait 30-60s)" : "Generate Website"}
        </button>

        {error && (
          <div className="mt-4 p-4 bg-red-50 text-red-700 border border-red-200 rounded-lg">
            {error}
          </div>
        )}

        {html && (
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Live Preview</h2>
              <a 
                href={URL.createObjectURL(new Blob([html], { type: "text/html" }))} 
                target="_blank" 
                rel="noreferrer"
                className="text-sm text-blue-600 hover:underline"
              >
                Open in new tab
              </a>
            </div>
            <iframe
              srcDoc={html}
              className="w-full h-[800px] border border-neutral-300 rounded-xl bg-white shadow-sm"
              sandbox="allow-scripts allow-same-origin"
            />
          </div>
        )}
      </div>
    </div>
  );
}
