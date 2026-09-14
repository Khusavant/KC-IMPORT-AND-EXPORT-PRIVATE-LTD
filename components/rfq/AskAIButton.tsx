"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MessageSquare, Bot, ArrowRight, MessageCircle, X } from "lucide-react";
import { COMPANY_WHATSAPP_LINK } from "@/lib/constants";

interface AskAIButtonProps {
  productName?: string;
  className?: string;
}

export default function AskAIButton({ productName, className = "" }: AskAIButtonProps) {
  const [showNotice, setShowNotice] = useState(false);

  return (
    <div className="relative inline-block">
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setShowNotice(!showNotice)}
        className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border-2 border-[#F5A623] text-[#1B3A6B] hover:bg-amber-50/70 font-bold text-sm transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:ring-offset-2 ${className}`}
        aria-expanded={showNotice}
        aria-haspopup="dialog"
      >
        <Bot className="w-4 h-4 text-[#F5A623]" />
        <MessageSquare className="w-4 h-4 text-[#F5A623]" />
        <span>Ask AI About This Product</span>
      </button>

      {/* Popover / Toast Notice */}
      {showNotice && (
        <div className="absolute left-0 sm:left-auto sm:right-0 bottom-full mb-3 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-amber-200 p-5 z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-start justify-between pb-2 border-b border-gray-100">
            <div className="flex items-center gap-2 text-[#1B3A6B]">
              <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center text-[#F5A623]">
                <Bot className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider">
                KC Trade AI Agent
              </span>
            </div>
            <button
              onClick={() => setShowNotice(false)}
              aria-label="Close AI notice"
              className="text-gray-400 hover:text-gray-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-3 space-y-2.5 text-left">
            <p className="text-xs font-semibold text-gray-900">
              AI Sourcing Assistant is coming soon in Phase 3!
            </p>
            <p className="text-xs text-gray-600 leading-relaxed">
              Our automated HS code calculator, Incoterms simulator, and real-time specs analyzer
              are in preparation. For immediate inquiries regarding{" "}
              <strong>{productName || "this product"}</strong>, please chat directly with our
              export team on WhatsApp.
            </p>

            <div className="pt-2">
              <Link
                href={COMPANY_WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowNotice(false)}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold transition shadow-sm"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Contact Export Desk on WhatsApp</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
