/** Fictional demonstration content. No real business claims or contact details. */
export const sampleBlueprint = {
  root: { props: {} },
  zones: {},
  content: [
    {
      type: "HeroImage",
      props: {
        id: "hero-demo-1",
        headline: "Design without compromise.",
        subheadline: "A sample page demonstrating the Puck rendering and validation architecture.",
        imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
        imageAlt: "Sunlit modern studio",
        ctaText: "Explore capabilities",
        ctaHref: "#services",
      },
    },
    {
      type: "FeaturesBento",
      props: {
        id: "features-demo-1",
        title: "A modular starting point.",
        items: [
          { title: "Composition", description: "Flexible blocks assembled from structured page data.", imageUrl: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=80", imageAlt: "Modern work space" },
          { title: "Typography", description: "Readable hierarchy across devices.", imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80", imageAlt: "Bright collaborative office" },
          { title: "Media", description: "Images with dedicated descriptions and responsive cropping.", imageUrl: "https://images.unsplash.com/photo-1497366858526-0766cadbe8fa?auto=format&fit=crop&w=900&q=80", imageAlt: "Contemporary interior" },
        ],
      },
    },
    {
      type: "FooterMinimal",
      props: {
        id: "footer-demo-1",
        brandName: "Forma · Test fixture",
        email: "",
      },
    },
  ],
};
