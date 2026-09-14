"use client";

import React from "react";

export interface CargoTruckProps {
  size?: "sm" | "md" | "lg" | number;
  speed?: number; // duration in seconds
  direction?: "left" | "right";
  className?: string;
  animateDrive?: boolean;
  miniature?: boolean;
}

export default function CargoTruck({
  size = "md",
  speed = 16,
  direction = "left",
  className = "",
  animateDrive = true,
  miniature = false,
}: CargoTruckProps) {
  let width = 260;
  let height = 90;

  if (typeof size === "number") {
    width = size;
    height = Math.round(size * 0.35);
  } else if (size === "sm") {
    width = 160;
    height = 56;
  } else if (size === "lg") {
    width = 340;
    height = 119;
  }

  if (miniature) {
    width = typeof size === "number" ? size : 75;
    height = Math.round(width * 0.35);
  }

  const driveStyle: React.CSSProperties = animateDrive
    ? {
        animation: `${direction === "left" ? "truckDriveReverse" : "truckDrive"} ${speed}s linear infinite`,
        willChange: "transform",
      }
    : {};

  return (
    <div
      className={`truck-animation inline-block relative select-none pointer-events-none ${className}`}
      style={driveStyle}
    >
      {/* Suspension bounce container */}
      <div
        className="relative transform-gpu"
        style={{
          animation: "suspensionBounce 0.6s ease-in-out infinite",
        }}
      >
        {/* Road Dust behind rear wheels */}
        {!miniature && (
          <div
            className={`absolute bottom-3 ${
              direction === "left" ? "-right-8" : "-left-8"
            } flex gap-1 items-center pointer-events-none`}
          >
            <div
              className="w-3 h-2 rounded-full bg-amber-200/40 blur-[1px]"
              style={{
                animation: "smokePuff 0.9s ease-out infinite",
              }}
            />
            <div
              className="w-2.5 h-1.5 rounded-full bg-gray-300/40 blur-[1px]"
              style={{
                animation: "smokePuff 0.9s ease-out infinite",
                animationDelay: "0.3s",
              }}
            />
          </div>
        )}

        <svg
          viewBox="0 0 260 90"
          width={width}
          height={height}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="overflow-visible drop-shadow-[0_8px_16px_rgba(0,0,0,0.35)]"
          style={{
            transformOrigin: "center",
            transform: direction === "left" ? "none" : "scaleX(-1)",
          }}
        >
          <defs>
            {/* Cab Gradient */}
            <linearGradient id="cabFace" x1="0" y1="20" x2="60" y2="70" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#2A4F8A" />
              <stop offset="40%" stopColor="#1B3A6B" />
              <stop offset="100%" stopColor="#0F2547" />
            </linearGradient>

            {/* Trailer Body Gradient */}
            <linearGradient id="trailerBody" x1="60" y1="10" x2="250" y2="65" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#F8F9FA" />
              <stop offset="60%" stopColor="#E2E8F0" />
              <stop offset="100%" stopColor="#CBD5E1" />
            </linearGradient>

            {/* Chassis Gradient */}
            <linearGradient id="chassisGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>

            {/* Headlight Amber Beam */}
            <radialGradient id="headlightGlow" cx="0" cy="0.5" r="1">
              <stop offset="0%" stopColor="#F5A623" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#F5A623" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#F5A623" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Headlight Glow Beam */}
          <polygon points="12,62 -35,50 -45,74 12,66" fill="url(#headlightGlow)" />

          {/* 1. Heavy Metal Chassis Frame */}
          <rect x="18" y="62" width="232" height="8" rx="2" fill="url(#chassisGrad)" />
          {/* Fuel Tank */}
          <rect x="52" y="60" width="22" height="9" rx="2" fill="#94A3B8" stroke="#475569" strokeWidth="0.5" />

          {/* 2. Container Trailer Body */}
          <g>
            {/* Main Trailer Box */}
            <rect x="74" y="14" width="176" height="50" rx="3" fill="url(#trailerBody)" stroke="#94A3B8" strokeWidth="1" />

            {/* Corrugated Vertical Ribs (Isometric look) */}
            {[88, 102, 116, 130, 144, 158, 172, 186, 200, 214, 228, 242].map((x) => (
              <line key={x} x1={x} y1="16" x2={x} y2="62" stroke="#94A3B8" strokeWidth="1" opacity="0.6" />
            ))}

            {/* Corner Casting Plates */}
            <rect x="75" y="15" width="5" height="5" fill="#1B3A6B" />
            <rect x="244" y="15" width="5" height="5" fill="#1B3A6B" />
            <rect x="75" y="58" width="5" height="5" fill="#1B3A6B" />
            <rect x="244" y="58" width="5" height="5" fill="#1B3A6B" />

            {/* Amber Brand Accent Ribbon */}
            <rect x="75" y="44" width="174" height="6" fill="#F5A623" />

            {/* KC Export Logistics Text */}
            <text
              x="162"
              y="37"
              textAnchor="middle"
              fill="#1B3A6B"
              fontSize="10"
              fontWeight="900"
              fontFamily="sans-serif"
              letterSpacing="1.2"
            >
              KC EXPORT
            </text>
            <text
              x="162"
              y="49"
              textAnchor="middle"
              fill="#0B172B"
              fontSize="4.5"
              fontWeight="800"
              fontFamily="sans-serif"
              letterSpacing="1"
            >
              RAJKOT • GUJARAT • GLOBAL LOGISTICS
            </text>
          </g>

          {/* 3. Truck Tractor / Cab */}
          <g>
            {/* Aerodynamic Cab Profile */}
            <path
              d="M12 66 L12 55 Q12 48 18 45 L32 30 Q36 26 42 26 L56 26 Q60 26 62 30 L62 66 Z"
              fill="url(#cabFace)"
            />

            {/* Aerodynamic Roof Fairing Wing */}
            <path d="M38 26 L56 26 L62 16 L44 16 Z" fill="#0F2547" />

            {/* Windshield Glass */}
            <path
              d="M19 46 L33 32 Q35 30 38 30 L52 30 L52 46 Z"
              fill="#60A5FA"
              opacity="0.85"
            />
            {/* Windshield Reflection */}
            <polygon points="24,44 32,32 36,32 28,44" fill="#FFFFFF" opacity="0.5" />

            {/* Driver Door Seam */}
            <line x1="42" y1="46" x2="42" y2="65" stroke="#0B172B" strokeWidth="1" />
            {/* Door Handle */}
            <rect x="44" y="52" width="4" height="1.5" rx="0.5" fill="#CBD5E1" />

            {/* Front Bumper & Grill */}
            <rect x="8" y="60" width="8" height="8" rx="1" fill="#0B172B" />
            {/* Headlight Lamp */}
            <rect x="9" y="61" width="3" height="4" rx="1" fill="#F5A623" />

            {/* Side Mirror */}
            <rect x="16" y="44" width="2" height="6" rx="1" fill="#0F2547" />
          </g>

          {/* 4. Animated Rotating Wheels */}
          {/* Wheel 1 (Front Steer) */}
          <g transform="translate(34, 70)">
            <circle cx="0" cy="0" r="10" fill="#0F172A" />
            <circle cx="0" cy="0" r="7" fill="#475569" />
            <circle cx="0" cy="0" r="4" fill="#94A3B8" />
            {/* Rotating Spokes */}
            <g style={{ animation: `wheelSpin 0.7s linear infinite ${direction === "left" ? "reverse" : "normal"}`, transformOrigin: "0 0" }}>
              <line x1="-6" y1="0" x2="6" y2="0" stroke="#CBD5E1" strokeWidth="1.5" />
              <line x1="0" y1="-6" x2="0" y2="6" stroke="#CBD5E1" strokeWidth="1.5" />
            </g>
          </g>

          {/* Wheel 2 (Tractor Drive) */}
          <g transform="translate(70, 70)">
            <circle cx="0" cy="0" r="10" fill="#0F172A" />
            <circle cx="0" cy="0" r="7" fill="#475569" />
            <circle cx="0" cy="0" r="4" fill="#94A3B8" />
            <g style={{ animation: `wheelSpin 0.7s linear infinite ${direction === "left" ? "reverse" : "normal"}`, transformOrigin: "0 0" }}>
              <line x1="-6" y1="0" x2="6" y2="0" stroke="#CBD5E1" strokeWidth="1.5" />
              <line x1="0" y1="-6" x2="0" y2="6" stroke="#CBD5E1" strokeWidth="1.5" />
            </g>
          </g>

          {/* Wheel 3 (Trailer Tandem Front) */}
          <g transform="translate(196, 70)">
            <circle cx="0" cy="0" r="10" fill="#0F172A" />
            <circle cx="0" cy="0" r="7" fill="#475569" />
            <circle cx="0" cy="0" r="4" fill="#94A3B8" />
            <g style={{ animation: `wheelSpin 0.7s linear infinite ${direction === "left" ? "reverse" : "normal"}`, transformOrigin: "0 0" }}>
              <line x1="-6" y1="0" x2="6" y2="0" stroke="#CBD5E1" strokeWidth="1.5" />
              <line x1="0" y1="-6" x2="0" y2="6" stroke="#CBD5E1" strokeWidth="1.5" />
            </g>
          </g>

          {/* Wheel 4 (Trailer Tandem Rear) */}
          <g transform="translate(222, 70)">
            <circle cx="0" cy="0" r="10" fill="#0F172A" />
            <circle cx="0" cy="0" r="7" fill="#475569" />
            <circle cx="0" cy="0" r="4" fill="#94A3B8" />
            <g style={{ animation: `wheelSpin 0.7s linear infinite ${direction === "left" ? "reverse" : "normal"}`, transformOrigin: "0 0" }}>
              <line x1="-6" y1="0" x2="6" y2="0" stroke="#CBD5E1" strokeWidth="1.5" />
              <line x1="0" y1="-6" x2="0" y2="6" stroke="#CBD5E1" strokeWidth="1.5" />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}
