"use client";

import React, { useState } from "react";
import Image from "next/image";

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductImageGallery({
  images,
  productName,
}: ProductImageGalleryProps) {
  const [selectedIdx, setSelectedIdx] = useState(0);

  const activeImage = images[selectedIdx] || images[0] || "/images/cat-industrial.png";

  return (
    <div className="space-y-4">
      {/* Main Image View */}
      <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-card">
        {/*
          GEMINI IMAGE PROMPT:
          "High-definition commercial export product photography showing {productName} in crisp studio illumination with sharp macro focus, neutral background, professional B2B export catalog aesthetics."
        */}
        <Image
          src={activeImage}
          alt={`${productName} — view ${selectedIdx + 1}`}
          fill
          priority
          className="object-cover transition-all duration-300"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-2.5 py-1 rounded-md text-[11px] font-bold text-[#1B3A6B] shadow-sm">
          Image {selectedIdx + 1} of {images.length}
        </div>
      </div>

      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2">
          {images.map((img, idx) => (
            <button
              key={img + idx}
              type="button"
              onClick={() => setSelectedIdx(idx)}
              aria-label={`Select product image view ${idx + 1}`}
              className={`relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all bg-white ${
                selectedIdx === idx
                  ? "border-[#1B3A6B] ring-2 ring-[#F5A623]/60 shadow-md"
                  : "border-gray-200 hover:border-gray-400 opacity-75 hover:opacity-100"
              }`}
            >
              <Image
                src={img}
                alt={`${productName} thumbnail ${idx + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
