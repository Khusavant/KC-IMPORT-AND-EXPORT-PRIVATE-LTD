"use client";

import React from "react";
import { PRODUCT_CATEGORIES } from "@/lib/constants";
import { Filter, RotateCcw, Check, ChevronDown, SlidersHorizontal } from "lucide-react";

export interface FilterState {
  category: string;
  industry: string;
  market: string;
  customization: string; // "all" | "yes" | "no"
  moqRange: string; // "all" | "low" | "container"
}

interface ProductFiltersProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onResetFilters: () => void;
  availableIndustries: string[];
  availableMarkets: string[];
  totalResults: number;
}

export default function ProductFilters({
  filters,
  onFilterChange,
  onResetFilters,
  availableIndustries,
  availableMarkets,
  totalResults,
}: ProductFiltersProps) {
  const isFiltered =
    filters.category !== "all" ||
    filters.industry !== "all" ||
    filters.market !== "all" ||
    filters.customization !== "all" ||
    filters.moqRange !== "all";

  const handleSelect = (key: keyof FilterState, value: string) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-200/90 shadow-subtle space-y-6">
      {/* Filter Header */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <div className="flex items-center gap-2 text-[#1B3A6B]">
          <SlidersHorizontal className="w-4 h-4 text-[#F5A623]" />
          <h3 className="text-sm font-bold uppercase tracking-wider">
            Filter Catalog
          </h3>
        </div>
        {isFiltered && (
          <button
            type="button"
            onClick={onResetFilters}
            className="flex items-center gap-1 text-xs font-semibold text-red-600 hover:text-red-700 transition"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset All</span>
          </button>
        )}
      </div>

      {/* 1. Category Filter */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider">
          Product Category
        </label>
        <select
          value={filters.category}
          onChange={(e) => handleSelect("category", e.target.value)}
          className="w-full py-2 px-3 text-xs sm:text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1B3A6B] bg-white"
        >
          <option value="all">All Categories (6)</option>
          {PRODUCT_CATEGORIES.map((c) => (
            <option key={c.id} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* 2. Industry Filter */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider">
          Target Industry
        </label>
        <select
          value={filters.industry}
          onChange={(e) => handleSelect("industry", e.target.value)}
          className="w-full py-2 px-3 text-xs sm:text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1B3A6B] bg-white"
        >
          <option value="all">All Industries ({availableIndustries.length})</option>
          {availableIndustries.map((ind) => (
            <option key={ind} value={ind}>
              {ind}
            </option>
          ))}
        </select>
      </div>

      {/* 3. Available Market Filter */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider">
          Destination Market
        </label>
        <select
          value={filters.market}
          onChange={(e) => handleSelect("market", e.target.value)}
          className="w-full py-2 px-3 text-xs sm:text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1B3A6B] bg-white"
        >
          <option value="all">All Export Markets ({availableMarkets.length})</option>
          {availableMarkets.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      {/* 4. Customization / OEM */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider">
          Custom OEM / Specs
        </label>
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: "all", label: "All" },
            { id: "yes", label: "OEM Yes" },
            { id: "no", label: "Standard" },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleSelect("customization", item.id)}
              className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition border ${
                filters.customization === item.id
                  ? "bg-[#1B3A6B] text-white border-[#1B3A6B]"
                  : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* 5. MOQ Tier */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider">
          Order Volume Scale
        </label>
        <select
          value={filters.moqRange}
          onChange={(e) => handleSelect("moqRange", e.target.value)}
          className="w-full py-2 px-3 text-xs sm:text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1B3A6B] bg-white"
        >
          <option value="all">All Minimum Order Volumes</option>
          <option value="container">Full Container Load (FCL)</option>
          <option value="pallet">Batch / Pallet Quantity (LCL)</option>
        </select>
      </div>

      {/* Filter Stats Footer */}
      <div className="pt-3 border-t border-gray-100 text-xs text-gray-500 flex items-center justify-between">
        <span>Matching Products:</span>
        <strong className="text-[#1B3A6B] font-bold">{totalResults} items</strong>
      </div>
    </div>
  );
}
