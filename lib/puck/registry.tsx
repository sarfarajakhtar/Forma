"use client";
import type { Config } from "@puckeditor/core";
import React from "react";
import { motion } from "framer-motion";

export const puckConfig: Config = {
  components: {
    HeroCinematic: {
      label: "Cinematic Hero (Gym/Cinema)",
      fields: {
        headline: { type: "text" },
        subheadline: { type: "textarea" },
        imageUrl: { type: "text" },
        ctaText: { type: "text" },
      },
      render: ({ headline, subheadline, imageUrl, ctaText }) => (
        <section className="relative isolate flex min-h-[90svh] items-center overflow-hidden bg-slate-950 text-white">
          <img src={imageUrl} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-60" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          <div className="mx-auto w-full max-w-7xl px-6 py-32 md:px-12">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }} className="max-w-4xl">
              <h1 className="text-5xl font-bold uppercase leading-[0.95] tracking-tighter sm:text-7xl lg:text-8xl">{headline}</h1>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-slate-200 sm:text-2xl font-light">{subheadline}</p>
              <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.8 }} className="mt-12 rounded-full bg-white px-10 py-5 text-sm font-bold uppercase tracking-widest text-slate-950 transition-transform hover:scale-105">
                {ctaText}
              </motion.button>
            </motion.div>
          </div>
        </section>
      ),
    },
    HeroSplit: {
      label: "Split Hero (Law/Tech/Corporate)",
      fields: {
        headline: { type: "text" },
        subheadline: { type: "textarea" },
        imageUrl: { type: "text" },
        ctaText: { type: "text" },
      },
      render: ({ headline, subheadline, imageUrl, ctaText }) => (
        <section className="relative isolate flex min-h-[85svh] items-center bg-white text-stone-950">
          <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-6 py-24 md:grid-cols-2 md:px-12 md:py-0">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="flex flex-col justify-center">
              <h1 className="text-5xl font-serif leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl">{headline}</h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-stone-600 sm:text-xl">{subheadline}</p>
              <div className="mt-10">
                <button className="rounded-none border border-stone-900 bg-stone-900 px-8 py-4 text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-transparent hover:text-stone-900">{ctaText}</button>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative h-[500px] md:h-[700px] w-full">
               <img src={imageUrl} alt="" className="absolute inset-0 h-full w-full object-cover shadow-2xl" />
            </motion.div>
          </div>
        </section>
      ),
    },
    FeaturesBento: {
      label: "Bento Grid Features (Visual)",
      fields: {
        title: { type: "text" },
        items: {
          type: "array",
          getItemSummary: (item) => item.title || "Feature",
          arrayFields: {
            title: { type: "text" },
            description: { type: "textarea" },
            imageUrl: { type: "text" },
          },
        },
      },
      render: ({ title, items }) => (
        <section id="services" className="bg-stone-50 py-24 text-stone-950 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 md:px-12">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16 max-w-4xl text-4xl font-serif tracking-tight sm:text-6xl">{title}</motion.h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {items.map((item: any, index: number) => (
                <motion.article initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} key={index} className="group relative min-h-[400px] overflow-hidden rounded-sm bg-stone-800">
                  <img src={item.imageUrl} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-8 text-white">
                    <h3 className="text-2xl font-serif font-medium">{item.title}</h3>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-white/80">{item.description}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      ),
    },
    FeaturesTimeline: {
      label: "Editorial Timeline (Process)",
      fields: {
        title: { type: "text" },
        items: {
          type: "array",
          getItemSummary: (item) => item.title || "Step",
          arrayFields: {
            num: { type: "text" },
            title: { type: "text" },
            description: { type: "textarea" },
          },
        },
      },
      render: ({ title, items }) => (
        <section className="bg-stone-950 py-24 text-white sm:py-32">
          <div className="mx-auto max-w-7xl px-6 md:px-12">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-24 text-4xl font-serif tracking-tight sm:text-6xl">{title}</motion.h2>
            <div className="grid grid-cols-1 gap-16 md:grid-cols-3 md:border-t-2 md:border-white/10 md:pt-16">
              {items.map((item: any, index: number) => (
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.2 }} key={index} className="relative">
                  <span className="mb-8 block text-8xl font-serif italic text-white/10">{item.num}</span>
                  <h3 className="mb-4 text-3xl font-bold uppercase tracking-tight text-white">{item.title}</h3>
                  <p className="text-lg leading-relaxed text-stone-400 font-light">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      ),
    },
    FooterMinimal: {
      label: "Mega Footer",
      fields: {
        brandName: { type: "text" },
        email: { type: "text" },
        address: { type: "textarea" },
      },
      render: ({ brandName, email, address }) => (
        <footer id="contact" className="bg-stone-950 px-6 py-24 text-stone-100 md:px-12">
          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-12 border-b border-white/10 pb-16 sm:flex-row">
            <h2 className="text-6xl font-bold uppercase tracking-tighter md:text-8xl">{brandName}</h2>
            <div className="space-y-4 text-lg font-light text-stone-400">
              {email && <p><a className="transition-colors hover:text-white" href={`mailto:${email}`}>{email}</a></p>}
              {address && <p className="max-w-xs">{address}</p>}
            </div>
          </div>
          <div className="mx-auto mt-8 max-w-7xl text-xs uppercase tracking-widest text-stone-600">
            © {new Date().getFullYear()} {brandName}. All rights reserved.
          </div>
        </footer>
      ),
    },
  },
};
