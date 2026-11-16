"use client";
import React from "react";
import { motion } from "framer-motion";

export const Navbar = ({ theme }: any) => {
  const isDark = theme === "gym";
  return (
    <nav className={`fixed top-0 w-full z-50 backdrop-blur-lg border-b ${isDark ? 'bg-black/60 border-white/10 text-white' : 'bg-white/80 border-gray-200 text-gray-900'}`}>
      <div className="max-w-[90rem] mx-auto px-6 h-20 flex items-center justify-between">
        <div className="font-serif text-2xl tracking-widest uppercase">Brand.</div>
        <div className="hidden md:flex gap-8 text-xs font-bold uppercase tracking-[0.2em]">
          <a href="#treatments" className="hover:opacity-50 transition-opacity">Services</a>
          <a href="#gallery" className="hover:opacity-50 transition-opacity">Gallery</a>
          <a href="#faq" className="hover:opacity-50 transition-opacity">FAQ</a>
        </div>
        <button className={`border px-6 py-2.5 text-xs font-bold uppercase tracking-widest transition-colors ${isDark ? 'border-white hover:bg-white hover:text-black' : 'border-black hover:bg-black hover:text-white'}`}>
          Contact
        </button>
      </div>
    </nav>
  );
};

export const Hero = ({ data = {}, theme }: any) => {
  const isGym = theme === "gym";
  return (
    <section className="relative w-full h-screen flex flex-col justify-center overflow-hidden bg-black">
      <video autoPlay loop muted playsInline poster="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1920&q=80" className="absolute inset-0 w-full h-full object-cover z-0 opacity-50">
        <source src="https://videos.pexels.com/video-files/3997799/3997799-hd_1920_1080_25fps.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-black/20 to-black/40 z-10"></div>
      
      <div className="relative z-20 w-full max-w-[90rem] mx-auto px-6 md:px-12 pt-32 pb-20">
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }} className={`leading-[1.05] text-white tracking-tight ${isGym ? 'font-sans uppercase font-bold text-[7vw]' : 'font-serif text-[7vw]'}`}>
          {data.headline || "Welcome"}
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.6 }} className="text-white/80 text-lg md:text-2xl max-w-2xl mt-8 mb-12 font-light">
          {data.subheadline || ""}
        </motion.p>
        <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }} className={`px-10 py-5 uppercase tracking-widest text-xs font-bold transition-transform hover:scale-105 duration-300 ${isGym ? 'bg-lime-400 text-black' : 'bg-white text-black'}`}>
          {data.ctaText || "Get Started"}
        </motion.button>
      </div>
    </section>
  );
};

