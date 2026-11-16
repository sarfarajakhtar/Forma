"use client";
import { useState } from "react";
import { Navbar, Hero, BentoGrid, Timeline, AsymmetricAbout, FullWidthCTA, Testimonial, Footer } from "../components/Engine";

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
    const type = (section.type || "").toLowerCase();
    const props = { key: index, data: section.props, theme: blueprint?.theme || 'gym' };

    switch (type) {
      case "hero": return <Hero {...props} />;
      case "bentogrid": return <BentoGrid {...props} />;
      case "timeline": return <Timeline {...props} />;
      case "asymmetricabout": return <AsymmetricAbout {...props} />;
      case "fullwidthcta": return <FullWidthCTA {...props} />;
      case "testimonial": return <Testimonial {...props} />;
      case "footer": return <Footer {...props} />;
      default: return null;
    }
  };

  if (blueprint) {
    const sections = Array.isArray(blueprint.sections) ? blueprint.sections : [];
    return (
      <div className={`relative min-h-screen ${blueprint.theme === 'spa' ? 'bg-[#f8f6f0]' : 'bg-[#0a0a0a]'}`}>
        <style dangerouslySetInnerHTML={{__html: `
          @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Inter:wght@300;400;500;600&display=swap');
          .font-gym { font-family: 'Oswald', sans-serif; }
          .font-spa { font-family: 'Cormorant Garamond', serif; }
          .font-sans { font-family: 'Inter', sans-serif; }
          .font-serif { font-family: 'Cormorant Garamond', serif; }
        `}} />
        
        <Navbar theme={blueprint.theme} />
        <main>
          {sections.map((section: any, i: number) => renderSection(section, i))}
          {/* Ensure CTA is always added before footer if AI forgets */}
          {!sections.find(s => s.type.toLowerCase() === 'fullwidthcta') && <FullWidthCTA data={{}} theme={blueprint.theme} />}
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
