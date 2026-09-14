import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Lock, Eye, FileText, ArrowLeft } from "lucide-react";
import { COMPANY_NAME, COMPANY_EMAIL, COMPANY_PHONE, COMPANY_ADDRESS } from "@/lib/constants";

import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "Privacy Policy | KC Import Export",
  description:
    "Privacy Policy and international data protection standards for KC Import and Export Private Limited, Rajkot, Gujarat, India.",
  keywords: "privacy policy, trade non disclosure, export data confidentiality, kc import export",
  alternates: { canonical: "https://kcimportexport.com/privacy" },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "KC Import and Export Private Limited",
    title: "Privacy Policy | KC Import Export",
    description:
      "Privacy Policy and international data protection standards for KC Import and Export Private Limited, Rajkot, Gujarat, India.",
    url: "https://kcimportexport.com/privacy",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@kcimportexport",
  },
};

export default function PrivacyPage() {
  return (
    <div className="bg-[#F8F9FA] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://kcimportexport.com" },
          { name: "Privacy Policy", url: "https://kcimportexport.com/privacy" },
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
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1B3A6B] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-[#1B3A6B]" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#F5A623]">
              Legal & Compliance
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1B3A6B] tracking-tight font-serif mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-500 mb-8 pb-6 border-b border-gray-100">
            Effective Date: September 2024 • Last Updated: September 2024 • Compliance: Indian IT Act, 2000 & GDPR Standards
          </p>

          <div className="space-y-8 text-gray-700 leading-relaxed text-sm">
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-[#1B3A6B] flex items-center gap-2">
                <Lock className="w-5 h-5 text-[#F5A623]" />
                1. Overview & Commitment
              </h2>
              <p>
                {COMPANY_NAME} (&ldquo;Company&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), registered in Rajkot, Gujarat, India, respects the privacy and confidentiality of our international trade partners, buyers, industrial clients, and website visitors. This Privacy Policy details how we collect, handle, store, and protect commercial and personal data collected through our export portal and RFQ submission channels.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-[#1B3A6B] flex items-center gap-2">
                <Eye className="w-5 h-5 text-[#F5A623]" />
                2. Information We Collect
              </h2>
              <p>
                As an enterprise B2B export house, we strictly gather commercial information necessary to facilitate international trade inquiries, quotations, custom clearances, and shipment fulfillments:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Commercial Inquiry Data:</strong> Company name, buyer contact person, corporate email address, business telephone/WhatsApp, country of destination, and target port of discharge.
                </li>
                <li>
                  <strong>RFQ & Trade Specifications:</strong> Desired product specifications, target grades, estimated order volume/tonnage, preferred Incoterms (FOB, CIF, CFR), and required lab certifications.
                </li>
                <li>
                  <strong>Technical & Session Data:</strong> IP address, browser type, referral URLs, and interactions on our digital export catalog to improve platform performance.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-[#1B3A6B] flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#F5A623]" />
                3. Purpose of Processing & Non-Disclosure
              </h2>
              <p>
                We do not sell, rent, or monetize your company or inquiry data to third-party marketing networks. Commercial data is used exclusively to:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Generate competitive Proforma Invoices and FOB/CIF freight quotes.</li>
                <li>Coordinate vessel bookings, container dispatch, and DGFT/Customs compliance.</li>
                <li>Provide AI-assisted quotation clarifications and order status updates.</li>
                <li>Comply with Indian customs regulations and international maritime trade documentation laws.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-[#1B3A6B]">
                4. Data Security & Storage
              </h2>
              <p>
                All transmitted RFQ communications and lead inquiries are encrypted using industry-standard TLS protocols. Internal records are stored securely with strict role-based authorization accessible only to verified KC export desk personnel.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-[#1B3A6B]">
                5. Contact the Export Desk
              </h2>
              <p>
                For questions regarding data privacy, document removal, or verification requests, contact our Rajkot compliance desk directly:
              </p>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 text-xs space-y-1">
                <p className="font-semibold text-gray-900">{COMPANY_NAME}</p>
                <p>{COMPANY_ADDRESS.formatted}</p>
                <p>Email: <a href={`mailto:${COMPANY_EMAIL}`} className="text-[#1B3A6B] font-semibold hover:underline">{COMPANY_EMAIL}</a></p>
                <p>Phone: <a href={`tel:${COMPANY_PHONE}`} className="text-[#1B3A6B] font-semibold hover:underline">{COMPANY_PHONE}</a></p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
