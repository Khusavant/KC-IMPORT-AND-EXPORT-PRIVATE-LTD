"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { COMPANY_WHATSAPP_LINK, COMPANY_PHONE } from "@/lib/constants";

interface WhatsAppButtonProps {
  className?: string;
  variant?: "floating" | "inline";
  label?: string;
}

export default function WhatsAppButton({
  className = "",
  variant = "floating",
  label = "Chat with Export Desk",
}: WhatsAppButtonProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  if (variant === "inline") {
    return (
      <Link
        href={COMPANY_WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Direct WhatsApp Chat with KC Export Desk"
        className={`inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 bg-[#25D366] text-white hover:bg-[#1EBE5D] shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 ${className}`}
      >
        <MessageCircle className="w-5 h-5 fill-current" />
        <span>{label}</span>
      </Link>
    );
  }

  // Floating button: Clean, non-intrusive on bottom-left, avoids AI assistant on bottom-right
  return (
    <aside
      aria-label="Export WhatsApp Direct Contact"
      className="fixed bottom-6 left-6 z-40 print:hidden"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Tooltip on hover */}
      {showTooltip && (
        <div className="absolute bottom-full left-0 mb-2 px-3 py-1.5 bg-[#12284b] text-white text-xs font-medium rounded-lg shadow-lg whitespace-nowrap animate-in fade-in duration-200 border border-white/10">
          Chat with KC Sales Desk ({COMPANY_PHONE})
          <div className="absolute top-full left-4 -mt-1 border-4 border-transparent border-t-[#12284b]" />
        </div>
      )}

      <Link
        href={COMPANY_WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat directly on WhatsApp with KC Export team"
        className="flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 border-2 border-white/80"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
        </span>
        <MessageCircle className="w-5 h-5 fill-current" />
        <span className="text-xs font-bold tracking-wide hidden sm:inline">WhatsApp Us</span>
      </Link>
    </aside>
  );
}
