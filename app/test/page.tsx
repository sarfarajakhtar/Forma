"use client";

import React from "react";
import { motion } from "framer-motion";

export default function TestPage() {
  // Animation variants for scroll reveals
  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  return (
    <main className="font-sans antialiased bg-[#f8f6f0] text-[#1a1a1a] overflow-x-hidden">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Inter:wght@300;400;500;600&display=swap');
        .font-serif { font-family: 'Cormorant Garamond', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
      `}} />

      {/* 1. CINEMATIC VIDEO HERO (Full Screen) */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0 opacity-60">
          <source src="https://videos.pexels.com/video-files/3130284/3130284-hd_1920_1080_30fps.mp4" type="video/mp4" />
        </video>
        
        <motion.div 
          initial="hidden" animate="visible" variants={staggerContainer}
          className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-start justify-center h-full pt-20"
        >
          <motion.p variants={fadeUp} className="text-white/70 tracking-[0.3em] uppercase text-xs md:text-sm font-medium mb-6">
            A New Standard in Wellness
          </motion.p>
          <motion.h1 variants={fadeUp} className="text-6xl md:text-8xl lg:text-9xl font-serif text-white leading-[0.95] max-w-5xl tracking-tight mb-8">
            Redefining the <br/><span className="italic font-light">art of beauty.</span>
          </motion.h1>
          <motion.div variants={fadeUp} className="flex gap-4">
            <button className="bg-white text-black px-10 py-5 uppercase tracking-widest text-xs font-semibold hover:bg-gray-200 transition-colors duration-300">
              Explore Treatments
            </button>
          </motion.div>
        </motion.div>

        {/* FLOATING OVERLAPPING WIDGET (Glassmorphism) */}
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-30 w-[90%] max-w-5xl bg-white/90 backdrop-blur-xl shadow-2xl rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 border border-white/20"
        >
          <div className="flex-1">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Reserve Your Spot</h3>
            <p className="text-2xl md:text-3xl font-serif text-black">Book a private consultation.</p>
          </div>
          <div className="flex w-full md:w-auto gap-4">
            <input type="email" placeholder="Enter your email" className="border border-gray-300 rounded-lg px-4 py-3 w-full md:w-64 focus:outline-none focus:border-black bg-white/50" />
            <button className="bg-[#1a1a1a] text-white px-8 py-3 rounded-lg uppercase tracking-widest text-xs font-semibold hover:bg-gray-800 transition-colors">Submit</button>
          </div>
        </motion.div>
      </section>

      <div className="h-32 md:h-48 bg-[#f8f6f0]"></div>

      {/* 2. ASYMMETRIC ABOUT SECTION */}
      <section className="py-32 bg-[#f8f6f0] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
            className="md:col-span-5"
          >
            <p className="text-xs uppercase tracking-widest text-gray-500 mb-4">Our Philosophy</p>
            <h2 className="text-5xl md:text-7xl font-serif leading-[1.1] mb-8">A sanctuary for your skin.</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8 font-light">We believe that true beauty radiates from within. Our approach combines cutting-edge medical science with a deeply relaxing, holistic experience.</p>
            <button className="border border-black text-black px-8 py-4 uppercase tracking-widest text-xs font-semibold hover:bg-black hover:text-white transition-colors">About Us</button>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}
            className="md:col-span-6 md:col-start-7 relative h-[600px]"
          >
            <img src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80" className="w-full h-full object-cover rounded-2xl shadow-2xl" alt="Spa" />
            <div className="absolute -bottom-10 -left-10 bg-[#1a1a1a] p-10 rounded-2xl shadow-xl hidden md:block">
              <p className="font-serif text-4xl text-white mb-2">100%</p>
              <p className="text-xs uppercase tracking-widest text-gray-400">Organic Products</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. ASYMMETRIC BENTO GRID (Hover effects) */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.h2 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-5xl md:text-7xl font-serif mb-16 max-w-3xl leading-tight"
          >
            Curated treatments for your unique beauty.
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}
              className="md:col-span-8 group relative overflow-hidden rounded-2xl min-h-[500px] cursor-pointer"
            >
              <img src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=80" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Botox" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 p-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-4xl font-serif text-white mb-2">Botox & Fillers</h3>
                <p className="text-white/80 max-w-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">Precision injectables to restore volume and smooth fine lines.</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true }}
              className="md:col-span-4 group relative overflow-hidden rounded-2xl min-h-[500px] cursor-pointer"
            >
              <img src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Laser" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 p-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-3xl font-serif text-white mb-2">Laser Resurfacing</h3>
                <p className="text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">Advanced skin renewal.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. FULL WIDTH PARALLAX CTA */}
      <section className="relative py-40 bg-fixed bg-center bg-cover" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80')` }}>
        <div className="absolute inset-0 bg-black/70"></div>
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="relative z-10 max-w-4xl mx-auto text-center px-6"
        >
          <h2 className="text-5xl md:text-8xl font-serif text-white mb-8 leading-[1.1]">Experience the <br/>difference.</h2>
          <p className="text-xl text-white/80 mb-12 font-light">Step into a world of relaxation and aesthetic excellence.</p>
          <button className="bg-white text-black px-12 py-5 uppercase tracking-widest text-sm font-semibold hover:scale-105 transition-transform duration-300">Book Appointment</button>
        </motion.div>
      </section>

      {/* 5. EDITORIAL NUMBERED LIST */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.h2 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-5xl md:text-7xl font-serif text-center mb-20"
          >
            The Standard
          </motion.h2>
          
          <div className="flex flex-col border-t border-gray-200">
            {[
              { num: "01", title: "Expert Practitioners", desc: "Board-certified specialists with years of aesthetic experience." },
              { num: "02", title: "Bespoke Care", desc: "No two faces are the same. We build custom treatment plans." },
              { num: "03", title: "Uncompromising Safety", desc: "Using only FDA-approved technology and medical-grade products." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: i * 0.2 }} viewport={{ once: true }}
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

      {/* 6. MEGA FOOTER */}
      <footer className="bg-[#111] text-white pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white/10 pb-16">
          <div className="md:col-span-2">
            <h3 className="font-serif text-4xl mb-4">Forma.</h3>
            <p className="text-white/50 text-sm max-w-xs mb-8">A luxury AI design agency dedicated to building cinematic, world-class websites.</p>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest text-white/40 mb-6">Product</h4>
            <ul className="space-y-4 text-sm text-white/80">
              <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest text-white/40 mb-6">Contact</h4>
            <ul className="space-y-4 text-sm text-white/80">
              <li>hello@forma.com</li>
            </ul>
          </div>
        </div>
      </footer>
    </main>
  );
}
