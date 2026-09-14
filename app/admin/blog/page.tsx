"use client";

import React, { useState } from "react";
import { BlogPost, BlogPostStatus } from "@/lib/admin-types";
import DataTable, { Column } from "@/components/admin/DataTable";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import {
  Plus,
  Edit,
  Trash2,
  FileText,
  CheckCircle2,
  Clock,
  X,
  Save,
  Eye,
} from "lucide-react";

const INITIAL_POSTS: BlogPost[] = [
  {
    id: "POST-001",
    title: "Navigating Mundra Port: A Comprehensive Guide for European Importers",
    slug: "navigating-mundra-port-guide-european-importers",
    category: "Logistics",
    status: "Published",
    date: "2026-09-10",
    author: "Karan Chaudhari",
    views: 1240,
  },
  {
    id: "POST-002",
    title: "Understanding Sortex Optical Cleaning Standards for Indian Cumin Seeds",
    slug: "understanding-sortex-cleaning-cumin-seeds",
    category: "Agriculture",
    status: "Published",
    date: "2026-09-05",
    author: "Pooja Patel",
    views: 890,
  },
  {
    id: "POST-003",
    title: "Why Rajkot is Asia's Precision Brass Engineering Epicenter",
    slug: "why-rajkot-is-asia-precision-brass-epicenter",
    category: "Industrial",
    status: "Published",
    date: "2026-08-28",
    author: "Rajesh Varma",
    views: 2150,
  },
  {
    id: "POST-004",
    title: "Incoterms 2020: FOB vs CIF for Gujarat Seaport Container Shipments",
    slug: "incoterms-2020-fob-vs-cif-gujarat-ports",
    category: "Trade Compliance",
    status: "Draft",
    date: "2026-09-14",
    author: "Karan Chaudhari",
    views: 0,
  },
  {
    id: "POST-005",
    title: "Sustainable Packaging Protocols for Cross-Ocean Fragile Ceramic Freight",
    slug: "sustainable-packaging-fragile-ceramic-freight",
    category: "Ceramics",
    status: "Published",
    date: "2026-08-15",
    author: "Ananya Sharma",
    views: 670,
  },
];

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>(INITIAL_POSTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Logistics");
  const [status, setStatus] = useState<BlogPostStatus>("Published");
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  const [deleteTarget, setDeleteTarget] = useState<BlogPost | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleOpenAdd = () => {
    setEditingPost(null);
    setTitle("");
    setCategory("Logistics");
    setStatus("Published");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (post: BlogPost) => {
    setEditingPost(post);
    setTitle(post.title);
    setCategory(post.category);
    setStatus(post.status);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (editingPost) {
      setPosts(
        posts.map((p) =>
          p.id === editingPost.id
            ? { ...p, title: title.trim(), category, status }
            : p
        )
      );
    } else {
      const newPost: BlogPost = {
        id: `POST-00${posts.length + 1}`,
        title: title.trim(),
        slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        category,
        status,
        date: "2026-09-14",
        author: "Karan Chaudhari",
        views: 0,
      };
      setPosts([newPost, ...posts]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (post: BlogPost) => {
    setDeleteTarget(post);
    setIsConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (deleteTarget) {
      setPosts(posts.filter((p) => p.id !== deleteTarget.id));
      setDeleteTarget(null);
    }
  };

  const columns: Column<BlogPost>[] = [
    {
      key: "title",
      header: "Article Title",
      sortable: true,
      render: (item) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#1B3A6B] flex items-center justify-center font-bold flex-shrink-0">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-gray-900 block line-clamp-1">
              {item.title}
            </span>
            <span className="text-[11px] text-gray-400">By {item.author}</span>
          </div>
        </div>
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
      key: "status",
      header: "Status",
      sortable: true,
      render: (item) => (
        <span
          className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
            item.status === "Published"
              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
              : "bg-amber-50 text-amber-700 border-amber-200"
          }`}
        >
          {item.status === "Published" ? (
            <CheckCircle2 className="w-3 h-3" />
          ) : (
            <Clock className="w-3 h-3" />
          )}
          <span>{item.status}</span>
        </span>
      ),
    },
    {
      key: "views",
      header: "Reader Views",
      sortable: true,
      render: (item) => (
        <div className="flex items-center gap-1 text-xs text-gray-600 font-semibold">
          <Eye className="w-3.5 h-3.5 text-gray-400" />
          <span>{item.views.toLocaleString()}</span>
        </div>
      ),
    },
    {
      key: "date",
      header: "Date",
      sortable: true,
      render: (item) => (
        <span className="text-xs text-gray-500">{item.date}</span>
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
            title="Edit Article"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => handleDelete(item)}
            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
            title="Delete Article"
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
            Export Insights & Blog Management
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Publish thought leadership articles, seaport logistics guides, and trade compliance tips
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1B3A6B] hover:bg-[#12284b] text-white text-xs sm:text-sm font-bold rounded-xl shadow-sm transition"
        >
          <Plus className="w-4 h-4 text-[#F5A623]" />
          <span>Create New Article</span>
        </button>
      </div>

      <DataTable
        columns={columns as Column<Record<string, unknown>>[]}
        data={posts as unknown as Record<string, unknown>[]}
        searchPlaceholder="Search articles by title or category..."
      />

      {/* Add / Edit Article Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-lg bg-white rounded-2xl p-6 shadow-2xl border border-gray-200 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-lg font-bold text-[#1B3A6B] font-serif">
                {editingPost ? "Edit Trade Article" : "Create Trade Article"}
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
                  Article Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Export Documentation Checklist for US Importers"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-[#1B3A6B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs bg-white focus:ring-2 focus:ring-[#1B3A6B]"
                  >
                    <option value="Logistics">Logistics</option>
                    <option value="Agriculture">Agriculture</option>
                    <option value="Industrial">Industrial</option>
                    <option value="Trade Compliance">Trade Compliance</option>
                    <option value="Ceramics">Ceramics</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Publication Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as BlogPostStatus)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs bg-white focus:ring-2 focus:ring-[#1B3A6B]"
                  >
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
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
                  {editingPost ? "Update Article" : "Save Article"}
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
        title="Delete Article?"
        message={`Are you sure you want to remove "${deleteTarget?.title}"?`}
        confirmText="Yes, Delete Article"
      />
    </div>
  );
}
