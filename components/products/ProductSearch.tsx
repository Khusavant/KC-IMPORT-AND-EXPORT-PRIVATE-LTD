"use client";

import React from "react";
import { Search, X, Sparkles } from "lucide-react";

interface ProductSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function ProductSearch({
  searchQuery,
  onSearchChange,
}: ProductSearchProps) {
  return (
    <div className="w-full max-w-3xl mx-auto space-y-2">
      <div className="relative flex items-center">
        <div className="absolute left-4 pointer-events-none text-gray-400">
          <Search className="w-5 h-5 text-[#1B3A6B]" />
        </div>

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search products, HS codes, specs, or describe what you need (e.g. 'brass inserts', 'cumin', 'cotton yarn')..."
          className="w-full pl-12 pr-10 py-3.5 sm:py-4 rounded-xl border border-gray-300 bg-white text-sm sm:text-base text-gray-900 shadow-sm focus:ring-2 focus:ring-[#1B3A6B] focus:border-transparent transition-all placeholder:text-gray-400"
        />

        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            aria-label="Clear search"
            className="absolute right-3 p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Natural Language Hint */}
      <div className="flex items-center justify-between text-xs text-gray-500 px-2">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#F5A623]" />
          <span>Tip: Try searching by material, industrial standard, or application</span>
        </div>
        {searchQuery && (
          <span className="text-[#1B3A6B] font-medium">
            Filtering by: &ldquo;{searchQuery}&rdquo;
          </span>
        )}
      </div>
    </div>
  );
}
