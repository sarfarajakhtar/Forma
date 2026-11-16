"use client";
import { Navbar, Hero, OverlappingStats, BentoGrid, Footer } from "../components/Engine";

export default function Home() {
  return (
    <div className="antialiased overflow-x-hidden bg-[#1a1a1a]">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Inter:wght@300;400;500;600&display=swap');
        .font-serif { font-family: 'Cormorant Garamond', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
        
        /* Pure CSS WOW Animation */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up {
          animation: fadeUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}} />
      
      <Navbar />
      <main className="font-sans">
        <Hero />
        <OverlappingStats />
        <BentoGrid />
        <Footer />
      </main>
    </div>
  );
}
