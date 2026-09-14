"use client";

import React, { useState } from "react";
import {
  FileCheck2,
  Send,
  Edit3,
  CheckCircle2,
  Package,
  MapPin,
  Calendar,
  Layers,
  User,
  Building,
  Mail,
  Phone,
  DollarSign,
} from "lucide-react";
import { RFQSummary } from "@/lib/ai-types";
import LeadScoreBadge from "./LeadScoreBadge";

interface RFQSummaryCardProps {
  rfq: RFQSummary;
  onEdit?: () => void;
  onConfirm?: (rfq: RFQSummary) => void;
  readOnly?: boolean;
}

export default function RFQSummaryCard({
  rfq,
  onEdit,
  onConfirm,
  readOnly = false,
}: RFQSummaryCardProps) {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConfirm = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      if (onConfirm) onConfirm(rfq);
    }, 600);
  };

  if (submitted) {
    return (
      <div className="my-3 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 shadow-xs animate-in fade-in">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-emerald-900">
              RFQ Dispatched to Commercial Desk!
            </h4>
            <p className="text-xs text-emerald-700 mt-0.5">
              Your inquiry has been registered under reference{" "}
              <strong className="font-mono">
                KC-RFQ-{Math.floor(1000 + Math.random() * 9000)}
              </strong>
              . Our export sales manager will reach out within 24 hours with a
              formal Proforma Invoice.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="my-3 rounded-2xl bg-gradient-to-b from-white to-gray-50/70 border border-blue-200/90 shadow-subtle overflow-hidden">
      {/* Card Header */}
      <div className="px-4 py-3 bg-[#1B3A6B] text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileCheck2 className="w-4 h-4 text-[#F5A623]" />
          <span className="font-bold text-xs uppercase tracking-wide">
            Structured RFQ Summary
          </span>
        </div>
        <LeadScoreBadge intent={rfq.intentLevel} size="sm" />
      </div>

      {/* Field Table */}
      <div className="p-3.5 space-y-2 text-xs divide-y divide-gray-100">
        <div className="flex items-center justify-between py-1">
          <span className="text-gray-500 flex items-center gap-1.5">
            <Package className="w-3.5 h-3.5 text-gray-400" />
            Product:
          </span>
          <span className="font-semibold text-gray-900 text-right max-w-[65%] truncate">
            {rfq.product} {rfq.sku ? `(${rfq.sku})` : ""}
          </span>
        </div>

        <div className="flex items-center justify-between py-1">
          <span className="text-gray-500 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-gray-400" />
            Quantity:
          </span>
          <span className="font-semibold text-gray-900">{rfq.quantity}</span>
        </div>

        <div className="flex items-center justify-between py-1">
          <span className="text-gray-500 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-gray-400" />
            Destination Port:
          </span>
          <span className="font-semibold text-gray-900 text-right">
            {rfq.destination}
          </span>
        </div>

        {rfq.deliveryDate && (
          <div className="flex items-center justify-between py-1">
            <span className="text-gray-500 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-gray-400" />
              Target Delivery:
            </span>
            <span className="text-gray-800">{rfq.deliveryDate}</span>
          </div>
        )}

        {rfq.specifications && (
          <div className="py-1">
            <span className="text-gray-500 block mb-0.5">Specifications:</span>
            <p className="text-gray-700 bg-white p-2 rounded-lg border border-gray-200 text-[11px] leading-relaxed">
              {rfq.specifications}
            </p>
          </div>
        )}

        {(rfq.buyerName || rfq.company) && (
          <div className="flex items-center justify-between py-1">
            <span className="text-gray-500 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-gray-400" />
              Buyer / Entity:
            </span>
            <span className="font-medium text-gray-800 text-right">
              {rfq.buyerName} {rfq.company ? `(${rfq.company})` : ""}
            </span>
          </div>
        )}

        {(rfq.email || rfq.phone) && (
          <div className="flex items-center justify-between py-1">
            <span className="text-gray-500 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-gray-400" />
              Contact:
            </span>
            <span className="text-gray-700 text-right font-mono text-[11px]">
              {rfq.email || rfq.phone}
            </span>
          </div>
        )}

        {rfq.targetPrice && (
          <div className="flex items-center justify-between py-1">
            <span className="text-gray-500 flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-gray-400" />
              Target Price:
            </span>
            <span className="font-semibold text-emerald-700">
              {rfq.targetPrice}
            </span>
          </div>
        )}
      </div>

      {/* Action Buttons (when not read-only) */}
      {!readOnly && (
        <div className="p-3 bg-gray-50/90 border-t border-gray-200 flex items-center gap-2">
          {onEdit && (
            <button
              type="button"
              onClick={onEdit}
              className="flex-1 py-2 px-3 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition"
            >
              <Edit3 className="w-3.5 h-3.5" />
              Edit Details
            </button>
          )}

          <button
            type="button"
            disabled={isSubmitting}
            onClick={handleConfirm}
            className="flex-1 py-2 px-3 rounded-xl bg-[#1B3A6B] hover:bg-[#152e55] text-white text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition shadow-xs disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5 text-[#F5A623]" />
            {isSubmitting ? "Dispatching..." : "Confirm & Send"}
          </button>
        </div>
      )}
    </div>
  );
}
