"use client";

import React from "react";
import { Lead, LeadStatus } from "@/lib/admin-types";
import LeadCard from "./LeadCard";
import { Users2, CheckCircle2, Clock, Sparkles } from "lucide-react";

interface LeadPipelineBoardProps {
  leads: Lead[];
  onStatusChange?: (leadId: string, newStatus: LeadStatus) => void;
}

const COLUMNS: { status: LeadStatus; label: string; dotColor: string }[] = [
  { status: "new", label: "New Inquiry", dotColor: "bg-blue-500" },
  { status: "contacted", label: "Contacted", dotColor: "bg-purple-500" },
  { status: "requirement_confirmed", label: "Requirement Confirmed", dotColor: "bg-indigo-500" },
  { status: "quotation_sent", label: "Quotation Sent", dotColor: "bg-amber-500" },
  { status: "negotiation", label: "Negotiation", dotColor: "bg-orange-500" },
  { status: "won", label: "Won / Active Contract", dotColor: "bg-emerald-500" },
  { status: "lost", label: "Closed / Lost", dotColor: "bg-gray-400" },
];

export default function LeadPipelineBoard({
  leads,
  onStatusChange,
}: LeadPipelineBoardProps) {
  return (
    <div className="overflow-x-auto pb-6">
      <div className="flex gap-5 min-w-[1300px]">
        {COLUMNS.map((col) => {
          const colLeads = leads.filter((l) => l.status === col.status);

          return (
            <div
              key={col.status}
              className="w-72 flex-shrink-0 bg-gray-100/70 rounded-2xl p-3.5 border border-gray-200/80 flex flex-col max-h-[80vh]"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 px-1 mb-2 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${col.dotColor}`} />
                  <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                    {col.label}
                  </h4>
                </div>
                <span className="w-5 h-5 rounded-full bg-white text-[11px] font-bold text-gray-600 flex items-center justify-center shadow-sm">
                  {colLeads.length}
                </span>
              </div>

              {/* Lead Cards in Column */}
              <div className="space-y-3 overflow-y-auto pr-1 flex-grow">
                {colLeads.length === 0 ? (
                  <div className="py-8 text-center text-xs text-gray-400 border-2 border-dashed border-gray-200 rounded-xl">
                    No leads in this stage
                  </div>
                ) : (
                  colLeads.map((lead) => (
                    <LeadCard
                      key={lead.id}
                      lead={lead}
                      onStatusChange={onStatusChange}
                    />
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
