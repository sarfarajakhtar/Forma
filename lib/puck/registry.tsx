import type { Config } from "@puckeditor/core";
import React from "react";

/**
 * Step 1 demonstration components, not the final design library.
 * No AI, network calls, database, or publishing actions.
 */
export const puckConfig: Config = {
  components: {
    HeroImage: {
      label: "Image hero",
      fields: {
        headline: { type: "text" },
        subheadline: { type: "textarea" },
        imageUrl: { type: "text" },
        imageAlt: { type: "text" },
        ctaText: { type: "text" },
        ctaHref: { type: "text" },
      },
      render: ({ headline, subheadline, imageUrl, imageAlt, ctaText, ctaHref }) => (
        <section className="relative isolate flex min-h-[85svh] items-center overflow-hidden bg-slate-950 text-white">
          <img src={imageUrl} alt={imageAlt} className="absolute inset-0 -z-20 h-full w-full object-cover" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-slate-950/10" />
          <div className="mx-auto w-full max-w-7xl px-6 py-28 md:px-12">
            <div className="max-w-3xl">
              <h1 className="text-5xl font-semibold leading-tight tracking-tight sm:text-6xl lg:text-7xl">{headline}</h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-100 sm:text-xl">{subheadline}</p>
              <a href={ctaHref} className="mt-10 inline-block rounded bg-white px-7 py-4 font-semibold text-slate-950 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-white">{ctaText}</a>
            </div>
          </div>
        </section>
      ),
    },
    FeaturesBento: {
      label: "Asymmetric features",
      fields: {
        title: { type: "text" },
        items: {
          type: "array",
          getItemSummary: (item) => item.title || "Feature",
          arrayFields: {
            title: { type: "text" },
            description: { type: "textarea" },
            imageUrl: { type: "text" },
            imageAlt: { type: "text" },
          },
        },
      },
      render: ({ title, items }) => (
        <section id="services" className="bg-stone-50 py-20 text-stone-950 sm:py-28">
          <div className="mx-auto max-w-7xl px-6 md:px-12">
            <h2 className="mb-12 max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
              {items.map((item: { title: string; description: string; imageUrl: string; imageAlt: string }, index: number) => (
                <article key={index} className={`group relative min-h-[320px] overflow-hidden rounded-xl bg-stone-800 md:min-h-[400px] ${index === 0 ? "md:col-span-8" : "md:col-span-4"}`}>
                  <img src={item.imageUrl} alt={item.imageAlt} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
                    <h3 className="text-2xl font-semibold">{item.title}</h3>
                    <p className="mt-2 max-w-md leading-relaxed text-white/90">{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ),
    },
    FooterMinimal: {
      label: "Minimal footer",
      fields: {
        brandName: { type: "text" },
        email: { type: "text" },
        address: { type: "textarea" },
      },
      render: ({ brandName, email, address }) => (
        <footer id="contact" className="bg-stone-950 px-6 py-16 text-stone-100 md:px-12">
          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 sm:flex-row">
            <h2 className="text-3xl font-semibold">{brandName}</h2>
            <div className="space-y-2 text-sm">
              {email && <p><a className="underline underline-offset-4" href={`mailto:${email}`}>{email}</a></p>}
              {address && <p>{address}</p>}
            </div>
          </div>
        </footer>
      ),
    },
  },
};
