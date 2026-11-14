import React from "react";

export default function TestPage() {
  return (
    <main className="font-sans antialiased bg-[#f8f6f0] text-[#1a1a1a]">
      {/* Load Fonts for the test */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Inter:wght@300;400;500;600&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
      `}} />

      {/* 1. CINEMATIC VIDEO HERO */}
      <section className="relative w-full h-[95vh] flex items-center justify-center overflow-hidden">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0">
          <source src="https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-tropical-beach-1089-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-[#f8f6f0] z-10"></div>
        
        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-start justify-center h-full pt-20">
          <p className="text-white/80 tracking-[0.3em] uppercase text-xs md:text-sm font-medium mb-6">Lumina Skin & Wellness</p>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif text-white leading-[1.05] max-w-5xl tracking-tight mb-8">
            Redefining the art of aesthetic wellness.
          </h1>
          <button className="bg-white text-black px-10 py-5 rounded-none uppercase tracking-widest text-xs font-semibold hover:bg-gray-200 transition-colors duration-300">
            Explore Treatments
          </button>
        </div>

        {/* Floating Overlapping Widget */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-30 w-[90%] max-w-6xl bg-white shadow-2xl rounded-xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 border border-gray-100">
          <div className="flex-1">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">Ready to start?</h3>
            <p className="text-2xl md:text-3xl font-serif text-gray-900">Book your private consultation today.</p>
          </div>
          <div className="flex w-full md:w-auto gap-4">
            <input type="email" placeholder="Enter your email" className="border-b border-gray-300 rounded-none px-2 py-4 w-full md:w-64 focus:outline-none focus:border-black bg-transparent" />
            <button className="bg-black text-white px-8 py-4 uppercase tracking-widest text-xs font-semibold hover:bg-gray-800 transition-colors">Submit</button>
          </div>
        </div>
      </section>

      <div className="h-32 md:h-48 bg-[#f8f6f0]"></div>

      {/* 2. STATS BAR */}
      <section className="bg-[#f8f6f0] pb-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { num: "15+", label: "Years Experience" },
            { num: "5k", label: "Happy Clients" },
            { num: "20", label: "Expert Doctors" },
            { num: "100%", label: "Satisfaction" }
          ].map((stat, i) => (
            <div key={i} className="border-l border-gray-300 first:border-0 pl-4 md:pl-0">
              <p className="text-4xl md:text-5xl font-serif text-gray-900 mb-2">{stat.num}</p>
              <p className="text-xs uppercase tracking-widest text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. ASYMMETRIC ABOUT */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-5">
            <p className="text-xs uppercase tracking-widest text-gray-500 mb-4">Our Philosophy</p>
            <h2 className="text-4xl md:text-6xl font-serif leading-tight mb-8">A sanctuary for your skin.</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">We believe that true beauty radiates from within. Our approach combines cutting-edge medical science with a deeply relaxing, holistic experience.</p>
            <button className="border border-black text-black px-8 py-4 uppercase tracking-widest text-xs font-semibold hover:bg-black hover:text-white transition-colors">About Us</button>
          </div>
          <div className="md:col-span-6 md:col-start-7 relative h-[600px]">
            <img src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80" className="w-full h-full object-cover rounded-2xl shadow-xl" alt="Spa" />
            <div className="absolute -bottom-8 -left-8 bg-[#e8e4db] p-10 rounded-xl shadow-lg hidden md:block">
              <p className="font-serif text-3xl mb-2">100%</p>
              <p className="text-xs uppercase tracking-widest text-gray-700">Organic Products</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ASYMMETRIC BENTO GRID */}
      <section className="py-32 bg-[#f8f6f0]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="text-4xl md:text-6xl font-serif mb-16 max-w-3xl leading-tight">Curated treatments for your unique beauty.</h2>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-8 group relative overflow-hidden rounded-2xl min-h-[500px]">
              <img src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=80" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Botox" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-0 p-10">
                <h3 className="text-3xl font-serif text-white mb-2">Botox & Fillers</h3>
                <p className="text-white/80 max-w-md">Precision injectables to restore volume and smooth fine lines.</p>
              </div>
            </div>
            <div className="md:col-span-4 group relative overflow-hidden rounded-2xl min-h-[500px]">
              <img src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Laser" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-0 p-10">
                <h3 className="text-2xl font-serif text-white mb-2">Laser Resurfacing</h3>
                <p className="text-white/80 text-sm">Advanced skin renewal.</p>
              </div>
            </div>
            <div className="md:col-span-5 group relative overflow-hidden rounded-2xl min-h-[400px]">
              <img src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Wellness" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-0 p-10">
                <h3 className="text-2xl font-serif text-white mb-2">IV Therapy</h3>
              </div>
            </div>
            <div className="md:col-span-7 bg-white p-12 rounded-2xl flex flex-col justify-center shadow-sm">
              <h3 className="text-3xl font-serif mb-4">Bespoke Wellness Plans</h3>
              <p className="text-gray-600 mb-8">Every treatment is tailored to your specific skin type, goals, and lifestyle. We don't believe in one-size-fits-all.</p>
              <a href="#" className="text-black uppercase tracking-widest text-xs font-bold border-b border-black pb-1 self-start hover:text-gray-500 hover:border-gray-500 transition-colors">View All Services</a>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FULL WIDTH PARALLAX CTA */}
      <section className="relative py-40 bg-fixed bg-center bg-cover" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80')` }}>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl md:text-7xl font-serif text-white mb-8 leading-tight">Experience the Lumina difference.</h2>
          <p className="text-xl text-white/80 mb-12">Step into a world of relaxation and aesthetic excellence.</p>
          <button className="bg-white text-black px-12 py-5 uppercase tracking-widest text-sm font-semibold hover:bg-gray-200 transition-colors">Book Appointment</button>
        </div>
      </section>

      {/* 6. EDITORIAL NUMBERED LIST */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="text-4xl md:text-6xl font-serif text-center mb-20">The Lumina Standard</h2>
          <div className="flex flex-col border-t border-gray-200">
            {[
              { num: "01", title: "Expert Practitioners", desc: "Board-certified specialists with years of aesthetic experience." },
              { num: "02", title: "Bespoke Care", desc: "No two faces are the same. We build custom treatment plans." },
              { num: "03", title: "Uncompromising Safety", desc: "Using only FDA-approved technology and medical-grade products." }
            ].map((item, i) => (
              <div key={i} className="group flex flex-col md:flex-row items-start md:items-center py-12 border-b border-gray-200 hover:bg-gray-50 transition-colors px-4 md:px-8 cursor-pointer">
                <div className="text-7xl md:text-9xl font-serif text-gray-200 font-light w-32 md:w-64 shrink-0 transition-colors group-hover:text-black">{item.num}</div>
                <div className="flex-1 mt-4 md:mt-0">
                  <h3 className="text-2xl md:text-4xl font-serif mb-4">{item.title}</h3>
                  <p className="text-gray-500 text-lg max-w-2xl">{item.desc}</p>
                </div>
                <div className="mt-6 md:mt-0 text-2xl group-hover:translate-x-4 transition-transform">→</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. DARK TESTIMONIALS */}
      <section className="py-32 bg-[#1a1a1a] text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-12">What our clients say</p>
          <h2 className="text-3xl md:text-5xl font-serif leading-tight max-w-4xl mx-auto mb-10 italic">
            "An absolutely transformative experience. The staff is incredible, and the results speak for themselves."
          </h2>
          <p className="text-sm uppercase tracking-widest text-gray-400">— Sarah Jenkins, Austin TX</p>
          
          <div className="flex justify-center gap-4 mt-16">
            <div className="w-3 h-3 rounded-full bg-white"></div>
            <div className="w-3 h-3 rounded-full bg-white/20"></div>
            <div className="w-3 h-3 rounded-full bg-white/20"></div>
          </div>
        </div>
      </section>

      {/* 8. MASONRY GALLERY */}
      <section className="py-32 bg-[#f8f6f0]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <img src="https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=600&q=80" className="w-full h-64 md:h-96 object-cover rounded-xl" alt="Gallery 1" />
            <img src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=600&q=80" className="w-full h-64 md:h-96 object-cover rounded-xl md:mt-12" alt="Gallery 2" />
            <img src="https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&w=600&q=80" className="w-full h-64 md:h-96 object-cover rounded-xl" alt="Gallery 3" />
            <img src="https://images.unsplash.com/photo-1598440947619-2c3f80f2b136?auto=format&fit=crop&w=600&q=80" className="w-full h-64 md:h-96 object-cover rounded-xl md:mt-12" alt="Gallery 4" />
          </div>
        </div>
      </section>

      {/* 9. FAQ ACCORDION */}
      <section className="py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <h2 className="text-4xl md:text-5xl font-serif text-center mb-16">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              { q: "Do I need a consultation before booking a treatment?", a: "Yes, for all injectable and laser treatments, we require a brief consultation to ensure safety and optimal results." },
              { q: "What is your cancellation policy?", a: "We require 24 hours notice for cancellations to avoid a fee. We understand life happens, but this helps us respect our practitioners' time." },
              { q: "Are your treatments painful?", a: "We prioritize your comfort. Most treatments involve minimal discomfort, and we offer numbing creams and cooling devices." }
            ].map((faq, i) => (
              <details key={i} className="group border-b border-gray-200 pb-6 cursor-pointer">
                <summary className="text-xl font-medium list-none flex justify-between items-center">
                  {faq.q}
                  <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-4 text-gray-600">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 10. SPLIT CTA */}
      <section className="bg-[#e8e4db]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2">
          <div className="p-16 md:p-32 flex flex-col justify-center">
            <h2 className="text-4xl md:text-6xl font-serif mb-6">Ready to glow?</h2>
            <p className="text-gray-700 text-lg mb-10">Book your appointment online in under 2 minutes.</p>
            <button className="bg-black text-white px-10 py-5 uppercase tracking-widest text-sm font-semibold hover:bg-gray-800 transition-colors self-start">Book Now</button>
          </div>
          <div className="h-[400px] md:h-auto">
            <img src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1000&q=80" className="w-full h-full object-cover" alt="CTA" />
          </div>
        </div>
      </section>

      {/* 11. MEGA FOOTER */}
      <footer className="bg-[#111] text-white pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white/10 pb-16">
          <div className="md:col-span-2">
            <h3 className="font-serif text-3xl mb-4">Lumina Skin & Wellness</h3>
            <p className="text-white/50 text-sm max-w-xs mb-8">A luxury medical spa dedicated to enhancing your natural beauty.</p>
            <p className="text-white/50 text-sm">742 Evergreen Terrace, Suite 200<br/>Austin, TX 78704</p>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest text-white/40 mb-6">Explore</h4>
            <ul className="space-y-4 text-sm text-white/80">
              <li><a href="#" className="hover:text-white transition-colors">Treatments</a></li>
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest text-white/40 mb-6">Contact</h4>
            <ul className="space-y-4 text-sm text-white/80">
              <li>(512) 555-0198</li>
              <li>hello@luminaskin.com</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-white/30">
          <p>© 2026 Lumina Skin & Wellness. All rights reserved.</p>
          <p className="mt-4 md:mt-0">Designed by Forma</p>
        </div>
      </footer>

    </main>
  );
}
