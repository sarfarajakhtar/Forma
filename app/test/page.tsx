"use client";

import React from "react";
import { motion } from "framer-motion";

export default function TestPage() {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <main className="font-sans antialiased bg-[#f8f6f0] text-[#1a1a1a] overflow-x-hidden selection:bg-black selection:text-white">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Inter:wght@300;400;500&display=swap');
        .font-display { font-family: 'Syne', sans-serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
      `}} />

      {/* 1. NAVBAR (Minimal) */}
      <nav className="fixed top-0 w-full z-50 mix-blend-difference text-white">
        <div className="max-w-[90rem] mx-auto px-6 md:px-12 h-24 flex items-center justify-between">
          <div className="font-display text-2xl font-bold tracking-tighter">LUMINA.</div>
          <div className="hidden md:flex gap-10 text-sm font-medium tracking-wide">
            <a href="#" className="hover:opacity-50 transition-opacity">TREATMENTS</a>
            <a href="#" className="hover:opacity-50 transition-opacity">PHILOSOPHY</a>
            <a href="#" className="hover:opacity-50 transition-opacity">JOURNAL</a>
          </div>
          <button className="border border-white px-6 py-2 text-xs font-bold tracking-wider hover:bg-white hover:text-black transition-colors">BOOK NOW</button>
        </div>
      </nav>

      {/* 2. CINEMATIC VIDEO HERO (Extreme Typography) */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0 opacity-60">
          <source src="https://assets.mixkit.co/videos/preview/mixkit-spa-and-wellness-39953-large.mp4" type="video/mp4" />
        </video>
        
        <div className="relative z-20 w-full max-w-[90rem] mx-auto px-6 md:px-12 flex flex-col justify-center h-full">
          <motion.h1 
            initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}
            className="text-[15vw] leading-[0.85] font-display font-bold text-white tracking-tighter uppercase mix-blend-overlay"
          >
            Sculpting <br/> The <span className="italic font-light">Future</span> <br/> Of Beauty
          </motion.h1>
        </div>
      </section>

      {/* 3. INFINITE MARQUEE BANNER */}
      <div className="bg-black text-white py-6 overflow-hidden flex whitespace-nowrap border-y border-white/20">
        <motion.div 
          animate={{ x: [0, -1000] }} 
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="font-display text-4xl md:text-6xl uppercase tracking-tighter flex gap-8 items-center"
        >
          <span>Botulinum Toxin</span> <span className="text-white/30">✦</span>
          <span>Dermal Fillers</span> <span className="text-white/30">✦</span>
          <span>Laser Resurfacing</span> <span className="text-white/30">✦</span>
          <span>IV Therapy</span> <span className="text-white/30">✦</span>
          <span>Botulinum Toxin</span> <span className="text-white/30">✦</span>
          <span>Dermal Fillers</span> <span className="text-white/30">✦</span>
        </motion.div>
      </div>

      {/* 4. ASYMMETRIC INTRO (Overlapping Images & Text) */}
      <section className="py-32 md:py-48 bg-[#f8f6f0] relative">
        <div className="max-w-[90rem] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="md:col-span-5 relative z-10"
          >
            <h2 className="text-5xl md:text-7xl font-display font-bold leading-[0.95] mb-8 uppercase tracking-tighter">
              A New<br/>Standard<br/>In Care.
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed font-light max-w-md">
              We merge clinical precision with holistic wellness. Lumina is not just a clinic; it is a sanctuary for those who demand the absolute best.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} viewport={{ once: true }}
            className="md:col-span-7 relative h-[700px]"
          >
            <img src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=1200&q=80" className="w-full h-full object-cover" alt="Facial" />
            {/* Overlapping Text Box */}
            <div className="absolute -bottom-10 -left-10 bg-white p-8 md:p-12 shadow-2xl max-w-sm hidden md:block">
              <p className="font-display text-2xl font-bold uppercase mb-2">100% Natural</p>
              <p className="text-gray-500 font-light">We use exclusively organic, medical-grade products tailored to your skin.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. BENTO GRID (High-Image Density) */}
      <section className="py-24 bg-black text-white">
        <div className="max-w-[90rem] mx-auto px-6 md:px-12">
          <h2 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tighter mb-16">Our Expertise</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Tall Image */}
            <div className="md:col-span-1 md:row-span-2 relative h-[400px] md:h-[600px] group overflow-hidden">
              <img src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Filler" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <h3 className="absolute bottom-6 left-6 font-display text-2xl font-bold uppercase">Injectables</h3>
            </div>
            
            {/* Wide Image */}
            <div className="md:col-span-2 relative h-[300px] group overflow-hidden">
              <img src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=1200&q=80" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Laser" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <h3 className="absolute bottom-6 left-6 font-display text-2xl font-bold uppercase">Laser Resurfacing</h3>
            </div>

            {/* Square Image */}
            <div className="md:col-span-1 relative h-[300px] group overflow-hidden">
              <img src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Spa" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <h3 className="absolute bottom-6 left-6 font-display text-2xl font-bold uppercase">Wellness</h3>
            </div>

            {/* Wide Image 2 */}
            <div className="md:col-span-3 relative h-[300px] group overflow-hidden">
              <img src="https://images.unsplash.com/photo-1598440947619-2c3f80f2b136?auto=format&fit=crop&w=1200&q=80" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Treatment" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <h3 className="absolute bottom-6 left-6 font-display text-2xl font-bold uppercase">IV Therapy & Recovery</h3>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FULL WIDTH PARALLAX CTA */}
      <section className="relative py-48 bg-fixed bg-center bg-cover" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1920&q=80')` }}>
        <div className="absolute inset-0 bg-black/70"></div>
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="relative z-10 max-w-5xl mx-auto text-center px-6"
        >
          <h2 className="text-[10vw] leading-none font-display font-bold uppercase text-white tracking-tighter mb-8 mix-blend-overlay">Glow Now</h2>
          <button className="bg-white text-black px-12 py-5 uppercase tracking-widest text-sm font-bold hover:scale-105 transition-transform duration-300">Book Consultation</button>
        </motion.div>
      </section>

      {/* 7. MINIMAL FOOTER */}
      <footer className="bg-[#111] text-white pt-24 pb-12 border-t border-white/10">
        <div className="max-w-[90rem] mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-end">
          <div>
            <h3 className="font-display text-6xl md:text-8xl font-bold tracking-tighter uppercase mb-6">LUMINA.</h3>
            <p className="text-white/50 text-sm max-w-sm">742 Evergreen Terrace, Austin, TX<br/>hello@luminaskin.com<br/>(512) 555-0198</p>
          </div>
          <div className="mt-12 md:mt-0 text-left md:text-right">
            <a href="#" className="block text-xl font-medium hover:text-gray-400 mb-2">Instagram</a>
            <a href="#" className="block text-xl font-medium hover:text-gray-400 mb-2">Twitter</a>
            <a href="#" className="block text-xl font-medium hover:text-gray-400">LinkedIn</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
