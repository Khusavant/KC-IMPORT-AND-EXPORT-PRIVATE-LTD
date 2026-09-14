"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { MOCK_RFQS } from "@/lib/mock-rfqs";
import { RFQ, RFQStatus } from "@/lib/admin-types";
import DataTable, { Column } from "@/components/admin/DataTable";
import {
  FileSpreadsheet,
  Filter,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Clock,
  Archive,
  Anchor,
  Calendar,
} from "lucide-react";

export default function AdminRFQsPage() {
  const [rfqsList, setRfqsList] = useState<RFQ[]>(MOCK_RFQS);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredRfqs = useMemo(() => {
    if (statusFilter === "all") return rfqsList;
    return rfqsList.filter((r) => r.status === statusFilter);
  }, [rfqsList, statusFilter]);

  const statusColors: Record<RFQStatus, string> = {
    pending: "bg-amber-50 text-amber-800 border-amber-200",
    reviewed: "bg-blue-50 text-blue-800 border-blue-200",
    quoted: "bg-emerald-50 text-emerald-800 border-emerald-200",
    archived: "bg-gray-100 text-gray-700 border-gray-200",
  };

  const columns: Column<RFQ>[] = [
    {
      key: "id",
      header: "RFQ Number",
      sortable: true,
      render: (item) => (
        <span className="font-mono text-xs font-bold text-[#1B3A6B]">
          {item.id}
        </span>
      ),
    },
    {
      key: "buyerName",
      header: "Buyer & Company",
      sortable: true,
      render: (item) => (
        <div>
          <Link
            href={`/admin/rfqs/${item.id}`}
            className="font-bold text-gray-900 hover:text-[#1B3A6B] block"
          >
            {item.buyerName}
          </Link>
          <span className="text-xs text-gray-500">{item.company}</span>
        </div>
      ),
    },
    {
      key: "product",
      header: "Target Product",
      render: (item) => (
        <div>
          <span className="font-medium text-gray-900 block line-clamp-1">
            {item.product}
          </span>
          {item.sku && (
            <span className="text-[10px] font-mono text-gray-400">
              SKU: {item.sku}
            </span>
          )}
        </div>
      ),
    },
    {
      key: "quantity",
      header: "Volume",
      sortable: true,
      render: (item) => (
        <span className="text-xs font-bold text-gray-800">{item.quantity}</span>
      ),
    },
    {
      key: "destination",
      header: "Destination Port",
      render: (item) => (
        <div className="flex items-center gap-1 text-xs text-gray-600 font-medium">
          <Anchor className="w-3.5 h-3.5 text-[#1B3A6B]" />
          <span>{item.destination}</span>
        </div>
      ),
    },
    {
      key: "createdAt",
      header: "Submitted",
      sortable: true,
      render: (item) => (
        <span className="text-xs text-gray-500">{item.createdAt}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      render: (item) => (
        <span
          className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border ${
            statusColors[item.status]
          }`}
        >
          {item.status}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      className: "text-right",
      render: (item) => (
        <Link
          href={`/admin/rfqs/${item.id}`}
          className="inline-flex items-center gap-1 text-xs font-bold text-[#1B3A6B] hover:text-[#F5A623] transition"
        >
          <span>Inspect</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 font-serif">
            Commercial RFQ Management
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Review detailed container inquiries, generate FOB/CIF quotations, and track attachments
          </p>
        </div>

        {/* Status Quick Filter Pills */}
        <div className="flex items-center gap-2">
          {["all", "pending", "reviewed", "quoted", "archived"].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
                statusFilter === st
                  ? "bg-[#1B3A6B] text-white shadow-sm"
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* RFQ DataTable */}
      <DataTable
        columns={columns as Column<Record<string, unknown>>[]}
        data={filteredRfqs as unknown as Record<string, unknown>[]}
        searchPlaceholder="Search RFQs by buyer, company, product, or ID..."
      />
    </div>
  );
}
