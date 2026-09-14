import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import CategoryCards from "@/components/home/CategoryCards";
import CompanySnapshot from "@/components/home/CompanySnapshot";
import WhyKC from "@/components/home/WhyKC";
import ExportProcess from "@/components/home/ExportProcess";
import FinalCTA from "@/components/home/FinalCTA";
import SectionReveal from "@/components/animations/SectionReveal";
import { COMPANY_NAME, COMPANY_TAGLINE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "KC Import Export | B2B Supplier from Rajkot, Gujarat, India",
  description:
    "KC Import and Export — trusted B2B export partner from Rajkot, Gujarat. Agricultural products, industrial components, textiles, ceramics. Request a quote today.",
  keywords:
    "import export india, b2b supplier gujarat, rajkot exporter, agricultural products export, industrial components india",
  alternates: { canonical: "https://kcimportexport.com" },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "KC Import and Export Private Limited",
    title: "KC Import Export | B2B Supplier from Rajkot, Gujarat, India",
    description:
      "KC Import and Export — trusted B2B export partner from Rajkot, Gujarat. Agricultural products, industrial components, textiles, ceramics. Request a quote today.",
    url: "https://kcimportexport.com",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@kcimportexport",
  },
};

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": COMPANY_NAME,
    "alternateName": "KC Import & Export",
    "url": "https://www.kcimportexport.com",
    "description":
      "Direct Gujarat Export House specializing in Indian agricultural commodities, industrial brass components, textiles, and hardware from Rajkot.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Plot No. 104, Phase-II, Aji GIDC",
      "addressLocality": "Rajkot",
      "addressRegion": "Gujarat",
      "postalCode": "360003",
      "addressCountry": "IN",
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-99999-99999",
      "contactType": "export sales",
      "areaServed": "Worldwide",
      "availableLanguage": ["English", "Hindi", "Gujarati"],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Category Cards Section */}
      <SectionReveal>
        <CategoryCards />
      </SectionReveal>

      {/* 3. Company Snapshot Section */}
      <SectionReveal>
        <CompanySnapshot />
      </SectionReveal>

      {/* 4. Why KC Differentiators */}
      <SectionReveal>
        <WhyKC />
      </SectionReveal>

      {/* 5. 8-Step Export Process */}
      <SectionReveal>
        <ExportProcess />
      </SectionReveal>

      {/* 6. Final Amber Call to Action */}
      <SectionReveal>
        <FinalCTA />
      </SectionReveal>
    </>
  );
}
