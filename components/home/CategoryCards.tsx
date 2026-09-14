import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PRODUCT_CATEGORIES } from "@/lib/constants";
import {
  Wheat,
  Cog,
  Shirt,
  Utensils,
  Wrench,
  Package,
  ArrowRight,
} from "lucide-react";

// Map Lucide icons for each category (Zero system emojis used)
const ICON_MAP = {
  Wheat: Wheat,
  Cog: Cog,
  Shirt: Shirt,
  Utensils: Utensils,
  Wrench: Wrench,
  Package: Package,
};

// Detailed Gemini prompt mappings for each category image
const IMAGE_PROMPTS: Record<string, string> = {
  "agricultural-products":
    "Professional studio product shot of export-grade Indian agricultural goods: golden turmeric roots, cumin seeds, coriander seeds, and organic basmati grains displayed in premium jute burlap export bags and brass bowls on a clean white rustic marble surface.",
  "industrial-components":
    "High-precision CNC machined brass components, threaded fasteners, gold-brass mechanical engineering fittings, valves and metallic hardware arranged cleanly in a modern manufacturing inspection laboratory on a dark brushed slate surface.",
  textiles:
    "High quality Indian export textile products: large cylindrical spools of pure combed cotton yarn in natural ivory, indigo navy and vibrant tones, stacked alongside rolled bolts of woven organic cotton fabrics and raw Gujarat cotton bolls.",
  "food-products":
    "Premium packaged export food products: clear glass jars of dehydrated white and red onion flakes, minced garlic flakes, organic peanut butter jars, roasted peanuts and canned Alphonso mango pulp arranged neatly on a clean white kitchen studio counter.",
  "hardware-tools":
    "Industrial export display of stainless steel door handles, architectural fittings, chrome-vanadium forged hand wrenches, stainless steel bolts and nuts, and precision roller bearings on a modern industrial workshop workbench.",
  "consumer-goods":
    "Luxury export display of polished vitrified porcelain marble-look floor tiles and sanitaryware arranged in a sleek architectural showroom. Elegant lighting reflecting off high-gloss Italian-style ceramic finishes manufactured in Gujarat.",
};

export default function CategoryCards() {
  return (
    <section id="products" className="py-20 bg-[#F8F9FA] scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-[#1B3A6B] uppercase tracking-wider">
            Verified Indian Supply Chains
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1B3A6B] font-serif">
            Our Product Categories
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            Direct export sourcing from Gujarat&apos;s leading manufacturing clusters.
            Supplied with comprehensive international compliance certificates, test
            reports, and secure export packaging.
          </p>
        </div>

        {/* 6 Product Category Cards Grid with stagger-children */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-children">
          {PRODUCT_CATEGORIES.map((cat) => {
            const IconComponent =
              ICON_MAP[cat.icon as keyof typeof ICON_MAP] || Package;
            const prompt = IMAGE_PROMPTS[cat.id];

            return (
              <div
                key={cat.id}
                className="group relative card-hover bg-white rounded-2xl overflow-hidden border border-gray-200/90 shadow-subtle flex flex-col transition-all duration-300 hover:border-transparent"
              >
                {/* Gradient Border on hover */}
                <div className="absolute -inset-[2px] rounded-[18px] bg-gradient-to-r from-[#1B3A6B] to-[#F5A623] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none -z-10" />

                {/* Image Container with Prompt Comment */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
                  {/*
                    GEMINI IMAGE PROMPT:
                    "{prompt}"
                  */}
                  <Image
                    src={cat.image}
                    alt={`${cat.name} export products from Gujarat India`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                  {/* Category Lucide Icon Badge */}
                  <div className="absolute top-4 left-4 w-11 h-11 rounded-xl bg-white/95 backdrop-blur shadow-md flex items-center justify-center text-[#1B3A6B] group-hover:bg-[#F5A623] group-hover:text-white transition-colors duration-200">
                    <IconComponent className="w-5 h-5" />
                  </div>

                  {/* Featured Tag */}
                  <div className="absolute bottom-3 left-4">
                    <span className="text-[11px] font-semibold text-white bg-[#1B3A6B]/80 backdrop-blur px-2.5 py-1 rounded-md">
                      {cat.featuredCount}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex flex-col flex-grow justify-between space-y-4 bg-white rounded-b-2xl">
                  <div>
                    <h3 className="text-xl font-bold text-[#1B3A6B] group-hover:text-[#12284b] transition-colors font-serif">
                      {cat.name}
                    </h3>
                    <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  {/* Card Action Link */}
                  <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                    <Link
                      href={`/products?category=${cat.id}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1B3A6B] hover:text-[#F5A623] transition-colors"
                    >
                      <span>Explore Category</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
