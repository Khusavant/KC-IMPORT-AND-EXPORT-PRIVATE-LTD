"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  NAV_LINKS,
  COMPANY_SHORT_NAME,
  COMPANY_PHONE,
} from "@/lib/constants";
import {
  Menu,
  X,
  Globe2,
  ArrowRight,
  Phone,
  Building2,
} from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on page transition
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Top micro-bar for international trade trust */}
      <div className="bg-[#12284b] text-white/85 text-xs py-1.5 px-4 hidden sm:block border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1 text-amber-400 font-medium">
              <Globe2 className="w-3.5 h-3.5" />
              Direct Gujarat Export Hub
            </span>
            <span className="text-white/40">|</span>
            <span>Rajkot, Gujarat, India</span>
            <span className="text-white/40">|</span>
            <span>IEC &amp; Customs Registered</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <a
              href={`tel:${COMPANY_PHONE.replace(/\s+/g, "")}`}
              className="flex items-center gap-1.5 hover:text-white transition"
            >
              <Phone className="w-3 h-3 text-[#F5A623]" />
              <span>Export Desk: {COMPANY_PHONE}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar with scroll-based background blur */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? "backdrop-blur-md bg-white/90 shadow-md border-b border-gray-200/80"
            : "bg-white/95 sm:bg-white/80 backdrop-blur-sm border-b border-gray-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Left: KC Logo Text */}
            <Link
              href="/"
              className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#1B3A6B] rounded-lg p-1"
            >
              <div className="w-10 h-10 rounded-lg bg-[#1B3A6B] flex items-center justify-center text-white shadow-sm group-hover:bg-[#12284b] transition">
                <Building2 className="w-5 h-5 text-[#F5A623]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-[#1B3A6B]">
                  {COMPANY_SHORT_NAME}
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#F5A623]">
                  Pvt. Ltd. • India
                </span>
              </div>
            </Link>

            {/* Center: Desktop Navigation with link-underline */}
            <nav
              className="hidden md:flex items-center space-x-1 lg:space-x-2"
              aria-label="Main Navigation"
            >
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`link-underline px-3.5 py-2 text-sm font-semibold rounded-md transition-colors ${
                      isActive
                        ? "text-[#1B3A6B] font-bold bg-blue-50/60"
                        : "text-gray-700 hover:text-[#1B3A6B] hover:bg-gray-50/80"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right: Request a Quote CTA with btn-glow */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/contact"
                className="btn-glow inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#F5A623] hover:bg-[#e09315] text-[#1B3A6B] font-bold text-sm shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:ring-offset-2"
              >
                <span>Request a Quote</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex md:hidden">
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? "Close Menu" : "Open Menu"}
                className="p-2.5 rounded-lg text-gray-700 hover:text-[#1B3A6B] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#1B3A6B]"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Full-Screen / Dropdown Overlay with smooth slide-down animation */}
        {isOpen && (
          <div className="md:hidden fixed inset-x-0 top-[80px] bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-2xl z-50 animate-in slide-in-from-top-4 duration-300">
            <div className="px-5 pt-4 pb-8 space-y-2">
              <div className="mb-3 px-3 py-1.5 rounded bg-blue-50/60 text-xs font-semibold text-[#1B3A6B] flex items-center justify-between">
                <span>Rajkot Commercial Export Desk</span>
                <span className="text-[#F5A623] font-bold">IEC Active</span>
              </div>
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`block px-4 py-3 rounded-lg text-base font-semibold transition ${
                      isActive
                        ? "bg-[#1B3A6B] text-white"
                        : "text-gray-800 hover:bg-gray-100"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}

              <div className="pt-4 border-t border-gray-100 space-y-3">
                <Link
                  href="/contact"
                  className="btn-glow flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-[#F5A623] text-[#1B3A6B] font-bold text-center shadow-md text-sm"
                >
                  <span>Submit Inquiry / RFQ</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <div className="text-center text-xs text-gray-500 pt-1">
                  Direct WhatsApp: {COMPANY_PHONE}
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
