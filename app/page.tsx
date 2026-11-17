"use client";
import { useState } from "react";
import { Navbar, Hero, Marquee, AsymmetricAbout, BentoGrid, Timeline, FullWidthCTA, Footer } from "../components/Engine";

export default function Home() {
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
    // Force the exact visual rhythm, ignoring the AI's order if it hallucinated.
    const fixedOrder = ["hero", "marquee", "asymmetricabout", "bentogrid", "timeline", "fullwidthcta", "footer"];
    
    // Map through our fixed order and find the matching section from the AI's JSON
    const sortedSections = fixedOrder.map(type => {
      return blueprint.sections.find((s: any) => s.type.toLowerCase() === type) || null;
    }).filter(Boolean);

    return (
      <div className="relative min-h-screen bg-[#050505]">
        <style dangerouslySetInnerHTML={{__html: `
          @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;700&family=Inter:wght@300;400;500;600&display=swap');
          .font-sans { font-family: 'Oswald', 'Inter', sans-serif; }
        `}} />
        
        <Navbar theme={blueprint.theme} />
        <main>
          {sortedSections.map((section: any, i: number) => {
            const props = { key: i, data: section.props, theme: blueprint.theme };
            switch (section.type.toLowerCase()) {
              case "hero": return <Hero {...props} />;
              case "marquee": return <Marquee {...props} />;
              case "asymmetricabout": return <AsymmetricAbout {...props} />;
              case "bentogrid": return <BentoGrid {...props} />;
              case "timeline": return <Timeline {...props} />;
              case "fullwidthcta": return <FullWidthCTA {...props} />;
              case "footer": return <Footer {...props} />;
              default: return null;
            }
          })}
        </main>
        
        <button 
          onClick={() => setBlueprint(null)}
          className="fixed bottom-6 right-6 bg-white text-black px-6 py-3 rounded-full text-sm font-bold shadow-2xl hover:bg-gray-200 transition-colors z-50"
        >
          ← Generate Another
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-6 font-sans">
      <div className="max-w-2xl w-full">
        <h1 className="text-4xl font-semibold mb-2 text-white">Forma Engine</h1>
        <p className="text-neutral-400 mb-8 text-lg">Generate an elite, art-directed website.</p>
        <textarea
          className="block w-full h-48 p-6 border border-neutral-700 rounded-none focus:outline-none focus:border-lime-400 bg-black text-white mb-6 text-lg shadow-sm"
          placeholder="Describe your business..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          onClick={generate}
          disabled={loading || description.length < 20}
          className="bg-lime-400 text-black px-8 py-4 font-bold uppercase tracking-widest transition-colors disabled:opacity-50 w-full text-sm shadow-lg hover:bg-white"
        >
          {loading ? "Assembling Website..." : "Generate Website"}
        </button>
        {error && <div className="mt-6 p-4 bg-red-900/50 text-red-200 border border-red-700 rounded-none">{error}</div>}
      </div>
    </div>
  );
}
