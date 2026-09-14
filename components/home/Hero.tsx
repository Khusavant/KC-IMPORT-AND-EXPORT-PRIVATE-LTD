import React from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ArrowRight, ShieldCheck, Ship, Globe2 } from "lucide-react";

const PortScene = dynamic(() => import("@/components/animations/PortScene"), {
  ssr: false,
});

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#0B172B] text-white py-16 sm:py-24 lg:py-28 noise-overlay">
      {/* 3D Animated Port Scene Background Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <PortScene />
        {/* Dark navy gradient overlay (opacity-70) so hero text and CTAs stay readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B172B]/90 via-[#1B3A6B]/75 to-[#0F2547]/80 backdrop-blur-[1px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 space-y-7 text-left">
            {/* Trust badge */}
            <div className="animate-fade-in-up inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold text-amber-300">
              <span className="w-2 h-2 rounded-full bg-[#F5A623] animate-pulse" />
              <span>Direct Gujarat Export Hub • Rajkot, India</span>
            </div>

            {/* Main Headline with stagger delay */}
            <h1
              className="animate-fade-in-up text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight font-serif"
              style={{ animationDelay: "0.15s" }}
            >
              Your Trusted Export Partner from{" "}
              <span className="text-[#F5A623]">India</span>
            </h1>

            {/* Subheading with stagger delay */}
            <p
              className="animate-fade-in-up text-base sm:text-lg text-gray-200/90 max-w-2xl leading-relaxed font-normal"
              style={{ animationDelay: "0.3s" }}
            >
              Connecting international buyers, distributors, and global enterprises
              with certified, precision-manufactured, and verified products from
              the industrial heart of Gujarat. Seamless export documentation,
              rigorous quality assurance, and direct container shipping.
            </p>

            {/* Two CTA Buttons with stagger delay */}
            <div
              className="animate-fade-in-up flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
              style={{ animationDelay: "0.45s" }}
            >
              <Link
                href="/products"
                className="btn-glow inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#F5A623] hover:bg-[#e09315] text-[#1B3A6B] font-bold text-base shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:ring-offset-2 focus:ring-offset-[#1B3A6B]"
              >
                <span>Explore Products</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/contact"
                className="btn-glow-navy inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl border-2 border-white/80 text-white hover:bg-white hover:text-[#1B3A6B] font-bold text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#1B3A6B]"
              >
                <span>Request a Quote</span>
              </Link>
            </div>

            {/* Key trust indicators below CTAs */}
            <div
              className="animate-fade-in-up pt-6 border-t border-white/15 grid grid-cols-3 gap-4 text-xs text-gray-300"
              style={{ animationDelay: "0.6s" }}
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#F5A623]" />
                <span>Pre-shipment Inspection</span>
              </div>
              <div className="flex items-center gap-2">
                <Ship className="w-4 h-4 text-[#F5A623]" />
                <span>Mundra & Kandla Ports</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe2 className="w-4 h-4 text-[#F5A623]" />
                <span>Global Incoterms 2020</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Card with animate-float */}
          <div className="lg:col-span-5">
            <div className="animate-float relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 group">
              {/*
                GEMINI IMAGE PROMPT:
                "A majestic commercial container cargo vessel loaded with multi-colored export shipping containers cruising across deep navy ocean waters near a modern Indian commercial port at dawn. Atmospheric golden sunlight reflecting on the water, subtle mist, warm amber glow on the horizon, ultra-sharp architectural lines, cinematic corporate industrial logistics photography, 8k resolution, crisp detail, representing reliable global B2B maritime trade."
              */}
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src="/images/hero-shipping.png"
                  alt="Commercial container ship for international B2B freight export from India"
                  fill
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B3A6B] via-transparent to-transparent opacity-70" />
              </div>

              {/* Float badge on image */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur text-gray-900 p-4 rounded-xl shadow-lg border border-gray-100 flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase tracking-wider text-gray-500 block font-semibold">
                    Strategic Gateway
                  </span>
                  <p className="text-sm font-bold text-[#1B3A6B]">
                    Gujarat Coastline Logistics Hub
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#1B3A6B]/10 flex items-center justify-center text-[#1B3A6B]">
                  <Ship className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
