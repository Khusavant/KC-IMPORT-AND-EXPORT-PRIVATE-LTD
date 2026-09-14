"use client";

import React, { useState } from "react";
import StatCard from "@/components/admin/StatCard";
import {
  Users,
  TrendingUp,
  Award,
  Globe2,
  Calendar,
  Download,
  ExternalLink,
  Info,
  ArrowUpRight,
  Filter,
} from "lucide-react";

// Mock Analytics Data
const MONTHLY_LEADS_DATA = [
  { month: "Feb", leads: 18, rfqs: 12 },
  { month: "Mar", leads: 24, rfqs: 16 },
  { month: "Apr", leads: 22, rfqs: 15 },
  { month: "May", leads: 32, rfqs: 21 },
  { month: "Jun", leads: 40, rfqs: 28 },
  { month: "Jul", leads: 48, rfqs: 34 },
  { month: "Aug", leads: 56, rfqs: 42 },
  { month: "Sep", leads: 64, rfqs: 51 },
];

const COUNTRY_DISTRIBUTION = [
  { country: "United States", code: "US", inquiries: 142, share: 34 },
  { country: "United Arab Emirates", code: "AE", inquiries: 98, share: 23 },
  { country: "Germany", code: "DE", inquiries: 76, share: 18 },
  { country: "France", code: "FR", inquiries: 54, share: 13 },
  { country: "Japan", code: "JP", inquiries: 41, share: 10 },
  { country: "Saudi Arabia", code: "SA", inquiries: 35, share: 8 },
];

const TOP_PRODUCTS = [
  {
    name: "Precision Brass Inserts & Turned Parts",
    category: "Precision Brass Components",
    inquiries: 84,
    conversionRate: "28.5%",
    trend: "+18%",
  },
  {
    name: "Organic Whole Cumin Seeds (Jeera)",
    category: "Agricultural Commodities",
    inquiries: 62,
    conversionRate: "24.1%",
    trend: "+12%",
  },
  {
    name: "Submersible Pump Spare Impellers",
    category: "Industrial Machinery Parts",
    inquiries: 51,
    conversionRate: "21.6%",
    trend: "+9%",
  },
  {
    name: "Salem Finger Turmeric (Curcumin 3%+)",
    category: "Agricultural Commodities",
    inquiries: 43,
    conversionRate: "22.8%",
    trend: "+14%",
  },
  {
    name: "Ring Spun Combed Cotton Yarn (Ne 30s)",
    category: "Textiles & Yarns",
    inquiries: 39,
    conversionRate: "19.2%",
    trend: "+6%",
  },
];

