"use client";
import React from "react";
import { motion } from "framer-motion";

export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

export const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

export const Hero = ({ data, theme }: any) => {
  const isDark = theme === "gym";
  return (
    <section className={`relative w-full h-screen flex items-center justify-center overflow-hidden ${isDark ? 'bg-[#111]' : 'bg-black'}`}>
      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0 opacity-50">
        <source src={data.videoUrl || "https://assets.mixkit.co/videos/preview/mixkit-spa-and-wellness-39953-large.mp4"} type="video/mp4" />
      </video>
      <motion.div initial="hidden" animate="visible" variants={stagger} className="relative z-20 w-full max-w-[90rem] mx-auto px-6 md:px-12 flex flex-col justify-center h-full pt-20">
        <motion.h1 variants={fadeUp} className={`text-[12vw] leading-[0.85] font-display font-bold text-white tracking-tighter uppercase ${isDark ? 'font-sans' : 'font-serif'}`}>
          {data.headline}
        </motion.h1>
        <motion.p variants={fadeUp} className="text-white/80 text-xl max-w-2xl mt-8 mb-12 font-light">
          {data.subheadline}
        </motion.p>
        <motion.div variants={fadeUp} className="flex gap-4">
          <button className={`px-10 py-5 uppercase tracking-widest text-xs font-bold transition-transform hover:scale-105 ${isDark ? 'bg-lime-400 text-black' : 'bg-white text-black'}`}>
            {data.ctaText || "Discover More"}
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export const Stats = ({ data, theme }: any) => {
  return (
    <section className="py-24 bg-[#f8f6f0] border-b border-gray-200">
      <div className="max-w-[90rem] mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        {data.items?.map((stat: any, i: number) => (
          <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="border-l border-gray-300 pl-6">
            <p className="text-5xl font-display font-bold text-gray-900 mb-2">{stat.number}</p>
            <p className="text-xs uppercase tracking-widest text-gray-500">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export const AsymmetricAbout = ({ data, theme }: any) => {
  return (
    <section className="py-32 bg-white overflow-hidden">
      <div className="max-w-[90rem] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="md:col-span-5">
          <p className="text-xs uppercase tracking-widest text-gray-500 mb-4">{data.eyebrow || "Philosophy"}</p>
          <h2 className="text-5xl md:text-7xl font-display font-bold leading-[1.05] mb-8 uppercase tracking-tighter">{data.title}</h2>
          <p className="text-lg text-gray-600 leading-relaxed font-light mb-10">{data.description}</p>
          <button className="border border-black text-black px-8 py-4 uppercase tracking-widest text-xs font-bold hover:bg-black hover:text-white transition-colors">Learn More</button>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="md:col-span-6 md:col-start-7 relative h-[600px]">
          <img src={data.imageUrl} className="w-full h-full object-cover rounded-2xl shadow-2xl" alt={data.title} />
          {data.badge && (
            <div className="absolute -bottom-10 -left-10 bg-black p-10 rounded-2xl shadow-xl hidden md:block">
              <p className="font-display text-3xl text-white mb-2 uppercase">{data.badge.title}</p>
              <p className="text-xs uppercase tracking-widest text-gray-400">{data.badge.subtitle}</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export const BentoGrid = ({ data, theme }: any) => {
  return (
    <section className={`py-32 ${theme === 'gym' ? 'bg-[#111] text-white' : 'bg-[#1a1a1a] text-white'}`}>
      <div className="max-w-[90rem] mx-auto px-6 md:px-12">
        <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-5xl md:text-7xl font-display font-bold uppercase tracking-tighter mb-16">{data.title}</motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {data.items?.map((item: any, i: number) => {
            const colSpan = i === 0 ? "md:col-span-8 md:row-span-2 h-[600px]" : "md:col-span-4 h-[290px]";
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: i * 0.1 }} viewport={{ once: true }} className={`relative group overflow-hidden rounded-2xl ${colSpan}`}>
                <img src={item.imageUrl} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={item.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-3xl font-display font-bold uppercase mb-2">{item.title}</h3>
                  <p className="text-white/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{item.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export const EditorialList = ({ data, theme }: any) => {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-[90rem] mx-auto px-6 md:px-12">
        <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-5xl md:text-7xl font-display font-bold uppercase tracking-tighter text-center mb-20">{data.title}</motion.h2>
        <div className="flex flex-col border-t border-gray-200">
          {data.items?.map((item: any, i: number) => (
            <motion.div key={i} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: i * 0.2 }} viewport={{ once: true }} className="group flex flex-col md:flex-row items-start md:items-center py-12 border-b border-gray-200 hover:bg-gray-50 transition-colors px-4 md:px-8 cursor-pointer">
              <div className="text-7xl md:text-9xl font-display font-bold text-gray-200 w-32 md:w-64 shrink-0 transition-colors group-hover:text-black">{item.number}</div>
              <div className="flex-1 mt-4 md:mt-0">
                <h3 className="text-3xl md:text-4xl font-display font-bold uppercase mb-4">{item.title}</h3>
                <p className="text-gray-500 text-lg max-w-2xl font-light">{item.description}</p>
              </div>
              <div className="mt-6 md:mt-0 text-3xl group-hover:translate-x-4 transition-transform duration-300">→</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Testimonial = ({ data, theme }: any) => {
  return (
    <section className="py-32 bg-[#f8f6f0] text-center">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <p className="text-xs uppercase tracking-widest text-gray-500 mb-12">Client Stories</p>
          <h2 className="text-3xl md:text-5xl font-serif leading-tight italic mb-10">"{data.quote}"</h2>
          <p className="text-sm uppercase tracking-widest text-gray-500">— {data.author}</p>
        </motion.div>
      </div>
    </section>
  );
};

export const FullWidthCTA = ({ data, theme }: any) => {
  return (
    <section className="relative py-48 bg-fixed bg-center bg-cover" style={{ backgroundImage: `url('${data.imageUrl}')` }}>
      <div className="absolute inset-0 bg-black/70"></div>
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="relative z-10 max-w-5xl mx-auto text-center px-6">
        <h2 className="text-[8vw] leading-none font-display font-bold uppercase text-white tracking-tighter mb-8 mix-blend-overlay">{data.title}</h2>
        <button className="bg-white text-black px-12 py-5 uppercase tracking-widest text-sm font-bold hover:scale-105 transition-transform duration-300">{data.ctaText}</button>
      </motion.div>
    </section>
  );
};

export const Footer = ({ data, theme }: any) => {
  return (
    <footer className="bg-[#111] text-white pt-24 pb-12 border-t border-white/10">
      <div className="max-w-[90rem] mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-end">
        <div>
          <h3 className="font-display text-6xl md:text-8xl font-bold tracking-tighter uppercase mb-6">{data.brandName}</h3>
          <p className="text-white/50 text-sm max-w-sm">{data.address}<br/>{data.email}<br/>{data.phone}</p>
        </div>
        <div className="mt-12 md:mt-0 text-left md:text-right">
          <a href="#" className="block text-xl font-medium hover:text-gray-400 mb-2">Instagram</a>
          <a href="#" className="block text-xl font-medium hover:text-gray-400 mb-2">Twitter</a>
          <a href="#" className="block text-xl font-medium hover:text-gray-400">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
};
