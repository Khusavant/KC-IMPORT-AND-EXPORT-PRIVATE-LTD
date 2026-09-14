import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  FileText,
  PackageCheck,
  Clock,
  Coins,
  BadgeCheck,
  CheckCircle2,
  FileSpreadsheet,
  ArrowRight,
  Ship,
  FileCheck,
  Building2,
  Award,
} from "lucide-react";

import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "Why KC Import & Export | Strategic Differentiators | KC Import Export",
  description:
    "Discover why global importers and distributors trust KC Import and Export. Rigorous pre-shipment inspections, flawless customs documentation, and direct factory pricing.",
  keywords:
    "why choose kc import export, reliable india export house, sgs inspected export, fob mundra shipping partner",
  alternates: { canonical: "https://kcimportexport.com/why-kc" },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "KC Import and Export Private Limited",
    title: "Why KC Import & Export | Strategic Differentiators | KC Import Export",
    description:
      "Discover why global importers and distributors trust KC Import and Export. Rigorous pre-shipment inspections, flawless customs documentation, and direct factory pricing.",
    url: "https://kcimportexport.com/why-kc",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@kcimportexport",
  },
};

const EXPANDED_DIFFERENTIATORS = [
  {
    title: "Institutional Quality Assurance",
    icon: ShieldCheck,
    paragraph:
      "Cross-border trade collapses when products fail arrival inspections. At KC, we deploy our own in-house engineering and agricultural quality inspectors to factory floors across Gujarat before container loading. We verify raw material composition, dimensional tolerances, tensile limits, moisture percentages, and packaging integrity.",
    supportingDetail:
      "Compatible with international inspection bodies including SGS, Bureau Veritas, Intertek, and TUV SUD pre-shipment certifications.",
  },
  {
    title: "Flawless Multi-Jurisdictional Documentation",
    icon: FileText,
    paragraph:
      "Customs delays and demurrage penalties are often the result of clerical inaccuracies. Our dedicated documentation team manages the complete paperwork pipeline according to destination country import tariffs and international ICC Incoterms 2020.",
    supportingDetail:
      "Includes Certificate of Origin, Non-Preferential COO, Phytosanitary, Fumigation Certificates, Mill Test Reports (3.1), and Bill of Lading.",
  },
  {
    title: "Engineered Seaworthy Packaging",
    icon: PackageCheck,
    paragraph:
      "Rough maritime transit, high humidity during monsoons, and heavy container port handling demand industrial packaging. Every consignment is fortified using heat-treated ISPM-15 export pallets, moisture-barrier wrapping, heavy-duty honeycomb corner guards, and container desiccant bags.",
    supportingDetail:
      "Barcoded master cartons, custom shipping mark printing, and tamper-evident container security bolt seals standard on all FCL dispatches.",
  },
  {
    title: "24/7 International Trade Communication",
    icon: Clock,
    paragraph:
      "Time zone differences shouldn't slow your supply chain. We assign a dedicated Key Account Executive to each client who provides real-time WhatsApp updates, photo/video production logs, container tracking milestones, and fast commercial turnaround.",
    supportingDetail:
      "Average response time under 2 hours during global business hours across North American, European, and Middle Eastern working schedules.",
  },
  {
    title: "Factory-Gate Competitive Pricing",
    icon: Coins,
    paragraph:
      "By eliminating multiple layers of domestic brokers, commission agents, and trading middlemen, KC secures pricing directly at the factory gate in Rajkot (brass/machinery), Jamnagar (turned parts), Morbi (ceramics), and Saurashtra (spices/cotton).",
    supportingDetail:
      "Transparent cost breakdowns covering Ex-Factory, Inland Haulage, Port Handling (THC), and Ocean Freight with no hidden surcharges.",
  },
  {
    title: "100% Vetted Gujarat Manufacturing Network",
    icon: BadgeCheck,
    paragraph:
      "We do not partner with unverified cottage workshops. Every supplier in our Gujarat network is audited for ethical labor compliance, financial solvency, manufacturing capacity, and modern CNC / processing machinery.",
    supportingDetail:
      "Regular vendor audits ensure strict compliance with international labor standards, environmental safety norms, and ISO quality management systems.",
  },
];

