import React from "react";
import Link from "next/link";
import { FileQuestion, ArrowLeft, Package, Send, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="bg-[#F8F9FA] min-h-[80vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center space-y-8 bg-white p-8 sm:p-10 rounded-3xl shadow-sm border border-gray-200">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 text-[#F5A623] flex items-center justify-center mx-auto">
          <FileQuestion className="w-8 h-8 text-[#F5A623]" />
        </div>

        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1B3A6B] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Error 404 • Resource Not Found
          </span>
          <h1 className="text-3xl font-extrabold text-[#1B3A6B] font-serif">
            Page or Product Not Found
          </h1>
          <p className="text-sm text-gray-500 leading-relaxed">
            The page, trade specification, or product URL you are looking for has been relocated, archived, or does not exist.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 pt-2">
          <Link
            href="/"
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#1B3A6B] hover:bg-[#152e55] text-white font-semibold text-sm transition shadow-sm"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>

          <Link
            href="/products"
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold text-sm transition"
          >
            <Package className="w-4 h-4 text-gray-600" />
            <span>Browse Product Catalog</span>
          </Link>

          <Link
            href="/contact"
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-gray-200 hover:border-gray-300 text-[#1B3A6B] font-semibold text-sm transition"
          >
            <Send className="w-4 h-4 text-[#F5A623]" />
            <span>Contact Export Desk</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
