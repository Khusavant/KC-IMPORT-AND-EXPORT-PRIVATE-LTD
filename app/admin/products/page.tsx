"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PRODUCTS, Product } from "@/lib/products";
import DataTable, { Column } from "@/components/admin/DataTable";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import {
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  CheckCircle2,
  Package,
} from "lucide-react";

export default function AdminProductsPage() {
  const [productsList, setProductsList] = useState<Product[]>(PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleDelete = (product: Product) => {
    setSelectedProduct(product);
    setIsConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (selectedProduct) {
      setProductsList(productsList.filter((p) => p.id !== selectedProduct.id));
      setSelectedProduct(null);
    }
  };

  const columns: Column<Product>[] = [
    {
      key: "images",
      header: "Photo",
      className: "w-16",
      render: (item) => (
        <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
          <Image
            src={item.images[0] || "/images/cat-industrial.png"}
            alt={item.name}
            fill
            className="object-cover"
            sizes="48px"
          />
        </div>
      ),
    },
    {
      key: "name",
      header: "Product Name",
      sortable: true,
      render: (item) => (
        <div>
          <Link
            href={`/admin/products/${item.slug}`}
            className="font-bold text-gray-900 hover:text-[#1B3A6B] block line-clamp-1"
          >
            {item.name}
          </Link>
          <span className="text-[11px] text-gray-400 font-mono">
            HS: {item.hsCode || "N/A"}
          </span>
        </div>
      ),
    },
    {
      key: "sku",
      header: "SKU",
      sortable: true,
      render: (item) => (
        <span className="font-mono text-xs font-bold text-[#1B3A6B]">
          {item.sku}
        </span>
      ),
    },
    {
      key: "category",
      header: "Category",
      sortable: true,
      render: (item) => (
        <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-semibold bg-gray-100 text-gray-800">
          {item.category}
        </span>
      ),
    },
    {
      key: "moq",
      header: "Standard MOQ",
      sortable: true,
      render: (item) => (
        <span className="text-xs font-medium text-gray-700">{item.moq}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: () => (
        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
          <CheckCircle2 className="w-3 h-3" />
          <span>Active</span>
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      className: "text-right",
      render: (item) => (
        <div className="flex items-center justify-end gap-2">
          <Link
            href={`/products/${item.slug}`}
            target="_blank"
            title="Preview on live public catalog"
            className="p-1.5 rounded-lg text-gray-400 hover:text-[#1B3A6B] hover:bg-gray-100 transition"
          >
            <ExternalLink className="w-4 h-4" />
          </Link>
          <Link
            href={`/admin/products/${item.slug}`}
            title="Edit product"
            className="p-1.5 rounded-lg text-gray-500 hover:text-[#1B3A6B] hover:bg-gray-100 transition"
          >
            <Edit className="w-4 h-4" />
          </Link>
          <button
            type="button"
            onClick={() => handleDelete(item)}
            title="Delete product"
            className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 font-serif">
            Export Catalog Products
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Manage product listings, specifications, and minimum order terms
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1B3A6B] hover:bg-[#12284b] text-white text-xs sm:text-sm font-bold rounded-xl shadow-sm transition"
        >
          <Plus className="w-4 h-4 text-[#F5A623]" />
          <span>Add New Product</span>
        </Link>
      </div>

      {/* Products DataTable */}
      <DataTable
        columns={columns as Column<Record<string, unknown>>[]}
        data={productsList as unknown as Record<string, unknown>[]}
        searchPlaceholder="Search products by name, SKU, or category..."
      />

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDelete}
        title="Remove Export Product?"
        message={`Are you sure you want to delete "${selectedProduct?.name}" (${selectedProduct?.sku}) from the catalog? This will remove it from the public directory.`}
        confirmText="Yes, Delete Product"
        isDestructive={true}
      />
    </div>
  );
}
