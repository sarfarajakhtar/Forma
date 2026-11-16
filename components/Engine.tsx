"use client";
import React from "react";

export const Hero = () => {
  return (
    <section className="relative w-full h-screen flex flex-col justify-center overflow-hidden bg-[#1a1a1a]">
      {/* Cinematic Background Image */}
      <div 
        className="absolute inset-0 z-0 opacity-50 bg-cover bg-center"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1920&q=80')` }}
      />
      
      {/* Dark Overlay for Contrast */}
      <div className="absolute inset-0 bg-black/40 z-10"></div>
      
      {/* Content */}
      <div className="relative z-20 w-full max-w-[90rem] mx-auto px-6 md:px-12 pt-32 pb-20">
        <p className="text-white/80 tracking-[0.2em] uppercase text-sm font-medium mb-6">
          Lumina Skin & Wellness
        </p>
        <h1 className="leading-[1.05] text-white tracking-tight font-serif text-[8vw] font-normal max-w-4xl">
          Radiance Refined. <br /> Wellness Elevated.
        </h1>
        <p className="text-white/80 text-lg md:text-2xl max-w-2xl mt-8 mb-12 font-light">
          Austin's premier luxury medical spa for Botox, fillers, and laser resurfacing.
        </p>
        <button className="px-10 py-5 uppercase tracking-widest text-xs font-bold bg-white text-black transition-transform hover:scale-105 duration-300">
          Book Your Consultation
        </button>
      </div>
    </section>
  );
};

export const BentoGrid = () => {
  return (
    <section className="py-32 bg-[#1a1a1a]">
      <div className="max-w-[90rem] mx-auto px-6 md:px-12">
        <h2 className="text-5xl md:text-7xl mb-16 text-white font-serif">
          Our Signature Treatments
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Large Image (Left) */}
          <div className="md:col-span-8 md:row-span-2 h-[600px] relative group overflow-hidden rounded-xl">
            <img 
              src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=1200&q=80" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
              alt="Botox" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
            <div className="absolute bottom-0 p-10">
              <h3 className="text-4xl mb-3 text-white font-serif">Botox & Neuromodulators</h3>
              <p className="text-white/80 text-lg max-w-md">Smooth fine lines and restore youthful expression with precision-placed injections.</p>
            </div>
          </div>

          {/* Small Image (Top Right) */}
          <div className="md:col-span-4 h-[290px] relative group overflow-hidden rounded-xl">
            <img 
              src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=800&q=80" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
              alt="Fillers" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
            <div className="absolute bottom-0 p-8">
              <h3 className="text-2xl mb-2 text-white font-serif">Dermal Fillers</h3>
            </div>
          </div>

          {/* Small Image (Bottom Right) */}
          <div className="md:col-span-4 h-[290px] relative group overflow-hidden rounded-xl">
            <img 
              src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
              alt="Laser" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
            <div className="absolute bottom-0 p-8">
              <h3 className="text-2xl mb-2 text-white font-serif">Laser Resurfacing</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Footer = () => {
  return (
    <footer className="pt-24 pb-12 border-t bg-[#111] border-white/10 text-white">
      <div className="max-w-[90rem] mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-end">
        <div>
          <h3 className="text-6xl md:text-8xl tracking-tighter mb-6 font-serif">
            Lumina.
          </h3>
          <p className="text-white/50 text-sm max-w-sm">
            742 Evergreen Terrace, Austin, TX 78704<br/>
            hello@luminaskin.com<br/>
            (512) 555-0198
          </p>
        </div>
        <div className="mt-12 md:mt-0 text-left md:text-right">
          <a href="#" className="block text-lg font-medium hover:text-gray-400 mb-2 transition-colors">Instagram</a>
          <a href="#" className="block text-lg font-medium hover:text-gray-400 mb-2 transition-colors">Twitter</a>
          <a href="#" className="block text-lg font-medium hover:text-gray-400 transition-colors">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
};
