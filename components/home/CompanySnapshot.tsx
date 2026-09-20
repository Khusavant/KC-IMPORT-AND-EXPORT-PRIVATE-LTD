"use client";

import React, { useState, useEffect } from "react";
import { COMPANY_STATS, COMPANY_NAME } from "@/lib/constants";
import { Award, Globe, TrendingUp, Users, AlertCircle } from "lucide-react";
import { useInView } from "@/lib/hooks/useInView";

const STAT_ICONS = [Award, TrendingUp, Globe, Users];

function AnimatedStatNumber({
  value,
  inView,
}: {
  value: string;
  inView: boolean;
}) {
  const numericMatch = value.match(/\d+/);
  const target = numericMatch ? parseInt(numericMatch[0], 10) : 0;
  const suffix = value.replace(/\d+/, "");
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!inView || target === 0) return;

    let animationFrameId: number;
    const duration = 1600;
    const startTime = performance.now();

    const updateCount = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.floor(easeOut * target);
      setCurrent(currentVal);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCount);
      } else {
        setCurrent(target);
      }
    };

    animationFrameId = requestAnimationFrame(updateCount);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [inView, target]);

  return (
    <span>
      {inView ? current : 0}
      {suffix}
    </span>
  );
}

export default function CompanySnapshot() {
  const { ref, inView } = useInView(0.15);

  return (
    <section
      ref={ref}
      className="py-16 sm:py-20 bg-gradient-to-b from-white via-[#F8F9FA] to-white border-y border-gray-200/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stat Boxes Grid with Glassmorphism */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 stagger-children">
          {COMPANY_STATS.map((stat, idx) => {
            const Icon = STAT_ICONS[idx % STAT_ICONS.length];
            return (
              <div
                key={stat.label}
                className="relative glass-card card-hover bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-white/60 shadow-subtle hover:border-[#F5A623]/40 transition-all duration-300 group"
              >
                {/* Status Notice for Placeholder */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#1B3A6B] border border-gray-100 group-hover:bg-[#1B3A6B] group-hover:text-[#F5A623] transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-800 bg-amber-100/90 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    <AlertCircle className="w-2.5 h-2.5" />
                    {stat.status}
                  </span>
                </div>

                <div className="text-3xl sm:text-4xl font-extrabold text-[#1B3A6B] font-serif tracking-tight">
                  <AnimatedStatNumber value={stat.value} inView={inView} />
                </div>

                <div className="text-sm font-bold text-gray-800 mt-1">
                  {stat.label}
                </div>

                <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                  {stat.subtext}
                </p>
              </div>
            );
          })}
        </div>

        {/* Narrative Paragraph */}
        <div className="max-w-4xl mx-auto text-center bg-blue-50/60 backdrop-blur-sm rounded-2xl p-8 border border-blue-100/80 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1B3A6B] mb-3 font-serif">
            A Strategic Export Conduit Rooted in Rajkot, Gujarat
          </h2>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            Headquartered in the vibrant manufacturing epicenter of Rajkot,{" "}
            <strong>{COMPANY_NAME}</strong> acts as a direct export bridge linking
            international commercial importers, OEM contractors, and global distribution
            chains with verified Indian industrial manufacturing units and agricultural
            producers. By maintaining strict oversight over production, quality
            compliance, and port logistics across Saurashtra&apos;s coastline, we guarantee
            uncompromising quality, reliable export documentation, and punctual delivery.
          </p>
        </div>
      </div>
    </section>
  );
}