const EXPORT_DOCUMENTS_HANDLED = [
  {
    doc: "Commercial Invoice & Detailed Packing List",
    desc: "Itemized export invoices with HS codes, container gross/net weights, and packaging marks.",
  },
  {
    doc: "Certificate of Origin (COO)",
    desc: "Chamber of Commerce verified certificate demonstrating 100% Indian origin for duty preferences.",
  },
  {
    doc: "Bill of Lading (Ocean BL / Sea Waybill)",
    desc: "Clean on-board ocean bills issued by premier shipping lines (Maersk, MSC, Hapag-Lloyd, CMA CGM).",
  },
  {
    doc: "Phytosanitary & Fumigation Certificates",
    desc: "Government plant quarantine approvals and ISPM 15 container fumigation certificates for agro cargo.",
  },
  {
    doc: "Inspection Certificate / Lab Analysis",
    desc: "Certified batch test reports (curcumin assay, aflatoxin, heavy metals, RoHS compliance, metallurgy 3.1).",
  },
  {
    doc: "Marine Cargo Insurance Policy",
    desc: "Comprehensive Institute Cargo Clauses (A) all-risk insurance coverage from warehouse to destination port.",
  },
];

export default function WhyKCPage() {
  return (
    <div className="bg-[#F8F9FA] min-h-screen">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://kcimportexport.com" },
          { name: "Why KC", url: "https://kcimportexport.com/why-kc" },
        ]}
      />
      {/* 1. Page Hero */}
      <section className="relative overflow-hidden bg-[#1B3A6B] text-white py-16 sm:py-20">
        <div className="absolute inset-0 opacity-10 pointer-events-none navy-hero-pattern" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold text-amber-300">
            <Award className="w-3.5 h-3.5" />
            <span>Built for Institutional Procurement Reliability</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-serif tracking-tight">
            Why Partner with KC Import & Export
          </h1>
          <p className="text-base sm:text-lg text-gray-200 max-w-3xl leading-relaxed font-normal">
            De-risking international procurement from India through rigorous quality governance,
            direct hub pricing, and comprehensive export logistics management.
          </p>
        </div>
      </section>

      {/* 2. 6 Detailed Differentiators */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1B3A6B] font-serif">
              Our 6 Strategic Trade Differentiators
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Every process at KC is structured around eliminating the risks of international procurement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {EXPANDED_DIFFERENTIATORS.map((diff) => {
              const Icon = diff.icon;
              return (
                <div
                  key={diff.title}
                  className="bg-white rounded-2xl p-8 border border-gray-200/90 shadow-subtle hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#1B3A6B] flex items-center justify-center mb-6">
                      <Icon className="w-7 h-7 text-[#1B3A6B]" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#1B3A6B] font-serif mb-3">
                      {diff.title}
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                      {diff.paragraph}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-gray-700 leading-relaxed font-medium">
                      {diff.supportingDetail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Export Documentation Section */}
      <section className="py-16 sm:py-20 bg-white border-y border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-[#1B3A6B] uppercase tracking-wider">
              Customs Compliance
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1B3A6B] font-serif">
              Export Documentation We Handle
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              We eliminate paperwork delays by preparing comprehensive, error-free trade dossiers
              for every single container dispatch.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EXPORT_DOCUMENTS_HANDLED.map((item) => (
              <div
                key={item.doc}
                className="p-6 rounded-2xl bg-[#F8F9FA] border border-gray-200/70 shadow-subtle hover:bg-white transition"
              >
                <div className="w-10 h-10 rounded-xl bg-[#1B3A6B] text-white flex items-center justify-center mb-4">
                  <FileCheck className="w-5 h-5 text-[#F5A623]" />
                </div>
                <h3 className="text-base font-bold text-[#1B3A6B] font-serif mb-2">
                  {item.doc}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CTA to Contact */}
      <section className="py-16 bg-[#F5A623] text-[#1B3A6B] text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          <h3 className="text-2xl sm:text-4xl font-bold font-serif">
            Experience Transparent Indian B2B Export
          </h3>
          <p className="text-[#1B3A6B]/90 text-sm sm:text-base max-w-2xl mx-auto font-medium leading-relaxed">
            Contact our Rajkot export desk today with your product requirements and specifications
            to receive a detailed technical quotation and sample terms.
          </p>
          <div className="pt-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-[#1B3A6B] hover:bg-[#12284b] text-white font-bold text-sm sm:text-base shadow-lg transition"
            >
              <span>Submit Your RFQ to Our Team</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
