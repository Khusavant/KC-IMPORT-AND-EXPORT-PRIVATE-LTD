"use client";

import React from "react";
import { EXPORT_STEPS } from "@/lib/constants";
import {
  MailQuestion,
  Calculator,
  ClipboardCheck,
  Factory,
  CheckCircle2,
  FileCheck,
  Ship,
  Anchor,
  ArrowRight,
} from "lucide-react";
import { useInView } from "@/lib/hooks/useInView";
import CargoTruck from "@/components/animations/CargoTruck";
import CargoShip from "@/components/animations/CargoShip";
import CargoPlane from "@/components/animations/CargoPlane";

// Map Lucide icons for each export process step (Zero system emojis used)
const ICON_MAP = {
  MailQuestion: MailQuestion,
  Calculator: Calculator,
  ClipboardCheck: ClipboardCheck,
  Factory: Factory,
  CheckCircle2: CheckCircle2,
  FileCheck: FileCheck,
  Ship: Ship,
  Anchor: Anchor,
};

export default function ExportProcess() {
  const { ref, inView } = useInView(0.15);

  return (
    <section
      ref={ref}
      id="process"
      className="py-20 bg-white border-y border-gray-200/80 scroll-mt-16 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-[#1B3A6B] uppercase tracking-wider">
            Clear, Predictable Milestones
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1B3A6B] font-serif">
            Our 8-Step Export Process
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            From preliminary technical quotation to vessel berthing and customs handover,
            every consignment follows a meticulous, trackable workflow.
          </p>
        </div>

        {/* Animated SVG Connecting Pathway for Desktop */}
        <div className="hidden lg:block absolute top-[14.5rem] left-[6%] right-[6%] pointer-events-none z-0">
          <svg
            className="w-full h-6 overflow-visible"
            viewBox="0 0 1000 20"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M 0 10 Q 250 18 500 10 T 1000 10"
              stroke="#F5A623"
              strokeWidth="2.5"
              strokeDasharray="8 6"
              className={inView ? "animate-draw-line" : "opacity-0"}
              style={{
                strokeDashoffset: inView ? 0 : 1000,
                transition: "stroke-dashoffset 2.5s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            />
          </svg>
        </div>

        {/* Timeline Grid: 4 columns on desktop, 2 rows, stacked responsive on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {EXPORT_STEPS.map((item, idx) => {
            const Icon =
              ICON_MAP[item.icon as keyof typeof ICON_MAP] || CheckCircle2;

            return (
              <div
                key={item.step}
                className="relative card-hover bg-[#F8F9FA] rounded-2xl p-6 border border-gray-200/70 hover:border-[#1B3A6B]/30 hover:bg-white transition-all duration-300 shadow-subtle group flex flex-col justify-between"
              >
                {/* Top: Step Number & Icon */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-xl font-black text-[#F5A623] font-serif tracking-tighter w-10 h-10 rounded-full bg-amber-50 border border-amber-200/60 flex items-center justify-center transition-all duration-300 ${
                        inView ? "pulse-ring" : ""
                      }`}
                    >
                      {item.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#1B3A6B] shadow-sm border border-gray-100 group-hover:bg-[#1B3A6B] group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-[#1B3A6B] font-serif mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Step Indicator Arrow (visual connector) & Transport Miniatures */}
                <div className="mt-5 pt-3 border-t border-gray-200/60 flex items-center justify-between text-[11px] font-semibold text-gray-400">
                  <div className="flex items-center gap-2">
                    <span>Milestone {idx + 1} of 8</span>
                    {idx === 0 && (
                      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200/80 text-[10px] font-bold text-[#1B3A6B]">
                        <CargoTruck miniature size={50} animateDrive={false} direction="right" />
                        <span>Road Transit</span>
                      </div>
                    )}
                    {idx === 3 && (
                      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-blue-50 border border-blue-200/80 text-[10px] font-bold text-[#1B3A6B]">
                        <CargoShip miniature size={50} animateDrift={false} direction="right" />
                        <span>Ocean Berth</span>
                      </div>
                    )}
                    {idx === 5 && (
                      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200/80 text-[10px] font-bold text-[#1B3A6B]">
                        <CargoPlane miniature size={50} animateFlight={false} />
                        <span>Air Freight</span>
                      </div>
                    )}
                  </div>
                  {idx < EXPORT_STEPS.length - 1 && (
                    <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#F5A623] group-hover:translate-x-1 transition-all" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
