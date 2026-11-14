"use client";
import { useState } from "react";
import { Hero, Stats, AsymmetricAbout, BentoGrid, EditorialList, Testimonial, FullWidthCTA, Footer } from "../components/Engine";

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

  const renderSection = (section: any, index: number) => {
    if (!section || !section.props) return null;
    const props = { key: index, data: section.props, theme: blueprint?.theme || 'spa' };
    switch (section.type) {
      case "Hero": return <Hero {...props} />;
      case "Stats": return <Stats {...props} />;
      case "AsymmetricAbout": return <AsymmetricAbout {...props} />;
      case "BentoGrid": return <BentoGrid {...props} />;
      case "EditorialList": return <EditorialList {...props} />;
      case "Testimonial": return <Testimonial {...props} />;
      case "FullWidthCTA": return <FullWidthCTA {...props} />;
      case "Footer": return <Footer {...props} />;
      default: return null;
    }
  };

  if (blueprint) {
    const sections = Array.isArray(blueprint.sections) ? blueprint.sections : [];
    return (
      <main className={`antialiased overflow-x-hidden selection:bg-black selection:text-white ${blueprint.theme === 'spa' ? 'bg-[#f8f6f0]' : 'bg-[#111]'}`}>
        <style dangerouslySetInnerHTML={{__html: `
          @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Inter:wght@300;400;500;600&display=swap');
          .font-gym { font-family: 'Oswald', sans-serif; }
          .font-spa { font-family: 'Cormorant Garamond', serif; }
          .font-sans { font-family: 'Inter', sans-serif; }
        `}} />
        {sections.map((section: any, i: number) => renderSection(section, i))}
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 flex items-center justify-center p-6 font-sans">
      <div className="max-w-2xl w-full">
        <h1 className="text-3xl font-semibold mb-2">Forma Engine</h1>
        <p className="text-neutral-600 mb-8">Generate an elite website from a prompt.</p>
        <textarea
          className="block w-full h-40 p-6 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 bg-white mb-6 text-lg shadow-sm"
          placeholder="Describe your business..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          onClick={generate}
          disabled={loading || description.length < 20}
          className="bg-neutral-900 text-white px-8 py-4 rounded-xl font-medium hover:bg-neutral-700 transition-colors disabled:opacity-50 w-full text-lg shadow-lg"
        >
          {loading ? "Assembling Website..." : "Generate Website"}
        </button>
        {error && <div className="mt-6 p-4 bg-red-50 text-red-700 border border-red-200 rounded-xl">{error}</div>}
      </div>
    </div>
  );
}
