"use client";
import React from "react";

export const Hero = ({ data = {}, theme }: any) => {
  const isGym = theme === "gym";
  const isSpa = theme === "spa";
  const fallbackImage = isGym 
    ? "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1920&q=80"
    : "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1920&q=80";

  return (
    <section id="hero" className={`relative w-full h-screen flex flex-col justify-center overflow-hidden ${isGym ? 'bg-[#0a0a0a]' : 'bg-[#1a1a1a]'}`} style={{ backgroundImage: `url(${fallbackImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="absolute inset-0 bg-black/40 z-10"></div>
      <div className="relative z-20 w-full max-w-[90rem] mx-auto px-6 md:px-12 pt-32 pb-20">
        <h1 className={`leading-[1.05] text-white tracking-tight ${isGym ? 'font-gym text-[10vw] uppercase font-bold' : isSpa ? 'font-spa text-[8vw] font-normal' : 'font-sans text-[8vw] font-bold'}`}>
          {data.headline || "Welcome"}
        </h1>
        <p className="text-white/80 text-lg md:text-2xl max-w-2xl mt-8 mb-12 font-light">{data.subheadline || ""}</p>
        <button className={`px-10 py-5 uppercase tracking-widest text-xs font-bold transition-transform hover:scale-105 ${isGym ? 'bg-lime-400 text-black' : 'bg-white text-black'}`}>
          {data.ctaText || "Discover More"}
        </button>
      </div>
    </section>
  );
};

export const AsymmetricAbout = ({ data = {}, theme }: any) => {
  const isGym = theme === "gym";
  return (
    <section id="about" className={`py-32 overflow-hidden ${isGym ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
      <div className="max-w-[90rem] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
        <div className="md:col-span-5">
          <p className={`text-xs uppercase tracking-widest mb-4 ${isGym ? 'text-gray-400' : 'text-gray-500'}`}>{data.eyebrow || "About Us"}</p>
          <h2 className={`text-5xl md:text-7xl leading-[1.05] mb-8 ${isGym ? 'font-gym font-bold text-white uppercase' : 'font-spa text-gray-900'}`}>{data.title || ""}</h2>
          <p className={`text-lg leading-relaxed font-light mb-10 ${isGym ? 'text-gray-400' : 'text-gray-600'}`}>{data.description || ""}</p>
        </div>
        <div className="md:col-span-6 md:col-start-7 relative h-[600px]">
          {data.imageUrl && <img src={data.imageUrl} className="w-full h-full object-cover rounded-2xl shadow-2xl" alt={data.title || "About"} />}
          {data.badge && data.badge.title && (
            <div className={`absolute -bottom-10 -left-10 p-10 rounded-2xl shadow-xl hidden md:block ${isGym ? 'bg-lime-400' : 'bg-[#1a1a1a]'}`}>
              <p className={`text-3xl mb-2 uppercase ${isGym ? 'font-gym font-bold text-black' : 'font-spa text-white'}`}>{data.badge.title}</p>
              <p className={`text-xs uppercase tracking-widest ${isGym ? 'text-black/70' : 'text-gray-400'}`}>{data.badge.subtitle || ""}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export const BentoGrid = ({ data = {}, theme }: any) => {
  const isGym = theme === "gym";
  return (
    <section id="features" className={`py-32 ${isGym ? 'bg-[#111]' : 'bg-[#1a1a1a]'}`}>
      <div className="max-w-[90rem] mx-auto px-6 md:px-12">
        <h2 className={`text-5xl md:text-7xl mb-16 text-white ${isGym ? 'font-gym font-bold uppercase' : 'font-spa'}`}>{data.title || "Features"}</h2>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {Array.isArray(data.items) && data.items.map((item: any, i: number) => {
            const colSpan = i === 0 ? "md:col-span-8 md:row-span-2 h-[600px]" : "md:col-span-4 h-[290px]";
            return (
              <div key={i} className={`relative group overflow-hidden rounded-xl ${colSpan}`}>
                {item.imageUrl && <img src={item.imageUrl} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={item.title || "Feature"} />}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 p-8">
                  <h3 className={`text-3xl mb-2 text-white ${isGym ? 'font-gym font-bold uppercase' : 'font-spa'}`}>{item.title || ""}</h3>
                  <p className="text-white/80 text-sm">{item.description || ""}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export const Testimonial = ({ data = {}, theme }: any) => {
  const isGym = theme === "gym";
  return (
    <section id="testimonial" className={`py-32 text-center ${isGym ? 'bg-[#111]' : 'bg-[#f8f6f0]'}`}>
      <div className="max-w-4xl mx-auto px-6">
        <p className={`text-xs uppercase tracking-widest mb-12 ${isGym ? 'text-gray-400' : 'text-gray-500'}`}>Client Stories</p>
        <h2 className={`text-3xl md:text-5xl leading-tight mb-10 ${isGym ? 'font-gym font-bold text-white italic' : 'font-spa text-gray-900 italic'}`}>"{data.quote || ""}"</h2>
        <p className={`text-sm uppercase tracking-widest ${isGym ? 'text-gray-400' : 'text-gray-500'}`}>— {data.author || "Happy Client"}</p>
      </div>
    </section>
  );
};

export const Footer = ({ data = {}, theme }: any) => {
  const isGym = theme === "gym";
  return (
    <footer className={`pt-24 pb-12 border-t ${isGym ? 'bg-[#0a0a0a] border-white/10 text-white' : 'bg-[#1a1a1a] border-white/10 text-white'}`}>
      <div className="max-w-[90rem] mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-end">
        <div>
          <h3 className={`text-6xl md:text-8xl tracking-tighter mb-6 ${isGym ? 'font-gym font-bold uppercase' : 'font-spa'}`}>{data.brandName || "Brand"}</h3>
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
