"use client";

import React from "react";
import Link from "next/link";
import { Lead } from "@/lib/admin-types";
import {
  Globe,
  Building,
  Calendar,
  Layers,
  Phone,
  Flame,
  ArrowRight,
} from "lucide-react";

interface LeadCardProps {
  lead: Lead;
  onStatusChange?: (leadId: string, newStatus: Lead["status"]) => void;
}

export default function LeadCard({ lead }: LeadCardProps) {
  const intentColors = {
    high: "bg-rose-50 text-rose-700 border-rose-200",
    medium: "bg-amber-50 text-amber-700 border-amber-200",
    low: "bg-gray-100 text-gray-700 border-gray-200",
  }[lead.intent];

  return (
    <div className="bg-white rounded-xl p-4 border border-gray-200/90 shadow-subtle hover:shadow-card transition-all duration-200 space-y-3">
      {/* Header with intent and ID */}
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-mono font-bold text-gray-500">
          {lead.id}
        </span>
        <span
          className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${intentColors}`}
        >
          <Flame className="w-3 h-3" />
          <span>{lead.intent} Intent</span>
        </span>
      </div>

      {/* Buyer & Company Name */}
      <div>
        <Link
          href={`/admin/leads/${lead.id}`}
          className="text-sm font-bold text-gray-900 hover:text-[#1B3A6B] transition block truncate"
        >
          {lead.name}
        </Link>
        <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5 truncate">
          <Building className="w-3 h-3 text-gray-400 flex-shrink-0" />
          <span className="truncate">{lead.company}</span>
        </div>
      </div>

      {/* Product Interest */}
      <div className="bg-blue-50/50 rounded-lg p-2.5 border border-blue-100/70 text-xs">
        <span className="font-semibold text-[#1B3A6B] block line-clamp-1">
          {lead.productInterest}
        </span>
        <span className="text-gray-500 text-[11px]">
          Qty: {lead.quantity}
        </span>
      </div>

      {/* Metadata tags */}
      <div className="flex items-center justify-between text-[11px] text-gray-500 pt-1 border-t border-gray-100">
        <div className="flex items-center gap-1">
          <Globe className="w-3 h-3 text-[#1B3A6B]" />
          <span>{lead.country}</span>
        </div>
        <Link
          href={`/admin/leads/${lead.id}`}
          className="text-[#1B3A6B] hover:text-[#F5A623] font-bold flex items-center gap-0.5 text-xs transition"
        >
          <span>Inspect</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
