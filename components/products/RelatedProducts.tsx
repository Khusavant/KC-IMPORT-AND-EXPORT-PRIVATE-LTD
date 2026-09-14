import React from "react";
import { Product, getRelatedProducts } from "@/lib/products";
import ProductCard from "./ProductCard";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

interface RelatedProductsProps {
  currentProduct: Product;
}

export default function RelatedProducts({ currentProduct }: RelatedProductsProps) {
  const related = getRelatedProducts(currentProduct);

  if (related.length === 0) return null;

  return (
    <section className="pt-12 border-t border-gray-200/80">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#F5A623] mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Complementary Export Lines</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1B3A6B] font-serif">
            Related Products & Sourcing Options
          </h2>
        </div>

        <Link
          href="/products"
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1B3A6B] hover:text-[#F5A623] transition"
        >
          <span>View Entire Catalog</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {related.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
