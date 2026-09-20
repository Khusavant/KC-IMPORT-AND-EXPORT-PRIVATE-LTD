import React from "react";
import Link from "next/link";
import {
  COMPANY_NAME,
  COMPANY_TAGLINE,
  COMPANY_EMAIL,
  COMPANY_PHONE,
  COMPANY_ADDRESS,
  COMPANY_WHATSAPP_LINK,
} from "@/lib/constants";
import {
  Building2,
  MapPin,
  Mail,
  Phone,
  MessageCircle,
  ArrowUpRight,
  ShieldCheck,
  Ship,
  Globe2,
  Linkedin,
  Twitter,
  Facebook,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#12284b] text-white border-t border-white/10 mt-auto">
      {/* Upper Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Column 1: Brand & Profile */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#F5A623] flex items-center justify-center text-[#1B3A6B] font-bold">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-serif">
                {COMPANY_NAME}
              </span>
            </div>

            <p className="text-sm text-gray-300 font-medium leading-relaxed">
              &ldquo;{COMPANY_TAGLINE}&rdquo;
            </p>

            <p className="text-xs text-gray-400 leading-relaxed">
              Empowering global importers, industrial distributors, and sourcing
              specialists with direct, transparent, and quality-certified trade pipelines
              from Rajkot, Gujarat.
            </p>

            <div className="pt-2 flex flex-col gap-3">
              <a
                href={COMPANY_WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#075E54] hover:bg-[#05463E] text-white text-xs font-bold transition shadow-sm w-fit"
              >
                <MessageCircle className="w-4 h-4 fill-current text-[#25D366]" />
                <span>Chat on WhatsApp</span>
              </a>

              {/* Verified Social Media Links */}
              <div className="pt-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-2">
                  Connect With Us
                </span>
                <div className="flex items-center gap-2.5">
                  <a
                    href="https://linkedin.com/company/kc-import-export"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="KC Import and Export on LinkedIn"
                    className="w-8 h-8 rounded-lg bg-white/10 hover:bg-[#F5A623] hover:text-[#1B3A6B] flex items-center justify-center text-gray-300 transition-all shadow-xs"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href="https://twitter.com/kc_export_in"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="KC Import and Export on Twitter"
                    className="w-8 h-8 rounded-lg bg-white/10 hover:bg-[#F5A623] hover:text-[#1B3A6B] flex items-center justify-center text-gray-300 transition-all shadow-xs"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a
                    href="https://facebook.com/kcimportexport"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="KC Import and Export on Facebook"
                    className="w-8 h-8 rounded-lg bg-white/10 hover:bg-[#F5A623] hover:text-[#1B3A6B] flex items-center justify-center text-gray-300 transition-all shadow-xs"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links & Trade Navigation */}
          <div className="space-y-4">
            <h3 className="text-xs uppercase tracking-widest text-[#F5A623] font-bold">
              Trade Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/products"
                  className="text-gray-300 hover:text-white flex items-center gap-2 group transition"
                >
                  <ArrowUpRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-[#F5A623] transition" />
                  <span>Product Catalog</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/industries"
                  className="text-gray-300 hover:text-white flex items-center gap-2 group transition"
                >
                  <ArrowUpRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-[#F5A623] transition" />
                  <span>Industries Served</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/why-kc"
                  className="text-gray-300 hover:text-white flex items-center gap-2 group transition"
                >
                  <ArrowUpRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-[#F5A623] transition" />
                  <span>Why Choose KC</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/export-process"
                  className="text-gray-300 hover:text-white flex items-center gap-2 group transition"
                >
                  <ArrowUpRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-[#F5A623] transition" />
                  <span>8-Step Export Process</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-white flex items-center gap-2 group transition"
                >
                  <ArrowUpRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-[#F5A623] transition" />
                  <span>Contact &amp; RFQ</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-white flex items-center gap-2 group transition"
                >
                  <ArrowUpRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-[#F5A623] transition" />
                  <span>About Us</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Trade Guides & Articles */}
          <div className="space-y-4">
            <h3 className="text-xs uppercase tracking-widest text-[#F5A623] font-bold">
              Trade Guides &amp; Insights
            </h3>
            <ul className="space-y-2.5 text-xs text-gray-300">
              <li>
                <Link
                  href="/blog/how-to-import-agricultural-products-from-india-complete-guide"
                  className="hover:text-white line-clamp-2 group transition flex items-start gap-1.5"
                >
                  <ArrowUpRight className="w-3 h-3 text-gray-500 group-hover:text-[#F5A623] shrink-0 mt-0.5" />
                  <span>How to Import Agricultural Products from India</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/understanding-hs-codes-for-industrial-components-export"
                  className="hover:text-white line-clamp-2 group transition flex items-start gap-1.5"
                >
                  <ArrowUpRight className="w-3 h-3 text-gray-500 group-hover:text-[#F5A623] shrink-0 mt-0.5" />
                  <span>Understanding HS Codes for Industrial Components</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/gujarat-as-indias-export-hub-why-buyers-choose-rajkot-suppliers"
                  className="hover:text-white line-clamp-2 group transition flex items-start gap-1.5"
                >
                  <ArrowUpRight className="w-3 h-3 text-gray-500 group-hover:text-[#F5A623] shrink-0 mt-0.5" />
                  <span>Gujarat as India&apos;s Global Export Hub</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/export-documentation-checklist-what-every-international-buyer-should-know"
                  className="hover:text-white line-clamp-2 group transition flex items-start gap-1.5"
                >
                  <ArrowUpRight className="w-3 h-3 text-gray-500 group-hover:text-[#F5A623] shrink-0 mt-0.5" />
                  <span>Export Documentation Checklist for Global Importers</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/moq-explained-how-minimum-order-quantities-work-in-b2b-export"
                  className="hover:text-white line-clamp-2 group transition flex items-start gap-1.5"
                >
                  <ArrowUpRight className="w-3 h-3 text-gray-500 group-hover:text-[#F5A623] shrink-0 mt-0.5" />
                  <span>MOQ Guide: How Minimum Order Quantities Work</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info & Export Desk */}
          <div className="space-y-4">
            <h3 className="text-xs uppercase tracking-widest text-[#F5A623] font-bold">
              Export Headquarters
            </h3>
            <div className="space-y-3.5 text-sm text-gray-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#F5A623] mt-1 flex-shrink-0" />
                <span>{COMPANY_ADDRESS.formatted}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#F5A623] flex-shrink-0" />
                <a
                  href={`mailto:${COMPANY_EMAIL}`}
                  className="hover:text-white transition"
                >
                  {COMPANY_EMAIL}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#F5A623] flex-shrink-0" />
                <a
                  href={`tel:${COMPANY_PHONE.replace(/\s+/g, "")}`}
                  className="hover:text-white transition"
                >
                  {COMPANY_PHONE}
                </a>
              </div>
            </div>

            {/* Ports Served Badge */}
            <div className="pt-2">
              <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-xs text-gray-300 flex items-center gap-3">
                <Ship className="w-5 h-5 text-[#F5A623] flex-shrink-0" />
                <div>
                  <span className="font-semibold text-white block">Gateway Ports</span>
                  <span>Mundra • Kandla • Pipavav (Gujarat)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lower Copyright & Compliance Strip */}
      <div className="border-t border-white/10 bg-[#0c1c36] py-6 text-xs text-gray-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <p>© {currentYear} {COMPANY_NAME}. All rights reserved.</p>
            <span className="hidden sm:inline text-white/20">|</span>
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="hover:text-white transition underline underline-offset-4">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition underline underline-offset-4">
                Terms of Trade
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-6 text-gray-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Verified Export House
            </span>
            <span className="flex items-center gap-1.5">
              <Globe2 className="w-3.5 h-3.5 text-[#F5A623]" />
              Incoterms 2020 Compliant
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
