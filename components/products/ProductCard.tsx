"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Product } from "@/lib/products";
import RFQModal from "@/components/rfq/RFQModal";
import SmoothLink from "@/components/animations/SmoothLink";
import { ArrowRight, Layers, ShieldCheck, FileSpreadsheet } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const reduced = useReducedMotion();

  return (
    <>
      <motion.div
        whileHover={reduced ? undefined : { scale: 1.03, y: -4 }}
        whileTap={reduced ? undefined : { scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 25, duration: 0.2 }}
        className="group relative card-hover bg-white rounded-2xl overflow-hidden border border-gray-200/90 shadow-subtle hover:shadow-xl hover:border-transparent transition-all duration-300 flex flex-col justify-between"
      >
        {/* Gradient Border Glow on hover */}
        <div className="absolute -inset-[2px] rounded-[18px] bg-gradient-to-r from-[#1B3A6B] to-[#F5A623] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none -z-10" />

        {/* Top Image Section with overflow-hidden and image zoom */}
        <div>
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
            {/*
              GEMINI IMAGE PROMPT:
              "High-resolution B2B commercial export product image of {product.name} ({product.category}) displayed under clean professional industrial lighting with sharp details, packaging and specification grade indicators."
            */}
            <motion.div
              whileHover={reduced ? undefined : { scale: 1.08 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative w-full h-full"
            >
              <Image
                src={product.images[0] || "/images/cat-industrial.png"}
                alt={`${product.name} — export catalog India`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 pointer-events-none" />

            {/* Category Tag with subtle shimmer sweep on hover */}
            <div className="absolute top-3 left-3 pointer-events-none">
              <span className="relative overflow-hidden inline-block px-2.5 py-1 rounded-md bg-[#1B3A6B]/90 backdrop-blur text-white text-[11px] font-bold tracking-wide uppercase shadow-sm">
                <span className="relative z-10">{product.category}</span>
                {/* Shimmer sweep effect */}
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none" />
              </span>
            </div>

            {/* Customization Available Tag */}
            {product.customization && (
              <div className="absolute top-3 right-3 pointer-events-none">
                <span className="px-2 py-0.5 rounded bg-amber-400 text-[#1B3A6B] text-[10px] font-extrabold uppercase tracking-wider shadow-sm">
                  Custom OEM
                </span>
              </div>
            )}

            {/* Origin & SKU pill */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-white/90 pointer-events-none">
              <span className="font-mono bg-black/40 backdrop-blur px-2 py-0.5 rounded">
                SKU: {product.sku}
              </span>
              <span className="bg-black/40 backdrop-blur px-2 py-0.5 rounded">
                {product.countryOfOrigin}
              </span>
            </div>
          </div>

            {/* Card Content */}
          <div className="p-5 space-y-3 bg-white">
            <SmoothLink href={`/products/${product.slug}`} wrapperClassName="block" className="block group-hover:text-[#1B3A6B]">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-[#1B3A6B] transition font-serif">
                {product.name}
              </h3>
            </SmoothLink>

            <p className="text-gray-600 text-xs sm:text-sm line-clamp-2 leading-relaxed">
              {product.shortDescription}
            </p>

            {/* Quick Specs Highlight */}
            <div className="pt-2 border-t border-gray-100 grid grid-cols-2 gap-2 text-[11px] text-gray-600">
              <div className="flex items-center gap-1.5 truncate">
                <Layers className="w-3.5 h-3.5 text-[#F5A623] flex-shrink-0" />
                <span className="truncate">MOQ: {product.moq}</span>
              </div>
              <div className="flex items-center gap-1.5 truncate">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <span className="truncate">{product.certifications[0] || "ISO Certified"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="p-5 pt-0 border-t border-gray-100 flex items-center gap-2 bg-white rounded-b-2xl">
          <SmoothLink
            href={`/products/${product.slug}`}
            wrapperClassName="flex-1 flex"
            className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg border border-gray-300 hover:border-[#1B3A6B] text-gray-700 hover:text-[#1B3A6B] text-xs font-bold transition bg-white"
          >
            <span>View Details</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </SmoothLink>

          <motion.button
            type="button"
            onClick={() => setIsModalOpen(true)}
            whileHover={reduced ? undefined : { x: 4 }}
            transition={{ duration: 0.2 }}
            className="btn-glow flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-[#F5A623] hover:bg-[#e09315] text-[#1B3A6B] text-xs font-bold transition shadow-sm"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Request Quote</span>
            <ArrowRight className="w-3 h-3" />
          </motion.button>
        </div>
      </motion.div>

      {/* RFQ Modal for this specific product */}
      <RFQModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={product}
      />
    </>
  );
}
