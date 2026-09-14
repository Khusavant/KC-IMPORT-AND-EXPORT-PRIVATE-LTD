import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  COMPANY_NAME,
  COMPANY_SHORT_NAME,
  COMPANY_ADDRESS,
  COMPANY_EMAIL,
  COMPANY_PHONE,
} from "@/lib/constants";

const PortScene = dynamic(() => import("@/components/animations/PortScene"), {
  ssr: false,
});
import {
  Building2,
  ShieldCheck,
  Globe2,
  Anchor,
  CheckCircle2,
  FileCheck2,
  PackageCheck,
  SearchCheck,
  MapPin,
  ArrowRight,
  Send,
  Mail,
  Phone,
} from "lucide-react";

import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "About Us | Export Profile & Infrastructure | KC Import Export",
  description:
    "Learn about KC Import and Export Private Limited. Established in Rajkot, Gujarat, we bridge international commercial buyers with certified Indian manufacturing and agricultural ecosystems.",
  keywords:
    "about kc import export, rajkot export company, gujarat export infrastructure, b2b india trade partner",
  alternates: { canonical: "https://kcimportexport.com/about" },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "KC Import and Export Private Limited",
    title: "About Us | Export Profile & Infrastructure | KC Import Export",
    description:
      "Learn about KC Import and Export Private Limited. Established in Rajkot, Gujarat, we bridge international commercial buyers with certified Indian manufacturing and agricultural ecosystems.",
    url: "https://kcimportexport.com/about",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@kcimportexport",
  },
};

