import type { Metadata } from "next";
import Link from "next/link";
import { INDUSTRIES } from "@/lib/industries";
import {
  Wheat,
  Utensils,
  Building2,
  Car,
  Shirt,
  ShoppingBag,
  Pill,
  Wrench,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Globe2,
  Ship,
} from "lucide-react";

import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "Industries Served | B2B Global Trade Sectors | KC Import Export",
  description:
    "KC Import and Export serves 8 global industry sectors including Agriculture, Automotive, Food Processing, Construction, Textiles, and Heavy Engineering.",
  keywords:
    "industries served india export, agricultural procurement sectors, automotive brass turned parts, textile manufacturing export",
  alternates: { canonical: "https://kcimportexport.com/industries" },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "KC Import and Export Private Limited",
    title: "Industries Served | B2B Global Trade Sectors | KC Import Export",
    description:
      "KC Import and Export serves 8 global industry sectors including Agriculture, Automotive, Food Processing, Construction, Textiles, and Heavy Engineering.",
    url: "https://kcimportexport.com/industries",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@kcimportexport",
  },
};

const ICON_MAP = {
  Wheat: Wheat,
  Utensils: Utensils,
  Building2: Building2,
  Car: Car,
  Shirt: Shirt,
  ShoppingBag: ShoppingBag,
  Pill: Pill,
  Wrench: Wrench,
};

export default function IndustriesPage() {
  return (
    <div className="bg-[#F8F9FA] min-h-screen">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://kcimportexport.com" },
          { name: "Industries", url: "https://kcimportexport.com/industries" },
        ]}
      />
      {/* 1. Page Hero */}
      <section className="relative overflow-hidden bg-[#1B3A6B] text-white py-16 sm:py-20">
        <div className="absolute inset-0 opacity-10 pointer-events-none navy-hero-pattern" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold text-amber-300">
            <Globe2 className="w-3.5 h-3.5" />
            <span>Cross-Sector International Trade Capabilities</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-serif tracking-tight">
            Industries We Serve
          </h1>
          <p className="text-base sm:text-lg text-gray-200 max-w-3xl leading-relaxed font-normal">
            Direct factory-gate sourcing, specialized quality compliance, and customized
            export packaging engineered for 8 major international industrial and commercial sectors.
          </p>
        </div>
      </section>

      {/* 2. 8 Industries Grid */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {INDUSTRIES.map((ind) => {
              const IconComponent =
                ICON_MAP[ind.icon as keyof typeof ICON_MAP] || Wrench;

              return (
                <div
                  key={ind.id}
                  className="bg-white rounded-2xl p-8 border border-gray-200/90 shadow-subtle hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Top Row: Icon and Category Count */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#1B3A6B] flex items-center justify-center group-hover:bg-[#F5A623] group-hover:text-white transition-colors duration-200">
                        <IconComponent className="w-7 h-7" />
                      </div>
                      <span className="text-xs font-bold text-[#1B3A6B] bg-blue-50/80 px-3 py-1 rounded-full">
                        {ind.productCount}
                      </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold text-[#1B3A6B] font-serif mb-3">
                      {ind.name}
                    </h2>

                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                      {ind.description}
                    </p>

                    {/* Highlighted items */}
                    <div className="space-y-2 mb-6">
                      <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block">
                        Signature Export Products:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {ind.highlightedItems.map((item) => (
                          <span
                            key={item}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-100 text-gray-800 text-xs font-medium"
                          >
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>{item}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Footer & CTA to Products Catalog */}
                  <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5 text-[11px] text-gray-500">
                      <span>Categories:</span>
                      {ind.relevantCategories.map((c, i) => (
                        <span key={c} className="font-semibold text-gray-700">
                          {c}{i < ind.relevantCategories.length - 1 ? "," : ""}
                        </span>
                      ))}
                    </div>

                    <Link
                      href="/products"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1B3A6B] hover:bg-[#12284b] text-white text-xs font-bold transition shadow-sm flex-shrink-0"
                    >
                      <span>Explore Products</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Trade Callout */}
          <div className="mt-16 bg-[#1B3A6B] rounded-2xl p-8 sm:p-12 text-white text-center space-y-4">
            <h3 className="text-2xl sm:text-3xl font-bold font-serif">
              Need Contract Manufacturing for Your Industry?
            </h3>
            <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              We engineer custom production runs, source unique materials, and manage third-party
              laboratory compliance for international enterprises worldwide.
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#F5A623] hover:bg-[#e09315] text-[#1B3A6B] font-bold text-sm shadow-md transition"
              >
                <span>Initiate an Industry RFQ</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
