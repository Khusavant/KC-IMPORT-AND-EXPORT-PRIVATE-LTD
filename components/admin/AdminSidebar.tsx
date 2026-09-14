"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Users2,
  FileSpreadsheet,
  BrainCircuit,
  FileText,
  Award,
  UserCog,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Building2,
  ExternalLink,
  LogOut,
  X,
} from "lucide-react";

interface AdminSidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

const NAV_GROUPS = [
  {
    group: "Overview",
    items: [
      { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    ],
  },
  {
    group: "Catalog",
    items: [
      { label: "Products", href: "/admin/products", icon: Package },
      { label: "Categories", href: "/admin/categories", icon: FolderTree },
    ],
  },
  {
    group: "Sales & Pipeline",
    items: [
      { label: "Leads Pipeline", href: "/admin/leads", icon: Users2 },
      { label: "Commercial RFQs", href: "/admin/rfqs", icon: FileSpreadsheet },
    ],
  },
  {
    group: "Intelligence",
    items: [
      { label: "Knowledge Base", href: "/admin/knowledge", icon: BrainCircuit },
    ],
  },
  {
    group: "Content & Trust",
    items: [
      { label: "Blog & Insights", href: "/admin/blog", icon: FileText },
      { label: "Certificates", href: "/admin/certificates", icon: Award },
    ],
  },
  {
    group: "Administration",
    items: [
      { label: "User Access", href: "/admin/users", icon: UserCog },
      { label: "Trade Analytics", href: "/admin/analytics", icon: BarChart3 },
      { label: "Settings", href: "/admin/settings", icon: Settings },
    ],
  },
];

export default function AdminSidebar({
  isCollapsed,
  setIsCollapsed,
  isMobileOpen,
  setIsMobileOpen,
}: AdminSidebarProps) {
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem("kc_admin");
    window.location.href = "/admin/login";
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Shell */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 bg-white border-r border-gray-200 transition-all duration-300 flex flex-col justify-between ${
          // Desktop collapsed width: 80px, expanded: 260px
          isCollapsed ? "lg:w-20" : "lg:w-64"
        } ${
          // Mobile: drawer positioning
          isMobileOpen ? "translate-x-0 w-72" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Top Header / Brand Logo */}
        <div>
          <div className="h-16 flex items-center justify-between px-4 border-b border-gray-100">
            <Link
              href="/admin/dashboard"
              className={`flex items-center gap-3 overflow-hidden ${
                isCollapsed ? "justify-center w-full" : ""
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-[#1B3A6B] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                <Building2 className="w-5 h-5 text-[#F5A623]" />
              </div>
              {!isCollapsed && (
                <div className="flex flex-col truncate">
                  <span className="font-black text-sm text-[#1B3A6B] tracking-tight truncate">
                    KC Export Admin
                  </span>
                  <span className="text-[10px] uppercase font-bold text-[#F5A623] tracking-wider">
                    Rajkot Operations
                  </span>
                </div>
              )}
            </Link>

            {/* Mobile close button */}
            <button
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-gray-500 hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav Items List */}
          <div className="px-3 py-4 space-y-6 overflow-y-auto max-h-[calc(100vh-140px)]">
            {NAV_GROUPS.map((group) => (
              <div key={group.group} className="space-y-1">
                {!isCollapsed && (
                  <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
                    {group.group}
                  </span>
                )}
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    pathname === item.href ||
                    (item.href !== "/admin/dashboard" && pathname.startsWith(item.href));

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileOpen(false)}
                      title={isCollapsed ? item.label : undefined}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                        isCollapsed ? "justify-center px-2" : ""
                      } ${
                        isActive
                          ? "bg-[#1B3A6B] text-white shadow-sm"
                          : "text-gray-600 hover:text-[#1B3A6B] hover:bg-gray-50"
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 flex-shrink-0 ${
                          isActive ? "text-[#F5A623]" : "text-gray-400 group-hover:text-[#1B3A6B]"
                        }`}
                      />
                      {!isCollapsed && <span className="truncate">{item.label}</span>}
                    </Link>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Actions (Collapse desktop + Return to Site + Logout) */}
        <div className="p-3 border-t border-gray-100 space-y-1">
          {/* Public site link */}
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            title={isCollapsed ? "View Public Site" : undefined}
            className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-gray-500 hover:text-[#1B3A6B] hover:bg-gray-50 transition ${
              isCollapsed ? "justify-center px-2" : ""
            }`}
          >
            <ExternalLink className="w-4 h-4 flex-shrink-0" />
            {!isCollapsed && <span>Live Public Site</span>}
          </Link>

          {/* Mock Logout */}
          <button
            type="button"
            onClick={handleLogout}
            title={isCollapsed ? "Log Out" : undefined}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-rose-600 hover:bg-rose-50 transition font-medium ${
              isCollapsed ? "justify-center px-2" : ""
            }`}
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            {!isCollapsed && <span>Log Out</span>}
          </button>

          {/* Desktop collapse expand toggle button */}
          <div className="hidden lg:flex pt-1 justify-center">
            <button
              type="button"
              onClick={() => setIsCollapsed(!isCollapsed)}
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition"
            >
              {isCollapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
