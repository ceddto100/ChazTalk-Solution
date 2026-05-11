import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { PricingPreview } from "@/components/sections/PricingPreview";
import { Testimonials } from "@/components/sections/Testimonials";
import { RoiSection } from "@/components/sections/RoiSection";
import { DemoSection } from "@/components/sections/DemoSection";
import { Faq } from "@/components/sections/Faq";
import { CtaSection } from "@/components/sections/CtaSection";
import { site } from "@/content/site";
import { SITE_URL } from "@/lib/utils";

export default function HomePage() {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: SITE_URL,
    description: site.description,
    sameAs: [site.socials.linkedin],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: site.contactEmail,
        areaServed: "Worldwide",
        availableLanguage: ["English", "Spanish"],
      },
    ],
  };

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: site.name,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: site.description,
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: "49",
      highPrice: "599",
      offerCount: "3",
    },
  };

  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <DemoSection />
      <RoiSection />
      <Testimonials />
      <PricingPreview />
      <Faq />
      <CtaSection />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
    </>
  );
}
