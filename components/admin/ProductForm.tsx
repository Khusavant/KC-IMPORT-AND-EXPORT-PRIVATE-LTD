"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/lib/products";
import { PRODUCT_CATEGORIES, RFQ_COUNTRIES } from "@/lib/constants";
import {
  Plus,
  Trash2,
  Save,
  ArrowLeft,
  UploadCloud,
  Check,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

interface ProductFormProps {
  initialProduct?: Product;
  isEditing?: boolean;
}

export default function ProductForm({
  initialProduct,
  isEditing = false,
}: ProductFormProps) {
  const router = useRouter();

  // Form State
  const [formData, setFormData] = useState({
    name: initialProduct?.name || "",
    sku: initialProduct?.sku || "",
    category: initialProduct?.category || PRODUCT_CATEGORIES[0].name,
    subcategory: initialProduct?.subcategory || "",
    shortDescription: initialProduct?.shortDescription || "",
    fullDescription: initialProduct?.fullDescription || "",
    material: initialProduct?.material || "",
    grade: initialProduct?.grade || "",
    dimensions: initialProduct?.dimensions || "",
    moq: initialProduct?.moq || "",
    packaging: initialProduct?.packaging || "",
    customization: initialProduct?.customization ?? true,
    countryOfOrigin: initialProduct?.countryOfOrigin || "India (Rajkot, Gujarat)",
    hsCode: initialProduct?.hsCode || "",
    certifications: initialProduct?.certifications || ["ISO 9001:2015"],
    availableMarkets: initialProduct?.availableMarkets || ["North America", "European Union"],
    isFeatured: initialProduct?.isFeatured ?? false,
  });

  // Dynamic Key-Value Specs Rows
  const [specsRows, setSpecsRows] = useState<{ key: string; value: string }[]>(
    initialProduct?.specifications
      ? Object.entries(initialProduct.specifications).map(([key, value]) => ({
          key,
          value,
        }))
      : [
          { key: "Material Grade", value: "" },
          { key: "Tolerance", value: "" },
        ]
  );

  const [newCert, setNewCert] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddSpecRow = () => {
    setSpecsRows([...specsRows, { key: "", value: "" }]);
  };

  const handleRemoveSpecRow = (index: number) => {
    setSpecsRows(specsRows.filter((_, i) => i !== index));
  };

  const handleSpecChange = (index: number, field: "key" | "value", val: string) => {
    const updated = [...specsRows];
    updated[index][field] = val;
    setSpecsRows(updated);
  };

  const handleAddCert = () => {
    if (!newCert.trim()) return;
    if (!formData.certifications.includes(newCert.trim())) {
      setFormData({
        ...formData,
        certifications: [...formData.certifications, newCert.trim()],
      });
    }
    setNewCert("");
  };

  const handleRemoveCert = (certToRemove: string) => {
    setFormData({
      ...formData,
      certifications: formData.certifications.filter((c) => c !== certToRemove),
    });
  };

  const toggleMarket = (market: string) => {
    if (formData.availableMarkets.includes(market)) {
      setFormData({
        ...formData,
        availableMarkets: formData.availableMarkets.filter((m) => m !== market),
      });
    } else {
      setFormData({
        ...formData,
        availableMarkets: [...formData.availableMarkets, market],
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.sku || !formData.category || !formData.moq) {
      setErrorMessage("Please complete all required fields (Name, SKU, Category, MOQ).");
      return;
    }

    setIsSaved(true);
    setTimeout(() => {
      router.push("/admin/products");
    }, 900);
  };

  const ALL_MARKETS = [
    "North America",
    "European Union",
    "United Kingdom",
    "Middle East",
    "Southeast Asia",
    "Japan",
    "Australia",
    "East Africa",
    "Latin America",
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl">
      {/* Top action bar */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-200">
        <div>
          <button
            type="button"
            onClick={() => router.push("/admin/products")}
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-[#1B3A6B] transition mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Products</span>
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 font-serif">
            {isEditing ? `Edit: ${formData.name}` : "Add New Export Product"}
          </h1>
        </div>

        <button
          type="submit"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#F5A623] hover:bg-[#e09315] text-[#1B3A6B] font-bold text-sm rounded-xl shadow-sm transition"
        >
          <Save className="w-4 h-4" />
          <span>{isEditing ? "Update Product" : "Save & Publish"}</span>
        </button>
      </div>

      {isSaved && (
        <div className="p-4 bg-emerald-50 border-l-4 border-emerald-500 text-emerald-800 text-sm rounded-r-xl flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>Product saved successfully! Redirecting to catalog...</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-800 text-sm rounded-r-xl flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Section 1: Basic Information */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/90 shadow-subtle space-y-6">
        <h2 className="text-base font-bold text-[#1B3A6B] font-serif border-b border-gray-100 pb-3">
          1. General Product Details
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              Product Commercial Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Precision CNC Brass Inserts & Turned Components"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-[#1B3A6B]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              SKU Reference Code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="sku"
              required
              value={formData.sku}
              onChange={handleChange}
              placeholder="e.g. IND-BRS-003"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm font-mono focus:ring-2 focus:ring-[#1B3A6B]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              Export Category <span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-[#1B3A6B] bg-white"
            >
              {PRODUCT_CATEGORIES.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              Subcategory / Classification
            </label>
            <input
              type="text"
              name="subcategory"
              value={formData.subcategory}
              onChange={handleChange}
              placeholder="e.g. Fasteners & Hardware"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-[#1B3A6B]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              Harmonized System (HS) Code
            </label>
            <input
              type="text"
              name="hsCode"
              value={formData.hsCode}
              onChange={handleChange}
              placeholder="e.g. 74153300"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm font-mono focus:ring-2 focus:ring-[#1B3A6B]"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              Short Description (Listing Summary)
            </label>
            <input
              type="text"
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
              placeholder="Brief 1-line product summary..."
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-[#1B3A6B]"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              Full Technical Description
            </label>
            <textarea
              name="fullDescription"
              rows={4}
              value={formData.fullDescription}
              onChange={handleChange}
              placeholder="Detailed export overview, manufacturing tolerances, sourcing hubs..."
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-[#1B3A6B]"
            />
          </div>
        </div>
      </div>

      {/* Section 2: Material & Commercial Terms */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/90 shadow-subtle space-y-6">
        <h2 className="text-base font-bold text-[#1B3A6B] font-serif border-b border-gray-100 pb-3">
          2. Material & Commercial Terms
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              Material Composition
            </label>
            <input
              type="text"
              name="material"
              value={formData.material}
              onChange={handleChange}
              placeholder="e.g. Free Cutting Brass CW614N / IS 319"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-[#1B3A6B]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              Export Grade / Standard
            </label>
            <input
              type="text"
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              placeholder="e.g. CuZn39Pb3 / C36000"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-[#1B3A6B]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              Minimum Order Quantity (MOQ) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="moq"
              required
              value={formData.moq}
              onChange={handleChange}
              placeholder="e.g. 1x 20ft FCL or 25,000 Pieces"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-[#1B3A6B]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              Export Packaging Specifications
            </label>
            <input
              type="text"
              name="packaging"
              value={formData.packaging}
              onChange={handleChange}
              placeholder="e.g. Seaworthy cartons on ISPM-15 fumigated pallets"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-[#1B3A6B]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              Country of Origin
            </label>
            <input
              type="text"
              name="countryOfOrigin"
              value={formData.countryOfOrigin}
              onChange={handleChange}
              placeholder="India (Rajkot, Gujarat)"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-[#1B3A6B]"
            />
          </div>

          {/* Customization and Featured Toggles */}
          <div className="flex items-center gap-6 pt-5">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="customization"
                checked={formData.customization}
                onChange={handleChange}
                className="w-4 h-4 rounded text-[#1B3A6B] focus:ring-[#1B3A6B]"
              />
              <span className="text-xs font-semibold text-gray-700">
                Custom OEM / Drawings Accepted
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleChange}
                className="w-4 h-4 rounded text-[#1B3A6B] focus:ring-[#1B3A6B]"
              />
              <span className="text-xs font-semibold text-gray-700">
                Feature on Catalog Front
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Section 3: Technical Specifications Key-Value Rows */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/90 shadow-subtle space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <h2 className="text-base font-bold text-[#1B3A6B] font-serif">
            3. Technical & Laboratory Specifications
          </h2>
          <button
            type="button"
            onClick={handleAddSpecRow}
            className="inline-flex items-center gap-1 text-xs font-bold text-[#1B3A6B] hover:text-[#F5A623] transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Specification Row</span>
          </button>
        </div>

        <div className="space-y-3">
          {specsRows.map((row, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Parameter (e.g. Purity, Tolerance, Thread)"
                value={row.key}
                onChange={(e) => handleSpecChange(idx, "key", e.target.value)}
                className="flex-1 px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#1B3A6B]"
              />
              <input
                type="text"
                placeholder="Value (e.g. 99.5% Sortex Cleaned, ±0.01 mm)"
                value={row.value}
                onChange={(e) => handleSpecChange(idx, "value", e.target.value)}
                className="flex-1 px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#1B3A6B]"
              />
              <button
                type="button"
                onClick={() => handleRemoveSpecRow(idx)}
                aria-label="Remove row"
                className="p-2 text-gray-400 hover:text-red-600 rounded-lg transition"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Section 4: Certifications & Markets */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/90 shadow-subtle space-y-6">
        <h2 className="text-base font-bold text-[#1B3A6B] font-serif border-b border-gray-100 pb-3">
          4. Certifications & Export Markets
        </h2>

        {/* Certifications Tags */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">
            Quality Certifications (Tags)
          </label>
          <div className="flex flex-wrap gap-2 mb-3">
            {formData.certifications.map((c) => (
              <span
                key={c}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#1B3A6B] text-xs font-bold border border-blue-200"
              >
                <span>{c}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveCert(c)}
                  className="hover:text-red-600 ml-1 text-xs"
                >
                  ×
                </button>
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 max-w-sm">
            <input
              type="text"
              placeholder="e.g. USFDA, RoHS, CE Mark"
              value={newCert}
              onChange={(e) => setNewCert(e.target.value)}
              className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1B3A6B]"
            />
            <button
              type="button"
              onClick={handleAddCert}
              className="px-3 py-1.5 bg-[#1B3A6B] text-white rounded-lg text-xs font-bold"
            >
              Add Tag
            </button>
          </div>
        </div>

        {/* Available Markets Multi-select */}
        <div className="space-y-2 pt-3 border-t border-gray-100">
          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">
            Approved Global Export Destinations
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {ALL_MARKETS.map((m) => {
              const selected = formData.availableMarkets.includes(m);
              return (
                <button
                  key={m}
                  type="button"
                  onClick={() => toggleMarket(m)}
                  className={`p-2 rounded-xl text-xs font-semibold border transition text-left flex items-center justify-between ${
                    selected
                      ? "bg-[#1B3A6B] text-white border-[#1B3A6B]"
                      : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  <span>{m}</span>
                  {selected && <Check className="w-3.5 h-3.5 text-[#F5A623]" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Section 5: Image Upload Placeholder */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/90 shadow-subtle space-y-3">
        <h2 className="text-base font-bold text-[#1B3A6B] font-serif border-b border-gray-100 pb-3">
          5. High-Resolution Product Images
        </h2>
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-[#1B3A6B] bg-gray-50/50">
          <UploadCloud className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-xs sm:text-sm font-semibold text-gray-700">
            Upload new export photography (PNG, JPG, WebP)
          </p>
          <p className="text-xs text-gray-400 mt-0.5">
            Auto-converted to Next.js optimized AVIF & WebP assets
          </p>
        </div>
      </div>

      {/* Submit footer */}
      <div className="flex items-center justify-end gap-4 pt-2">
        <button
          type="button"
          onClick={() => router.push("/admin/products")}
          className="px-5 py-2.5 text-xs font-bold text-gray-600 hover:text-gray-900"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="inline-flex items-center gap-2 px-8 py-3 bg-[#F5A623] hover:bg-[#e09315] text-[#1B3A6B] font-bold text-sm rounded-xl shadow transition"
        >
          <Save className="w-4 h-4" />
          <span>{isEditing ? "Update Product Record" : "Publish to Catalog"}</span>
        </button>
      </div>
    </form>
  );
}
