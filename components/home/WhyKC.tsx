"use client";

import React from "react";
import { WHY_KC_POINTS } from "@/lib/constants";
import {
  ShieldCheck,
  FileText,
  PackageCheck,
  Clock,
  Coins,
  BadgeCheck,
} from "lucide-react";
import { useInView } from "@/lib/hooks/useInView";

// Map Lucide icons for each differentiator (Zero system emojis used)
const ICON_MAP = {
  ShieldCheck: ShieldCheck,
  FileText: FileText,
  PackageCheck: PackageCheck,
  Clock: Clock,
  Coins: Coins,
  BadgeCheck: BadgeCheck,
};

export default function WhyKC() {
  const { ref, inView } = useInView(0.12);

  return (
    <section ref={ref} id="why-kc" className="py-20 bg-[#F8F9FA] scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-[#1B3A6B] uppercase tracking-wider">
            Export Excellence &amp; Reliability
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1B3A6B] font-serif">
            Why International Buyers Choose KC
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            International procurement demands predictability, unyielding quality standards,
            and flawless logistics. Here is how KC de-risks cross-border procurement for your business.
          </p>
        </div>

        {/* 6 Differentiator Cards Grid with stagger-children and card-hover */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${
            inView ? "stagger-children" : "opacity-0"
          }`}
        >
          {WHY_KC_POINTS.map((point) => {
            const Icon =
              ICON_MAP[point.icon as keyof typeof ICON_MAP] || ShieldCheck;

            return (
              <div
                key={point.id}
                className="relative card-hover bg-white rounded-2xl p-7 border border-gray-200/90 shadow-subtle group flex flex-col justify-between overflow-hidden transition-all duration-300"
              >
                {/* Left amber border accent that expands on hover */}
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-amber-400/40 group-hover:h-full group-hover:w-2 group-hover:bg-[#F5A623] rounded-l-2xl transition-all duration-300 pointer-events-none" />

                <div>
                  <div className="w-13 h-13 w-fit p-3.5 rounded-xl bg-blue-50 text-[#1B3A6B] group-hover:bg-[#F5A623] group-hover:text-white transition-colors duration-200 mb-5">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-[#1B3A6B] font-serif mb-2.5">
                    {point.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {point.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-2 text-xs font-semibold text-gray-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623]" />
                  <span>Standardized Export Protocol</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
