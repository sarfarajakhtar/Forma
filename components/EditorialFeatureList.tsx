import React from "react";

interface FeatureItem {
  number: string;
  title: string;
  description: string;
}

interface EditorialFeatureListProps {
  sectionTitle: string;
  features: FeatureItem[];
}

export default function EditorialFeatureList({ sectionTitle, features }: EditorialFeatureListProps) {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <h2 className="text-4xl md:text-6xl font-serif text-gray-900 mb-16 max-w-3xl leading-tight text-center mx-auto">
          {sectionTitle}
        </h2>

        <div className="flex flex-col border-t border-gray-200">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group flex flex-col md:flex-row items-start md:items-center py-10 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-300 px-4 md:px-8"
            >
              <div className="text-6xl md:text-8xl font-serif text-gray-200 font-light w-32 md:w-48 shrink-0 transition-colors duration-300 group-hover:text-black">
                {feature.number}
              </div>
              <div className="flex-1 mt-4 md:mt-0">
                <h3 className="text-2xl md:text-3xl font-medium text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-lg max-w-2xl">{feature.description}</p>
              </div>
              <div className="mt-6 md:mt-0 ml-0 md:ml-8">
                <button className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center group-hover:border-black group-hover:bg-black group-hover:text-white transition-all duration-300">
                  →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
