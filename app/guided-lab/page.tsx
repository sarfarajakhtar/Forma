"use client";
import { useMemo, useState } from "react";

type Industry = "salon" | "restaurant" | "it";
type Question = { key: string; title: string; options: string[]; multiple?: boolean };
const questionSets: Record<Industry, Question[]> = {
  salon: [
    { key:"services",title:"Which salon services do you offer?", options:["Hair styling and coloring","Nails","Facials and skin care","Makeup and bridal","Henna","Spa treatments"],multiple:true },
    { key:"audience",title:"Who is your salon for?",options:["Women","Men","Everyone","Specialist audience"] },
    { key:"style",title:"Which visual direction suits your brand?",options:["Quiet luxury","Soft and warm","Contemporary minimal","Bold editorial"] },
    { key:"booking",title:"How should customers enquire or book?",options:["WhatsApp enquiries","Booking form","Both","Enquiry only"] },
    { key:"details",title:"Are your contact details ready?",options:["I will provide verified details later","I have details ready"] },
  ],
  restaurant: [
    { key:"experience",title:"What kind of dining do you offer?", options:["Fine dining","Casual dining","Cafe and bakery","Family restaurant","Chef's tasting experience"] },
    { key:"food",title:"Which cuisine best describes your menu?",options:["International","Indian","Arabic","Italian","Asian","Other"] },
    { key:"style",title:"Which visual direction suits your restaurant?",options:["Cinematic and atmospheric","Warm and rustic","Elegant editorial","Bright and playful"] },
    { key:"booking",title:"What should guests be able to do?",options:["View menu","Request a reservation","Both","Send an enquiry"] },
    { key:"details",title:"Are your menu, hours, and location verified?",options:["I will supply them later","I have them ready"] },
  ],
  it: [
    { key:"services",title:"Which services do you provide?", options:["IT consulting","Cloud and infrastructure","Cybersecurity","Software delivery","AI automation","Managed services"],multiple:true },
    { key:"audience",title:"Who are your customers?",options:["Small businesses","Mid-sized enterprises","Large enterprises","Multiple segments"] },
    { key:"style",title:"Which design direction suits your company?",options:["Confident and minimal","Bold technology editorial","Institutional and trustworthy","Contemporary and human"] },
    { key:"conversion",title:"What is the main action for visitors?",options:["Request consultation","Book a demo","Send an enquiry","Explore services"] },
    { key:"details",title:"Are your business claims and contact details verified?",options:["I will supply them later","I have them ready"] },
  ],
};
const industries: {id:Industry;label:string;pattern:RegExp}[]=[
  {id:"salon",label:"Salon / beauty",pattern:/salon|beauty|spa|nail|hair|skincare|makeup/i},
  {id:"restaurant",label:"Restaurant / cafe",pattern:/restaurant|cafe|coffee|dining|bakery|food|bistro/i},
  {id:"it",label:"IT / technology",pattern:/\bIT\b|technology|software|cloud|cyber|consulting|tech services|digital/i},
];
export default function GuidedLab() {
  const [description,setDescription] = useState("");
  const [industry,setIndustry] = useState<Industry|null>(null);
  const [step,setStep] = useState(0);
  const [answers,setAnswers] = useState<Record<string,string[]>>({});
  const [verified,setVerified] = useState("");
  const [finished,setFinished] = useState(false);
  const questions = industry ? questionSets[industry] : [];
  const q = questions[step];
  const detected = useMemo(()=>industries.find(i=>i.pattern.test(description))?.id ?? null,[description]);
  const start = () => {if(!description.trim())return;setIndustry(detected ?? "it");setStep(0);setAnswers({});setFinished(false);};
  const choose=(answer:string)=>{
    const old=answers[q.key]??[];
    const next=q.multiple ? (old.includes(answer)?old.filter(x=>x!==answer):[...old,answer]) : [answer];
    setAnswers({...answers,[q.key]:next});
  };
  const next=()=>{ if(step<questions.length-1)setStep(step+1);else setFinished(true);};
  const clean = {
    industry, description:description.trim(), answers,
    suppliedBusinessFacts: verified.trim() || null,
    status:"Local mock only; no AI request, generation, payment or publication",
  };
  return <main className="min-h-screen bg-[#f4f4f6] px-4 py-12 text-[#1b2431] sm:px-6">
    <div className="mx-auto max-w-3xl">
      <div className="mb-8"><p className="mb-2 text-xs font-semibold uppercase tracking-[.24em] text-[#64748b]">Forma / guided creation lab</p><h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">From an idea to a clearer brief.</h1><p className="mt-3 max-w-2xl text-[#5b6574]">A free, deterministic prototype of the customer onboarding flow. It does not call AI or generate a website.</p></div>
      {!industry ? <section className="rounded-2xl bg-white p-6 shadow-sm sm:p-9">
        <label className="block text-sm font-semibold" htmlFor="brief">Describe your business</label>
        <textarea id="brief" value={description} onChange={e=>setDescription(e.target.value)} placeholder="Glow salon based in Muscat, Oman" className="mt-4 h-36 w-full resize-y rounded-xl border border-[#d6dce4] p-4 outline-offset-2 focus:outline-[#4869a0]"/>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-4"><p className="text-sm text-[#64748b]">Detected industry: <strong>{detected ? industries.find(i=>i.id===detected)?.label : "General / IT fallback (prototype only)"}</strong></p><button onClick={start} disabled={!description.trim()} className="rounded-lg bg-[#1c375b] px-7 py-3 text-sm font-semibold text-white disabled:opacity-40">Continue →</button></div>
      </section> : !finished ? <section className="rounded-2xl bg-white p-6 shadow-sm sm:p-9">
        <div className="mb-6 flex items-center justify-between gap-4"><span className="text-xs font-semibold uppercase tracking-[.18em] text-[#728194]">{industries.find(i=>i.id===industry)?.label} • Question {step+1} of {questions.length}</span><button className="text-sm text-[#64748b] underline" onClick={()=>{setIndustry(null);setAnswers({});}}>Restart</button></div>
        <div className="mb-7 h-1.5 rounded-full bg-[#e8edf3]"><div className="h-full rounded-full bg-[#1c375b] transition-all" style={{width:`${((step+1)/questions.length)*100}%`}}/></div>
        <h2 className="mb-2 text-2xl font-semibold">{q.title}</h2><p className="mb-6 text-sm text-[#728194]">{q.multiple?"Select any that apply.":"Choose the most relevant option."} You may skip.</p>
        <div className="space-y-3">{q.options.map(a=><button key={a} onClick={()=>choose(a)} aria-pressed={(answers[q.key]??[]).includes(a)} className={`flex w-full items-center justify-between rounded-xl border px-5 py-4 text-left transition ${(answers[q.key]??[]).includes(a)?"border-[#1c375b] bg-[#eef3fa]":"border-[#e3e7ed] hover:bg-[#f7f9fc]"}`}><span>{a}</span><span aria-hidden>{(answers[q.key]??[]).includes(a)?"✓":"○"}</span></button>)}</div>
        <div className="mt-8 flex items-center justify-between gap-4"><button onClick={()=>setStep(Math.max(0,step-1))} disabled={step===0} className="text-sm text-[#637084] disabled:opacity-30">← Previous</button><button onClick={next} className="rounded-lg bg-[#1c375b] px-7 py-3 text-sm font-semibold text-white">{step===questions.length-1?"Review brief →":"Next →"}</button></div>
      </section> : <section className="rounded-2xl bg-white p-6 shadow-sm sm:p-9">
        <h2 className="text-2xl font-semibold">Your structured business brief</h2><p className="mt-2 text-sm leading-6 text-[#64748b]">We prefill what you already gave us and never invent contact details, testimonials, credentials or statistics.</p>
        <div className="mt-6 rounded-xl bg-[#f1f5f9] p-5 text-sm"><strong>Business prompt</strong><p className="mt-2">{description}</p>{questions.map(item=><div key={item.key} className="mt-4 border-t border-[#dfe5ec] pt-3"><p className="font-semibold">{item.title}</p><p className="mt-1 text-[#5d6877]">{answers[item.key]?.join(", ")||"Not provided"}</p></div>)}</div>
        <label htmlFor="facts" className="mt-6 block text-sm font-semibold">Verified business information (optional)</label><textarea id="facts" value={verified} onChange={e=>setVerified(e.target.value)} placeholder="Only provide genuine business details, such as your services, contact information, address, and hours." className="mt-3 h-28 w-full rounded-xl border border-[#d6dce4] p-4"/>
        <details className="mt-4"><summary className="cursor-pointer text-sm font-semibold">View structured brief (JSON)</summary><pre className="mt-3 overflow-auto rounded-lg bg-[#172338] p-4 text-xs text-white">{JSON.stringify(clean,null,2)}</pre></details>
        <div className="mt-6 flex flex-wrap gap-3"><button onClick={()=>{setFinished(false);setStep(0);}} className="rounded-lg border border-[#1c375b] px-5 py-3 text-sm">Edit answers</button><a href="/quality-benchmark" className="rounded-lg bg-[#1c375b] px-5 py-3 text-sm font-semibold text-white">View hand-authored design references →</a></div>
        <p className="mt-5 text-xs text-[#64748b]">Prototype ends here. No AI engine is connected; no website is published.</p>
      </section>}
    </div>
  </main>;
}