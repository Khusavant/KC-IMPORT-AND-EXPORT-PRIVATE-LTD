"use client";

import React, { useState } from "react";
import { Flame, TrendingUp, Clock, ShieldCheck, Check, Sparkles } from "lucide-react";
import { LeadIntentLevel } from "@/lib/ai-types";

interface LeadScoreBadgeProps {
  intent: LeadIntentLevel;
  reason?: string;
  signals?: string[];
  size?: "sm" | "md";
}

export default function LeadScoreBadge({
  intent,
  reason,
  signals = [],
  size = "md",
}: LeadScoreBadgeProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  const config = {
    high: {
      label: "High Purchase Intent",
      shortLabel: "High Intent",
      icon: Flame,
      badgeClass:
        "bg-red-50 text-red-700 border-red-200 hover:bg-red-100/80 shadow-xs",
      iconClass: "text-red-600",
    },
    medium: {
      label: "Medium Intent",
      shortLabel: "Medium Intent",
      icon: TrendingUp,
      badgeClass:
        "bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100/80 shadow-xs",
      iconClass: "text-amber-600",
    },
    low: {
      label: "Exploratory Intent",
      shortLabel: "Low Intent",
      icon: Clock,
      badgeClass:
        "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100/80 shadow-xs",
      iconClass: "text-blue-600",
    },
  }[intent] || {
    label: "Evaluating",
    shortLabel: "Evaluating",
    icon: ShieldCheck,
    badgeClass: "bg-gray-50 text-gray-700 border-gray-200",
    iconClass: "text-gray-500",
  };

  const Icon = config.icon;

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div
        className={`inline-flex items-center gap-1.5 font-semibold border rounded-full transition-colors cursor-pointer ${
          config.badgeClass
        } ${size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-xs"}`}
      >
        <Icon
          className={size === "sm" ? "w-3 h-3" : "w-3.5 h-3.5 " + config.iconClass}
        />
        <span>{size === "sm" ? config.shortLabel : config.label}</span>
      </div>

      {/* Floating Hover Tooltip with Commercial Signals */}
      {showTooltip && (reason || signals.length > 0) && (
        <div className="absolute left-0 bottom-full mb-2 z-50 w-64 p-3 bg-gray-900 text-white rounded-xl shadow-xl text-xs space-y-2 pointer-events-none animate-in fade-in zoom-in-95 duration-150">
          {reason && (
            <p className="text-gray-200 text-[11px] leading-snug font-medium">
              {reason}
            </p>
          )}

          {signals.length > 0 && (
            <div className="space-y-1 pt-1.5 border-t border-gray-800">
              <span className="text-[10px] uppercase font-bold text-[#F5A623] flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Detected Signals:
              </span>
              <ul className="space-y-1">
                {signals.map((sig, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-1.5 text-[11px] text-gray-300"
                  >
                    <Check className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{sig}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
