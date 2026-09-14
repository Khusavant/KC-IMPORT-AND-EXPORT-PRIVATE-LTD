"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MailQuestion,
  Calculator,
  ClipboardCheck,
  Factory,
  CheckCircle2,
  FileCheck,
  Ship,
  Anchor,
  ChevronDown,
  ArrowRight,
  UserCheck,
  Briefcase,
  HelpCircle,
} from "lucide-react";

const DETAILED_STEPS = [
  {
    step: "01",
    title: "Initial Inquiry & Requirement Brief",
    icon: MailQuestion,
    fullParagraph:
      "The export engagement commences when the buyer submits detailed product specifications, target order volume, destination port, and delivery schedule. Our technical team evaluates material feasibility, tooling requirements, and applicable Indian regulatory standards.",
    buyerProvides: "Technical blueprints, required quantities, destination port, packaging guidelines, and target budget.",
    kcHandles: "Feasibility review, factory availability audit, preliminary lead time estimation, and direct engineer review.",
  },
  {
    step: "02",
    title: "Commercial Quotation & Sample Dispatch",
    icon: Calculator,
    fullParagraph:
      "We issue a transparent, itemized Proforma Quotation based on ICC Incoterms (FOB Mundra/Kandla, CIF, or CFR). For customized components or agricultural goods, pre-production evaluation samples are air-freighted via DHL/FedEx for physical buyer approval.",
    buyerProvides: "Sample courier account details (or sample fee confirmation), commercial term preferences (FOB/CIF).",
    kcHandles: "Preparation of formal proforma invoice, sample batch preparation, laboratory testing certificate, and expedited sample shipping.",
  },
  {
    step: "03",
    title: "Purchase Order & Contract Confirmation",
    icon: ClipboardCheck,
    fullParagraph:
      "Upon sample approval and price acceptance, both parties execute the formal International Sales Contract. Commercial payment terms (such as Irrevocable LC at sight, T/T advance deposit, or DP terms) are finalized and verified.",
    buyerProvides: "Formal signed Purchase Order (PO), Letter of Credit (LC) draft, or advance wire transfer confirmation.",
    kcHandles: "Contract countersigning, LC compliance check with banking partners, and production slot reservation at manufacturing plants.",
  },
  {
    step: "04",
    title: "Raw Material Procurement & Batch Production",
    icon: Factory,
    fullParagraph:
      "Manufacturing begins under strict process parameters. For agricultural products, crop selection and Sortex machine cleaning take place. For engineering brass or hardware, high-speed multi-axis CNC turning and forging runs operate under calibrated tolerances.",
    buyerProvides: "Timely artwork / packaging label design approvals (for private label or OEM orders).",
    kcHandles: "Raw material chemical analysis, ongoing in-process QC surveillance, and weekly photo/video progress updates to the client.",
  },
  {
    step: "05",
    title: "Multi-Stage Pre-Shipment Quality Inspection",
    icon: CheckCircle2,
    fullParagraph:
      "Before leaving the factory floor, goods undergo exhaustive pre-shipment inspection (PSI). Our QA technicians verify dimensions, cosmetic surface finishing, chemical composition, tensile strength, moisture levels, and barcode accuracy against approved golden samples.",
    buyerProvides: "Nomination of third-party inspection agency (if buyer elects to conduct SGS / Bureau Veritas audit).",
    kcHandles: "Comprehensive PSI audit report with high-res photo logs, mill test reports (3.1), and third-party inspector facilitation.",
  },
  {
    step: "06",
    title: "Export Documentation & Port Customs Clearance",
    icon: FileCheck,
    fullParagraph:
      "Our customs clearance house (CHA) in Gujarat submits export declarations via the Indian Customs EDI system. We assemble the complete export dossier, ensure duty drawback compliance, and obtain necessary government phyto/quarantine releases.",
    buyerProvides: "Confirmation of consignee details, destination notify party, and specialized import document requirements.",
    kcHandles: "Commercial Invoices, Packing Lists, COO, Phyto/Fumigation certificates, shipping bills, and customs port clearance.",
  },
  {
    step: "07",
    title: "Container Stuffing & Ocean Vessel Loading",
    icon: Ship,
    fullParagraph:
      "Cargo is carefully loaded into export shipping containers at our staging facility or port CFS under cargo surveyor supervision. Heavy cargo is lashed and palletized securely. Containers are sealed with high-security ISO 17712 bolt seals and transferred onto the nominated container vessel at Mundra or Kandla port.",
    buyerProvides: "Shipping line booking confirmation (if shipping FOB under buyer's nominated freight forwarder).",
    kcHandles: "Container drayage, stuffing supervision, VGM filing, ISO bolt sealing, terminal handling (THC), and on-board vessel loading.",
  },
  {
    step: "08",
    title: "Bill of Lading Handover & Destination Handover",
    icon: Anchor,
    fullParagraph:
      "Once the vessel departs Indian waters, clean On-Board Bills of Lading are generated. The full original export document packet is dispatched via international courier or transmitted electronically (telex release / bank negotiation) to enable seamless customs clearance at the destination port.",
    buyerProvides: "Final invoice balance payment against BL copy (or bank presentation acceptance under LC).",
    kcHandles: "Issuance of original BL, international courier tracking, arrival port liaison, and post-delivery client satisfaction check.",
  },
];

