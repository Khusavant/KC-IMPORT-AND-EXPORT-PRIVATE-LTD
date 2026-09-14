"use client";

import React, { useState } from "react";
import { MOCK_USERS } from "@/lib/mock-users";
import { AdminUser, AdminRole } from "@/lib/admin-types";
import DataTable, { Column } from "@/components/admin/DataTable";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import {
  UserCog,
  Plus,
  Trash2,
  CheckCircle2,
  XCircle,
  X,
  Shield,
  Mail,
  User,
} from "lucide-react";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>(MOCK_USERS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<AdminUser | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  // New User State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<AdminRole>("Admin");

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    const newUser: AdminUser = {
      id: `USR-00${users.length + 1}`,
      name,
      email,
      role,
      lastLogin: "Never",
      status: "Active",
    };

    setUsers([...users, newUser]);
    setIsModalOpen(false);
    setName("");
    setEmail("");
    setRole("Admin");
  };

  const handleDelete = (u: AdminUser) => {
    setDeleteTarget(u);
    setIsConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (deleteTarget) {
      setUsers(users.filter((u) => u.id !== deleteTarget.id));
      setDeleteTarget(null);
    }
  };

  const roleColors: Record<AdminRole, string> = {
    "Super Admin": "bg-[#1B3A6B] text-white",
    Admin: "bg-blue-100 text-[#1B3A6B]",
    Editor: "bg-gray-100 text-gray-800",
  };

  const columns: Column<AdminUser>[] = [
    {
      key: "name",
      header: "Staff Member",
      sortable: true,
      render: (item) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#1B3A6B] text-white flex items-center justify-center font-bold text-xs">
            {item.name.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <span className="font-bold text-gray-900 block">{item.name}</span>
            <span className="text-[11px] text-gray-400 font-mono">{item.id}</span>
          </div>
        </div>
      ),
    },
    {
      key: "email",
      header: "Email",
      sortable: true,
      render: (item) => (
        <span className="text-xs text-gray-700">{item.email}</span>
      ),
    },
    {
      key: "role",
      header: "Role Permission",
      sortable: true,
      render: (item) => (
        <span
          className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
            roleColors[item.role]
          }`}
        >
          {item.role}
        </span>
      ),
    },
    {
      key: "lastLogin",
      header: "Last Session",
      sortable: true,
      render: (item) => (
        <span className="text-xs text-gray-500">{item.lastLogin}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (item) => (
        <span
          className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full ${
            item.status === "Active"
              ? "bg-emerald-50 text-emerald-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {item.status === "Active" ? (
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
          ) : (
            <XCircle className="w-3 h-3 text-gray-400" />
          )}
          <span>{item.status}</span>
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      className: "text-right",
      render: (item) => (
        <div className="flex items-center justify-end gap-2">
          {item.role !== "Super Admin" && (
            <button
              type="button"
              onClick={() => handleDelete(item)}
              className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
              title="Revoke User"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 font-serif">
            Admin User Management & Roles
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Manage administrative access permissions, sales representatives, and documentation operators
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1B3A6B] hover:bg-[#12284b] text-white text-xs sm:text-sm font-bold rounded-xl shadow-sm transition"
        >
          <Plus className="w-4 h-4 text-[#F5A623]" />
          <span>Invite Admin User</span>
        </button>
      </div>

      <DataTable
        columns={columns as Column<Record<string, unknown>>[]}
        data={users as unknown as Record<string, unknown>[]}
        searchPlaceholder="Search admin staff by name or email..."
      />

      {/* Invite Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl border border-gray-200 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-lg font-bold text-[#1B3A6B] font-serif">
                Invite Admin Staff
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
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul Dave"
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-[#1B3A6B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Corporate Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="rahul.d@kcimportexport.com"
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-[#1B3A6B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Access Role
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as AdminRole)}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs bg-white focus:ring-2 focus:ring-[#1B3A6B]"
                >
                  <option value="Admin">Admin (Catalog, Leads & RFQs)</option>
                  <option value="Editor">Editor (Blog & Content Only)</option>
                  <option value="Super Admin">Super Admin (Full Authority)</option>
                </select>
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
                  Create User
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
        title="Revoke Admin Access?"
        message={`Are you sure you want to delete access for ${deleteTarget?.name} (${deleteTarget?.email})?`}
        confirmText="Yes, Revoke"
      />
    </div>
  );
}