export default function AboutPage() {
  return (
    <div className="bg-[#F8F9FA]">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://kcimportexport.com" },
          { name: "About Us", url: "https://kcimportexport.com/about" },
        ]}
      />
      {/* 1. Page Hero */}
      <section className="relative overflow-hidden bg-[#1B3A6B] text-white py-16 sm:py-20">
        <div className="absolute inset-0 opacity-10 pointer-events-none navy-hero-pattern" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold text-amber-300">
              <Building2 className="w-3.5 h-3.5" />
              <span>Rajkot, Gujarat Export Operations</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-serif tracking-tight">
              About {COMPANY_SHORT_NAME}
            </h1>
            <p className="text-base sm:text-lg text-gray-200 leading-relaxed font-normal">
              Your dependable gateway to Indian manufacturing and agro-produce. Built on
              transparent trade governance, verified factory-direct pricing, and uncompromised quality.
            </p>
          </div>
        </div>
      </section>

      {/* 3D Maritime Port Scene Visual Divider */}
      <section className="relative overflow-hidden border-y border-[#0B172B]/30 shadow-inner">
        <PortScene />
      </section>

      {/* 2. Company Profile Section (Who we are, what we do, where we are based) */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left text */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-[#1B3A6B] uppercase tracking-wider">
                Corporate Overview
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1B3A6B] font-serif">
                Bridging Gujarat&apos;s Industrial Might with Global Commerce
              </h2>
              <div className="space-y-4 text-gray-600 text-sm sm:text-base leading-relaxed">
                <p>
                  <strong>{COMPANY_NAME}</strong> is an international B2B merchant and
                  manufacturer export organization headquartered in <strong>Rajkot, Gujarat</strong> —
                  the epicenter of India&apos;s precision engineering, brass parts manufacturing, and Saurashtra&apos;s
                  fertile agricultural belts.
                </p>
                <p>
                  We specialize in end-to-end procurement, rigorous batch quality auditing,
                  custom packaging, and multimodal logistics management for international
                  wholesalers, industrial contractors, and retail conglomerates across North America,
                  Europe, the Middle East, and the Asia-Pacific.
                </p>
                <p>
                  With direct proximity to Gujarat&apos;s world-class maritime terminals — including
                  <strong> Mundra Port, Kandla (Deendayal) Port, and Pipavav Port</strong> — we
                  guarantee expedited container stuffing, optimal ocean freight tariffs, and
                  error-free export compliance documentation.
                </p>
              </div>

              {/* Quick Profile Points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">Direct Factory Audits</h4>
                    <p className="text-xs text-gray-500 mt-0.5">Zero intermediary layers, certified plants</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <Anchor className="w-5 h-5 text-[#1B3A6B] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">Deep Port Integration</h4>
                    <p className="text-xs text-gray-500 mt-0.5">Quick container turnaround via Mundra</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-card border border-gray-200 group">
                {/*
                  GEMINI IMAGE PROMPT:
                  "Inside a high-tech modern international export staging warehouse in Gujarat India. Clean epoxy floors, neatly organized export pallets wrapped in industrial film with barcodes, quality inspection station with professional export managers in navy blazers reviewing shipping manifests, warm sunlight through high warehouse windows, prestigious B2B corporate logistics setting."
                */}
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src="/images/about-facility.png"
                    alt="KC Import and Export facility and quality inspection in Gujarat India"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1B3A6B]/80 via-transparent to-transparent" />
                </div>
                <div className="p-6 bg-white border-t border-gray-100">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#F5A623] block">
                    Export Inspection Facility
                  </span>
                  <h4 className="text-base font-bold text-[#1B3A6B] mt-1">
                    Rajkot Staging & Pre-shipment Center
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">
                    Continuous quality control, palletization, and container seal verifications.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Mission & Values (3 Value Cards: Integrity, Reliability, Global Reach) */}
      <section className="py-16 sm:py-20 bg-[#F8F9FA] border-y border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-[#1B3A6B] uppercase tracking-wider">
              Core Principles
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1B3A6B] font-serif">
              Mission & Core Values
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Our guiding trade values ensure that every order, contract, and shipment fosters
              enduring partnerships across continents.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Integrity */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200/80 shadow-subtle hover:shadow-card-hover transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#1B3A6B] flex items-center justify-center mb-6">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-[#1B3A6B] font-serif mb-3">
                Absolute Integrity
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Full transparency in pricing, honest lead time commitments, and complete
                adherence to international trade ethics. We deliver precisely what is specified
                in approved pre-shipment samples.
              </p>
            </div>

            {/* Card 2: Reliability */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200/80 shadow-subtle hover:shadow-card-hover transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 text-[#F5A623] flex items-center justify-center mb-6">
                <PackageCheck className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-[#1B3A6B] font-serif mb-3">
                Uncompromising Reliability
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Predictable batch-to-batch consistency, robust seaworthy packaging, and
                stringent timeline governance so your inventory runs uninterrupted across your
                global distribution network.
              </p>
            </div>

            {/* Card 3: Global Reach */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200/80 shadow-subtle hover:shadow-card-hover transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6">
                <Globe2 className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-[#1B3A6B] font-serif mb-3">
                Global Reach & Local Expertise
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Deep ground presence across Gujarat industrial estates paired with a fluent
                understanding of international customs regulations, Incoterms, and destination
                import formalities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Capabilities Section (Sourcing, Export Documentation, Packaging, Quality Checks) */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-[#1B3A6B] uppercase tracking-wider">
              Operational Excellence
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1B3A6B] font-serif">
              Our Core Export Capabilities
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Every stage of the export lifecycle is executed with high-level institutional rigor.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Capability 1 */}
            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200/80 hover:bg-white hover:border-[#1B3A6B]/30 transition-all duration-200 shadow-subtle">
              <div className="w-12 h-12 rounded-xl bg-[#1B3A6B] text-white flex items-center justify-center mb-4">
                <SearchCheck className="w-6 h-6 text-[#F5A623]" />
              </div>
              <h3 className="text-base font-bold text-[#1B3A6B] mb-2 font-serif">
                Direct Source Vetting
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Direct engagement with audited ISO/BRC-compliant plants in Rajkot, Jamnagar,
                Morbi, and Saurashtra to secure optimal pricing and guaranteed batch capacity.
              </p>
            </div>

            {/* Capability 2 */}
            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200/80 hover:bg-white hover:border-[#1B3A6B]/30 transition-all duration-200 shadow-subtle">
              <div className="w-12 h-12 rounded-xl bg-[#1B3A6B] text-white flex items-center justify-center mb-4">
                <FileCheck2 className="w-6 h-6 text-[#F5A623]" />
              </div>
              <h3 className="text-base font-bold text-[#1B3A6B] mb-2 font-serif">
                Export Documentation
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Complete preparation of Commercial Invoices, Packing Lists, Certificates of Origin (COO),
                Phytosanitary Certificates, Fumigation, and Bill of Lading documentation.
              </p>
            </div>

            {/* Capability 3 */}
            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200/80 hover:bg-white hover:border-[#1B3A6B]/30 transition-all duration-200 shadow-subtle">
              <div className="w-12 h-12 rounded-xl bg-[#1B3A6B] text-white flex items-center justify-center mb-4">
                <PackageCheck className="w-6 h-6 text-[#F5A623]" />
              </div>
              <h3 className="text-base font-bold text-[#1B3A6B] mb-2 font-serif">
                Seaworthy Packaging
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Custom palletization (ISPM 15 heat treated), multi-layer moisture barriers,
                and container desiccant controls engineered to endure extended sea voyage conditions.
              </p>
            </div>

            {/* Capability 4 */}
            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200/80 hover:bg-white hover:border-[#1B3A6B]/30 transition-all duration-200 shadow-subtle">
              <div className="w-12 h-12 rounded-xl bg-[#1B3A6B] text-white flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6 text-[#F5A623]" />
              </div>
              <h3 className="text-base font-bold text-[#1B3A6B] mb-2 font-serif">
                Multi-Stage QA Audits
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Pre-production material validation, in-line process surveillance, and comprehensive
                pre-shipment inspection (PSI) with high-res photo logs and laboratory test certificates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Location Section with Placeholder Google Maps Iframe and Address */}
      <section className="py-16 sm:py-20 bg-[#F8F9FA] border-t border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Address and details */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-[#1B3A6B] uppercase tracking-wider">
                Physical Operations
              </div>
              <h2 className="text-3xl font-bold text-[#1B3A6B] font-serif">
                Export Headquarters in Rajkot
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                Rajkot is Gujarat&apos;s premier industrial nexus, strategically positioned for
                swift access to highways connecting straight to Mundra and Kandla ports.
              </p>

              <div className="space-y-4 pt-2 text-sm text-gray-700">
                <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-200 shadow-subtle">
                  <MapPin className="w-5 h-5 text-[#F5A623] mt-1 flex-shrink-0" />
                  <div>
                    <strong className="block text-gray-900 font-semibold mb-1">
                      Corporate & Staging Address
                    </strong>
                    <span className="text-gray-600 text-xs leading-relaxed">
                      {COMPANY_ADDRESS.formatted}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 shadow-subtle">
                  <Mail className="w-5 h-5 text-[#F5A623] flex-shrink-0" />
                  <div>
                    <strong className="block text-gray-900 font-semibold text-xs">
                      Export Desk Email
                    </strong>
                    <a
                      href={`mailto:${COMPANY_EMAIL}`}
                      className="text-gray-600 hover:text-[#1B3A6B] text-xs transition"
                    >
                      {COMPANY_EMAIL}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 shadow-subtle">
                  <Phone className="w-5 h-5 text-[#F5A623] flex-shrink-0" />
                  <div>
                    <strong className="block text-gray-900 font-semibold text-xs">
                      Telephone & WhatsApp Desk
                    </strong>
                    <a
                      href={`tel:${COMPANY_PHONE.replace(/\s+/g, "")}`}
                      className="text-gray-600 hover:text-[#1B3A6B] text-xs transition"
                    >
                      {COMPANY_PHONE}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps Iframe Placeholder */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-card bg-white p-2">
                <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-gray-100">
                  <iframe
                    title="KC Import & Export Rajkot Location Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d118147.6820202796!2d70.73889445831627!3d22.273630793617387!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959c98ac71cdf0f%3A0x76dd15cfbe93ad3b!2sRajkot%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
                  />
                </div>
                <div className="p-3 text-center text-xs text-gray-500">
                  <span>Rajkot Industrial Cluster • Gujarat, India • Connected to Mundra Port</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CTA to Contact Page */}
      <section className="py-16 bg-[#1B3A6B] text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          <h3 className="text-2xl sm:text-3xl font-bold font-serif">
            Partner with a Dependable Indian Export House
          </h3>
          <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Whether you need custom specifications, standard export grades, or container-load
            pricing, our commercial desk is ready to assist.
          </p>
          <div className="pt-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-[#F5A623] hover:bg-[#e09315] text-[#1B3A6B] font-bold text-sm shadow-md hover:shadow-lg transition-all"
            >
              <span>Submit Your RFQ to Our Rajkot Desk</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
