import React from "react";
import { ArrowUpRight, ArrowDownRight, LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: "up" | "down" | "neutral";
  period?: string;
  icon: LucideIcon;
  subtext?: string;
  accentColor?: "navy" | "amber" | "emerald" | "blue";
}

export default function StatCard({
  title,
  value,
  change,
  trend = "up",
  period = "vs last month",
  icon: Icon,
  subtext,
  accentColor = "navy",
}: StatCardProps) {
  const isPositive = trend === "up";

  const colorStyles = {
    navy: "bg-blue-50 text-[#1B3A6B]",
    amber: "bg-amber-50 text-[#F5A623]",
    emerald: "bg-emerald-50 text-emerald-600",
    blue: "bg-indigo-50 text-indigo-600",
  }[accentColor];

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-subtle hover:shadow-card transition-all duration-200 flex flex-col justify-between">
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            {title}
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-serif tracking-tight mt-1">
            {value}
          </div>
        </div>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorStyles}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
        {change ? (
          <div className="flex items-center gap-1">
            <span
              className={`inline-flex items-center font-bold px-1.5 py-0.5 rounded text-[11px] ${
                isPositive
                  ? "text-emerald-700 bg-emerald-50"
                  : "text-rose-700 bg-rose-50"
              }`}
            >
              {isPositive ? (
                <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
              ) : (
                <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />
              )}
              {change}
            </span>
            <span className="text-gray-500">{period}</span>
          </div>
        ) : subtext ? (
          <span className="text-gray-500">{subtext}</span>
        ) : null}
      </div>
    </div>
  );
}
