"use client";

import React from "react";
import Link from "next/link";
import StatCard from "@/components/admin/StatCard";
import { MOCK_LEADS } from "@/lib/mock-leads";
import { MOCK_RFQS } from "@/lib/mock-rfqs";
import { PRODUCTS } from "@/lib/products";
import {
  Users2,
  FileSpreadsheet,
  Package,
  TrendingUp,
  Plus,
  ArrowRight,
  ExternalLink,
  Building,
  Globe,
  Calendar,
} from "lucide-react";

export default function AdminDashboardPage() {
  const recentLeads = MOCK_LEADS.slice(0, 5);
  const pendingRfqs = MOCK_RFQS.filter((r) => r.status === "pending").slice(0, 5);

  const statusColors = {
    new: "bg-blue-50 text-blue-800 border-blue-200",
    contacted: "bg-purple-50 text-purple-800 border-purple-200",
    requirement_confirmed: "bg-indigo-50 text-indigo-800 border-indigo-200",
    quotation_sent: "bg-amber-50 text-amber-800 border-amber-200",
    negotiation: "bg-orange-50 text-orange-800 border-orange-200",
    won: "bg-emerald-50 text-emerald-800 border-emerald-200",
    lost: "bg-gray-100 text-gray-700 border-gray-200",
  };

  return (
    <div className="space-y-8">
      {/* Top Banner / Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 font-serif">
            Export Commercial Overview
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Real-time pipeline monitoring for Rajkot export operations
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#1B3A6B] hover:bg-[#12284b] text-white text-xs font-bold rounded-xl transition shadow-sm"
          >
            <Plus className="w-3.5 h-3.5 text-[#F5A623]" />
            <span>Add Product</span>
          </Link>

          <Link
            href="/admin/leads"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-300 hover:border-[#1B3A6B] text-gray-700 hover:text-[#1B3A6B] text-xs font-bold rounded-xl transition shadow-sm"
          >
            <Users2 className="w-3.5 h-3.5" />
            <span>View All Leads</span>
          </Link>

          <Link
            href="/admin/rfqs"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#F5A623] hover:bg-[#e09315] text-[#1B3A6B] text-xs font-bold rounded-xl transition shadow-sm"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>View All RFQs</span>
          </Link>
        </div>
      </div>

      {/* 4 KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Total Buyer Leads"
          value="142"
          change="+18.4%"
          trend="up"
          period="vs last month"
          icon={Users2}
          accentColor="blue"
        />

        <StatCard
          title="Pending RFQ Inquiries"
          value={MOCK_RFQS.filter((r) => r.status === "pending").length}
          change="+4 new"
          trend="up"
          period="action required"
          icon={FileSpreadsheet}
          accentColor="amber"
        />

        <StatCard
          title="Export Products Listed"
          value={PRODUCTS.length}
          subtext="Across 6 core categories"
          icon={Package}
          accentColor="navy"
        />

        <StatCard
          title="Inquiry Conversion Rate"
          value="24.8%"
          change="+3.2%"
          trend="up"
          period="Q3 trade benchmark"
          icon={TrendingUp}
          accentColor="emerald"
        />
      </div>

      {/* 2-Column Tables Section: Recent Leads (Left), Pending RFQs (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Recent Leads Table (Last 5) */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-gray-200/90 shadow-subtle overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-[#1B3A6B] font-serif">
                Recent Buyer Leads
              </h2>
              <span className="text-xs text-gray-500">
                Latest commercial inquiries received
              </span>
            </div>
            <Link
              href="/admin/leads"
              className="inline-flex items-center gap-1 text-xs font-bold text-[#1B3A6B] hover:text-[#F5A623] transition"
            >
              <span>Pipeline View</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50/75 text-gray-500 font-bold uppercase tracking-wider text-[10px] border-b border-gray-100">
                <tr>
                  <th className="px-4 py-3">Buyer & Company</th>
                  <th className="px-3 py-3">Country</th>
                  <th className="px-3 py-3">Product Interest</th>
                  <th className="px-3 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3.5">
                      <Link
                        href={`/admin/leads/${lead.id}`}
                        className="font-bold text-gray-900 hover:text-[#1B3A6B] block truncate max-w-[160px]"
                      >
                        {lead.name}
                      </Link>
                      <span className="text-[11px] text-gray-500 truncate block">
                        {lead.company}
                      </span>
                    </td>
                    <td className="px-3 py-3.5 text-gray-600 font-medium">
                      {lead.country}
                    </td>
                    <td className="px-3 py-3.5">
                      <span className="text-gray-900 font-medium line-clamp-1 max-w-[150px]">
                        {lead.productInterest}
                      </span>
                      <span className="text-[10px] text-gray-400 block">
                        Qty: {lead.quantity}
                      </span>
                    </td>
                    <td className="px-3 py-3.5">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                          statusColors[lead.status] || "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {lead.status.replace("_", " ")}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pending Commercial RFQs (Last 5) */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-gray-200/90 shadow-subtle overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-[#1B3A6B] font-serif">
                Pending Export RFQs
              </h2>
              <span className="text-xs text-gray-500">
                Awaiting FOB/CIF calculation
              </span>
            </div>
            <Link
              href="/admin/rfqs"
              className="inline-flex items-center gap-1 text-xs font-bold text-[#1B3A6B] hover:text-[#F5A623] transition"
            >
              <span>View All ({MOCK_RFQS.length})</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50/75 text-gray-500 font-bold uppercase tracking-wider text-[10px] border-b border-gray-100">
                <tr>
                  <th className="px-4 py-3">RFQ ID</th>
                  <th className="px-3 py-3">Buyer</th>
                  <th className="px-3 py-3">Product / Qty</th>
                  <th className="px-3 py-3">Destination</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {pendingRfqs.map((rfq) => (
                  <tr key={rfq.id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3.5 font-mono font-bold text-[#1B3A6B]">
                      <Link
                        href={`/admin/rfqs/${rfq.id}`}
                        className="hover:underline flex items-center gap-1"
                      >
                        <span>{rfq.id}</span>
                        <ExternalLink className="w-3 h-3 text-gray-400" />
                      </Link>
                    </td>
                    <td className="px-3 py-3.5">
                      <span className="font-bold text-gray-900 block truncate max-w-[130px]">
                        {rfq.buyerName}
                      </span>
                      <span className="text-[10px] text-gray-500 truncate block">
                        {rfq.company}
                      </span>
                    </td>
                    <td className="px-3 py-3.5">
                      <span className="text-gray-900 font-medium line-clamp-1 max-w-[150px]">
                        {rfq.product}
                      </span>
                      <span className="text-[10px] text-[#F5A623] font-bold block">
                        {rfq.quantity}
                      </span>
                    </td>
                    <td className="px-3 py-3.5 text-gray-600 font-medium">
                      {rfq.destination}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
