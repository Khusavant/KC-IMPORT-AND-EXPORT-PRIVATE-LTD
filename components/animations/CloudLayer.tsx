"use client";

import React from "react";

export interface CloudLayerProps {
  className?: string;
}

export default function CloudLayer({ className = "" }: CloudLayerProps) {
  // SVG Cloud Shape
  const CloudShape = ({ fill = "#FFFFFF" }: { fill?: string }) => (
    <svg viewBox="0 0 120 60" fill={fill} xmlns="http://www.w3.org/2000/svg">
      <path d="M25 45 Q10 45 10 32 Q10 20 22 20 Q28 10 42 10 Q58 10 65 22 Q72 16 84 16 Q98 16 102 26 Q112 26 112 36 Q112 45 98 45 Z" />
    </svg>
  );

  return (
    <div
      className={`cloud-animation absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none ${className}`}
    >
      {/* Cloud 1: Distant high cloud (small, high opacity 0.25, slow) */}
      <div
        className="absolute top-[8%] left-0 w-28 h-14 opacity-25"
        style={{
          animation: "cloudDrift 60s linear infinite",
          animationDelay: "-10s",
        }}
      >
        <CloudShape fill="#E2E8F0" />
      </div>

      {/* Cloud 2: Mid-distance cloud (medium scale, opacity 0.45, medium speed) */}
      <div
        className="absolute top-[18%] left-0 w-44 h-22 opacity-45"
        style={{
          animation: "cloudDrift 45s linear infinite",
          animationDelay: "-28s",
        }}
      >
        <CloudShape fill="#FFFFFF" />
      </div>

      {/* Cloud 3: Distant dusk cloud with amber tint (opacity 0.35) */}
      <div
        className="absolute top-[28%] left-0 w-36 h-18 opacity-35"
        style={{
          animation: "cloudDrift 52s linear infinite",
          animationDelay: "-5s",
        }}
      >
        <CloudShape fill="#FEF3C7" />
      </div>

      {/* Cloud 4: Fore-mid cloud (large, opacity 0.7, faster speed) */}
      <div
        className="absolute top-[12%] left-0 w-56 h-28 opacity-70 drop-shadow-sm"
        style={{
          animation: "cloudDrift 34s linear infinite",
          animationDelay: "-18s",
        }}
      >
        <CloudShape fill="#FFFFFF" />
      </div>

      {/* Cloud 5: Foreground soft cloud (large, opacity 0.8) */}
      <div
        className="absolute top-[22%] left-0 w-48 h-24 opacity-80 drop-shadow-md"
        style={{
          animation: "cloudDrift 38s linear infinite",
          animationDelay: "-38s",
        }}
      >
        <CloudShape fill="#F8FAFC" />
      </div>
    </div>
  );
}
