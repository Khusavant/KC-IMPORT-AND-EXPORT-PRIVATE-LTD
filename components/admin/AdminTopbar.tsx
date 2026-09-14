"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  Bell,
  Search,
  ChevronRight,
  ShieldCheck,
  User,
  CheckCircle2,
  X,
} from "lucide-react";

interface AdminTopbarProps {
  onMobileMenuToggle: () => void;
}

export default function AdminTopbar({ onMobileMenuToggle }: AdminTopbarProps) {
  const pathname = usePathname();
  const [showNotifications, setShowNotifications] = useState(false);

  // Generate breadcrumbs from route segments
  const segments = pathname
    .replace(/^\/admin/, "")
    .split("/")
    .filter(Boolean);

  const formatSegment = (seg: string) => {
    return seg
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-white border-b border-gray-200/90 px-4 sm:px-6 flex items-center justify-between shadow-subtle">
      {/* Left: Mobile Drawer Trigger & Breadcrumbs */}
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          type="button"
          onClick={onMobileMenuToggle}
          className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none"
          aria-label="Open navigation sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Dynamic Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex items-center space-x-1.5 text-xs sm:text-sm text-gray-500">
          <Link
            href="/admin/dashboard"
            className="hover:text-[#1B3A6B] font-semibold text-gray-600"
          >
            Admin
          </Link>
          {segments.length === 0 ? (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
              <span className="font-bold text-[#1B3A6B]">Dashboard</span>
            </>
          ) : (
            segments.map((seg, i) => {
              const href = "/admin/" + segments.slice(0, i + 1).join("/");
              const isLast = i === segments.length - 1;

              return (
                <React.Fragment key={href}>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                  {isLast ? (
                    <span className="font-bold text-[#1B3A6B] truncate max-w-[150px] sm:max-w-xs">
                      {formatSegment(seg)}
                    </span>
                  ) : (
                    <Link
                      href={href}
                      className="hover:text-[#1B3A6B] transition truncate max-w-[100px] sm:max-w-none"
                    >
                      {formatSegment(seg)}
                    </Link>
                  )}
                </React.Fragment>
              );
            })
          )}
        </nav>
      </div>

      {/* Right: Notifications & Admin Profile */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Notification Bell with Badge */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Notifications"
            className="p-2 rounded-xl text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition relative"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#F5A623] ring-2 ring-white" />
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 z-50 animate-in fade-in duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-800">
                  Notifications (3 New)
                </span>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="py-2 divide-y divide-gray-100 text-xs text-gray-600 space-y-2">
                <div className="pt-2">
                  <div className="flex items-center gap-2 text-emerald-600 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>New RFQ #RFQ-2026-001</span>
                  </div>
                  <p className="mt-0.5 text-gray-500">
                    Davis Global Procurement (USA) submitted brass parts inquiry.
                  </p>
                  <span className="text-[10px] text-gray-400">10 mins ago</span>
                </div>

                <div className="pt-2">
                  <div className="flex items-center gap-2 text-[#1B3A6B] font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Purchase Order Confirmed</span>
                  </div>
                  <p className="mt-0.5 text-gray-500">
                    Nile Valley Agro (Egypt) verified LC for 15 MT onion flakes.
                  </p>
                  <span className="text-[10px] text-gray-400">2 hours ago</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Profile Avatar Pill */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-gray-200">
          <div className="w-9 h-9 rounded-xl bg-[#1B3A6B] text-white flex items-center justify-center font-bold text-xs shadow-sm">
            KC
          </div>
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-xs font-bold text-gray-900 leading-none">
              Karan C.
            </span>
            <span className="text-[10px] text-gray-500 font-medium mt-0.5">
              Super Admin
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
