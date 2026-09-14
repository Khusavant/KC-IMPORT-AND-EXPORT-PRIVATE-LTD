"use client";

import React, { useState, useMemo } from "react";
import { Product } from "@/lib/products";
import ProductSearch from "@/components/products/ProductSearch";
import ProductFilters, { FilterState } from "@/components/products/ProductFilters";
import ProductGrid from "@/components/products/ProductGrid";
import { Layers, ShieldCheck, Factory, Sparkles } from "lucide-react";

interface ProductsCatalogClientProps {
  initialProducts: Product[];
}

const DEFAULT_FILTERS: FilterState = {
  category: "all",
  industry: "all",
  market: "all",
  customization: "all",
  moqRange: "all",
};

export default function ProductsCatalogClient({
  initialProducts,
}: ProductsCatalogClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);

  // Extract unique industries and available markets dynamically from data
  const availableIndustries = useMemo(() => {
    const set = new Set<string>();
    initialProducts.forEach((p) => p.industries.forEach((ind) => set.add(ind)));
    return Array.from(set).sort();
  }, [initialProducts]);

  const availableMarkets = useMemo(() => {
    const set = new Set<string>();
    initialProducts.forEach((p) => p.availableMarkets.forEach((m) => set.add(m)));
    return Array.from(set).sort();
  }, [initialProducts]);

  // Client-side reactive filtering
  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      // 1. Search Query filter (matches name, description, material, SKU, HS code, applications)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesQuery =
          product.name.toLowerCase().includes(q) ||
          product.shortDescription.toLowerCase().includes(q) ||
          product.sku.toLowerCase().includes(q) ||
          (product.hsCode && product.hsCode.toLowerCase().includes(q)) ||
          product.category.toLowerCase().includes(q) ||
          product.material.toLowerCase().includes(q) ||
          product.applications.some((app) => app.toLowerCase().includes(q));

        if (!matchesQuery) return false;
      }

      // 2. Category Filter
      if (filters.category !== "all" && product.category !== filters.category) {
        return false;
      }

      // 3. Industry Filter
      if (
        filters.industry !== "all" &&
        !product.industries.includes(filters.industry)
      ) {
        return false;
      }

      // 4. Destination Market Filter
      if (
        filters.market !== "all" &&
        !product.availableMarkets.includes(filters.market)
      ) {
        return false;
      }

      // 5. Customization Filter
      if (filters.customization === "yes" && !product.customization) {
        return false;
      }
      if (filters.customization === "no" && product.customization) {
        return false;
      }

      // 6. MOQ Filter
      if (filters.moqRange === "container") {
        if (!product.moq.toLowerCase().includes("container") && !product.moq.toLowerCase().includes("fcl")) {
          return false;
        }
      }
      if (filters.moqRange === "pallet") {
        if (product.moq.toLowerCase().includes("container") || product.moq.toLowerCase().includes("fcl")) {
          return false;
        }
      }

      return true;
    });
  }, [initialProducts, searchQuery, filters]);

  const handleResetFilters = () => {
    setFilters(DEFAULT_FILTERS);
    setSearchQuery("");
  };

  return (
    <div className="bg-[#F8F9FA] min-h-screen">
      {/* 1. Page Hero */}
      <section className="relative overflow-hidden bg-[#1B3A6B] text-white py-14 sm:py-20">
        <div className="absolute inset-0 opacity-10 pointer-events-none navy-hero-pattern" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold text-amber-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Direct Sourcing from Gujarat Manufacturing Clusters</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-serif tracking-tight">
            Our Product Catalog
          </h1>
          <p className="text-sm sm:text-base text-gray-200 max-w-2xl mx-auto leading-relaxed">
            Browse our verified export portfolio across agricultural produce, precision brass,
            textiles, processed food, industrial hardware, and ceramics.
          </p>

          {/* Search Bar in Hero */}
          <div className="pt-4">
            <ProductSearch
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          </div>
        </div>
      </section>

      {/* 2. Main Content: Sidebar Filters (Left) + Product Grid (Right) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sidebar Filter Panel (3 cols) */}
          <aside className="lg:col-span-3">
            <div className="sticky top-28">
              <ProductFilters
                filters={filters}
                onFilterChange={setFilters}
                onResetFilters={handleResetFilters}
                availableIndustries={availableIndustries}
                availableMarkets={availableMarkets}
                totalResults={filteredProducts.length}
              />
            </div>
          </aside>

          {/* Product Grid Area (9 cols) */}
          <main className="lg:col-span-9">
            <ProductGrid
              products={filteredProducts}
              totalCount={initialProducts.length}
              onResetFilters={handleResetFilters}
            />
          </main>
        </div>
      </div>
    </div>
  );
}
