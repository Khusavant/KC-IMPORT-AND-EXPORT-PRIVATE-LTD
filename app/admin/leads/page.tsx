"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { MOCK_LEADS } from "@/lib/mock-leads";
import { Lead, LeadStatus } from "@/lib/admin-types";
import DataTable, { Column } from "@/components/admin/DataTable";
import LeadPipelineBoard from "@/components/admin/LeadPipelineBoard";
import {
  Users2,
  Kanban,
  Table as TableIcon,
  Filter,
  ArrowRight,
  ExternalLink,
  Flame,
  Globe,
  Building,
} from "lucide-react";

export default function AdminLeadsPage() {
  const [leadsList, setLeadsList] = useState<Lead[]>(MOCK_LEADS);
  const [viewMode, setViewMode] = useState<"table" | "kanban">("kanban");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [countryFilter, setCountryFilter] = useState<string>("all");

  const countries = useMemo(() => {
    return Array.from(new Set(MOCK_LEADS.map((l) => l.country))).sort();
  }, []);

  const filteredLeads = useMemo(() => {
    return leadsList.filter((lead) => {
      if (statusFilter !== "all" && lead.status !== statusFilter) return false;
      if (countryFilter !== "all" && lead.country !== countryFilter) return false;
      return true;
    });
  }, [leadsList, statusFilter, countryFilter]);

  const handleStatusChange = (leadId: string, newStatus: LeadStatus) => {
    setLeadsList(
      leadsList.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
    );
  };

  const statusColors: Record<LeadStatus, string> = {
    new: "bg-blue-50 text-blue-800 border-blue-200",
    contacted: "bg-purple-50 text-purple-800 border-purple-200",
    requirement_confirmed: "bg-indigo-50 text-indigo-800 border-indigo-200",
    quotation_sent: "bg-amber-50 text-amber-800 border-amber-200",
    negotiation: "bg-orange-50 text-orange-800 border-orange-200",
    won: "bg-emerald-50 text-emerald-800 border-emerald-200",
    lost: "bg-gray-100 text-gray-700 border-gray-200",
  };

  const columns: Column<Lead>[] = [
    {
      key: "id",
      header: "Lead ID",
      sortable: true,
      render: (item) => (
        <span className="font-mono text-xs font-bold text-[#1B3A6B]">
          {item.id}
        </span>
      ),
    },
    {
      key: "name",
      header: "Buyer & Company",
      sortable: true,
      render: (item) => (
        <div>
          <Link
            href={`/admin/leads/${item.id}`}
            className="font-bold text-gray-900 hover:text-[#1B3A6B] block"
          >
            {item.name}
          </Link>
          <span className="text-xs text-gray-500">{item.company}</span>
        </div>
      ),
    },
    {
      key: "country",
      header: "Country",
      sortable: true,
      render: (item) => (
        <div className="flex items-center gap-1.5 font-medium text-gray-700">
          <Globe className="w-3.5 h-3.5 text-[#1B3A6B]" />
          <span>{item.country}</span>
        </div>
      ),
    },
    {
      key: "productInterest",
      header: "Product Interest",
      render: (item) => (
        <div>
          <span className="font-medium text-gray-900 block line-clamp-1">
            {item.productInterest}
          </span>
          <span className="text-[11px] text-gray-500 font-semibold">
            Qty: {item.quantity}
          </span>
        </div>
      ),
    },
    {
      key: "status",
      header: "Pipeline Stage",
      sortable: true,
      render: (item) => (
        <span
          className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border ${
            statusColors[item.status]
          }`}
        >
          {item.status.replace("_", " ")}
        </span>
      ),
    },
    {
      key: "intent",
      header: "Intent",
      render: (item) => (
        <span className="inline-flex items-center gap-1 text-xs font-bold capitalize text-gray-700">
          <Flame
            className={`w-3.5 h-3.5 ${
              item.intent === "high"
                ? "text-rose-600 fill-rose-600"
                : item.intent === "medium"
                ? "text-amber-500"
                : "text-gray-400"
            }`}
          />
          <span>{item.intent}</span>
        </span>
      ),
    },
    {
      key: "createdAt",
      header: "Date",
      sortable: true,
      render: (item) => (
        <span className="text-xs text-gray-500">{item.createdAt}</span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      className: "text-right",
      render: (item) => (
        <Link
          href={`/admin/leads/${item.id}`}
          className="inline-flex items-center gap-1 text-xs font-bold text-[#1B3A6B] hover:text-[#F5A623] transition"
        >
          <span>View</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header & View Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 font-serif">
            B2B Leads Pipeline
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Track buyer engagement across initial inquiry, quotation, and contract confirmation
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-2 bg-gray-100 p-1.5 rounded-xl border border-gray-200">
          <button
            type="button"
            onClick={() => setViewMode("kanban")}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              viewMode === "kanban"
                ? "bg-white text-[#1B3A6B] shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Kanban className="w-4 h-4" />
            <span>Kanban Board</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode("table")}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              viewMode === "table"
                ? "bg-white text-[#1B3A6B] shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <TableIcon className="w-4 h-4" />
            <span>Table View</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200/90 shadow-subtle flex flex-wrap items-center gap-4 text-xs">
        <div className="flex items-center gap-2 text-gray-500">
          <Filter className="w-4 h-4 text-[#1B3A6B]" />
          <span className="font-bold uppercase tracking-wider">Filters:</span>
        </div>

        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="py-1.5 px-3 rounded-lg border border-gray-300 bg-white font-medium text-gray-700 focus:ring-2 focus:ring-[#1B3A6B]"
          >
            <option value="all">All Stages</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="requirement_confirmed">Requirement Confirmed</option>
            <option value="quotation_sent">Quotation Sent</option>
            <option value="negotiation">Negotiation</option>
            <option value="won">Won</option>
            <option value="lost">Lost</option>
          </select>
        </div>

        <div>
          <select
            value={countryFilter}
            onChange={(e) => setCountryFilter(e.target.value)}
            className="py-1.5 px-3 rounded-lg border border-gray-300 bg-white font-medium text-gray-700 focus:ring-2 focus:ring-[#1B3A6B]"
          >
            <option value="all">All Countries ({countries.length})</option>
            {countries.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {(statusFilter !== "all" || countryFilter !== "all") && (
          <button
            type="button"
            onClick={() => {
              setStatusFilter("all");
              setCountryFilter("all");
            }}
            className="text-xs font-semibold text-red-600 hover:underline ml-auto"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* View Rendering */}
      {viewMode === "kanban" ? (
        <LeadPipelineBoard
          leads={filteredLeads}
          onStatusChange={handleStatusChange}
        />
      ) : (
        <DataTable
          columns={columns as Column<Record<string, unknown>>[]}
          data={filteredLeads as unknown as Record<string, unknown>[]}
          searchPlaceholder="Search leads by name, company, or product..."
        />
      )}
    </div>
  );
}
