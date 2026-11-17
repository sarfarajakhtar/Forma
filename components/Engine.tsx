"use client";
import React from "react";
import { motion } from "framer-motion";

export const Navbar = ({ theme }: any) => {
  const isGym = theme === "gym";
  return (
    <nav className={`fixed top-0 w-full z-50 backdrop-blur-xl border-b ${isGym ? 'bg-black/40 border-white/5 text-white' : 'bg-white/80 border-gray-200 text-gray-900'}`}>
      <div className="max-w-[90rem] mx-auto px-6 h-20 flex items-center justify-between">
        <div className="font-sans text-2xl font-bold tracking-tighter uppercase">IRON & OAK.</div>
        <div className="hidden md:flex gap-10 text-[10px] font-bold uppercase tracking-[0.25em]">
          <a href="#services" className="hover:text-lime-400 transition-colors">Services</a>
          <a href="#process" className="hover:text-lime-400 transition-colors">Process</a>
          <a href="#reviews" className="hover:text-lime-400 transition-colors">Reviews</a>
        </div>
        <button className={`border px-6 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] transition-colors ${isGym ? 'border-lime-400 text-lime-400 hover:bg-lime-400 hover:text-black' : 'border-black hover:bg-black hover:text-white'}`}>
          Apply
        </button>
      </div>
    </nav>
  );
};

