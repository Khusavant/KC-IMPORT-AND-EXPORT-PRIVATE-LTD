"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Product } from "@/lib/products";
import ProductImageGallery from "./ProductImageGallery";
import RelatedProducts from "./RelatedProducts";
import RFQModal from "@/components/rfq/RFQModal";
import AskAIButton from "@/components/rfq/AskAIButton";
import {
  ChevronRight,
  ShieldCheck,
  Package,
  Layers,
  Globe,
  Tag,
  FileSpreadsheet,
  FileCheck2,
  Boxes,
  Factory,
  CheckCircle2,
  Send,
  ArrowRight,
} from "lucide-react";

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500">
          <Link href="/" className="hover:text-[#1B3A6B] transition">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <Link href="/products" className="hover:text-[#1B3A6B] transition">
            Products
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-900 font-semibold truncate max-w-[200px] sm:max-w-md">
            {product.name}
          </span>
        </nav>

        {/* 2-Column Product Showcase: Left Image Gallery, Right Key Specs & Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left: Image Gallery (5 cols) */}
          <div className="lg:col-span-6">
            <ProductImageGallery
              images={product.images}
              productName={product.name}
            />

            {/* Quality & Origin Seals */}
            <div className="mt-6 p-4 rounded-xl bg-blue-50/60 border border-blue-100 flex items-center justify-between text-xs text-[#1B3A6B]">
              <div className="flex items-center gap-2">
                <Factory className="w-4 h-4 text-[#F5A623]" />
                <span className="font-semibold">Export Staging: Rajkot, Gujarat</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span className="font-semibold">Pre-Shipment Inspected</span>
              </div>
            </div>
          </div>

          {/* Right: Product Metadata, Specs Table, & RFQ Action (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            {/* Header info */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#1B3A6B] text-xs font-bold uppercase tracking-wider">
                  {product.category}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-medium">
                  {product.subcategory}
                </span>
                {product.customization && (
                  <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
                    Custom OEM Available
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 font-serif leading-tight">
                {product.name}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mt-2 font-mono">
                <span>SKU: <strong className="text-gray-900">{product.sku}</strong></span>
                <span>•</span>
                <span>Origin: <strong className="text-gray-900">{product.countryOfOrigin}</strong></span>
                {product.hsCode && (
                  <>
                    <span>•</span>
                    <span>HS Code: <strong className="text-gray-900">{product.hsCode}</strong></span>
                  </>
                )}
              </div>
            </div>

            {/* Short Description */}
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              {product.shortDescription}
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#F5A623] hover:bg-[#e09315] text-[#1B3A6B] font-bold text-base shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:ring-offset-2"
              >
                <FileSpreadsheet className="w-5 h-5" />
                <span>Request a Quote</span>
              </button>

              <AskAIButton productName={product.name} sku={product.sku} />
            </div>

            {/* Key Commercial Specs Table */}
            <div className="rounded-2xl border border-gray-200/90 overflow-hidden bg-white shadow-subtle">
              <div className="bg-gray-50 px-5 py-3 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#1B3A6B]">
                  Standard Commercial Terms & Specs
                </h3>
                <span className="text-[11px] text-gray-500">Incoterms 2020</span>
              </div>
              <dl className="divide-y divide-gray-100 text-xs sm:text-sm">
                <div className="grid grid-cols-3 px-5 py-3">
                  <dt className="text-gray-500 font-medium">Minimum Order (MOQ)</dt>
                  <dd className="col-span-2 text-gray-900 font-bold">{product.moq}</dd>
                </div>
                <div className="grid grid-cols-3 px-5 py-3 bg-gray-50/50">
                  <dt className="text-gray-500 font-medium">Material Composition</dt>
                  <dd className="col-span-2 text-gray-900 font-semibold">{product.material}</dd>
                </div>
                {product.grade && (
                  <div className="grid grid-cols-3 px-5 py-3">
                    <dt className="text-gray-500 font-medium">Export Grade / Standard</dt>
                    <dd className="col-span-2 text-gray-900">{product.grade}</dd>
                  </div>
                )}
                <div className="grid grid-cols-3 px-5 py-3 bg-gray-50/50">
                  <dt className="text-gray-500 font-medium">Export Packaging</dt>
                  <dd className="col-span-2 text-gray-800">{product.packaging}</dd>
                </div>
                <div className="grid grid-cols-3 px-5 py-3">
                  <dt className="text-gray-500 font-medium">Customization</dt>
                  <dd className="col-span-2 text-gray-800">
                    {product.customization
                      ? "Yes — Custom dimensions, branding, and private labels accepted"
                      : "Standard catalog specifications only"}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Compliance & Export Markets Badges */}
            <div className="space-y-3 pt-2">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-gray-700 block mb-2">
                  Quality Compliance & Certifications
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.certifications.map((cert) => (
                    <span
                      key={cert}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{cert}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-700 block mb-2">
                  Active Global Export Markets
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.availableMarkets.map((m) => (
                    <span
                      key={m}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray-100 text-gray-700 text-xs font-medium"
                    >
                      <Globe className="w-3 h-3 text-[#1B3A6B]" />
                      <span>{m}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Internal Link to 8-Step Export Process */}
              <div className="pt-3 border-t border-gray-100">
                <Link
                  href="/export-process"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#1B3A6B] hover:text-[#F5A623] transition group"
                >
                  <span>Learn about our export process</span>
                  <ArrowRight className="w-4 h-4 text-[#F5A623] group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Technical Specifications & Full Description Section */}
        <section className="bg-white rounded-2xl p-6 sm:p-10 border border-gray-200/90 shadow-subtle space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-[#1B3A6B] font-serif mb-4">
              Comprehensive Product Overview
            </h2>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed max-w-4xl">
              {product.fullDescription}
            </p>
          </div>

          {/* Technical Specifications Grid */}
          <div>
            <h3 className="text-lg font-bold text-[#1B3A6B] font-serif mb-4 flex items-center gap-2">
              <FileCheck2 className="w-5 h-5 text-[#F5A623]" />
              <span>Laboratory & Technical Specifications</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(product.specifications).map(([key, val]) => (
                <div
                  key={key}
                  className="p-4 rounded-xl bg-gray-50 border border-gray-200/80"
                >
                  <span className="text-xs text-gray-500 uppercase tracking-wider block font-semibold mb-1">
                    {key}
                  </span>
                  <span className="text-sm font-bold text-gray-900">{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Applications & Industries Badges */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-gray-100">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-3 flex items-center gap-2">
                <Boxes className="w-4 h-4 text-[#1B3A6B]" />
                <span>Primary Commercial Applications</span>
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-600">
                {product.applications.map((app) => (
                  <li key={app} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623]" />
                    <span>{app}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-3 flex items-center gap-2">
                <Factory className="w-4 h-4 text-[#1B3A6B]" />
                <span>Applicable Industries Served</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {product.industries.map((ind) => (
                  <span
                    key={ind}
                    className="px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-100 text-[#1B3A6B] text-xs font-semibold"
                  >
                    {ind}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Related Products Recommendation Row */}
        <RelatedProducts currentProduct={product} />
      </div>

      {/* Sticky Request Quote CTA on Mobile Viewport */}
      <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-gray-200 p-3 sm:hidden z-40 flex items-center justify-between gap-3 shadow-2xl">
        <div className="truncate">
          <span className="text-xs text-gray-500 block truncate">{product.name}</span>
          <span className="text-xs font-bold text-[#1B3A6B]">MOQ: {product.moq}</span>
        </div>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#F5A623] text-[#1B3A6B] font-bold text-xs shadow"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Request Quote</span>
        </button>
      </div>

      {/* RFQ Modal */}
      <RFQModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={product}
      />
    </>
  );
}
