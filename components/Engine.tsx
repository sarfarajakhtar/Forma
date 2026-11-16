"use client";
import React from "react";
import { motion } from "framer-motion";

export const Navbar = ({ theme }: any) => {
  const isDark = theme === "gym";
  return (
    <nav className={`fixed top-0 w-full z-50 backdrop-blur-lg border-b ${isDark ? 'bg-black/60 border-white/10 text-white' : 'bg-white/80 border-gray-200 text-gray-900'}`}>
      <div className="max-w-[90rem] mx-auto px-6 h-20 flex items-center justify-between">
        <div className="font-sans text-2xl font-bold tracking-tighter uppercase">IRON & OAK.</div>
        <div className="hidden md:flex gap-8 text-xs font-bold uppercase tracking-[0.2em]">
          <a href="#services" className="hover:opacity-50 transition-opacity">Services</a>
          <a href="#process" className="hover:opacity-50 transition-opacity">Process</a>
          <a href="#reviews" className="hover:opacity-50 transition-opacity">Reviews</a>
        </div>
        <button className={`border px-6 py-2.5 text-xs font-bold uppercase tracking-widest transition-colors ${isDark ? 'border-lime-400 text-lime-400 hover:bg-lime-400 hover:text-black' : 'border-black hover:bg-black hover:text-white'}`}>
          Apply Now
        </button>
      </div>
    </nav>
  );
};

export const Hero = ({ data = {}, theme }: any) => {
  const isGym = theme === "gym";
  const fallbackImage = "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1920&q=80";

  return (
    <section className="relative w-full h-screen flex flex-col justify-center overflow-hidden bg-black">
      {/* Cinematic Video + Image Fallback */}
      <video autoPlay loop muted playsInline poster={fallbackImage} className="absolute inset-0 w-full h-full object-cover z-0 opacity-40">
        <source src="https://videos.pexels.com/video-files/3129595/3129595-hd_1920_1080_25fps.mp4" type="video/mp4" />
      </video>
      
      {/* Brand Motif: Industrial Grid Overlay */}
      <div className="absolute inset-0 z-10 opacity-10" style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/40 to-black/60 z-10"></div>
      
      <div className="relative z-20 w-full max-w-[90rem] mx-auto px-6 md:px-12 pt-32 pb-20">
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }} className={`leading-[0.95] text-white tracking-tighter uppercase font-bold text-[10vw] md:text-[7vw] max-w-4xl`}>
          {data.headline || "Forge Your Strength."}
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.6 }} className="text-gray-300 text-lg md:text-2xl max-w-2xl mt-8 mb-12 font-light">
          {data.subheadline || "Brooklyn's elite members-only powerlifting sanctuary."}
        </motion.p>
        <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }} className={`px-12 py-5 uppercase tracking-widest text-xs font-bold transition-transform hover:scale-105 duration-300 bg-lime-400 text-black`}>
          {data.ctaText || "Apply For Membership"}
        </motion.button>
      </div>
    </section>
  );
};

