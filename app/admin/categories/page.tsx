"use client";

import React, { useState } from "react";
import { PRODUCT_CATEGORIES } from "@/lib/constants";
import { PRODUCTS } from "@/lib/products";
import DataTable, { Column } from "@/components/admin/DataTable";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import {
  Plus,
  Edit,
  Trash2,
  FolderTree,
  X,
  Save,
  CheckCircle2,
} from "lucide-react";

interface CategoryRow extends Record<string, unknown> {
  id: string;
  name: string;
  subcategoriesCount: number;
  productsCount: number;
  featuredCount: string;
}

export default function AdminCategoriesPage() {
  const initialRows: CategoryRow[] = PRODUCT_CATEGORIES.map((cat) => ({
    id: cat.id,
    name: cat.name,
    subcategoriesCount: 4,
    productsCount: PRODUCTS.filter((p) => p.category === cat.name).length,
    featuredCount: cat.featuredCount,
  }));

  const [categories, setCategories] = useState<CategoryRow[]>(initialRows);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [editingCat, setEditingCat] = useState<CategoryRow | null>(null);

  const [deleteTarget, setDeleteTarget] = useState<CategoryRow | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleOpenAdd = () => {
    setEditingCat(null);
    setCategoryName("");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cat: CategoryRow) => {
    setEditingCat(cat);
    setCategoryName(cat.name);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryName.trim()) return;

    if (editingCat) {
      setCategories(
        categories.map((c) =>
          c.id === editingCat.id ? { ...c, name: categoryName.trim() } : c
        )
      );
    } else {
      const newCat: CategoryRow = {
        id: `cat-${Date.now()}`,
        name: categoryName.trim(),
        subcategoriesCount: 1,
        productsCount: 0,
        featuredCount: "Standard Grade",
      };
      setCategories([...categories, newCat]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (cat: CategoryRow) => {
    setDeleteTarget(cat);
    setIsConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (deleteTarget) {
      setCategories(categories.filter((c) => c.id !== deleteTarget.id));
      setDeleteTarget(null);
    }
  };

  const columns: Column<CategoryRow>[] = [
    {
      key: "name",
      header: "Category Name",
      sortable: true,
      render: (item) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#1B3A6B] flex items-center justify-center font-bold">
            <FolderTree className="w-4 h-4" />
          </div>
          <span className="font-bold text-gray-900">{item.name}</span>
        </div>
      ),
    },
    {
      key: "subcategoriesCount",
      header: "Subcategories",
      sortable: true,
      render: (item) => (
        <span className="text-xs font-semibold text-gray-600">
          {item.subcategoriesCount} Active
        </span>
      ),
    },
    {
      key: "productsCount",
      header: "Products Listed",
      sortable: true,
      render: (item) => (
        <span className="inline-flex items-center gap-1 text-xs font-bold text-[#1B3A6B] bg-blue-50 px-2.5 py-1 rounded-md">
          {item.productsCount} Products
        </span>
      ),
    },
    {
      key: "featuredCount",
      header: "Export Tier",
      render: (item) => (
        <span className="text-xs text-gray-500 font-medium">
          {item.featuredCount}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      className: "text-right",
      render: (item) => (
        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => handleOpenEdit(item)}
            className="p-1.5 text-gray-500 hover:text-[#1B3A6B] hover:bg-gray-100 rounded-lg transition"
            title="Edit Category"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => handleDelete(item)}
            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
            title="Delete Category"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 font-serif">
            Product Category Management
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Organize catalog groupings, subcategories, and export classification tiers
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1B3A6B] hover:bg-[#12284b] text-white text-xs sm:text-sm font-bold rounded-xl shadow-sm transition"
        >
          <Plus className="w-4 h-4 text-[#F5A623]" />
          <span>Add New Category</span>
        </button>
      </div>

      <DataTable<CategoryRow>
        columns={columns}
        data={categories}
        searchPlaceholder="Search categories..."
      />

      {/* Add / Edit Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl border border-gray-200 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-lg font-bold text-[#1B3A6B] font-serif">
                {editingCat ? "Edit Category" : "Add New Category"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Category Name
                </label>
                <input
                  type="text"
                  required
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  placeholder="e.g. Specialty Industrial Polymers"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-[#1B3A6B]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#1B3A6B] text-white text-xs font-bold rounded-lg hover:bg-[#12284b] shadow-sm transition"
                >
                  {editingCat ? "Update Category" : "Create Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirm Delete */}
      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Category?"
        message={`Are you sure you want to remove "${deleteTarget?.name}"? Any linked products will need re-categorization.`}
        confirmText="Yes, Delete"
      />
    </div>
  );
}
