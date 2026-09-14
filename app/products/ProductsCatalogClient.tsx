"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Product, PRODUCTS } from "@/lib/products";
import ProductSearch from "@/components/products/ProductSearch";
import ProductFilters, { FilterState } from "@/components/products/ProductFilters";
import ProductGrid from "@/components/products/ProductGrid";
import { Layers, ShieldCheck, Factory, Sparkles, X } from "lucide-react";

interface ProductsCatalogClientProps {
  initialProducts?: Product[];
}

const DEFAULT_FILTERS: FilterState = {
  category: "all",
  industry: "all",
  market: "all",
  customization: "all",
  moqRange: "all",
};

// Map param values to actual category names in products.ts:
const CATEGORY_MAP: Record<string, string> = {
  agricultural: "Agricultural",
  "agricultural-products": "Agricultural",
  industrial: "Industrial Components",
  "industrial-components": "Industrial Components",
  textiles: "Textiles",
  food: "Processed Food",
  "food-products": "Processed Food",
  "processed-food": "Processed Food",
  hardware: "Hardware & Tools",
  "hardware-tools": "Hardware & Tools",
  consumer: "Consumer Goods",
  "consumer-goods": "Consumer Goods",
};

export default function ProductsCatalogClient({
  initialProducts = PRODUCTS,
}: ProductsCatalogClientProps) {
  const searchParams = useSearchParams();
  const catParam = searchParams.get("cat") || searchParams.get("category");

  // Initialize selectedCategory state from URL param:
  const [selectedCategory, setSelectedCategory] = useState<string>(
    catParam ? (CATEGORY_MAP[catParam] ?? "All") : "All"
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const isFirstMount = useRef(true);

  // Sync when param changes (user navigates from dropdown):
  useEffect(() => {
    if (catParam) {
      if (CATEGORY_MAP[catParam]) {
        setSelectedCategory(CATEGORY_MAP[catParam]);
      }
      // If user clicked category navigation after initial mount, smooth scroll higher up
      if (!isFirstMount.current) {
        const target =
          document.getElementById(`category-${catParam}`) ||
          document.getElementById("catalog-products-section");
        if (target) {
          const navOffset = 96; // 72px navbar + 24px comfortable breathing space
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navOffset;
          window.scrollTo({
            top: Math.max(0, offsetPosition),
            behavior: "smooth",
          });
        }
      }
    } else if (!isFirstMount.current) {
      setSelectedCategory("All");
    }
    isFirstMount.current = false;
  }, [catParam]);

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

      // 2. Category Filter (controlled via selectedCategory)
      if (selectedCategory !== "All" && selectedCategory !== "all") {
        const sel = selectedCategory.toLowerCase();
        const prodCat = product.category.toLowerCase();
        const matches =
          prodCat === sel || prodCat.startsWith(sel) || sel.startsWith(prodCat);
        if (!matches) return false;
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
        if (
          !product.moq.toLowerCase().includes("container") &&
          !product.moq.toLowerCase().includes("fcl")
        ) {
          return false;
        }
      }
      if (filters.moqRange === "pallet") {
        if (
          product.moq.toLowerCase().includes("container") ||
          product.moq.toLowerCase().includes("fcl")
        ) {
          return false;
        }
      }

      return true;
    });
  }, [initialProducts, searchQuery, selectedCategory, filters]);

  const handleResetFilters = () => {
    setFilters(DEFAULT_FILTERS);
    setSelectedCategory("All");
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
          <div className="pt-4 max-w-2xl mx-auto">
            <ProductSearch
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          </div>

          {/* Visual feedback: Dismissible filter chip below search bar */}
          {selectedCategory !== "All" && (
            <div className="pt-3 flex justify-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/15 border border-amber-400/30 backdrop-blur-sm rounded-full text-sm shadow-sm transition-all duration-300">
                <span className="text-amber-200 font-medium text-xs sm:text-sm">
                  Filtered by: <strong className="text-white font-semibold">{selectedCategory}</strong>
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedCategory("All")}
                  className="text-amber-300 hover:text-white transition p-0.5"
                  aria-label="Clear category filter"
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 2. Main Content: Sidebar Filters (Left) + Product Grid (Right) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-12 sm:pb-16">
        {/* Invisible scroll anchor points for category navigation */}
        <div id="category-agricultural" className="scroll-mt-24" />
        <div id="category-industrial" className="scroll-mt-24" />
        <div id="category-textiles" className="scroll-mt-24" />
        <div id="category-food" className="scroll-mt-24" />
        <div id="category-hardware" className="scroll-mt-24" />
        <div id="category-consumer" className="scroll-mt-24" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sidebar Filter Panel (3 cols) */}
          <aside className="lg:col-span-3">
            <div className="sticky top-24">
              <ProductFilters
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
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
          <main
            id="catalog-products-section"
            className="lg:col-span-9"
          >
            <ProductGrid
              products={filteredProducts}
              totalCount={initialProducts.length}
              onResetFilters={handleResetFilters}
              selectedCategory={selectedCategory}
            />
          </main>
        </div>
      </div>
    </div>
  );
}
