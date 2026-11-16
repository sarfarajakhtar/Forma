"use client";
import { Hero, BentoGrid, Footer } from "../components/Engine";

export default function Home() {
  return (
    <div className="antialiased overflow-x-hidden">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Inter:wght@300;400;500;600&display=swap');
        .font-serif { font-family: 'Cormorant Garamond', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
      `}} />
      
      <main className="font-sans">
        <Hero />
        <BentoGrid />
        <Footer />
      </main>
    </div>
  );
}