export const BentoGrid = ({ data = {}, theme }: any) => {
  const isGym = theme === "gym";
  return (
    <section id="services" className={`py-32 ${isGym ? 'bg-[#0a0a0a]' : 'bg-[#1a1a1a]'}`}>
      <div className="max-w-[90rem] mx-auto px-6 md:px-12">
        <h2 className={`text-4xl md:text-6xl mb-16 text-white uppercase font-bold tracking-tight`}>{data.title || "What We Offer"}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {Array.isArray(data.items) && data.items.map((item: any, i: number) => {
            const colSpan = i === 0 ? "md:col-span-8 md:row-span-2 h-[600px]" : "md:col-span-4 h-[290px]";
            return (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.2 }} className={`relative group overflow-hidden rounded-none border border-white/10 ${colSpan}`}>
                {item.imageUrl && <img src={item.imageUrl} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0" alt={item.title} />}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 p-8 md:p-10">
                  <h3 className={`text-2xl md:text-3xl mb-2 text-white uppercase font-bold`}>{item.title || ""}</h3>
                  <p className="text-gray-400 text-sm md:text-base max-w-md opacity-0 group-hover:opacity-100 transition-opacity duration-500">{item.desc || ""}</p>
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
  const isGym = theme === "gym";
  return (
    <section id="process" className={`py-32 ${isGym ? 'bg-[#f8f6f0] text-black' : 'bg-white'}`}>
      <div className="max-w-[90rem] mx-auto px-6 md:px-12">
        <h2 className={`text-4xl md:text-7xl mb-24 uppercase font-bold tracking-tighter`}>{data.title || "The Method"}</h2>
        
        <div className="flex flex-col border-l-2 border-black/20 pl-6 md:pl-12 gap-16">
          {Array.isArray(data.items) && data.items.map((item: any, i: number) => (
            <motion.div key={i} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.2 }} className="relative">
              {/* Overlapping Number Motif */}
              <div className="absolute -left-12 md:-left-24 -top-10 text-[6rem] md:text-[10rem] font-bold text-black/5 leading-none select-none z-0">
                {item.num || "01"}
              </div>
              <div className="relative z-10">
                <h3 className={`text-3xl md:text-5xl mb-4 uppercase font-bold`}>{item.title || ""}</h3>
                <p className="text-gray-600 text-lg max-w-2xl font-medium">{item.desc || ""}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const AsymmetricAbout = ({ data = {}, theme }: any) => {
  const isGym = theme === "gym";
  return (
    <section className={`py-32 overflow-hidden ${isGym ? 'bg-[#111]' : 'bg-white'}`}>
      <div className="max-w-[90rem] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="md:col-span-6">
          <h2 className={`text-4xl md:text-6xl leading-[1.05] mb-8 uppercase font-bold text-white`}>{data.title || ""}</h2>
          <p className={`text-lg leading-relaxed font-light mb-10 text-gray-400`}>{data.desc || ""}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="md:col-span-5 md:col-start-8 relative h-[500px]">
          {data.imageUrl && <img src={data.imageUrl} className="w-full h-full object-cover" alt="About" />}
        </motion.div>
      </div>
    </section>
  );
};

export const FullWidthCTA = ({ data = {}, theme }: any) => {
  return (
    <section className="relative py-40 bg-fixed bg-center bg-cover" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1920&q=80')` }}>
      <div className="absolute inset-0 bg-black/80"></div>
      <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative z-10 max-w-5xl mx-auto text-center px-6">
        <h2 className="text-5xl md:text-8xl leading-none font-sans font-bold uppercase text-white mb-8 tracking-tighter">{data.title || "Claim Your Spot"}</h2>
        <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto">Membership is limited. We curate our community to protect the intensity and focus of the floor.</p>
        <button className="bg-lime-400 text-black px-12 py-5 uppercase tracking-widest text-sm font-bold transition-transform duration-300 hover:scale-105 hover:bg-white">{data.ctaText || "Apply For Membership"}</button>
      </motion.div>
    </section>
  );
};

export const Testimonial = ({ data = {}, theme }: any) => {
  return (
    <section className="bg-[#0a0a0a]">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="h-[400px] md:h-auto">
          <img src="https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1000&q=80" className="w-full h-full object-cover grayscale" alt="Client" />
        </div>
        <div className="p-16 md:p-24 flex flex-col justify-center border-l border-white/10">
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <p className="text-xs uppercase tracking-widest mb-8 text-lime-400">Member Reviews</p>
            <h2 className="text-2xl md:text-4xl leading-tight mb-10 text-white italic font-light">
              "{data.quote || ""}"
            </h2>
            <p className="text-sm uppercase tracking-widest text-gray-500">— {data.author || "Client"}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export const Footer = ({ data = {}, theme }: any) => {
  return (
    <footer className="pt-24 pb-12 bg-[#050505] text-white">
      <div className="max-w-[90rem] mx-auto px-6 md:px-12 border-b border-white/10 pb-16 mb-12 flex flex-col md:flex-row justify-between items-start gap-16">
        <div className="flex-1">
          <h2 className="text-6xl md:text-8xl tracking-tighter mb-8 font-sans font-bold uppercase">IRON & OAK.</h2>
          <div className="flex w-full max-w-md gap-4">
            <input type="email" placeholder="Email for membership inquiries" className="bg-transparent border-b border-white/30 pb-3 w-full focus:outline-none focus:border-lime-400 text-white placeholder-gray-600" />
            <button className="bg-lime-400 text-black px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors">Inquire</button>
          </div>
        </div>
        <div className="flex gap-16">
          <div>
            <h4 className="text-xs uppercase tracking-widest text-gray-500 mb-6">Location</h4>
            <p className="text-gray-400 text-sm leading-loose">
              {data.address || "88 Industrial Way"}<br/>
              {data.email || "info@ironandoak.com"}<br/>
              {data.phone || "(718) 555-0142"}
            </p>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest text-gray-500 mb-6">Social</h4>
            <a href="#" className="block text-gray-400 text-sm mb-3 hover:text-lime-400 transition-colors">Instagram</a>
            <a href="#" className="block text-gray-400 text-sm mb-3 hover:text-lime-400 transition-colors">Twitter</a>
          </div>
        </div>
      </div>
      <div className="max-w-[90rem] mx-auto px-6 md:px-12 flex justify-between items-center text-xs text-gray-600 uppercase tracking-widest">
        <p>© {new Date().getFullYear()} {data.brandName || "IRON & OAK"}. All rights reserved.</p>
      </div>
    </footer>
  );
};
