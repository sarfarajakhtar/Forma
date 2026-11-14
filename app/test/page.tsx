import CinematicVideoHero from "../../components/CinematicVideoHero";
import AsymmetricBentoGrid from "../../components/AsymmetricBentoGrid";
import EditorialFeatureList from "../../components/EditorialFeatureList";

export default function TestPage() {
  return (
    <main>
      <CinematicVideoHero 
        brandName="Lumina Skin & Wellness"
        headline="Redefining the art of aesthetic wellness."
        subheadline="A luxury medical spa experience designed for those who demand excellence."
        videoUrl="https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-tropical-beach-1089-large.mp4"
        ctaText="Explore Treatments"
      />

      <div className="h-24 md:h-32"></div> {/* Spacer for the floating widget */}

      <AsymmetricBentoGrid 
        sectionTitle="Curated treatments for your unique beauty."
        items={[
          { title: "Botox & Fillers", description: "Precision injectables to restore volume and smooth fine lines.", imageUrl: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=80" },
          { title: "Laser Resurfacing", description: "Advanced skin renewal for a flawless, radiant complexion.", imageUrl: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=800&q=80" },
          { title: "Wellness", description: "Holistic care plans tailored to your body's needs.", imageUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80" }
        ]}
      />

      <EditorialFeatureList 
        sectionTitle="The Lumina Standard"
        features={[
          { number: "01", title: "Expert Practitioners", description: "Board-certified specialists with years of aesthetic experience." },
          { number: "02", title: "Bespoke Care", description: "No two faces are the same. We build custom treatment plans for every client." },
          { number: "03", title: "Uncompromising Safety", description: "Using only FDA-approved technology and medical-grade products." }
        ]}
      />
    </main>
  );
}
