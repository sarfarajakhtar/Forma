"use client";
import { useState } from "react";
import { Hero, Stats, AsymmetricAbout, BentoGrid, EditorialList, Testimonial, FullWidthCTA, Footer } from "../components/Engine";

export default function Home() {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [blueprint, setBlueprint] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [showDebug, setShowDebug] = useState(false);

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
      case "stats": return <Stats {...props} />;
      case "asymmetricabout": return <AsymmetricAbout {...props} />;
      case "bentogrid": return <BentoGrid {...props} />;
      case "editoriallist": return <EditorialList {...props} />;
      case "testimonial": return <Testimonial {...props} />;
      case "fullwidthcta": return <FullWidthCTA {...props} />;
      case "footer": return <Footer {...props} />;
      default: return null;
    }
  };

  if (blueprint) {
    const sections = Array.isArray(blueprint.sections) ? blueprint.sections : [];

    return (
      <div className={`relative antialiased overflow-x-hidden selection:bg-black selection:text-white ${blueprint.theme === 'spa' ? 'bg-[#f8f6f0]' : 'bg-[#111]'}`}>
        <style dangerouslySetInnerHTML={{__html: `
          @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Inter:wght@300;400;500;600&display=swap');
          .font-gym { font-family: 'Oswald', sans-serif; }
          .font-spa { font-family: 'Cormorant Garamond', serif; }
          .font-sans { font-family: 'Inter', sans-serif; }
        `}} />
        
        <main>
          {sections.map((section: any, i: number) => renderSection(section, i))}
        </main>

        <button 
          onClick={() => setShowDebug(!showDebug)} 
          className="fixed bottom-4 right-4 bg-black text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg z-50 hover:bg-gray-800"
        >
          {showDebug ? "Hide JSON" : "View JSON Data"}
        </button>

        {showDebug && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6 overflow-auto">
            <div className="bg-white p-6 rounded-xl max-w-4xl w-full max-h-[80vh] flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">AI Blueprint Data</h2>
                <button onClick={() => setShowDebug(false)} className="text-red-500 font-bold">Close</button>
              </div>
              <pre className="bg-gray-100 p-4 rounded text-xs overflow-auto flex-1">
                {JSON.stringify(blueprint, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
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