export const Hero = ({ data = {}, theme }: any) => {
  const fallbackImage = "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1920&q=80";

  return (
    <section className="relative w-full h-screen flex flex-col justify-center overflow-hidden bg-[#050505]">
      <video autoPlay loop muted playsInline poster={fallbackImage} className="absolute inset-0 w-full h-full object-cover z-0 opacity-50">
        <source src="https://videos.pexels.com/video-files/3129595/3129595-hd_1920_1080_25fps.mp4" type="video/mp4" />
      </video>
      
      {/* Industrial Grid Motif */}
      <div className="absolute inset-0 z-10 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
      
      {/* Cinematic Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#050505]/60 to-[#050505] z-10"></div>
      
      <div className="relative z-20 w-full max-w-[90rem] mx-auto px-6 md:px-12 pt-32 pb-20">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="text-lime-400 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] mb-8">
          Brooklyn, NY
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }} className="leading-[0.95] text-white tracking-tighter uppercase font-sans font-bold text-[10vw] md:text-[7vw] max-w-5xl">
          {data.headline || "Forge Your Strength."}
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.6 }} className="text-gray-400 text-lg md:text-xl max-w-2xl mt-8 mb-12 font-light">
          {data.subheadline || "Brooklyn's elite members-only powerlifting sanctuary."}
        </motion.p>
        <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }} className="px-12 py-5 uppercase tracking-widest text-[10px] font-bold transition-transform hover:scale-105 duration-300 bg-lime-400 text-black">
          {data.ctaText || "Apply For Membership"}
        </motion.button>
      </div>
    </section>
  );
};

export const Marquee = () => {
  // NEW: Breaks the dark monotony with high-energy movement and bold typography
  return (
    <div className="bg-lime-400 py-6 overflow-hidden border-y border-lime-500 flex whitespace-nowrap">
      <motion.div 
        animate={{ x: [0, -1000] }} 
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        className="flex gap-12 items-center text-black font-sans font-bold uppercase tracking-tighter text-4xl md:text-6xl"
      >
        <span>Powerlifting</span> <span className="text-black/30">✦</span>
        <span>Recovery</span> <span className="text-black/30">✦</span>
        <span>Strength</span> <span className="text-black/30">✦</span>
        <span>Community</span> <span className="text-black/30">✦</span>
        <span>Powerlifting</span> <span className="text-black/30">✦</span>
        <span>Recovery</span> <span className="text-black/30">✦</span>
      </motion.div>
    </div>
  );
};

export const AsymmetricAbout = ({ data = {}, theme }: any) => {
  return (
    <section className="py-24 overflow-hidden bg-[#050505]">
      <div className="max-w-[90rem] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="md:col-span-6">
          <h2 className="text-4xl md:text-6xl leading-[1.05] mb-8 uppercase font-sans font-bold text-white">{data.title || "Built for the serious."}</h2>
          <p className="text-gray-400 text-lg leading-relaxed font-light mb-10">{data.desc || ""}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="md:col-span-5 md:col-start-8 relative h-[500px]">
          {data.imageUrl && <img src={data.imageUrl} className="w-full h-full object-cover grayscale" alt="About" />}
        </motion.div>
      </div>
    </section>
  );
};

export const BentoGrid = ({ data = {}, theme }: any) => {
  return (
    <section id="services" className="py-24 bg-[#111]">
      <div className="max-w-[90rem] mx-auto px-6 md:px-12">
        <h2 className="text-4xl md:text-6xl mb-16 text-white uppercase font-sans font-bold tracking-tight">{data.title || "What We Offer"}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {Array.isArray(data.items) && data.items.map((item: any, i: number) => {
            const colSpan = i === 0 ? "md:col-span-8 md:row-span-2 h-[500px]" : "md:col-span-4 h-[240px]"; // Tightened heights
            return (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.2 }} className={`relative group overflow-hidden border border-white/5 ${colSpan}`}>
                {item.imageUrl && <img src={item.imageUrl} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 grayscale group-hover:grayscale-0" alt={item.title} />}
                <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 p-8">
                  <h3 className="text-2xl mb-2 text-white uppercase font-sans font-bold">{item.title || ""}</h3>
                  <p className="text-gray-400 text-sm max-w-md opacity-0 group-hover:opacity-100 transition-opacity duration-500">{item.desc || ""}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export const Timeline = ({ data = {}, theme }: any) => {
  return (
    <section id="process" className="py-24 bg-[#050505]">
      <div className="max-w-[90rem] mx-auto px-6 md:px-12">
        <h2 className="text-4xl md:text-7xl mb-16 uppercase font-sans font-bold tracking-tighter text-white">{data.title || "The Method"}</h2>
        
        <div className="flex flex-col border-l border-lime-400/30 pl-8 md:pl-16 gap-12">
          {Array.isArray(data.items) && data.items.map((item: any, i: number) => (
            <motion.div key={i} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.2 }} className="relative">
              <div className="absolute -left-12 md:-left-24 -top-10 text-[6rem] md:text-[10rem] font-bold text-white/[0.03] leading-none select-none z-0 font-sans">
                {item.num || "01"}
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl md:text-4xl mb-3 uppercase font-sans font-bold text-white flex items-center gap-4">
                  <span className="w-2 h-2 bg-lime-400 rounded-full inline-block"></span>
                  {item.title || ""}
                </h3>
                <p className="text-gray-400 text-base max-w-2xl font-light">{item.desc || ""}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const FullWidthCTA = ({ data = {}, theme }: any) => {
  return (
    // Tightened padding from py-48 to py-24 to remove excessive empty space
    <section className="relative py-24 bg-fixed bg-center bg-cover border-y border-white/5" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1920&q=80')` }}>
      <div className="absolute inset-0 bg-[#050505]/95"></div>
      <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative z-10 max-w-4xl mx-auto text-center px-6">
        <h2 className="text-4xl md:text-7xl leading-none font-sans font-bold uppercase text-white mb-6 tracking-tighter">{data.title || "Claim Your Spot"}</h2>
        <p className="text-gray-400 text-base md:text-lg mb-8 max-w-xl mx-auto font-light">Membership is limited. We curate our community to protect the intensity and focus of the floor.</p>
        <button className="bg-lime-400 text-black px-12 py-5 uppercase tracking-widest text-[10px] font-bold transition-transform duration-300 hover:scale-105">{data.ctaText || "Apply For Membership"}</button>
      </motion.div>
    </section>
  );
};

export const Testimonial = ({ data = {}, theme }: any) => {
  return (
    <section className="bg-[#050505]">
      <div className="grid grid-cols-1 md:grid-cols-2 border-b border-white/5">
        <div className="h-[400px] md:h-auto relative">
          <img src="https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1000&q=80" className="w-full h-full object-cover grayscale opacity-80" alt="Client" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#050505]"></div>
        </div>
        <div className="p-16 md:p-24 flex flex-col justify-center">
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <p className="text-[10px] uppercase tracking-[0.3em] mb-8 text-lime-400 font-bold">Member Reviews</p>
            <h2 className="text-2xl md:text-3xl leading-snug mb-8 text-white font-light">"{data.quote || ""}"</h2>
            <p className="text-xs uppercase tracking-widest text-gray-500">— {data.author || "Client"}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export const Footer = ({ data = {}, theme }: any) => {
  return (
    <footer className="pt-24 pb-12 bg-[#050505] text-white">
      <div className="max-w-[90rem] mx-auto px-6 md:px-12 border-b border-white/5 pb-16 mb-12 flex flex-col md:flex-row justify-between items-start gap-16">
        <div className="flex-1">
          <h2 className="text-6xl md:text-8xl tracking-tighter mb-8 font-sans font-bold uppercase">IRON & OAK.</h2>
          <div className="flex w-full max-w-md gap-4">
            <input type="email" placeholder="Email for membership inquiries" className="bg-transparent border-b border-white/20 pb-3 w-full focus:outline-none focus:border-lime-400 text-white placeholder-gray-600 text-sm font-light" />
            <button className="bg-lime-400 text-black px-8 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-colors">Inquire</button>
          </div>
        </div>
        <div className="flex gap-16">
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-6 font-bold">Location</h4>
            <p className="text-gray-400 text-sm leading-loose font-light">
              {data.address || "88 Industrial Way"}<br/>
              {data.email || "info@ironandoak.com"}<br/>
              {data.phone || "(718) 555-0142"}
            </p>
          </div>
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-6 font-bold">Social</h4>
            <a href="#" className="block text-gray-400 text-sm mb-3 hover:text-lime-400 transition-colors font-light">Instagram</a>
            <a href="#" className="block text-gray-400 text-sm mb-3 hover:text-lime-400 transition-colors font-light">Twitter</a>
          </div>
        </div>
      </div>
      <div className="max-w-[90rem] mx-auto px-6 md:px-12 flex justify-between items-center text-[10px] text-gray-600 uppercase tracking-[0.2em]">
        <p>© {new Date().getFullYear()} {data.brandName || "IRON & OAK"}. All rights reserved.</p>
      </div>
    </footer>
  );
};