const FAQS = [
  {
    question: "What are KC's standard payment terms for international export orders?",
    answer:
      "We accept Irrevocable Letter of Credit (LC at sight) from prime international banks, as well as Telegraphic Transfer (T/T with 30% advance deposit upon order confirmation and 70% against clean scanned Bill of Lading copies). For long-standing procurement partners, customized credit and DP terms can be structured.",
  },
  {
    question: "Which Indian ports do you ship containers from?",
    answer:
      "We primarily ship via Mundra Port (INMUN1) and Kandla/Deendayal Port (INIXY1) in Gujarat. Both ports are within 215–240 km of our Rajkot staging center, offering direct weekly container vessel sailings to Europe, the USA, the Middle East, and Asia with minimal transit dwell times. Pipavav Port is also utilized for dedicated rail-linked routes.",
  },
  {
    question: "Can we request third-party pre-shipment inspections like SGS or Bureau Veritas?",
    answer:
      "Yes, absolutely. We welcome and routinely facilitate third-party inspection audits from SGS, Bureau Veritas, Intertek, TUV SUD, or your nominated inspection surveyor. Our facility team prepares inspection lots and coordinates sampling protocols prior to container sealing.",
  },
  {
    question: "Do you offer private labeling, custom packaging, and barcoding?",
    answer:
      "Yes. We support custom OEM packaging across all product categories. This includes custom-printed multi-wall paper bags, branded export master cartons, retail blister packs, color gift boxes, and custom EAN/UPC barcodes applied strictly according to your supermarket or warehouse requirements.",
  },
  {
    question: "What Incoterms does KC Import and Export trade under?",
    answer:
      "We primarily trade under Incoterms 2020: FOB (Free On Board Mundra/Kandla), CIF (Cost, Insurance & Freight to destination port), and CFR (Cost & Freight). We can also quote Ex-Works (EXW) for clients with existing freight forwarding arrangements in India.",
  },
];

export default function ExportProcessClient() {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaqIdx(openFaqIdx === idx ? null : idx);
  };

  return (
    <div className="bg-[#F8F9FA] min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-[#1B3A6B] text-white py-16 sm:py-20">
        <div className="absolute inset-0 opacity-10 pointer-events-none navy-hero-pattern" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold text-amber-300">
            <Anchor className="w-3.5 h-3.5" />
            <span>End-to-End Maritime & Overland Logistics</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-serif tracking-tight">
            Our 8-Step Export Process
          </h1>
          <p className="text-base sm:text-lg text-gray-200 max-w-3xl leading-relaxed font-normal">
            A transparent, milestone-driven export methodology ensuring predictability,
            comprehensive quality checks, and punctual vessel loading from Gujarat seaports.
          </p>
        </div>
      </section>

      {/* 2. Detailed 8 Steps */}
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1B3A6B] font-serif">
              Step-by-Step Export Roadmap
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Understand the roles, deliverables, and timelines involved in every shipment.
            </p>
          </div>

          {DETAILED_STEPS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/90 shadow-subtle hover:shadow-card-hover transition-all duration-300 relative"
              >
                {/* Step Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-4">
                    <span className="text-3xl sm:text-4xl font-black text-[#F5A623] font-serif tracking-tighter">
                      {item.step}
                    </span>
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400 block">
                        Milestone {idx + 1} of 8
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold text-[#1B3A6B] font-serif">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#1B3A6B] flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-[#1B3A6B]" />
                  </div>
                </div>

                {/* Full Description */}
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                  {item.fullParagraph}
                </p>

                {/* Responsibilities Breakdown: Buyer vs KC */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-1.5">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-700">
                      <UserCheck className="w-4 h-4 text-[#1B3A6B]" />
                      <span>What the Buyer Provides:</span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {item.buyerProvides}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100 space-y-1.5">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1B3A6B]">
                      <Briefcase className="w-4 h-4 text-[#F5A623]" />
                      <span>What KC Handles:</span>
                    </div>
                    <p className="text-xs text-gray-700 leading-relaxed">
                      {item.kcHandles}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Export Process FAQ Accordion */}
      <section id="faq" className="scroll-mt-20 py-16 sm:py-20 bg-white border-t border-gray-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-[#1B3A6B] uppercase tracking-wider">
              <HelpCircle className="w-3.5 h-3.5 text-[#F5A623]" />
              <span>Frequently Asked Questions</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1B3A6B] font-serif">
              Export Process & Logistics FAQ
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Common questions from international importers regarding ordering, compliance, and shipping.
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={faq.question}
                  className="rounded-2xl border border-gray-200/90 overflow-hidden bg-white shadow-subtle transition-all"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base sm:text-lg font-bold text-gray-900 font-serif">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#1B3A6B] transition-transform duration-200 flex-shrink-0 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-6 sm:px-6 pt-1 text-sm text-gray-600 leading-relaxed border-t border-gray-100 animate-in fade-in duration-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* CTA to RFQ Form */}
          <div className="mt-16 text-center bg-[#1B3A6B] text-white rounded-2xl p-8 sm:p-12 space-y-4">
            <h3 className="text-2xl sm:text-3xl font-bold font-serif">
              Ready to Initiate Your Export Consignment?
            </h3>
            <p className="text-gray-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              Submit your RFQ specifications to receive a formal proforma quotation and delivery schedule.
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#F5A623] hover:bg-[#e09315] text-[#1B3A6B] font-bold text-sm shadow-md transition"
              >
                <span>Submit Export Requirement</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