export const OverlappingStats = ({ data = {}, theme }: any) => {
  return (
    <section className="relative z-30 -mt-24 max-w-[80rem] mx-auto px-6">
      <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="bg-white shadow-2xl rounded-xl p-8 md:p-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        {Array.isArray(data.items) && data.items.map((stat: any, i: number) => (
          <div key={i} className="border-l border-gray-200 pl-6">
            <p className="text-4xl md:text-5xl font-serif text-gray-900 mb-2">{stat.num || "0"}</p>
            <p className="text-xs uppercase tracking-widest text-gray-500">{stat.label || ""}</p>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export const BentoGrid = ({ data = {}, theme }: any) => {
  const isGym = theme === "gym";
  return (
    <section id="treatments" className={`py-32 ${isGym ? 'bg-[#111]' : 'bg-[#1a1a1a]'}`}>
      <div className="max-w-[90rem] mx-auto px-6 md:px-12">
        <h2 className={`text-5xl md:text-7xl mb-16 text-white ${isGym ? 'font-sans uppercase font-bold' : 'font-serif'}`}>{data.title || "Features"}</h2>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {Array.isArray(data.items) && data.items.map((item: any, i: number) => {
            const colSpan = i === 0 ? "md:col-span-8 md:row-span-2 h-[600px]" : "md:col-span-4 h-[290px]";
            return (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.2 }} className={`relative group overflow-hidden rounded-xl ${colSpan}`}>
                {item.imageUrl && <img src={item.imageUrl} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={item.title} />}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 p-10">
                  <h3 className={`text-3xl mb-2 text-white ${isGym ? 'font-sans uppercase font-bold' : 'font-serif'}`}>{item.title || ""}</h3>
                  <p className="text-white/80 text-sm">{item.description || ""}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export const Gallery = ({ data = {}, theme }: any) => {
  const isGym = theme === "gym";
  return (
    <section id="gallery" className={`py-32 ${isGym ? 'bg-[#0a0a0a]' : 'bg-[#f8f6f0]'}`}>
      <div className="max-w-[90rem] mx-auto px-6 md:px-12">
        <h2 className={`text-5xl md:text-7xl mb-16 text-center ${isGym ? 'text-white font-sans uppercase font-bold' : 'text-gray-900 font-serif'}`}>{data.title || "Gallery"}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.isArray(data.images) && data.images.map((img: string, i: number) => (
            <motion.img key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} src={img} className="w-full h-64 md:h-80 object-cover rounded-xl" alt="Gallery" />
          ))}
        </div>
      </div>
    </section>
  );
};

export const EditorialList = ({ data = {}, theme }: any) => {
  const isGym = theme === "gym";
  return (
    <section className={`py-32 ${isGym ? 'bg-[#111]' : 'bg-white'}`}>
      <div className="max-w-[90rem] mx-auto px-6 md:px-12">
        <h2 className={`text-5xl md:text-7xl text-center mb-20 ${isGym ? 'text-white font-sans uppercase font-bold' : 'text-gray-900 font-serif'}`}>{data.title || "Process"}</h2>
        <div className={`flex flex-col border-t ${isGym ? 'border-white/20' : 'border-gray-200'}`}>
          {Array.isArray(data.items) && data.items.map((item: any, i: number) => (
            <motion.div key={i} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.2 }} className={`group flex flex-col md:flex-row items-start md:items-center py-12 border-b px-4 md:px-8 cursor-pointer transition-colors ${isGym ? 'border-white/20 hover:bg-white/5' : 'border-gray-200 hover:bg-gray-50'}`}>
              <div className={`text-7xl md:text-9xl font-light w-32 md:w-64 shrink-0 transition-colors ${isGym ? 'font-sans text-white/20 group-hover:text-lime-400' : 'font-serif text-gray-200 group-hover:text-black'}`}>{item.num || "01"}</div>
              <div className="flex-1 mt-4 md:mt-0">
                <h3 className={`text-3xl md:text-4xl mb-4 ${isGym ? 'font-sans uppercase font-bold text-white' : 'font-serif text-gray-900'}`}>{item.title || ""}</h3>
                <p className={`text-lg max-w-2xl font-light ${isGym ? 'text-gray-400' : 'text-gray-500'}`}>{item.desc || ""}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const FAQ = ({ data = {}, theme }: any) => {
  const isGym = theme === "gym";
  return (
    <section id="faq" className={`py-32 ${isGym ? 'bg-[#0a0a0a] text-white' : 'bg-[#1a1a1a] text-white'}`}>
      <div className="max-w-4xl mx-auto px-6">
        <h2 className={`text-5xl md:text-7xl mb-16 text-center ${isGym ? 'font-sans uppercase font-bold' : 'font-serif'}`}>FAQ</h2>
        <div className="space-y-6">
          {Array.isArray(data.items) && data.items.map((faq: any, i: number) => (
            <motion.details key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.2 }} className="group border-b border-white/20 pb-6 cursor-pointer">
              <summary className="text-xl font-medium list-none flex justify-between items-center">
                {faq.q || ""}
                <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-4 text-gray-400 font-light">{faq.a || ""}</p>
            </motion.details>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Testimonial = ({ data = {}, theme }: any) => {
  const isGym = theme === "gym";
  return (
    <section className={`py-32 text-center ${isGym ? 'bg-[#111]' : 'bg-[#f8f6f0]'}`}>
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} className="max-w-4xl mx-auto px-6">
        <p className={`text-xs uppercase tracking-widest mb-12 ${isGym ? 'text-gray-400' : 'text-gray-500'}`}>Reviews</p>
        <h2 className={`text-3xl md:text-5xl leading-tight mb-10 italic ${isGym ? 'font-sans text-white' : 'font-serif text-gray-900'}`}>"{data.quote || ""}"</h2>
        <p className={`text-sm uppercase tracking-widest ${isGym ? 'text-gray-400' : 'text-gray-500'}`}>— {data.author || "Client"}</p>
      </motion.div>
    </section>
  );
};

export const Footer = ({ data = {}, theme }: any) => {
  const isGym = theme === "gym";
  return (
    <footer className={`pt-24 pb-12 border-t ${isGym ? 'bg-[#0a0a0a] border-white/10 text-white' : 'bg-[#111] border-white/10 text-white'}`}>
      <div className="max-w-[90rem] mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-end">
        <div>
          <h3 className={`text-6xl md:text-8xl tracking-tighter mb-6 ${isGym ? 'font-sans uppercase font-bold' : 'font-serif'}`}>{data.brandName || "Brand"}</h3>
          <p className="text-white/50 text-sm max-w-sm">{data.address || ""}<br/>{data.email || ""}<br/>{data.phone || ""}</p>
        </div>
        <div className="mt-12 md:mt-0 text-left md:text-right">
          <a href="#" className="block text-lg font-medium hover:text-gray-400 mb-2 transition-colors">Instagram</a>
          <a href="#" className="block text-lg font-medium hover:text-gray-400 mb-2 transition-colors">Twitter</a>
        </div>
      </div>
    </footer>
  );
};