export default function AdminAnalyticsPage() {
  const [timeRange, setTimeRange] = useState<"30d" | "90d" | "1y">("30d");

  // SVG Line Chart Dimensions & calculations
  const maxLeads = Math.max(...MONTHLY_LEADS_DATA.map((d) => d.leads));
  const svgWidth = 600;
  const svgHeight = 220;
  const paddingX = 40;
  const paddingY = 30;
  const chartWidth = svgWidth - paddingX * 2;
  const chartHeight = svgHeight - paddingY * 2;

  const points = MONTHLY_LEADS_DATA.map((d, index) => {
    const x = paddingX + (index / (MONTHLY_LEADS_DATA.length - 1)) * chartWidth;
    const y =
      svgHeight - paddingY - (d.leads / (maxLeads * 1.15)) * chartHeight;
    return { x, y, ...d };
  });

  const pathD = points.reduce((acc, point, index) => {
    return index === 0
      ? `M ${point.x} ${point.y}`
      : `${acc} L ${point.x} ${point.y}`;
  }, "");

  const areaD = `${pathD} L ${points[points.length - 1].x} ${
    svgHeight - paddingY
  } L ${points[0].x} ${svgHeight - paddingY} Z`;

  return (
    <div className="space-y-6">
      {/* Top Header & Range Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Export Traffic & Inquiry Analytics
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Monitor international demand, conversion rates, and global buyer
            acquisitions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="inline-flex items-center bg-white border border-gray-200 rounded-lg p-1 text-xs font-medium shadow-sm">
            <button
              onClick={() => setTimeRange("30d")}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                timeRange === "30d"
                  ? "bg-[#1B3A6B] text-white shadow-xs"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Last 30 Days
            </button>
            <button
              onClick={() => setTimeRange("90d")}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                timeRange === "90d"
                  ? "bg-[#1B3A6B] text-white shadow-xs"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Last 90 Days
            </button>
            <button
              onClick={() => setTimeRange("1y")}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                timeRange === "1y"
                  ? "bg-[#1B3A6B] text-white shadow-xs"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Year to Date
            </button>
          </div>

          <button
            onClick={() => alert("Exporting analytics report as CSV (mock)...")}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-50 shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            Export CSV
          </button>
        </div>
      </div>

      {/* GA4 Notice Banner */}
      <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-gradient-to-r from-blue-50 via-indigo-50/50 to-amber-50/30 border border-blue-100 text-blue-900 text-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">
            <Info className="w-5 h-5" />
          </div>
          <div>
            <p className="font-semibold text-blue-950">
              Live Google Analytics 4 integration recommended
            </p>
            <p className="text-blue-700 text-xs mt-0.5">
              Currently displaying verified internal inquiry & lead pipeline metrics. Connect your GA4 Measurement ID for real-time visitor sessions.
            </p>
          </div>
        </div>
        <a
          href="/admin/settings"
          className="shrink-0 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs rounded-lg transition-colors inline-flex items-center gap-1"
        >
          Configure
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Visitors"
          value="48,250"
          change="+14.2%"
          trend="up"
          period="vs last month"
          icon={Users}
          accentColor="blue"
        />
        <StatCard
          title="RFQ Conversion Rate"
          value="24.8%"
          change="+3.1%"
          trend="up"
          period="vs last month"
          icon={TrendingUp}
          accentColor="emerald"
        />
        <StatCard
          title="Top Product by Demand"
          value="Brass Inserts"
          change="84 leads"
          trend="up"
          period="this month"
          icon={Award}
          accentColor="amber"
        />
        <StatCard
          title="Top Destination Market"
          value="United States"
          change="34% share"
          trend="neutral"
          period="of trade volume"
          icon={Globe2}
          accentColor="navy"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Monthly Leads Trend (SVG Line Chart) */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-gray-200 p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-semibold text-gray-900">
                Monthly Buyer Inquiries Trend
              </h2>
              <p className="text-xs text-gray-500">
                Total commercial leads generated across all channels
              </p>
            </div>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
              <ArrowUpRight className="w-3 h-3" />
              +255% YTD
            </span>
          </div>

          <div className="w-full overflow-x-auto">
            <svg
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              className="w-full h-auto min-w-[450px]"
            >
              <defs>
                <linearGradient
                  id="leadAreaGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#1B3A6B" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#1B3A6B" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
                const y = paddingY + ratio * chartHeight;
                return (
                  <line
                    key={i}
                    x1={paddingX}
                    y1={y}
                    x2={svgWidth - paddingX}
                    y2={y}
                    stroke="#E5E7EB"
                    strokeDasharray="3 3"
                  />
                );
              })}

              {/* Area under curve */}
              <path d={areaD} fill="url(#leadAreaGradient)" />

              {/* Line path */}
              <path
                d={pathD}
                fill="none"
                stroke="#1B3A6B"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Data points & labels */}
              {points.map((pt, i) => (
                <g key={i} className="group">
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r="4.5"
                    fill="#F5A623"
                    stroke="#ffffff"
                    strokeWidth="2"
                    className="transition-transform group-hover:scale-125"
                  />
                  {/* Point value on hover / static */}
                  <text
                    x={pt.x}
                    y={pt.y - 10}
                    textAnchor="middle"
                    className="text-[10px] fill-gray-600 font-semibold"
                  >
                    {pt.leads}
                  </text>
                  {/* Month label on X axis */}
                  <text
                    x={pt.x}
                    y={svgHeight - 10}
                    textAnchor="middle"
                    className="text-[11px] fill-gray-500 font-medium"
                  >
                    {pt.month}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100 text-xs text-gray-500 mt-2">
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1B3A6B]"></span>
                Inquiry Volume
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F5A623]"></span>
                Verified Specs
              </span>
            </div>
            <span>Updated 15 mins ago</span>
          </div>
        </div>

        {/* Inquiries by Country (Bar Breakdown) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-gray-200 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-semibold text-gray-900">
                  Inquiries by Destination
                </h2>
                <p className="text-xs text-gray-500">
                  Global market distribution of trade leads
                </p>
              </div>
              <Globe2 className="w-5 h-5 text-gray-400" />
            </div>

            <div className="space-y-3.5 mt-2">
              {COUNTRY_DISTRIBUTION.map((item) => (
                <div key={item.code} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-gray-800">
                      {item.country}
                    </span>
                    <span className="text-gray-500 font-semibold">
                      {item.inquiries} leads ({item.share}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-[#1B3A6B] h-2 rounded-full transition-all duration-500"
                      style={{ width: `${item.share * 2.5}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 text-xs text-gray-500 flex items-center justify-between mt-4">
            <span>6 core destination zones active</span>
            <span className="text-amber-600 font-medium">89.4% FCL shipments</span>
          </div>
        </div>
      </div>

      {/* Top Products Table */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-semibold text-gray-900">
              Top 5 Products by Inquiry Volume
            </h2>
            <p className="text-xs text-gray-500">
              Highest performing export commodities and engineered items
            </p>
          </div>
          <a
            href="/admin/products"
            className="text-xs font-medium text-[#1B3A6B] hover:text-blue-800 inline-flex items-center gap-1"
          >
            Manage catalog
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 border-y border-gray-200 text-gray-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="px-4 py-3">Product Name</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3 text-right">Inquiries</th>
                <th className="px-4 py-3 text-right">RFQ Conversion</th>
                <th className="px-4 py-3 text-right">Growth Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {TOP_PRODUCTS.map((prod, idx) => (
                <tr key={idx} className="hover:bg-gray-50/60 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {prod.name}
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {prod.category}
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-gray-900">
                    {prod.inquiries}
                  </td>
                  <td className="px-4 py-3 text-right font-medium text-emerald-600">
                    {prod.conversionRate}
                  </td>
                  <td className="px-4 py-3 text-right font-medium text-[#1B3A6B]">
                    {prod.trend}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
