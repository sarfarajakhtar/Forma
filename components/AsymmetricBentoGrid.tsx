import React from "react";

interface BentoItem {
  title: string;
  description: string;
  imageUrl: string;
  isLarge?: boolean;
}

interface AsymmetricBentoGridProps {
  sectionTitle: string;
  items: BentoItem[];
}

export default function AsymmetricBentoGrid({ sectionTitle, items }: AsymmetricBentoGridProps) {
  return (
    <section className="py-24 md:py-32 bg-[#f8f6f0]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <h2 className="text-4xl md:text-6xl font-serif text-gray-900 mb-16 max-w-3xl leading-tight">
          {sectionTitle}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {items.map((item, index) => {
            // Create asymmetric layout logic
            let colSpan = "md:col-span-4"; // Default small
            if (index === 0) colSpan = "md:col-span-8 md:row-span-2"; // First item is huge
            if (index === 1) colSpan = "md:col-span-4"; // Second is small
            if (index === 2) colSpan = "md:col-span-4"; // Third is small

            return (
              <div 
                key={index} 
                className={`group relative overflow-hidden rounded-xl bg-white ${colSpan} min-h-[300px] md:min-h-[400px] shadow-sm`}
              >
                <div className="absolute inset-0">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                </div>
                <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
                  <h3 className="text-2xl md:text-3xl font-serif text-white mb-2">{item.title}</h3>
                  <p className="text-white/80 text-sm md:text-base max-w-md">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
