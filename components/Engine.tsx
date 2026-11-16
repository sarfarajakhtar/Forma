"use client";
import React from "react";
import { motion } from "framer-motion";

export const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-lg border-b border-white/10">
    <div className="max-w-[90rem] mx-auto px-6 h-20 flex items-center justify-between text-white">
      <div className="font-serif text-2xl tracking-widest uppercase">Lumina.</div>
      <div className="hidden md:flex gap-8 text-xs font-bold uppercase tracking-[0.2em]">
        <a href="#treatments" className="hover:text-gray-300 transition-colors">Treatments</a>
        <a href="#gallery" className="hover:text-gray-300 transition-colors">Gallery</a>
        <a href="#faq" className="hover:text-gray-300 transition-colors">FAQ</a>
      </div>
      <button className="border border-white px-6 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
        Book Now
      </button>
    </div>
  </nav>
);

export const Hero = () => (
  <section className="relative w-full h-screen flex flex-col justify-center overflow-hidden bg-black">
    {/* Reliable Video Background */}
    <video 
      autoPlay 
      loop 
      muted 
      playsInline 
      poster="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1920&q=80"
      className="absolute inset-0 w-full h-full object-cover z-0 opacity-50"
    >
      <source src="https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-tropical-beach-1089-large.mp4" type="video/mp4" />
    </video>
    
    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-black/20 to-black/40 z-10"></div>
    
    <div className="relative z-20 w-full max-w-[90rem] mx-auto px-6 md:px-12 pt-32 pb-20">
      <motion.p 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
        className="text-white/80 tracking-[0.3em] uppercase text-xs md:text-sm font-medium mb-6"
      >
        Lumina Skin & Wellness
      </motion.p>
      
      <motion.h1 
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}
        className="leading-[1.05] text-white tracking-tight font-serif text-[7vw] font-normal max-w-5xl"
      >
        Radiance Refined. <br /> Wellness Elevated.
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.6 }}
        className="text-white/80 text-lg md:text-2xl max-w-2xl mt-8 mb-12 font-light"
      >
        Austin's premier luxury medical spa for Botox, fillers, and laser resurfacing.
      </motion.p>
      
      <motion.button 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }}
        className="px-10 py-5 uppercase tracking-widest text-xs font-bold bg-white text-black transition-transform hover:scale-105 duration-300"
      >
        Book Your Consultation
      </motion.button>
    </div>
  </section>
);

export const OverlappingStats = () => (
  <section className="relative z-30 -mt-24 max-w-[80rem] mx-auto px-6">
    <motion.div 
      initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
      className="bg-white shadow-2xl rounded-xl p-8 md:p-12 grid grid-cols-2 md:grid-cols-4 gap-8"
    >
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
    </motion.div>
  </section>
);

export const BentoGrid = () => (
  <section id="treatments" className="py-32 bg-[#1a1a1a]">
    <div className="max-w-[90rem] mx-auto px-6 md:px-12">
      <h2 className="text-5xl md:text-7xl mb-16 text-white font-serif">Our Signature Treatments</h2>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="md:col-span-8 md:row-span-2 h-[600px] relative group overflow-hidden rounded-xl"
        >
          <img src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=1200&q=80" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Botox" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
          <div className="absolute bottom-0 p-10">
            <h3 className="text-4xl mb-3 text-white font-serif">Botox & Neuromodulators</h3>
            <p className="text-white/80 text-lg max-w-md">Smooth fine lines and restore youthful expression.</p>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
          className="md:col-span-4 h-[290px] relative group overflow-hidden rounded-xl"
        >
          <img src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Fillers" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
          <div className="absolute bottom-0 p-8">
            <h3 className="text-2xl mb-2 text-white font-serif">Dermal Fillers</h3>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.4 }}
          className="md:col-span-4 h-[290px] relative group overflow-hidden rounded-xl"
        >
          <img src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Laser" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
          <div className="absolute bottom-0 p-8">
            <h3 className="text-2xl mb-2 text-white font-serif">Laser Resurfacing</h3>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export const Gallery = () => (
  <section id="gallery" className="py-32 bg-[#f8f6f0]">
    <div className="max-w-[90rem] mx-auto px-6 md:px-12">
      <h2 className="text-5xl md:text-7xl mb-16 text-gray-900 font-serif text-center">The Lumina Space</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1598440947619-2c3f80f2b136?auto=format&fit=crop&w=600&q=80"
        ].map((img, i) => (
          <motion.img 
            key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
            src={img} className="w-full h-64 md:h-80 object-cover rounded-xl" alt={`Gallery ${i}`} 
          />
        ))}
      </div>
    </div>
  </section>
);

