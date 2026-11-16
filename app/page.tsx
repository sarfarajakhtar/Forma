"use client";
import { useState } from "react";
import { Hero, AsymmetricAbout, BentoGrid, Testimonial, Footer } from "../components/Engine";

export default function Home() {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [blueprint, setBlueprint] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  async function generate() {
    setLoading(true);
    setError(null);
    setBlueprint(null);

    // Add a timeout so the browser doesn't hang forever
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 seconds

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to generate.");
      setBlueprint(data.blueprint);
    } catch (err: any) {
      if (err.name === 'AbortError') {
        setError("The request timed out. Vercel server limit reached. Please try again.");
      } else {
        setError(err.message);
      }
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
      case "asymmetricabout": return <AsymmetricAbout {...props} />;
      case "bentogrid": return <BentoGrid {...props} />;
      case "testimonial": return <Testimonial {...props} />;
      case "footer": return <Footer {...props} />;
      default: return null;
    }
  };

  if (blueprint) {
    const sections = Array.isArray(blueprint.sections) ? blueprint.sections : [];

    return (
      <div className={`${blueprint.theme === 'spa' ? 'bg-[#f8f6f0]' : 'bg-[#111]'}`}>
        <style dangerouslySetInnerHTML={{__html: `
          @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Inter:wght@300;400;500;600&display=swap');
          .font-gym { font-family: 'Oswald', sans-serif; }
          .font-spa { font-family: 'Cormorant Garamond', serif; }
          .font-sans { font-family: 'Inter', sans-serif; }
        `}} />
        
        <nav className={`fixed top-0 w-full z-50 border-b backdrop-blur-md ${blueprint.theme === 'spa' ? 'bg-[#f8f6f0]/90 border-gray-200 text-black' : 'bg-[#111]/90 border-white/10 text-white'}`}>
          <div className="max-w-[90rem] mx-auto px-6 h-16 flex items-center justify-center gap-6 text-xs font-bold uppercase tracking-widest">
            <a href="#hero" className="hover:opacity-50">Home</a>
            <a href="#about" className="hover:opacity-50">About</a>
            <a href="#features" className="hover:opacity-50">Services</a>
            <a href="#testimonial" className="hover:opacity-50">Reviews</a>
          </div>
        </nav>

        <main className="pt-16">
          {sections.map((section: any, i: number) => renderSection(section, i))}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-6 font-sans">
      <div className="max-w-2xl w-full">
        <h1 className="text-3xl font-semibold mb-2 text-neutral-900">Forma Engine</h1>
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
          {loading ? "Generating (takes ~5 seconds)..." : "Generate Website"}
        </button>
        {error && <div className="mt-6 p-4 bg-red-50 text-red-700 border border-red-200 rounded-xl">{error}</div>}
      </div>
    </div>
  );
}
