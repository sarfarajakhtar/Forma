import React from "react";

interface CinematicVideoHeroProps {
  brandName: string;
  headline: string;
  subheadline: string;
  videoUrl: string;
  ctaText: string;
}

export default function CinematicVideoHero({ brandName, headline, subheadline, videoUrl, ctaText }: CinematicVideoHeroProps) {
  return (
    <section className="relative w-full h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src={videoUrl} type="video/mp4" />
      </video>

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 z-10"></div>

      {/* Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-start justify-center h-full pt-20">
        <p className="text-white/80 tracking-[0.2em] uppercase text-sm md:text-base font-medium mb-6">
          {brandName}
        </p>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-[1.05] max-w-4xl tracking-tight mb-8">
          {headline}
        </h1>
        <p className="text-lg md:text-xl text-white/90 max-w-2xl font-light mb-12">
          {subheadline}
        </p>
        <button className="bg-white text-black px-8 py-4 rounded-none uppercase tracking-widest text-sm font-semibold hover:bg-gray-200 transition-colors duration-300">
          {ctaText}
        </button>
      </div>

      {/* Floating Overlapping Widget (The "WOW" Factor) */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-30 w-[90%] max-w-5xl bg-white shadow-2xl rounded-lg p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-gray-100">
        <div className="flex-1 w-full">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Ready to start?</h3>
          <p className="text-xl md:text-2xl font-serif text-gray-900">Book your private consultation today.</p>
        </div>
        <div className="flex w-full md:w-auto gap-4">
          <input type="text" placeholder="Enter your email" className="border border-gray-300 rounded-none px-4 py-3 w-full md:w-64 focus:outline-none focus:border-black" />
          <button className="bg-black text-white px-8 py-3 uppercase tracking-widest text-xs font-semibold hover:bg-gray-800 transition-colors">Submit</button>
        </div>
      </div>
    </section>
  );
}
