import React from "react";
import Link from "next/link";
import { Send, MessageCircle } from "lucide-react";
import { COMPANY_WHATSAPP_LINK } from "@/lib/constants";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden animated-gradient-cta py-16 sm:py-24 text-white noise-overlay">
      {/* Background Decorative Texture */}
      <div className="absolute inset-0 opacity-10 pointer-events-none amber-cta-pattern" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 border border-white/20 text-xs font-bold uppercase tracking-wider text-amber-300">
            Direct Manufacturer Pricing • Fast Container Dispatch
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-serif tracking-tight">
            Ready to Source from India?
          </h2>

          <p className="text-base sm:text-lg text-gray-100 font-medium leading-relaxed max-w-2xl mx-auto">
            Share your product specifications, target volumes, or custom engineering
            blueprints. Our Rajkot export specialists will analyze your requirements
            and deliver a formal FOB/CIF proposal within 24 hours.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/contact"
              className="btn-glow-navy w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-[#1B3A6B] hover:bg-[#12284b] text-white font-bold text-base shadow-lg transition-all duration-200 border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#1B3A6B] focus:ring-offset-2"
            >
              <Send className="w-5 h-5 text-[#F5A623]" />
              <span>Send Your Requirement</span>
            </Link>

            <a
              href={COMPANY_WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glow w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-white hover:bg-gray-50 text-[#1B3A6B] font-bold text-base shadow-lg transition-all duration-200 border border-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
            >
              <MessageCircle className="w-5 h-5 text-[#25D366] fill-[#25D366]" />
              <span>Direct WhatsApp Desk</span>
            </a>
          </div>

          <div className="pt-3">
            <Link
              href="/export-process"
              className="text-xs sm:text-sm text-amber-200 hover:text-white underline underline-offset-4 transition font-medium inline-flex items-center gap-1.5"
            >
              <span>Explore our structured 8-step export &amp; shipping process &rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
