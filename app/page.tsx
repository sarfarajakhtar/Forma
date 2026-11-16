"use client";
import { useState } from "react";
import { Navbar, Hero, OverlappingStats, AsymmetricAbout, BentoGrid, Gallery, EditorialList, FAQ, Testimonial, Footer } from "../components/Engine";

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
    const props = { key: index, data: section.props, theme: blueprint?.theme || 'spa' };

    switch (type) {
      case "hero": return <Hero {...props} />;
      case "overlappingstats": return <OverlappingStats {...props} />;
      case "asymmetricabout": return <AsymmetricAbout {...props} />;
      case "bentogrid": return <BentoGrid {...props} />;
      case "gallery": return <Gallery {...props} />;
      case "editoriallist": return <EditorialList {...props} />;
      case "faq": return <FAQ {...props} />;
      case "testimonial": return <Testimonial {...props} />;
      case "footer": return <Footer {...props} />;
      default: return null;
    }
  };

  if (blueprint) {
    const sections = Array.isArray(blueprint.sections) ? blueprint.sections : [];
    return (
      <div className={`relative min-h-screen ${blueprint.theme === 'spa' ? 'bg-[#f8f6f0]' : 'bg-[#111]'}`}>
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
        </main>
        
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
        <h1 className="text-4xl font-semibold mb-2 text-neutral-900">Forma Engine</h1>
        <p className="text-neutral-600 mb-8 text-lg">Generate an elite website from a prompt.</p>
        <textarea
          className="block w-full h-48 p-6 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 bg-white mb-6 text-lg shadow-sm"
          placeholder="Describe your business... (e.g. A luxury medical spa in Austin called Lumina. Offers Botox, fillers, and laser. Vibe is calm, elegant, 5-star hotel.)"
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
