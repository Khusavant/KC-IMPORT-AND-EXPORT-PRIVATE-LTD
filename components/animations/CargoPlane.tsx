"use client";

import React from "react";

export interface CargoPlaneProps {
  size?: "sm" | "md" | "lg" | number;
  speed?: number; // duration in seconds
  className?: string;
  animateFlight?: boolean;
  miniature?: boolean;
}

export default function CargoPlane({
  size = "md",
  speed = 18,
  className = "",
  animateFlight = true,
  miniature = false,
}: CargoPlaneProps) {
  let width = 220;
  let height = 90;

  if (typeof size === "number") {
    width = size;
    height = Math.round(size * 0.41);
  } else if (size === "sm") {
    width = 140;
    height = 58;
  } else if (size === "lg") {
    width = 300;
    height = 123;
  }

  if (miniature) {
    width = typeof size === "number" ? size : 70;
    height = Math.round(width * 0.4);
  }

  const flightStyle: React.CSSProperties = animateFlight
    ? {
        animation: `planeFlight ${speed}s linear infinite`,
        willChange: "transform",
      }
    : {};

  return (
    <div
      className={`plane-animation inline-block relative select-none pointer-events-none ${className}`}
      style={flightStyle}
    >
      <div className="relative">
        {/* Contrail / Vapor Trail behind both jet engines */}
        {!miniature && (
          <div className="absolute top-[48px] -left-28 flex flex-col gap-5 pointer-events-none">
            <div
              className="h-[2px] bg-gradient-to-r from-transparent via-white/40 to-white/90 rounded-full"
              style={{
                animation: "contrailFade 1.8s linear infinite",
                width: "120px",
              }}
            />
            <div
              className="h-[2px] bg-gradient-to-r from-transparent via-white/40 to-white/90 rounded-full"
              style={{
                animation: "contrailFade 1.8s linear infinite",
                animationDelay: "0.2s",
                width: "120px",
              }}
            />
          </div>
        )}

        <svg
          viewBox="0 0 240 100"
          width={width}
          height={height}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="overflow-visible drop-shadow-[0_8px_16px_rgba(0,0,0,0.35)]"
        >
          <defs>
            {/* Fuselage 3D Gradient */}
            <linearGradient id="fuselageGrad" x1="0" y1="35" x2="0" y2="65" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="40%" stopColor="#E2E8F0" />
              <stop offset="85%" stopColor="#94A3B8" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>

            {/* Wing 3D Gradient */}
            <linearGradient id="wingGrad" x1="50" y1="30" x2="160" y2="75" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#CBD5E1" />
              <stop offset="60%" stopColor="#94A3B8" />
              <stop offset="100%" stopColor="#64748B" />
            </linearGradient>

            {/* Engine Cowling Gradient */}
            <linearGradient id="engineGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#475569" />
              <stop offset="40%" stopColor="#1E293B" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>

            {/* Engine Jet Burn Glow */}
            <radialGradient id="jetGlow" cx="0.2" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#F5A623" stopOpacity="0.9" />
              <stop offset="80%" stopColor="#D97706" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#1B3A6B" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* 1. Far Wing (Behind Fuselage) */}
          <polygon points="120,40 155,10 175,12 145,42" fill="#94A3B8" />

          {/* 2. Vertical Tail Fin & Stabilizers */}
          <g>
            {/* Horizontal Tail Stabilizer */}
            <polygon points="30,46 10,38 18,34 45,43" fill="#64748B" />
            {/* Main Tail Fin with KC Emblem */}
            <polygon points="48,45 18,8 35,6 68,43" fill="#1B3A6B" />
            <polygon points="26,12 33,7 35,6 28,14" fill="#F5A623" />
            <text
              x="32"
              y="26"
              fill="#FFFFFF"
              fontSize="7"
              fontWeight="900"
              fontFamily="sans-serif"
              letterSpacing="0.5"
            >
              KC
            </text>
          </g>

          {/* 3. Main Cargo Fuselage */}
          <g>
            {/* Aerodynamic Body */}
            <path
              d="M32 46 C32 46 15 48 10 49 C20 52 35 53 45 53 L200 53 C220 53 235 48 238 45 C235 42 215 37 195 37 L50 37 C42 37 36 41 32 46 Z"
              fill="url(#fuselageGrad)"
            />

            {/* Cockpit Windshield Visor */}
            <path
              d="M218 42 C223 43 228 44 231 45 C228 46 220 46 216 45 Z"
              fill="#1B3A6B"
            />
            <path
              d="M220 43 L229 45 L225 45.5 L218 44 Z"
              fill="#60A5FA"
              opacity="0.8"
            />

            {/* KC CARGO Livery Stripe */}
            <path
              d="M60 45 L190 45 L188 47 L62 47 Z"
              fill="#F5A623"
            />
            <text
              x="100"
              y="44"
              fill="#1B3A6B"
              fontSize="6"
              fontWeight="800"
              fontFamily="sans-serif"
              letterSpacing="1"
            >
              KC GLOBAL AIR CARGO
            </text>
          </g>

          {/* 4. Near Swept Wing (Foreground) */}
          <g>
            <polygon points="125,48 85,82 108,82 165,50" fill="url(#wingGrad)" />
            {/* Wing Tip Navigation Light (Green/Amber) */}
            <circle cx="86" cy="82" r="1.5" fill="#10B981" />
            <circle cx="86" cy="82" r="3" fill="#10B981" opacity="0.4" />
          </g>

          {/* 5. Dual Jet Turbofan Engines (Underwing Nacelles) */}
          <g>
            {/* Engine 1 (Inboard) */}
            <g transform="translate(112, 54)">
              <rect x="0" y="0" width="28" height="10" rx="4" fill="url(#engineGrad)" />
              {/* Intake Cowl Lip */}
              <ellipse cx="27" cy="5" rx="2" ry="4.5" fill="#94A3B8" />
              {/* Exhaust Cone & Heat Shimmer */}
              <rect x="-2" y="2" width="4" height="6" rx="1" fill="#D97706" />
              <ellipse cx="-1" cy="5" rx="6" ry="3.5" fill="url(#jetGlow)" />
            </g>

            {/* Engine 2 (Outboard) */}
            <g transform="translate(90, 68)">
              <rect x="0" y="0" width="24" height="8" rx="3" fill="url(#engineGrad)" />
              <ellipse cx="23" cy="4" rx="1.8" ry="3.5" fill="#94A3B8" />
              <rect x="-2" y="1.5" width="3" height="5" rx="1" fill="#D97706" />
              <ellipse cx="-1" cy="4" rx="5" ry="3" fill="url(#jetGlow)" />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}
