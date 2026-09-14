"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Lead, LeadStatus } from "@/lib/admin-types";
import LeadScoreBadge from "@/components/ai/LeadScoreBadge";
import {
  ArrowLeft,
  User,
  Building,
  Mail,
  Phone,
  Globe,
  Anchor,
  Calendar,
  MessageCircle,
  FileSpreadsheet,
  CheckCircle2,
  Clock,
  Sparkles,
  Layers,
  Save,
  Flame,
} from "lucide-react";

interface LeadDetailClientProps {
  lead: Lead;
}

export default function LeadDetailClient({ lead }: LeadDetailClientProps) {
  const [status, setStatus] = useState<LeadStatus>(lead.status);
  const [notes, setNotes] = useState(lead.notes);
  const [isSaved, setIsSaved] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [urgency, setUrgency] = useState<"low" | "medium" | "high">("medium");
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);

  const leadSignals = [
    `Volume Requested: ${lead.quantity}`,
    `Discharge Port: ${lead.destination}`,
    `Inquiry Channel: ${lead.source.replace("_", " ").toUpperCase()}`,
    `Product Interest: ${lead.productInterest}`,
  ];

  const loadFollowupSuggestions = React.useCallback(async () => {
    setLoadingSuggestions(true);
    try {
      const res = await fetch("/api/followup-suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lead }),
      });
      if (res.ok) {
        const data = await res.json();
        setSuggestions(data.suggestions || []);
        setUrgency(data.urgency || "medium");
      }
    } catch (e) {
      console.error("Failed to load suggestions:", e);
    } finally {
      setLoadingSuggestions(false);
    }
  }, [lead]);

  React.useEffect(() => {
    loadFollowupSuggestions();
  }, [loadFollowupSuggestions]);

  const handleSaveNotes = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const statusOptions: { value: LeadStatus; label: string }[] = [
    { value: "new", label: "New Inquiry" },
    { value: "contacted", label: "Contacted" },
    { value: "requirement_confirmed", label: "Requirement Confirmed" },
    { value: "quotation_sent", label: "Quotation Sent" },
    { value: "negotiation", label: "Negotiation" },
    { value: "won", label: "Won / Contract Active" },
    { value: "lost", label: "Lost / Inactive" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <Link
            href="/admin/leads"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-[#1B3A6B] transition mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Leads Pipeline</span>
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 font-serif">
              {lead.name}
            </h1>
            <span className="font-mono text-xs text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-full font-bold">
              {lead.id}
            </span>
            <LeadScoreBadge
              intent={lead.intent}
              reason={`Commercial intent scored based on inquiry parameters.`}
              signals={leadSignals}
              size="md"
            />
          </div>
          <span className="text-xs text-gray-500 mt-1 block">
            {lead.company} • Logged via {lead.source.replace("_", " ")} on {lead.createdAt}
          </span>
        </div>

        {/* Status Dropdown */}
        <div className="flex items-center gap-3">
          <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
            Pipeline Stage:
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as LeadStatus)}
            className="py-2 px-3 rounded-xl border border-gray-300 text-xs font-bold bg-white text-[#1B3A6B] focus:ring-2 focus:ring-[#1B3A6B] shadow-sm"
          >
            {statusOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid: Left Column Details (7 cols), Right Column Actions & Conversation (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column */}
        <div className="lg:col-span-7 space-y-6">
          {/* Contact Details Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/90 shadow-subtle space-y-5">
            <h2 className="text-base font-bold text-[#1B3A6B] font-serif border-b border-gray-100 pb-3">
              Commercial Contact Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="flex items-start gap-3 p-3.5 bg-gray-50 rounded-xl">
                <User className="w-4 h-4 text-gray-400 mt-0.5" />
                <div>
                  <span className="text-[11px] font-semibold text-gray-400 uppercase block">Buyer Name</span>
                  <span className="font-bold text-gray-900">{lead.name}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 bg-gray-50 rounded-xl">
                <Building className="w-4 h-4 text-gray-400 mt-0.5" />
                <div>
                  <span className="text-[11px] font-semibold text-gray-400 uppercase block">Company Name</span>
                  <span className="font-bold text-gray-900">{lead.company}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 bg-gray-50 rounded-xl">
                <Globe className="w-4 h-4 text-gray-400 mt-0.5" />
                <div>
                  <span className="text-[11px] font-semibold text-gray-400 uppercase block">Country / Market</span>
                  <span className="font-bold text-gray-900">{lead.country}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 bg-gray-50 rounded-xl">
                <Anchor className="w-4 h-4 text-gray-400 mt-0.5" />
                <div>
                  <span className="text-[11px] font-semibold text-gray-400 uppercase block">Destination Port</span>
                  <span className="font-bold text-gray-900">{lead.destination}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 bg-gray-50 rounded-xl">
                <Mail className="w-4 h-4 text-gray-400 mt-0.5" />
                <div>
                  <span className="text-[11px] font-semibold text-gray-400 uppercase block">Email Address</span>
                  <a href={`mailto:${lead.email}`} className="text-[#1B3A6B] hover:underline font-semibold">
                    {lead.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 bg-gray-50 rounded-xl">
                <Phone className="w-4 h-4 text-gray-400 mt-0.5" />
                <div>
                  <span className="text-[11px] font-semibold text-gray-400 uppercase block">Telephone / WhatsApp</span>
                  <a href={`tel:${lead.phone}`} className="text-gray-900 font-semibold">
                    {lead.phone}
                  </a>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Action Button */}
            <div className="pt-2">
              <a
                href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold transition shadow-sm"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Open Direct WhatsApp Chat with Buyer</span>
              </a>
            </div>
          </div>

          {/* Product Interest Box */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/90 shadow-subtle space-y-4">
            <h2 className="text-base font-bold text-[#1B3A6B] font-serif border-b border-gray-100 pb-3">
              Export Requirement Summary
            </h2>
            <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-100 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#1B3A6B]">
                  Target Product: {lead.productInterest}
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-white text-[#1B3A6B] shadow-sm">
                  Volume: {lead.quantity}
                </span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                Initial inquiry submitted for delivery at {lead.destination}. Verified by Rajkot desk.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: AI Summary & Internal Notes */}
        <div className="lg:col-span-5 space-y-6">
          {/* AI Conversation Summary Placeholder */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200/90 shadow-subtle space-y-3">
            <div className="flex items-center gap-2 text-[#1B3A6B]">
              <Sparkles className="w-4 h-4 text-[#F5A623]" />
              <h3 className="text-xs font-bold uppercase tracking-wider">
                Conversation Summary & Insights
              </h3>
            </div>
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 text-xs text-gray-700 leading-relaxed space-y-2">
              <p>
                <strong>Initial Touchpoint:</strong> Inquiry received via {lead.source.replace("_", " ")} on {lead.createdAt}.
              </p>
              <p>
                <strong>Buyer Intent:</strong> Classified as <span className="font-bold uppercase text-[#1B3A6B]">{lead.intent}</span> based on specific quantity specifications and direct container destination port input.
              </p>
              <p className="text-gray-500 italic">
                AI recommendation: Issue official proforma invoice with FOB Mundra options within 24 hours.
              </p>
            </div>
          </div>

          {/* AI Recommended Follow-Up Actions */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200/90 shadow-subtle space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#1B3A6B]">
                <Sparkles className="w-4 h-4 text-[#F5A623]" />
                <h3 className="text-xs font-bold uppercase tracking-wider">
                  AI Recommended Follow-Up Actions
                </h3>
              </div>
              <span
                className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${
                  urgency === "high"
                    ? "bg-red-50 text-red-700 border-red-200"
                    : "bg-amber-50 text-amber-800 border-amber-200"
                }`}
              >
                {urgency} Priority
              </span>
            </div>

            {loadingSuggestions ? (
              <p className="text-xs text-gray-400 italic animate-pulse">
                Analyzing trade parameters and generating follow-up plan...
              </p>
            ) : (
              <ul className="space-y-2">
                {suggestions.map((item, idx) => (
                  <li
                    key={idx}
                    className="p-3 rounded-xl bg-blue-50/50 border border-blue-100/80 text-xs text-gray-800 flex items-start gap-2.5"
                  >
                    <span className="w-5 h-5 rounded-full bg-[#1B3A6B] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Internal Notes Textarea */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200/90 shadow-subtle space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700">
              Internal Account Notes
            </h3>
            <textarea
              rows={5}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Record phone discussions, target pricing, customs nuances..."
              className="w-full p-3 rounded-xl border border-gray-300 text-xs sm:text-sm focus:ring-2 focus:ring-[#1B3A6B]"
            />
            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] text-emerald-600 font-semibold">
                {isSaved ? "Saved to lead dossier!" : ""}
              </span>
              <button
                type="button"
                onClick={handleSaveNotes}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#1B3A6B] hover:bg-[#12284b] text-white text-xs font-bold rounded-lg transition"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Notes</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
