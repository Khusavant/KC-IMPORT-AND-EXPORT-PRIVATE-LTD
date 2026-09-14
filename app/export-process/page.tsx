import type { Metadata } from "next";
import ExportProcessClient from "./ExportProcessClient";
import { EXPORT_STEPS } from "@/lib/constants";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "8-Step Export Process & Logistics Protocol | KC Import Export",
  description:
    "Explore KC Import and Export's structured 8-step international export methodology: from technical inquiry and FOB/CIF quotation to port customs clearance and ocean vessel dispatch.",
  keywords:
    "india export process, 8 step export guide, mundra port customs clearance, incoterms 2020 fob cif, commercial trade documentation",
  alternates: { canonical: "https://kcimportexport.com/export-process" },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "KC Import and Export Private Limited",
    title: "8-Step Export Process & Logistics Protocol | KC Import Export",
    description:
      "Explore KC Import and Export's structured 8-step international export methodology: from technical inquiry and FOB/CIF quotation to port customs clearance and ocean vessel dispatch.",
    url: "https://kcimportexport.com/export-process",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@kcimportexport",
  },
};

const FAQS = [
  {
    question: "What are KC's standard payment terms for international export orders?",
    answer:
      "We accept Irrevocable Letter of Credit (LC at sight) from prime international banks, as well as Telegraphic Transfer (T/T with 30% advance deposit upon order confirmation and 70% against clean scanned Bill of Lading copies). For long-standing procurement partners, customized credit and DP terms can be structured.",
  },
  {
    question: "Which Indian ports do you ship containers from?",
    answer:
      "We primarily ship via Mundra Port (INMUN1) and Kandla/Deendayal Port (INIXY1) in Gujarat. Both ports are within 215–240 km of our Rajkot staging center, offering direct weekly container vessel sailings to Europe, the USA, the Middle East, and Asia with minimal transit dwell times. Pipavav Port is also utilized for dedicated rail-linked routes.",
  },
  {
    question: "Can we request third-party pre-shipment inspections like SGS or Bureau Veritas?",
    answer:
      "Yes, absolutely. We welcome and routinely facilitate third-party inspection audits from SGS, Bureau Veritas, Intertek, TUV SUD, or your nominated inspection surveyor. Our facility team prepares inspection lots and coordinates sampling protocols prior to container sealing.",
  },
  {
    question: "Do you offer private labeling, custom packaging, and barcoding?",
    answer:
      "Yes. We support custom OEM packaging across all product categories. This includes custom-printed multi-wall paper bags, branded export master cartons, retail blister packs, color gift boxes, and custom EAN/UPC barcodes applied strictly according to your supermarket or warehouse requirements.",
  },
  {
    question: "What Incoterms does KC Import and Export trade under?",
    answer:
      "We primarily trade under Incoterms 2020: FOB (Free On Board Mundra/Kandla), CIF (Cost, Insurance & Freight to destination port), and CFR (Cost & Freight). We can also quote Ex-Works (EXW) for clients with existing freight forwarding arrangements in India.",
  },
];

export default function ExportProcessPage() {
  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Source and Import Products from India via KC Import and Export",
    "description":
      "Standard 8-step international trade execution framework for importing goods from Gujarat, India, through gateway ports of Mundra, Kandla, and Pipavav.",
    "step": EXPORT_STEPS.map((s, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": `${s.step}. ${s.title}`,
      "text": s.description,
    })),
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQS.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://kcimportexport.com" },
          { name: "Export Process", url: "https://kcimportexport.com/export-process" },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ExportProcessClient />
    </>
  );
}
