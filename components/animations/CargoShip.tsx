"use client";

import React from "react";

export interface CargoShipProps {
  size?: "sm" | "md" | "lg" | number;
  speed?: number; // duration in seconds
  direction?: "left" | "right";
  className?: string;
  animateDrift?: boolean;
  miniature?: boolean;
}

export default function CargoShip({
  size = "md",
  speed = 28,
  direction = "right",
  className = "",
  animateDrift = true,
  miniature = false,
}: CargoShipProps) {
  // Dimensions calculation
  let width = 320;
  let height = 130;

  if (typeof size === "number") {
    width = size;
    height = Math.round(size * 0.4);
  } else if (size === "sm") {
    width = 180;
    height = 72;
  } else if (size === "lg") {
    width = 440;
    height = 176;
  }

  if (miniature) {
    width = typeof size === "number" ? size : 80;
    height = Math.round(width * 0.42);
  }

  const driftStyle: React.CSSProperties = animateDrift
    ? {
        animation: `${direction === "right" ? "shipDrift" : "shipDriftReverse"} ${speed}s linear infinite`,
        willChange: "transform",
      }
    : {};

  return (
    <div
      className={`ship-animation inline-block relative select-none pointer-events-none ${className}`}
      style={driftStyle}
    >
      {/* Water Wake / Foam Trail behind the ship */}
      {!miniature && (
        <div
          className={`absolute bottom-2 ${
            direction === "right" ? "-left-12" : "-right-12"
          } w-24 h-4 bg-white/20 rounded-full blur-sm pointer-events-none`}
          style={{
            animation: "pulseRing 2.5s ease-in-out infinite",
          }}
        />
      )}

      {/* Rocking & Bobbing wrapper */}
      <div
        className="transform-gpu origin-bottom-center"
        style={{
          animation: "shipRock 4.2s ease-in-out infinite",
        }}
      >
        <svg
          viewBox="0 0 320 130"
          width={width}
          height={height}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="overflow-visible drop-shadow-[0_12px_20px_rgba(0,0,0,0.45)]"
          style={{
            transform: direction === "left" ? "scaleX(-1)" : "none",
          }}
        >
          <defs>
            {/* Gradients for 3D depth */}
            <linearGradient id="hullGrad" x1="0" y1="70" x2="0" y2="120" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#1B3A6B" />
              <stop offset="60%" stopColor="#12284B" />
              <stop offset="100%" stopColor="#0B172B" />
            </linearGradient>

            <linearGradient id="bowGloss" x1="240" y1="70" x2="310" y2="110" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#2A4F8A" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#0F2547" stopOpacity="0.9" />
            </linearGradient>

            <linearGradient id="keelRed" x1="0" y1="108" x2="0" y2="120" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#D9381E" />
              <stop offset="100%" stopColor="#8A1805" />
            </linearGradient>

            {/* Container Color Gradients (Isometric 3D) */}
            {/* Navy Container */}
            <linearGradient id="cntNavyFront" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#1B3A6B" />
              <stop offset="100%" stopColor="#142C52" />
            </linearGradient>
            <linearGradient id="cntNavyTop" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#355B96" />
              <stop offset="100%" stopColor="#244577" />
            </linearGradient>
            <linearGradient id="cntNavySide" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#0F203B" />
              <stop offset="100%" stopColor="#0A1526" />
            </linearGradient>

            {/* Amber Container */}
            <linearGradient id="cntAmberFront" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#F5A623" />
              <stop offset="100%" stopColor="#D98A10" />
            </linearGradient>
            <linearGradient id="cntAmberTop" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFC766" />
              <stop offset="100%" stopColor="#F5A623" />
            </linearGradient>
            <linearGradient id="cntAmberSide" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#B36E05" />
              <stop offset="100%" stopColor="#804E00" />
            </linearGradient>

            {/* White / Platinum Container */}
            <linearGradient id="cntWhiteFront" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#E2E8F0" />
              <stop offset="100%" stopColor="#CBD5E1" />
            </linearGradient>
            <linearGradient id="cntWhiteTop" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#F1F5F9" />
            </linearGradient>
            <linearGradient id="cntWhiteSide" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#94A3B8" />
              <stop offset="100%" stopColor="#64748B" />
            </linearGradient>

            {/* Smoke puff animation filter */}
            <filter id="smokeBlur" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="1.5" />
            </filter>
          </defs>

          {/* 1. Funnel & Animated Smoke Puffs */}
          <g transform="translate(68, 10)">
            {/* Funnel Body */}
            <path d="M4 22 L14 22 L12 42 L2 42 Z" fill="#1B3A6B" />
            <path d="M4 22 L14 22 L13.5 28 L3.5 28 Z" fill="#F5A623" />
            {/* Funnel Rim */}
            <rect x="3" y="20" width="12" height="3" rx="1.5" fill="#0B172B" />

            {/* Animated Smoke Puffs */}
            <circle
              cx="9"
              cy="18"
              r="4"
              fill="#FFFFFF"
              filter="url(#smokeBlur)"
              style={{
                animation: "smokePuff 2.4s ease-out infinite",
                animationDelay: "0s",
                transformOrigin: "9px 18px",
              }}
            />
            <circle
              cx="11"
              cy="16"
              r="5"
              fill="#E2E8F0"
              filter="url(#smokeBlur)"
              style={{
                animation: "smokePuff 2.4s ease-out infinite",
                animationDelay: "0.8s",
                transformOrigin: "11px 16px",
              }}
            />
            <circle
              cx="8"
              cy="14"
              r="4.5"
              fill="#CBD5E1"
              filter="url(#smokeBlur)"
              style={{
                animation: "smokePuff 2.4s ease-out infinite",
                animationDelay: "1.6s",
                transformOrigin: "8px 14px",
              }}
            />
          </g>

          {/* 2. Navigation Bridge / Superstructure */}
          <g>
            {/* Rear Tower Base */}
            <rect x="42" y="38" width="46" height="36" rx="2" fill="#F8F9FA" stroke="#CBD5E1" strokeWidth="1" />
            <rect x="46" y="44" width="38" height="6" rx="1" fill="#1B3A6B" opacity="0.85" />
            {/* Bridge Windows */}
            <rect x="48" y="45.5" width="4" height="3" fill="#60A5FA" />
            <rect x="54" y="45.5" width="4" height="3" fill="#60A5FA" />
            <rect x="60" y="45.5" width="4" height="3" fill="#60A5FA" />
            <rect x="66" y="45.5" width="4" height="3" fill="#60A5FA" />
            <rect x="72" y="45.5" width="4" height="3" fill="#60A5FA" />
            <rect x="78" y="45.5" width="4" height="3" fill="#60A5FA" />

            {/* Bridge Wing & Radar Mast */}
            <line x1="65" y1="38" x2="65" y2="24" stroke="#0F2547" strokeWidth="2" />
            <line x1="58" y1="28" x2="72" y2="28" stroke="#F5A623" strokeWidth="1.5" />
            <circle cx="65" cy="23" r="2" fill="#F5A623" />

            {/* Safety Railing */}
            <line x1="42" y1="36" x2="88" y2="36" stroke="#94A3B8" strokeWidth="1" strokeDasharray="2 2" />
          </g>

          {/* 3. Stacked 3D Isometric Containers */}
          <g>
            {/* Helper: Isometric 3D Container Macro */}
            {/* Tier 1 (Base tier on deck) */}
            {/* Stack 1 (Navy) */}
            <g transform="translate(96, 56)">
              {/* Front Face */}
              <rect x="0" y="4" width="30" height="14" fill="url(#cntNavyFront)" rx="1" />
              <line x1="6" y1="4" x2="6" y2="18" stroke="#12243F" strokeWidth="0.8" />
              <line x1="15" y1="4" x2="15" y2="18" stroke="#12243F" strokeWidth="0.8" />
              <line x1="24" y1="4" x2="24" y2="18" stroke="#12243F" strokeWidth="0.8" />
              {/* Top Face */}
              <polygon points="0,4 6,0 36,0 30,4" fill="url(#cntNavyTop)" />
              {/* Side Face */}
              <polygon points="30,4 36,0 36,14 30,18" fill="url(#cntNavySide)" />
            </g>

            {/* Stack 2 (Amber) */}
            <g transform="translate(132, 56)">
              <rect x="0" y="4" width="30" height="14" fill="url(#cntAmberFront)" rx="1" />
              <line x1="7" y1="4" x2="7" y2="18" stroke="#9E6102" strokeWidth="0.8" />
              <line x1="15" y1="4" x2="15" y2="18" stroke="#9E6102" strokeWidth="0.8" />
              <line x1="23" y1="4" x2="23" y2="18" stroke="#9E6102" strokeWidth="0.8" />
              <polygon points="0,4 6,0 36,0 30,4" fill="url(#cntAmberTop)" />
              <polygon points="30,4 36,0 36,14 30,18" fill="url(#cntAmberSide)" />
            </g>

            {/* Stack 3 (White) */}
            <g transform="translate(168, 56)">
              <rect x="0" y="4" width="30" height="14" fill="url(#cntWhiteFront)" rx="1" />
              <line x1="8" y1="4" x2="8" y2="18" stroke="#94A3B8" strokeWidth="0.8" />
              <line x1="16" y1="4" x2="16" y2="18" stroke="#94A3B8" strokeWidth="0.8" />
              <line x1="24" y1="4" x2="24" y2="18" stroke="#94A3B8" strokeWidth="0.8" />
              <polygon points="0,4 6,0 36,0 30,4" fill="url(#cntWhiteTop)" />
              <polygon points="30,4 36,0 36,14 30,18" fill="url(#cntWhiteSide)" />
            </g>

            {/* Stack 4 (Navy) */}
            <g transform="translate(204, 56)">
              <rect x="0" y="4" width="30" height="14" fill="url(#cntNavyFront)" rx="1" />
              <line x1="7" y1="4" x2="7" y2="18" stroke="#12243F" strokeWidth="0.8" />
              <line x1="15" y1="4" x2="15" y2="18" stroke="#12243F" strokeWidth="0.8" />
              <line x1="23" y1="4" x2="23" y2="18" stroke="#12243F" strokeWidth="0.8" />
              <polygon points="0,4 6,0 36,0 30,4" fill="url(#cntNavyTop)" />
              <polygon points="30,4 36,0 36,14 30,18" fill="url(#cntNavySide)" />
            </g>

            {/* Tier 2 (Middle Tier) */}
            {/* Stack 1-Top (Amber) */}
            <g transform="translate(96, 40)">
              <rect x="0" y="4" width="30" height="14" fill="url(#cntAmberFront)" rx="1" />
              <polygon points="0,4 6,0 36,0 30,4" fill="url(#cntAmberTop)" />
              <polygon points="30,4 36,0 36,14 30,18" fill="url(#cntAmberSide)" />
            </g>

            {/* Stack 2-Top (White) */}
            <g transform="translate(132, 40)">
              <rect x="0" y="4" width="30" height="14" fill="url(#cntWhiteFront)" rx="1" />
              <polygon points="0,4 6,0 36,0 30,4" fill="url(#cntWhiteTop)" />
              <polygon points="30,4 36,0 36,14 30,18" fill="url(#cntWhiteSide)" />
            </g>

            {/* Stack 3-Top (Navy) */}
            <g transform="translate(168, 40)">
              <rect x="0" y="4" width="30" height="14" fill="url(#cntNavyFront)" rx="1" />
              <polygon points="0,4 6,0 36,0 30,4" fill="url(#cntNavyTop)" />
              <polygon points="30,4 36,0 36,14 30,18" fill="url(#cntNavySide)" />
            </g>

            {/* Tier 3 (Pyramid Peak) */}
            <g transform="translate(132, 24)">
              <rect x="0" y="4" width="30" height="14" fill="url(#cntAmberFront)" rx="1" />
              <polygon points="0,4 6,0 36,0 30,4" fill="url(#cntAmberTop)" />
              <polygon points="30,4 36,0 36,14 30,18" fill="url(#cntAmberSide)" />
            </g>
          </g>

          {/* 4. Main Hull & Deck Profile */}
          <g>
            {/* Main Upper Hull & Flare */}
            <path
              d="M18 74 L255 74 Q285 75 305 88 L285 110 L35 110 L18 74 Z"
              fill="url(#hullGrad)"
            />
            {/* Bow Bulb & Flare Gloss */}
            <path
              d="M255 74 Q285 75 305 88 L285 110 L250 110 Q265 92 255 74 Z"
              fill="url(#bowGloss)"
            />

            {/* Red Under-Waterline Keel */}
            <path
              d="M35 110 L285 110 Q290 114 278 120 L50 120 Q32 118 35 110 Z"
              fill="url(#keelRed)"
            />

            {/* Gold Waterline Stripe */}
            <path
              d="M30 108 L287 108 L286 110 L34 110 Z"
              fill="#F5A623"
            />

            {/* Deck Bulwark & Hawsehole */}
            <line x1="20" y1="73" x2="260" y2="73" stroke="#CBD5E1" strokeWidth="1.5" />
            <circle cx="280" cy="85" r="2.5" fill="#0B172B" />
            <circle cx="280" cy="85" r="1.5" fill="#475569" />

            {/* KC Branding / Hull Text */}
            <text
              x="200"
              y="98"
              fill="#FFFFFF"
              opacity="0.85"
              fontSize="8"
              fontWeight="900"
              fontFamily="sans-serif"
              letterSpacing="2"
            >
              KC MARITIME
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
}
