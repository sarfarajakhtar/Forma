"use client";

import { useState } from "react";

type Industry = "salon" | "restaurant" | "it";
const cases: Record<Industry, { label: string; brief: string }> = {
  salon: { label: "Luxury salon", brief: "Glow — Muscat beauty studio. Editorial, warm, calm. Sample brand; no real business details." },
  restaurant: { label: "Premium restaurant", brief: "Morrow — fictional destination dining. Architectural, cinematic, atmospheric." },
  it: { label: "IT services", brief: "Nexora — fictional enterprise technology studio. Precise, sophisticated, credible." },
};

function Salon() {
  return <div className="bg-[#f4eee7] text-[#302b28]">
    <header className="relative flex items-center justify-between border-b border-[#302b28]/15 px-6 py-6 md:px-14">
      <span className="text-2xl tracking-[.32em] uppercase font-light">GLOW<span className="text-[#b78779]">.</span></span>
      <span className="hidden text-[10px] uppercase tracking-[.28em] md:block">The art of feeling luminous</span>
      <a href="#salon-services" className="border-b border-[#302b28] pb-1 text-xs tracking-[.17em] uppercase">Explore services</a>
    </header>
    <section className="grid min-h-[620px] lg:min-h-[690px] grid-cols-1 lg:grid-cols-12">
      <div className="relative z-10 flex flex-col justify-center px-7 py-20 md:px-14 lg:col-span-5">
        <p className="mb-7 text-xs tracking-[.3em] uppercase text-[#926d64]">A new ritual of beauty</p>
        <h1 className="font-serif text-[clamp(4.25rem,7vw,8rem)] leading-[.95] tracking-[-.06em]">Come<br/><em>as you</em><br/>are.</h1>
        <p className="mt-9 max-w-sm text-base leading-8 text-[#645650]">An invitation to slow down. Considered beauty, thoughtful rituals, and room to feel entirely yourself.</p>
        <a href="#salon-services" className="mt-10 w-fit bg-[#463a34] px-8 py-4 text-xs uppercase tracking-[.2em] text-white">Discover the rituals</a>
      </div>
      <div className="relative min-h-[470px] lg:col-span-7 overflow-hidden">
        <img className="absolute inset-0 h-full w-full object-cover" src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1600&q=85" alt="Warm luxury salon interior" />
        <div className="absolute bottom-5 left-5 border border-white/70 px-5 py-3 text-[10px] tracking-[.2em] uppercase text-white backdrop-blur-sm">An intimate beauty experience</div>
      </div>
    </section>
    <section id="salon-services" className="border-t border-[#302b28]/10 px-7 py-20 md:px-14">
      <div className="grid gap-12 md:grid-cols-2 md:items-end">
        <h2 className="font-serif text-5xl md:text-7xl leading-none">Beauty in<br/><em>every detail.</em></h2>
        <p className="max-w-sm text-sm leading-7 text-[#6e625d] md:justify-self-end">Illustrative service categories for a fictional salon. Final websites must use the customer's verified offerings.</p>
      </div>
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {[
          ["01 / Hair","https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=750&q=80"],
          ["02 / Skin","https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=750&q=80"],
          ["03 / Rituals","https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=750&q=80"]
        ].map(([label,img])=><div key={label}><div className="relative aspect-[3/4] overflow-hidden"><img src={img} alt="" className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"/></div><p className="mt-4 border-t border-[#302b28]/20 pt-3 font-serif text-2xl">{label}</p></div>)}
      </div>
    </section>
    <footer className="bg-[#463a34] px-7 py-14 text-[#f4eee7] md:px-14"><p className="font-serif text-5xl">GLOW.</p><p className="mt-4 text-xs tracking-widest uppercase opacity-75">Fictional design exploration — not a live salon</p></footer>
  </div>;
}

function Restaurant() {
  return <div className="bg-[#161b19] text-[#eee9df]">
    <header className="absolute inset-x-0 z-20 flex items-center justify-between px-7 py-7 md:px-14">
      <span className="font-serif text-3xl italic tracking-tight">morrow</span>
      <span className="hidden text-xs uppercase tracking-[.34em] md:block">A study in atmosphere</span>
      <a href="#restaurant-menu" className="text-xs uppercase tracking-[.2em] border border-[#eee9df]/50 px-5 py-3">Discover</a>
    </header>
    <section className="relative flex min-h-[740px] items-end overflow-hidden">
      <img className="absolute inset-0 h-full w-full object-cover" src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1900&q=85" alt="Atmospheric restaurant interior" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#101715] via-[#101715]/35 to-[#101715]/40"/>
      <div className="relative w-full px-7 pb-20 md:px-14 md:pb-24">
        <div className="mb-10 flex items-center gap-4 text-[11px] uppercase tracking-[.3em]"><span className="h-px w-10 bg-[#e5d3ab]"/> An evening worth remembering</div>
        <h1 className="max-w-5xl font-serif text-[clamp(4.5rem,10vw,11rem)] leading-[.83] tracking-[-.065em]">Stay for<br/><em className="text-[#decba4]">the moment.</em></h1>
        <div className="mt-12 flex max-w-4xl flex-col gap-8 border-t border-white/40 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="max-w-sm text-base leading-7 text-[#efeae1]/85">A fictional dining experience inspired by the beauty of slowing down.</p>
          <a href="#restaurant-menu" className="w-fit border-b border-[#e5d3ab] pb-2 text-xs uppercase tracking-[.25em]">Explore the experience</a>
        </div>
      </div>
    </section>
    <section id="restaurant-menu" className="grid gap-10 px-7 py-24 md:px-14 lg:grid-cols-2 lg:items-center">
      <div className="max-w-lg">
        <p className="mb-8 text-xs uppercase tracking-[.28em] text-[#e5d3ab]">The philosophy</p>
        <h2 className="font-serif text-6xl leading-[1.05] md:text-8xl">There is<br/><em>beauty in</em><br/>the pause.</h2>
        <p className="mt-9 max-w-sm leading-8 text-[#eee9df]/70">This is a design concept only. Menus, reservations, hours and addresses must come from verified business information.</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <img className="mt-16 h-[400px] w-full object-cover" src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=850&q=85" alt="Fine dining plated dish"/>
        <img className="h-[400px] w-full object-cover" src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=850&q=85" alt="Fresh culinary ingredients"/>
      </div>
    </section>
    <footer className="border-t border-white/20 px-7 py-12 md:px-14"><span className="font-serif text-5xl italic">morrow.</span><p className="mt-4 text-xs uppercase tracking-widest text-white/60">Fictional restaurant — visual benchmark</p></footer>
  </div>;
}

function IT() {
  return <div className="bg-[#e7edf0] text-[#12253b]">
    <header className="flex items-center justify-between border-b border-[#12253b]/15 px-6 py-6 md:px-14">
      <span className="text-2xl font-bold tracking-[-.07em]">NEXORA<span className="text-[#ef5e42]">/</span></span>
      <span className="hidden text-[11px] uppercase tracking-[.25em] md:block">Independent technology thinking</span>
      <a href="#it-services" className="rounded-full border border-[#12253b] px-5 py-3 text-xs font-semibold uppercase tracking-wider">Our approach</a>
    </header>
    <section className="relative min-h-[680px] overflow-hidden px-6 pb-20 pt-28 md:px-14">
      <div className="pointer-events-none absolute -right-28 top-4 h-[720px] w-[720px] rounded-full border-[110px] border-[#d0dce5] opacity-80" />
      <div className="pointer-events-none absolute right-0 top-44 h-[420px] w-[420px] rounded-full border-[80px] border-[#bbcddc]" />
      <div className="relative z-10 max-w-6xl">
        <p className="mb-10 w-fit rounded-full bg-[#d5e0e7] px-4 py-2 text-xs font-semibold tracking-[.2em] uppercase">Clarity at scale</p>
        <h1 className="max-w-5xl text-[clamp(4rem,8.4vw,9.5rem)] font-semibold leading-[.94] tracking-[-.09em]">Complexity,<br/><span className="italic font-normal text-[#ef5e42]">made clear.</span></h1>
        <div className="mt-14 grid max-w-3xl gap-9 border-t border-[#12253b]/30 pt-7 md:grid-cols-2">
          <p className="text-lg leading-8">Technology deserves better thinking. We create thoughtful systems for ambitious teams.</p>
          <a href="#it-services" className="flex h-fit w-fit items-center gap-5 rounded-full bg-[#12253b] px-7 py-4 text-sm font-semibold text-white">Explore expertise <span aria-hidden>↗</span></a>
        </div>
      </div>
    </section>
    <section id="it-services" className="bg-[#14283d] px-6 py-24 text-white md:px-14">
      <div className="flex flex-col gap-9 border-b border-white/20 pb-12 md:flex-row md:items-end md:justify-between">
        <div><p className="mb-6 text-xs tracking-[.3em] uppercase text-[#96b8d1]">Capabilities</p><h2 className="max-w-3xl text-5xl font-semibold tracking-[-.06em] md:text-7xl">Build what<br/>comes next.</h2></div>
        <p className="max-w-xs text-sm leading-7 text-[#c5d2dc]">Illustrative capabilities for a fictional technology services business.</p>
      </div>
      <div className="mt-6 grid md:grid-cols-3">
        {[
          ["01","Digital strategy","Ideas connected to business outcomes."],
          ["02","Cloud foundations","Infrastructure built for change."],
          ["03","Intelligent systems","Designed around people and purpose."]
        ].map(([num,title,desc])=><article key={num} className="border-b border-white/20 px-4 py-10 md:border-b-0 md:border-r last:border-r-0"><p className="mb-16 text-[#ef8a75] text-xs">{num} / 03</p><h3 className="text-3xl tracking-[-.04em]">{title}</h3><p className="mt-4 text-[#aebfc9] leading-7">{desc}</p></article>)}
      </div>
    </section>
    <footer className="px-6 py-12 md:px-14"><span className="text-3xl font-bold tracking-[-.06em]">NEXORA/</span><p className="mt-4 text-xs uppercase tracking-widest opacity-60">Fictional services — architecture benchmark</p></footer>
  </div>;
}

export default function QualityBenchmarkPage() {
  const [industry, setIndustry] = useState<Industry>("salon");
  return <main className="min-h-screen bg-[#0f1215]">
    <div className="sticky top-0 z-50 border-b border-white/15 bg-[#0f1215]/95 px-4 py-3 text-white backdrop-blur md:px-8">
      <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-3">
        <div><p className="text-sm font-semibold">FORMA / Quality Architecture Lab</p><p className="text-[11px] text-white/60">Three hand-authored reference compositions. NOT AI-generated results.</p></div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Choose demonstration industry">
          {(Object.keys(cases) as Industry[]).map((key)=><button key={key} type="button" aria-pressed={industry===key} onClick={()=>setIndustry(key)} className={`rounded-full px-4 py-2 text-xs font-semibold transition ${industry===key ? "bg-white text-[#101214]" : "border border-white/30 text-white hover:bg-white/15"}`}>{cases[key].label}</button>)}
        </div>
      </div>
    </div>
    <div className="mx-auto max-w-[1600px]"><div className="bg-[#f4f2ec] px-6 py-3 text-xs text-[#343a40]">{cases[industry].brief} <strong>Reference layout only; no generation engine or factual business content.</strong></div>
      {industry==="salon" ? <Salon/> : industry==="restaurant" ? <Restaurant/> : <IT/>}
    </div>
  </main>;
}
