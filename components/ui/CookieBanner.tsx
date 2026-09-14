"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, ShieldCheck, X } from "lucide-react";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem("kc_cookie_consent");
      if (!consent) {
        // Show after a brief delay so it doesn't jarringly block the initial paint
        const timer = setTimeout(() => setIsVisible(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // Storage unavailable or blocked
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem("kc_cookie_consent", "accepted");
    } catch {}
    setIsVisible(false);
  };

  const handleDecline = () => {
    try {
      localStorage.setItem("kc_cookie_consent", "declined");
    } catch {}
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie and Privacy Consent"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 bg-[#12284b] text-white p-5 rounded-2xl shadow-2xl border border-white/10 animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-[#F5A623] flex items-center justify-center flex-shrink-0 mt-0.5">
          <Cookie className="w-4 h-4" />
        </div>
        <div className="space-y-2 flex-1">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F5A623] flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              Privacy &amp; Cookie Notice
            </h4>
            <button
              onClick={handleDecline}
              aria-label="Close cookie banner"
              className="text-gray-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-gray-300 leading-relaxed">
            We use technical cookies to store RFQ drafts, remember catalog preferences, and analyze trade traffic. Learn more in our{" "}
            <Link
              href="/privacy"
              className="text-amber-400 hover:underline font-semibold"
            >
              Privacy Policy
            </Link>
            .
          </p>
          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={handleAccept}
              className="px-4 py-1.5 rounded-lg bg-[#F5A623] hover:bg-amber-500 text-gray-950 font-bold text-xs transition"
            >
              Accept All
            </button>
            <button
              onClick={handleDecline}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-gray-300 hover:text-white text-xs font-medium transition"
            >
              Essential Only
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
