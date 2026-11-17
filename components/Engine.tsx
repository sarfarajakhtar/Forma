"use client";
import React from "react";
import { motion } from "framer-motion";

export const Navbar = ({ theme }: any) => {
  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-xl border-b bg-black/40 border-white/10 text-white">
      <div className="max-w-[90rem] mx-auto px-6 h-20 flex items-center justify-between">
        <div className="font-sans text-2xl font-bold tracking-tighter uppercase">IRON & OAK.</div>
        <div className="hidden md:flex gap-10 text-sm font-medium tracking-wide">
          <a href="#services" className="hover:text-lime-400 transition-colors">Services</a>
          <a href="#process" className="hover:text-lime-400 transition-colors">Process</a>
          <a href="#reviews" className="hover:text-lime-400 transition-colors">Reviews</a>
        </div>
        <button className="border border-lime-400 text-lime-400 px-6 py-2.5 text-sm font-bold uppercase tracking-wider transition-colors hover:bg-lime-400 hover:text-black">
          Apply
        </button>
      </div>
    </nav>
  );
};

export const Hero = ({ data = {}, theme }: any) => {
  // Brighter, more impactful hero image
  const fallbackImage = "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1920&q=80";

  return (
    <section className="relative w-full h-screen flex flex-col justify-center overflow-hidden bg-black">
      <video autoPlay loop muted playsInline poster={fallbackImage} className="absolute inset-0 w-full h-full object-cover z-0 opacity-60">
        <source src="https://videos.pexels.com/video-files/3129595/3129595-hd_1920_1080_25fps.mp4" type="video/mp4" />
      </video>
      
      {/* Industrial Grid Motif */}
      <div className="absolute inset-0 z-10 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
      
      {/* Cinematic Vignette - Lightened to show the image better */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-black/20 via-black/60 to-black z-10"></div>
      
      <div className="relative z-20 w-full max-w-[90rem] mx-auto px-6 md:px-12 pt-32 pb-20">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="text-lime-400 text-sm font-bold uppercase tracking-[0.3em] mb-6">
          Brooklyn, NY
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }} className="leading-[0.95] text-white tracking-tighter uppercase font-sans font-bold text-[10vw] md:text-[8vw] max-w-5xl">
          {data.headline || "Forge Your Strength."}
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.6 }} className="text-gray-200 text-xl md:text-3xl max-w-3xl mt-8 mb-12 font-light">
          {data.subheadline || "Brooklyn's elite members-only powerlifting sanctuary."}
        </motion.p>
        <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }} className="px-12 py-5 uppercase tracking-widest text-sm font-bold transition-transform hover:scale-105 duration-300 bg-lime-400 text-black shadow-[0_0_40px_rgba(163,230,53,0.3)]">
          {data.ctaText || "Apply For Membership"}
        </motion.button>
      </div>
    </section>
  );
};

export const Marquee = () => {
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
    // THE LIGHT BREAK: Bright white background to shatter the dark monotony
    <section className="py-24 md:py-32 overflow-hidden bg-[#f9f9f9] text-black">
      <div className="max-w-[90rem] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="md:col-span-6">
          <h2 className="text-4xl md:text-6xl leading-[1.05] mb-8 uppercase font-sans font-bold">{data.title || "Built for the serious."}</h2>
          <p className="text-gray-600 text-lg md:text-xl leading-relaxed font-light mb-10">{data.desc || ""}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="md:col-span-5 md:col-start-8 relative h-[500px] md:h-[600px]">
          {data.imageUrl && <img src={data.imageUrl} className="w-full h-full object-cover shadow-2xl" alt="About" />}
        </motion.div>
      </div>
    </section>
  );
};

