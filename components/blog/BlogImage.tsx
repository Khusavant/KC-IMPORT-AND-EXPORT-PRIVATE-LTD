"use client";

import React, { useState } from "react";
import Image from "next/image";

interface BlogImageProps {
  src: string;
  alt: string;
  category: string;
  priority?: boolean;
  className?: string;
}

export default function BlogImage({
  src,
  alt,
  category,
  priority = false,
  className = "",
}: BlogImageProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative overflow-hidden aspect-video w-full bg-gradient-to-br from-[#1B3A6B] to-[#0d1d36]">
      {hasError ? (
        <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-[#1B3A6B] via-[#14284b] to-[#0b172b]">
          <span className="text-[#F5A623] font-bold text-sm sm:text-base tracking-wider uppercase">
            {category}
          </span>
          <span className="text-blue-200/70 text-xs mt-1">
            KC Import & Export Trade Guide
          </span>
        </div>
      ) : (
        <>
          {/* Gemini prompt reference for blog cover photography:
              // Post 1 — Agricultural Guide: "Overhead flat lay of Indian agricultural export products — burlap sacks of cumin, turmeric, and coriander on wooden dock beside shipping manifests and APEDA certificate papers. Professional trade photography, warm natural light."
              // Post 2 — HS Codes: "Close-up of official HS code tariff classification booklet open on a desk beside CNC brass machined parts, stainless flanges, and a digital vernier caliper. Clean industrial trade photography."
              // Post 3 — Gujarat Hub: "Aerial drone view of Mundra Port Gujarat at golden hour — rows of coloured shipping containers, cranes, and a cargo vessel departing. Professional commercial logistics photography."
              // Post 4 — Documentation: "Flat lay of B2B export documentation spread on white desk — Bill of Lading, Packing List, Certificate of Origin, Phytosanitary Certificate, and Commercial Invoice with a pen and stamp. Clean professional photography."
              // Post 5 — MOQ: "Stacked cargo pallets in a modern GIDC warehouse with MOQ labels, barcodes, and a logistics manager reviewing a shipping order on a tablet. Bright industrial lighting."
          */}
          <Image
            src={src}
            alt={alt}
            width={800}
            height={450}
            priority={priority}
            className={`object-cover w-full h-full ${className}`}
            onError={() => setHasError(true)}
          />
        </>
      )}
    </div>
  );
}
