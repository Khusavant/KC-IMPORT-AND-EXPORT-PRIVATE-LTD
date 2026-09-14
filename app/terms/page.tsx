import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Scale, Ship, FileCheck, AlertCircle, ArrowLeft } from "lucide-react";
import { COMPANY_NAME, COMPANY_EMAIL, COMPANY_PHONE, COMPANY_ADDRESS } from "@/lib/constants";

import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "Terms of Trade (Incoterms 2020) | KC Import Export",
  description:
    "Standard international commercial terms, payment conditions, quality inspection, and Incoterms 2020 rules for KC Import and Export Private Limited.",
  keywords:
    "incoterms 2020 rules, fob mundra payment terms, letter of credit export, trade contract terms india",
  alternates: { canonical: "https://kcimportexport.com/terms" },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "KC Import and Export Private Limited",
    title: "Terms of Trade (Incoterms 2020) | KC Import Export",
    description:
      "Standard international commercial terms, payment conditions, quality inspection, and Incoterms 2020 rules for KC Import and Export Private Limited.",
    url: "https://kcimportexport.com/terms",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@kcimportexport",
  },
};

export default function TermsPage() {
  return (
    <div className="bg-[#F8F9FA] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://kcimportexport.com" },
          { name: "Terms of Trade", url: "https://kcimportexport.com/terms" },
        ]}
      />
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[#1B3A6B] font-semibold hover:underline mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 sm:p-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#F5A623] flex items-center justify-center">
              <Scale className="w-6 h-6 text-[#F5A623]" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#1B3A6B]">
              International Commercial Terms
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1B3A6B] tracking-tight font-serif mb-4">
            Terms of Trade & Export Conditions
          </h1>
          <p className="text-sm text-gray-500 mb-8 pb-6 border-b border-gray-100">
            Standard Global Export Agreement • Governing Law: Jurisdiction of Rajkot, Gujarat, India • ICC Incoterms 2020 Rules
          </p>

          <div className="space-y-8 text-gray-700 leading-relaxed text-sm">
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-[#1B3A6B] flex items-center gap-2">
                <Ship className="w-5 h-5 text-[#F5A623]" />
                1. Incoterms & Delivery Basis
              </h2>
              <p>
                All official quotations, Proforma Invoices (PI), and sales contracts issued by {COMPANY_NAME} are governed by the International Chamber of Commerce (ICC) Incoterms 2020 rules. Unless explicitly specified otherwise in writing:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>FOB (Free On Board) Mundra / Kandla:</strong> Seller delivers goods on board the vessel nominated by buyer at gateway Gujarat port. Risk transfers once goods are loaded on vessel.
                </li>
                <li>
                  <strong>CIF / CFR (Cost, Insurance and Freight):</strong> Seller books marine shipping to named overseas port of destination. Under CIF, minimum marine cargo insurance is procured by seller.
                </li>
                <li>
                  <strong>EXW (Ex Works Rajkot):</strong> Buyer assumes all logistics responsibility from our Rajkot manufacturing / warehousing hub.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-[#1B3A6B] flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-[#F5A623]" />
                2. Payment Terms & Letter of Credit (L/C)
              </h2>
              <p>
                Standard export settlements are processed through verified scheduled banking channels in approved convertible currencies (USD, EUR, AED, GBP):
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Irrevocable Confirmed L/C at Sight:</strong> Drawn on an internationally recognized prime bank without recourse.
                </li>
                <li>
                  <strong>T/T (Telegraphic Transfer):</strong> Typically 30% advance deposit with order confirmation, 70% balance payable upon presentation of scanned Bill of Lading (B/L) and customs shipping bill copies.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-[#1B3A6B] flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-[#F5A623]" />
                3. Quality Inspection & Pre-Shipment Audit
              </h2>
              <p>
                Buyer reserves the right to arrange third-party pre-shipment inspection (e.g. SGS, Bureau Veritas, Intertek, or buyer-appointed surveyor) at the loading warehouse or Gujarat port prior to container sealing. Official Certificate of Analysis (COA) and phytosanitary certificates accompany every export lot.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-[#1B3A6B]">
                4. Force Majeure & Arbitration
              </h2>
              <p>
                Neither party shall be liable for delay or failure of performance resulting from acts beyond reasonable control, including port strikes, maritime blockades, natural disasters, or export trade embargoes. Disputes that cannot be amicably resolved shall be subject to arbitration under the Indian Arbitration and Conciliation Act, with legal seat in Rajkot, Gujarat.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-[#1B3A6B]">
                5. Export Documentation Provided
              </h2>
              <p>
                Standard shipment documentation package dispatched via DHL/FedEx courier or electronic e-B/L includes:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-medium">
                <li className="bg-gray-50 p-2.5 rounded border border-gray-200">Commercial Invoice (Signed & Stamped)</li>
                <li className="bg-gray-50 p-2.5 rounded border border-gray-200">Packing List with Net & Gross Weights</li>
                <li className="bg-gray-50 p-2.5 rounded border border-gray-200">Clean On Board Bill of Lading (3 Original / 3 Non-Negotiable)</li>
                <li className="bg-gray-50 p-2.5 rounded border border-gray-200">Certificate of Origin (Chamber of Commerce / DGFT)</li>
                <li className="bg-gray-50 p-2.5 rounded border border-gray-200">Phytosanitary / Quality Inspection Certificate</li>
                <li className="bg-gray-50 p-2.5 rounded border border-gray-200">Marine Insurance Policy (for CIF contracts)</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