export const BentoGrid = ({ data = {}, theme }: any) => {
  return (
    <section id="services" className="py-24 md:py-32 bg-[#111]">
      <div className="max-w-[90rem] mx-auto px-6 md:px-12">
        <h2 className="text-4xl md:text-6xl mb-16 text-white uppercase font-sans font-bold tracking-tight">{data.title || "What We Offer"}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {Array.isArray(data.items) && data.items.map((item: any, i: number) => {
            const colSpan = i === 0 ? "md:col-span-8 md:row-span-2 h-[500px]" : "md:col-span-4 h-[240px]";
            return (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.2 }} className={`relative group overflow-hidden border border-white/5 ${colSpan}`}>
                {/* Removed grayscale to let the images pop, added brightness on hover */}
                {item.imageUrl && <img src={item.imageUrl} className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105 brightness-75 group-hover:brightness-100" alt={item.title} />}
                <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 p-8">
                  <h3 className="text-2xl md:text-3xl mb-2 text-white uppercase font-sans font-bold">{item.title || ""}</h3>
                  <p className="text-gray-300 text-base max-w-md">{item.desc || ""}</p>
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
    <section id="process" className="py-24 md:py-32 bg-black">
      <div className="max-w-[90rem] mx-auto px-6 md:px-12">
        <h2 className="text-4xl md:text-7xl mb-16 uppercase font-sans font-bold tracking-tighter text-white">{data.title || "The Method"}</h2>
        
        {/* Refined Horizontal Progression */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t-2 border-white/10 pt-12">
          {Array.isArray(data.items) && data.items.map((item: any, i: number) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.2 }} className="relative">
              <div className="text-6xl md:text-8xl font-sans font-bold text-lime-400 mb-6 leading-none">
                {item.num || "01"}
              </div>
              <h3 className="text-2xl md:text-3xl mb-4 uppercase font-sans font-bold text-white">
                {item.title || ""}
              </h3>
              <p className="text-gray-400 text-lg font-light leading-relaxed">{item.desc || ""}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const FullWidthCTA = ({ data = {}, theme }: any) => {
  return (
    <section className="relative py-32 bg-fixed bg-center bg-cover border-y border-white/5" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1920&q=80')` }}>
      <div className="absolute inset-0 bg-black/80"></div>
      <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative z-10 max-w-4xl mx-auto text-center px-6">
        <h2 className="text-4xl md:text-8xl leading-none font-sans font-bold uppercase text-white mb-6 tracking-tighter">{data.title || "Secure Your Membership"}</h2>
        <p className="text-gray-300 text-xl md:text-2xl mb-10 max-w-2xl mx-auto font-light">We only accept a limited number of new athletes each month to maintain the quality of our floor.</p>
        <button className="bg-lime-400 text-black px-14 py-6 uppercase tracking-widest text-sm font-bold transition-transform duration-300 hover:scale-105 shadow-[0_0_30px_rgba(163,230,53,0.4)]">{data.ctaText || "Start Your Application"}</button>
      </motion.div>
    </section>
  );
};

export const Testimonial = ({ data = {}, theme }: any) => {
  return (
    <section className="bg-[#f9f9f9]">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="h-[400px] md:h-auto relative">
          <img src="https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1000&q=80" className="w-full h-full object-cover" alt="Client" />
        </div>
        <div className="p-16 md:p-24 flex flex-col justify-center">
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <p className="text-sm uppercase tracking-widest mb-8 text-lime-600 font-bold">Member Reviews</p>
            <h2 className="text-2xl md:text-4xl leading-snug mb-8 text-black font-light">"{data.quote || ""}"</h2>
            <p className="text-sm uppercase tracking-widest text-gray-500 font-bold">— {data.author || "Client"}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export const Footer = ({ data = {}, theme }: any) => {
  return (
    <footer className="pt-24 pb-12 bg-[#0a0a0a] text-white">
      <div className="max-w-[90rem] mx-auto px-6 md:px-12 border-b border-white/10 pb-16 mb-12 flex flex-col md:flex-row justify-between items-start gap-16">
        <div className="flex-1">
          <h2 className="text-6xl md:text-8xl tracking-tighter mb-8 font-sans font-bold uppercase">IRON & OAK.</h2>
          <div className="flex w-full max-w-md gap-4">
            <input type="email" placeholder="Email for membership inquiries" className="bg-transparent border-b border-white/30 pb-3 w-full focus:outline-none focus:border-lime-400 text-white placeholder-gray-500 text-base font-light" />
            <button className="bg-lime-400 text-black px-8 py-3 text-sm font-bold uppercase tracking-widest hover:bg-white transition-colors">Inquire</button>
          </div>
        </div>
        <div className="flex gap-16">
          <div>
            <h4 className="text-sm uppercase tracking-wider text-gray-400 mb-6 font-bold">Location</h4>
            <p className="text-gray-300 text-base leading-loose font-light">
              {data.address || "88 Industrial Way"}<br/>
              {data.email || "info@ironandoak.com"}<br/>
              {data.phone || "(718) 555-0142"}
            </p>
          </div>
          <div>
            <h4 className="text-sm uppercase tracking-wider text-gray-400 mb-6 font-bold">Social</h4>
            <a href="#" className="block text-gray-300 text-base mb-3 hover:text-lime-400 transition-colors font-light">Instagram</a>
            <a href="#" className="block text-gray-300 text-base mb-3 hover:text-lime-400 transition-colors font-light">Twitter</a>
          </div>
        </div>
      </div>
      <div className="max-w-[90rem] mx-auto px-6 md:px-12 flex justify-between items-center text-sm text-gray-500 uppercase tracking-widest">
        <p>© {new Date().getFullYear()} {data.brandName || "IRON & OAK"}. All rights reserved.</p>
      </div>
    </footer>
  );
};
