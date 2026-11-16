"use client";
import React from "react";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-black/40 backdrop-blur-md border-b border-white/10 transition-all duration-300">
      <div className="max-w-[90rem] mx-auto px-6 h-20 flex items-center justify-between text-white">
        <div className="font-serif text-2xl tracking-widest uppercase">Lumina.</div>
        <div className="hidden md:flex gap-8 text-xs font-bold uppercase tracking-[0.2em]">
          <a href="#" className="hover:text-gray-300 transition-colors">Treatments</a>
          <a href="#" className="hover:text-gray-300 transition-colors">Philosophy</a>
          <a href="#" className="hover:text-gray-300 transition-colors">Journal</a>
        </div>
        <button className="border border-white px-6 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
          Book Now
        </button>
      </div>
    </nav>
  );
};

export const Hero = () => {
  return (
    <section className="relative w-full h-screen flex flex-col justify-center overflow-hidden bg-black">
      {/* Cinematic Video Background with Image Fallback */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        poster="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1920&q=80"
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-50"
      >
        <source src="https://assets.mixkit.co/videos/preview/mixkit-spa-and-wellness-39953-large.mp4" type="video/mp4" />
      </video>
      
      <div className="absolute inset-0 bg-black/30 z-10"></div>
      
      {/* Animated Content */}
      <div className="relative z-20 w-full max-w-[90rem] mx-auto px-6 md:px-12 pt-32 pb-20 animate-fade-up">
        <p className="text-white/80 tracking-[0.3em] uppercase text-xs md:text-sm font-medium mb-6">
          Lumina Skin & Wellness
        </p>
        <h1 className="leading-[1.05] text-white tracking-tight font-serif text-[8vw] font-normal max-w-5xl">
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

export const OverlappingStats = () => {
  return (
    <section className="relative z-30 -mt-24 max-w-[80rem] mx-auto px-6">
      <div className="bg-white shadow-2xl rounded-xl p-8 md:p-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { num: "15+", label: "Years Experience" },
          { num: "5k", label: "Happy Clients" },
          { num: "20", label: "Expert Doctors" },
          { num: "100%", label: "Satisfaction" }
        ].map((stat, i) => (
          <div key={i} className="border-l border-gray-200 pl-6">
            <p className="text-4xl md:text-5xl font-serif text-gray-900 mb-2">{stat.num}</p>
            <p className="text-xs uppercase tracking-widest text-gray-500">{stat.label}</p>
          </div>
        ))}
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