export const EditorialList = () => (
  <section className="py-32 bg-white">
    <div className="max-w-[90rem] mx-auto px-6 md:px-12">
      <h2 className="text-5xl md:text-7xl text-center mb-20 font-serif text-gray-900">The Lumina Standard</h2>
      <div className="flex flex-col border-t border-gray-200">
        {[
          { num: "01", title: "Expert Practitioners", desc: "Board-certified specialists with years of aesthetic experience." },
          { num: "02", title: "Bespoke Care", desc: "No two faces are the same. We build custom treatment plans." },
          { num: "03", title: "Uncompromising Safety", desc: "Using only FDA-approved technology and medical-grade products." }
        ].map((item, i) => (
          <motion.div 
            key={i} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.2 }}
            className="group flex flex-col md:flex-row items-start md:items-center py-12 border-b border-gray-200 hover:bg-gray-50 transition-colors px-4 md:px-8 cursor-pointer"
          >
            <div className="text-7xl md:text-9xl font-serif text-gray-200 font-light w-32 md:w-64 shrink-0 transition-colors group-hover:text-black">{item.num}</div>
            <div className="flex-1 mt-4 md:mt-0">
              <h3 className="text-3xl md:text-4xl font-serif mb-4">{item.title}</h3>
              <p className="text-gray-500 text-lg max-w-2xl font-light">{item.desc}</p>
            </div>
            <div className="mt-6 md:mt-0 text-3xl group-hover:translate-x-4 transition-transform duration-300">→</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export const FAQ = () => (
  <section id="faq" className="py-32 bg-[#1a1a1a] text-white">
    <div className="max-w-4xl mx-auto px-6">
      <h2 className="text-5xl md:text-7xl mb-16 font-serif text-center">Frequently Asked</h2>
      <div className="space-y-6">
        {[
          { q: "Do I need a consultation?", a: "Yes, for all injectable and laser treatments, we require a brief consultation to ensure safety." },
          { q: "What is your cancellation policy?", a: "We require 24 hours notice for cancellations to avoid a fee." },
          { q: "Are your treatments painful?", a: "We prioritize your comfort. Most treatments involve minimal discomfort." }
        ].map((faq, i) => (
          <motion.details 
            key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.2 }}
            className="group border-b border-white/20 pb-6 cursor-pointer"
          >
            <summary className="text-xl font-medium list-none flex justify-between items-center">
              {faq.q}
              <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="mt-4 text-gray-400 font-light">{faq.a}</p>
          </motion.details>
        ))}
      </div>
    </div>
  </section>
);

export const FullWidthCTA = () => (
  <section className="relative py-48 bg-fixed bg-center bg-cover" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1920&q=80')` }}>
    <div className="absolute inset-0 bg-black/70"></div>
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
      className="relative z-10 max-w-5xl mx-auto text-center px-6"
    >
      <h2 className="text-[8vw] leading-none font-serif text-white mb-8">Glow Now</h2>
      <button className="bg-white text-black px-12 py-5 uppercase tracking-widest text-sm font-bold transition-transform duration-300 hover:scale-105">Book Appointment</button>
    </motion.div>
  </section>
);

export const Testimonial = () => (
  <section className="py-32 bg-[#f8f6f0] text-center">
    <motion.div 
      initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}
      className="max-w-4xl mx-auto px-6"
    >
      <p className="text-xs uppercase tracking-widest text-gray-500 mb-12">Client Stories</p>
      <h2 className="text-3xl md:text-5xl font-serif leading-tight mb-10 italic text-gray-900">
        "An absolutely transformative experience. The staff is incredible, and the results speak for themselves."
      </h2>
      <p className="text-sm uppercase tracking-widest text-gray-500">— Sophia R., Austin TX</p>
    </motion.div>
  </section>
);

export const Footer = () => (
  <footer className="pt-24 pb-12 border-t bg-[#111] border-white/10 text-white">
    <div className="max-w-[90rem] mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-end">
      <div>
        <h3 className="text-6xl md:text-8xl tracking-tighter mb-6 font-serif">Lumina.</h3>
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
