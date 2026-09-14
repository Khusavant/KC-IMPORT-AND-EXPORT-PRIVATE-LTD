"use client";

import React, { useState } from "react";
import { Certificate, CertificateStatus } from "@/lib/admin-types";
import DataTable, { Column } from "@/components/admin/DataTable";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import {
  Award,
  Plus,
  Trash2,
  ExternalLink,
  CheckCircle2,
  Clock,
  AlertTriangle,
  X,
  FileCheck,
  Building,
} from "lucide-react";

const INITIAL_CERTS: Certificate[] = [
  {
    id: "CERT-001",
    name: "ISO 9001:2015 Quality Management System",
    issuer: "TUV NORD Cert GmbH",
    issueDate: "2024-03-15",
    expiryDate: "2027-03-14",
    status: "Valid",
    fileLink: "#",
    notes: "Applies to merchant export, sorting, and packaging of agricultural produce and brass parts.",
  },
  {
    id: "CERT-002",
    name: "APEDA Registration-Cum-Membership Certificate (RCMC)",
    issuer: "Ministry of Commerce & Industry, Govt of India",
    issueDate: "2023-08-01",
    expiryDate: "2028-07-31",
    status: "Valid",
    fileLink: "#",
    notes: "Mandatory export council authorization for agricultural and processed food dispatches.",
  },
  {
    id: "CERT-003",
    name: "Spices Board India Export License",
    issuer: "Spices Board, Ministry of Commerce",
    issueDate: "2024-01-10",
    expiryDate: "2027-01-09",
    status: "Valid",
    fileLink: "#",
    notes: "Covers Cumin Seeds, Turmeric, Coriander, and Fennel exports to global markets.",
  },
  {
    id: "CERT-004",
    name: "FSSAI Central Food Safety Export License",
    issuer: "Food Safety and Standards Authority of India",
    issueDate: "2025-05-12",
    expiryDate: "2026-05-11",
    status: "Valid",
    fileLink: "#",
    notes: "Covers processed dehydrated vegetables, mango pulp, and food grade agro-cargo.",
  },
  {
    id: "CERT-005",
    name: "RoHS & REACH Substance Directive Conformity",
    issuer: "SGS India Lab Testing",
    issueDate: "2023-09-20",
    expiryDate: "2025-09-19",
    status: "Pending",
    fileLink: "#",
    notes: "Annual renewal sample currently undergoing chemical spectrometry assay at SGS Ahmedabad lab.",
  },
];

export default function AdminCertificatesPage() {
  const [certs, setCerts] = useState<Certificate[]>(INITIAL_CERTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Certificate | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  // New Cert State
  const [name, setName] = useState("");
  const [issuer, setIssuer] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [notes, setNotes] = useState("");

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !issuer) return;

    const newCert: Certificate = {
      id: `CERT-00${certs.length + 1}`,
      name,
      issuer,
      issueDate: issueDate || "2026-09-14",
      expiryDate: expiryDate || "2029-09-14",
      status: "Valid",
      fileLink: "#",
      notes,
    };

    setCerts([newCert, ...certs]);
    setIsModalOpen(false);
    setName("");
    setIssuer("");
    setIssueDate("");
    setExpiryDate("");
    setNotes("");
  };

  const handleDelete = (cert: Certificate) => {
    setDeleteTarget(cert);
    setIsConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (deleteTarget) {
      setCerts(certs.filter((c) => c.id !== deleteTarget.id));
      setDeleteTarget(null);
    }
  };

  const statusBadges: Record<CertificateStatus, JSX.Element> = {
    Valid: (
      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
        <CheckCircle2 className="w-3 h-3" />
        <span>Valid</span>
      </span>
    ),
    Pending: (
      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
        <Clock className="w-3 h-3" />
        <span>Renewal Pending</span>
      </span>
    ),
    Expired: (
      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-red-700 bg-red-50 px-2.5 py-0.5 rounded-full border border-red-200">
        <AlertTriangle className="w-3 h-3" />
        <span>Expired</span>
      </span>
    ),
  };

  const columns: Column<Certificate>[] = [
    {
      key: "name",
      header: "Certificate / Standard",
      sortable: true,
      render: (item) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold flex-shrink-0">
            <Award className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-gray-900 block">{item.name}</span>
            <span className="text-[11px] text-gray-400">{item.notes}</span>
          </div>
        </div>
      ),
    },
    {
      key: "issuer",
      header: "Issuing Authority",
      sortable: true,
      render: (item) => (
        <span className="text-xs font-semibold text-gray-700">
          {item.issuer}
        </span>
      ),
    },
    {
      key: "expiryDate",
      header: "Expiry Date",
      sortable: true,
      render: (item) => (
        <span className="text-xs font-mono text-gray-600">
          {item.expiryDate}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (item) => statusBadges[item.status],
    },
    {
      key: "actions",
      header: "Actions",
      className: "text-right",
      render: (item) => (
        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => handleDelete(item)}
            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
            title="Delete Certificate"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 font-serif">
            Export Certifications & Trade Compliance
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Track government registrations, ISO quality management, and international import approvals
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1B3A6B] hover:bg-[#12284b] text-white text-xs sm:text-sm font-bold rounded-xl shadow-sm transition"
        >
          <Plus className="w-4 h-4 text-[#F5A623]" />
          <span>Add New Certificate</span>
        </button>
      </div>

      <DataTable
        columns={columns as Column<Record<string, unknown>>[]}
        data={certs as unknown as Record<string, unknown>[]}
        searchPlaceholder="Search certificates by name or issuing authority..."
      />

      {/* Add Certificate Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-lg bg-white rounded-2xl p-6 shadow-2xl border border-gray-200 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-lg font-bold text-[#1B3A6B] font-serif">
                Add Compliance Certificate
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Certificate / Accreditation Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. BRCGS Global Standard for Food Safety"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-[#1B3A6B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Issuing Authority / Agency
                </label>
                <input
                  type="text"
                  required
                  value={issuer}
                  onChange={(e) => setIssuer(e.target.value)}
                  placeholder="e.g. Bureau Veritas Certification"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-[#1B3A6B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Date of Issue
                  </label>
                  <input
                    type="date"
                    value={issueDate}
                    onChange={(e) => setIssueDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Scope & Compliance Notes
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Specific product categories, audit standards, or testing laboratory reference..."
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-[#1B3A6B]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#1B3A6B] text-white text-xs font-bold rounded-lg hover:bg-[#12284b] shadow-sm transition"
                >
                  Save Certificate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirm Delete */}
      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDelete}
        title="Remove Certificate?"
        message={`Are you sure you want to remove "${deleteTarget?.name}"?`}
        confirmText="Yes, Remove"
      />
    </div>
  );
}
