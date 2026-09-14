"use client";

import React from "react";

export interface OceanWavesProps {
  height?: number | string;
  className?: string;
}

export default function OceanWaves({
  height = 90,
  className = "",
}: OceanWavesProps) {
  const containerHeight = typeof height === "number" ? `${height}px` : height;

  return (
    <div
      className={`wave-animation relative w-full overflow-hidden select-none pointer-events-none ${className}`}
      style={{ height: containerHeight }}
    >
      {/* Wave Layer 1: Deep Distant Ocean (#0F2547) */}
      <div
        className="absolute bottom-0 left-0 w-[200%] h-full opacity-90"
        style={{
          animation: "waveMove 16s linear infinite",
          willChange: "transform",
        }}
      >
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,45 C150,20 350,70 500,45 C650,20 850,70 1000,45 C1150,20 1350,70 1500,45 L1500,120 L0,120 Z"
            fill="#0F2547"
          />
        </svg>
      </div>

      {/* Wave Layer 2: Mid Navy Swell (#1B3A6B) */}
      <div
        className="absolute bottom-0 left-0 w-[200%] h-full opacity-95"
        style={{
          animation: "waveMove 10s linear infinite reverse",
          willChange: "transform",
        }}
      >
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,60 C200,35 380,85 600,60 C820,35 1000,85 1200,60 C1400,35 1600,85 1800,60 L1800,120 L0,120 Z"
            fill="#1B3A6B"
          />
          {/* Subtle Foam Crest Highlights */}
          <path
            d="M0,61 C200,36 380,86 600,61 C820,36 1000,86 1200,61"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            strokeOpacity="0.35"
            fill="none"
          />
        </svg>
      </div>

      {/* Wave Layer 3: Foreground Surge & Foam (#2A4F8A) */}
      <div
        className="absolute bottom-0 left-0 w-[200%] h-full"
        style={{
          animation: "waveMove 6.5s linear infinite",
          willChange: "transform",
        }}
      >
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,75 C180,55 320,95 500,75 C680,55 820,95 1000,75 C1180,55 1320,95 1500,75 L1500,120 L0,120 Z"
            fill="#2A4F8A"
          />
          {/* Vibrant White Foam Crests at Wave Peaks */}
          <path
            d="M140,58 Q180,53 220,62 M640,58 Q680,53 720,62 M1140,58 Q1180,53 1220,62"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeOpacity="0.75"
            fill="none"
          />
          <path
            d="M0,76 C180,56 320,96 500,76 C680,56 820,96 1000,76"
            stroke="#93C5FD"
            strokeWidth="1"
            strokeOpacity="0.4"
            fill="none"
          />
        </svg>
      </div>
    </div>
  );
}
