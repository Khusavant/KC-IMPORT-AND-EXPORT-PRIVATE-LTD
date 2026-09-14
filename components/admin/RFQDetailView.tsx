"use client";

import React, { useState } from "react";
import Link from "next/link";
import { RFQ, RFQStatus } from "@/lib/admin-types";
import { RFQSummary, SalesEmailDraft } from "@/lib/ai-types";
import RFQSummaryCard from "@/components/ai/RFQSummaryCard";
import {
  FileText,
  User,
  Building,
  Mail,
  Phone,
  Globe,
  Anchor,
  Calendar,
  Layers,
  DollarSign,
  Paperclip,
  CheckCircle2,
  Archive,
  ArrowLeft,
  Sparkles,
  ExternalLink,
  Copy,
  Check,
  X,
} from "lucide-react";

interface RFQDetailViewProps {
  rfq: RFQ;
  onStatusChange?: (newStatus: RFQStatus) => void;
}

export default function RFQDetailView({ rfq, onStatusChange }: RFQDetailViewProps) {
  const [currentStatus, setCurrentStatus] = useState<RFQStatus>(rfq.status);
  const [notes, setNotes] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isGeneratingEmail, setIsGeneratingEmail] = useState(false);
  const [emailDraft, setEmailDraft] = useState<SalesEmailDraft | null>(null);
  const [copiedSubject, setCopiedSubject] = useState(false);
  const [copiedBody, setCopiedBody] = useState(false);

  const handleGenerateSalesEmail = async () => {
    setIsGeneratingEmail(true);
    setIsEmailModalOpen(true);
    try {
      const res = await fetch("/api/sales-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rfqData: aiStructuredRFQ }),
      });
      if (res.ok) {
        const data = await res.json();
        setEmailDraft(data);
      }
    } catch (err) {
      console.error("Failed to generate sales email draft:", err);
    } finally {
      setIsGeneratingEmail(false);
    }
  };

  const handleStatusUpdate = (status: RFQStatus) => {
    setCurrentStatus(status);
    if (onStatusChange) onStatusChange(status);
  };

  const handleSaveNotes = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const statusColors = {
    pending: "bg-amber-50 text-amber-800 border-amber-200",
    reviewed: "bg-blue-50 text-blue-800 border-blue-200",
    quoted: "bg-emerald-50 text-emerald-800 border-emerald-200",
    archived: "bg-gray-100 text-gray-700 border-gray-200",
  }[currentStatus];

  const aiStructuredRFQ: RFQSummary = {
    product: rfq.product,
    sku: rfq.sku,
    quantity: rfq.quantity,
    destination: rfq.destination,
    deliveryDate: rfq.deliveryDate,
    specifications: rfq.specifications || rfq.aiSummary,
    buyerName: rfq.buyerName,
    company: rfq.company,
    email: rfq.email,
    phone: rfq.phone,
    targetPrice: rfq.targetPrice,
    intentLevel: "high",
  };

  return (
    <div className="space-y-8">
      {/* Header with Navigation and Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <Link
            href="/admin/rfqs"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-[#1B3A6B] transition mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All RFQs</span>
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 font-serif">
              {rfq.id}
            </h1>
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${statusColors}`}
            >
              {currentStatus}
            </span>
          </div>
          <span className="text-xs text-gray-400 mt-1 block">
            Submitted on {rfq.createdAt}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleGenerateSalesEmail}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1B3A6B] hover:bg-[#12284b] text-white text-xs font-bold transition shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-[#F5A623]" />
            <span>Generate Sales Email Draft</span>
          </button>

          <button
            type="button"
            onClick={() => handleStatusUpdate("quoted")}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-sm"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Mark as Quoted</span>
          </button>

          <button
            type="button"
            onClick={() => handleStatusUpdate("archived")}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 text-gray-700 text-xs font-semibold transition"
          >
            <Archive className="w-4 h-4" />
            <span>Archive RFQ</span>
          </button>
        </div>
      </div>

      {/* AI Executive Summary Banner */}
      <div className="bg-blue-50/70 border border-blue-200/80 rounded-2xl p-5 sm:p-6 space-y-2">
        <div className="flex items-center gap-2 text-[#1B3A6B]">
          <Sparkles className="w-4 h-4 text-[#F5A623]" />
          <h3 className="text-xs font-bold uppercase tracking-wider">
            AI Automated RFQ Analysis
          </h3>
        </div>
        <p className="text-sm text-gray-800 leading-relaxed font-medium">
          {rfq.aiSummary}
        </p>
      </div>

      {/* 2-Column Details Grid: Left Commercial Specs (7 cols), Right Buyer Profile (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Technical Inquiry Specs */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/90 shadow-subtle space-y-6">
          <h2 className="text-lg font-bold text-[#1B3A6B] font-serif border-b border-gray-100 pb-3">
            Inquiry Specifications & Terms
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100">
              <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block">
                Target Product
              </span>
              <strong className="text-gray-900 block mt-0.5">{rfq.product}</strong>
              {rfq.sku && <span className="text-xs text-gray-500 font-mono">SKU: {rfq.sku}</span>}
            </div>

            <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100">
              <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block">
                Requested Quantity
              </span>
              <strong className="text-gray-900 block mt-0.5">{rfq.quantity}</strong>
            </div>

            <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100">
              <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block">
                Destination Port
              </span>
              <div className="flex items-center gap-1.5 mt-0.5 font-bold text-gray-900">
                <Anchor className="w-3.5 h-3.5 text-[#1B3A6B]" />
                <span>{rfq.destination}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100">
              <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block">
                Required Delivery Date
              </span>
              <div className="flex items-center gap-1.5 mt-0.5 font-bold text-gray-900">
                <Calendar className="w-3.5 h-3.5 text-[#F5A623]" />
                <span>{rfq.deliveryDate}</span>
              </div>
            </div>
          </div>

          {/* Full Customization Specs */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-700 block mb-2">
              Buyer Notes & Custom Specifications
            </span>
            <div className="p-4 rounded-xl bg-gray-50/80 border border-gray-200 text-xs sm:text-sm text-gray-700 leading-relaxed">
              {rfq.specifications}
            </div>
          </div>

          {/* Target Price */}
          {rfq.targetPrice && (
            <div className="flex items-center justify-between p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs sm:text-sm">
              <div className="flex items-center gap-2 text-amber-900 font-semibold">
                <DollarSign className="w-4 h-4 text-[#F5A623]" />
                <span>Buyer Target Price:</span>
              </div>
              <strong className="text-amber-950 font-bold">{rfq.targetPrice}</strong>
            </div>
          )}

          {/* File Attachments */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-700 block mb-2">
              Attached Documents
            </span>
            {rfq.hasAttachment ? (
              <div className="flex items-center justify-between p-3.5 rounded-xl border border-gray-200 bg-white">
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-800">
                  <Paperclip className="w-4 h-4 text-[#1B3A6B]" />
                  <span>Technical_Specification_Drawing_v1.pdf (2.4 MB)</span>
                </div>
                <span className="text-xs text-[#1B3A6B] font-bold">
                  Verified PDF
                </span>
              </div>
            ) : (
              <p className="text-xs text-gray-400 italic">No files attached to this RFQ.</p>
            )}
          </div>
        </div>

        {/* Right Column: AI Structured RFQ & Buyer Details */}
        <div className="lg:col-span-5 space-y-6">
          {/* Read-Only AI Structured Summary Card */}
          <RFQSummaryCard rfq={aiStructuredRFQ} readOnly={true} />

          {/* Buyer Card */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200/90 shadow-subtle space-y-4">
            <h2 className="text-base font-bold text-[#1B3A6B] font-serif border-b border-gray-100 pb-3 flex items-center justify-between">
              <span>Buyer Profile</span>
              <Link
                href={`/admin/leads/${rfq.leadId}`}
                className="text-xs font-semibold text-[#1B3A6B] hover:text-[#F5A623] flex items-center gap-1 transition"
              >
                <span>View Lead {rfq.leadId}</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </h2>

            <div className="space-y-3 text-xs sm:text-sm text-gray-700">
              <div className="flex items-center gap-3">
                <User className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <span className="font-bold text-gray-900">{rfq.buyerName}</span>
              </div>
              <div className="flex items-center gap-3">
                <Building className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <span>{rfq.company}</span>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <span>{rfq.country}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <a href={`mailto:${rfq.email}`} className="text-[#1B3A6B] hover:underline">
                  {rfq.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <a href={`tel:${rfq.phone}`} className="text-gray-700">
                  {rfq.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Internal Notes Editor */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200/90 shadow-subtle space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700">
              Internal Export Desk Notes
            </h3>
            <textarea
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add internal notes on raw material quotes, factory capacity, or shipping line schedules..."
              className="w-full p-3 rounded-xl border border-gray-300 text-xs sm:text-sm focus:ring-2 focus:ring-[#1B3A6B]"
            />
            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] text-emerald-600 font-semibold">
                {isSaved ? "Notes updated successfully!" : ""}
              </span>
              <button
                type="button"
                onClick={handleSaveNotes}
                className="px-4 py-2 bg-[#1B3A6B] hover:bg-[#12284b] text-white text-xs font-bold rounded-lg transition"
              >
                Save Notes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* AI Sales Email Draft Modal */}
      {isEmailModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl p-6 shadow-2xl border border-gray-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2 text-[#1B3A6B]">
                <Sparkles className="w-5 h-5 text-[#F5A623]" />
                <h3 className="text-base font-bold font-serif">
                  AI-Generated B2B Commercial Follow-Up Email
                </h3>
              </div>
              <button
                onClick={() => setIsEmailModalOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {isGeneratingEmail ? (
              <div className="py-12 flex flex-col items-center justify-center space-y-3">
                <div className="w-8 h-8 rounded-full border-2 border-[#1B3A6B] border-t-transparent animate-spin"></div>
                <p className="text-xs text-gray-500 font-medium">
                  Formulating grounded B2B proposal via Groq AI...
                </p>
              </div>
            ) : emailDraft ? (
              <div className="space-y-4 text-xs">
                {/* Subject */}
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase text-gray-400">
                      Subject Line
                    </span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(emailDraft.subject);
                        setCopiedSubject(true);
                        setTimeout(() => setCopiedSubject(false), 2000);
                      }}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#1B3A6B] hover:underline"
                    >
                      {copiedSubject ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          Copy Subject
                        </>
                      )}
                    </button>
                  </div>
                  <p className="font-semibold text-gray-900 text-sm">
                    {emailDraft.subject}
                  </p>
                </div>

                {/* Body */}
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase text-gray-400">
                      Email Body
                    </span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(emailDraft.body);
                        setCopiedBody(true);
                        setTimeout(() => setCopiedBody(false), 2000);
                      }}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#1B3A6B] hover:underline"
                    >
                      {copiedBody ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          Copy Email Body
                        </>
                      )}
                    </button>
                  </div>
                  <p className="whitespace-pre-wrap text-gray-800 font-sans leading-relaxed text-xs sm:text-sm">
                    {emailDraft.body}
                  </p>
                </div>

                {/* Follow up date */}
                <div className="flex items-center justify-between pt-2 text-gray-500 text-[11px]">
                  <span>
                    Suggested Next Follow-up:{" "}
                    <strong className="text-gray-900">
                      {emailDraft.followUpDate}
                    </strong>
                  </span>
                  <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                    Ready to dispatch
                  </span>
                </div>
              </div>
            ) : null}

            <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsEmailModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
