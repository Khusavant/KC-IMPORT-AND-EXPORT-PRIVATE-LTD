"use client";

import React from "react";
import { Product } from "@/lib/products";
import ProductCard from "./ProductCard";
import { PackageSearch, RotateCcw } from "lucide-react";

interface ProductGridProps {
  products: Product[];
  totalCount: number;
  onResetFilters: () => void;
  selectedCategory?: string;
}

export default function ProductGrid({
  products,
  totalCount,
  onResetFilters,
  selectedCategory,
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-12 text-center border border-gray-200 shadow-card max-w-xl mx-auto space-y-4">
        <div className="w-16 h-16 rounded-full bg-blue-50 text-[#1B3A6B] flex items-center justify-center mx-auto">
          <PackageSearch className="w-8 h-8 text-[#F5A623]" />
        </div>
        <h3 className="text-xl font-bold text-[#1B3A6B] font-serif">
          No Products Match Your Criteria
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          We couldn&apos;t find any products matching your specific combination of
          filters and search query. Try broadening your criteria or reset the filters.
        </p>
        <div className="pt-2">
          <button
            type="button"
            onClick={onResetFilters}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1B3A6B] text-white text-xs font-bold rounded-lg hover:bg-[#12284b] transition shadow-sm"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Results Count Strip with Active Filter Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-gray-500 pb-3 border-b border-gray-200/80">
        <div className="flex items-center gap-2.5 flex-wrap">
          <span>
            Showing <strong className="text-gray-900">{products.length}</strong> of{" "}
            <strong className="text-gray-900">{totalCount}</strong> verified export products
          </span>
          {selectedCategory && selectedCategory !== "All" && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-[#1B3A6B] font-semibold text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623]" />
              <span>{selectedCategory}</span>
            </span>
          )}
        </div>
        <span className="hidden sm:inline text-emerald-600 font-medium">
          • All specifications certified for international export
        </span>
      </div>

      {/* 3-Col Desktop, 2-Col Tablet, 1-Col Mobile Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {products.map((product) => (
          <div key={product.id} className="transition-opacity duration-200">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
