"use client";

import React, { useRef, useEffect, useState } from "react";
import CargoShip from "./CargoShip";
import CargoPlane from "./CargoPlane";
import CargoTruck from "./CargoTruck";
import OceanWaves from "./OceanWaves";
import CloudLayer from "./CloudLayer";

export interface PortSceneProps {
  className?: string;
  overlayOpacity?: string;
  heightDesktop?: number;
  heightMobile?: number;
}

export default function PortScene({
  className = "",
  overlayOpacity = "opacity-70",
  heightDesktop = 420,
  heightMobile = 280,
}: PortSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  // Performance rule: pause animations when off-screen via IntersectionObserver
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden select-none ${className}`}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Dynamic responsive height wrapper */}
      <div
        className="relative w-full h-[280px] sm:h-[360px] lg:h-[420px] overflow-hidden"
        style={{
          // Apply paused state to all child animations when off-screen
          ["--anim-state" as string]: isVisible ? "running" : "paused",
        }}
      >
        <style jsx>{`
          div :global(*) {
            animation-play-state: var(--anim-state, running) !important;
          }
        `}</style>

        {/* 1. Dawn/Dusk Atmospheric Sky Gradient (Amber → Deep Navy) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#091426] via-[#142A4D] to-[#F5A623]/25" />

        {/* Radial Sun/Horizon Dawn Glow on Water */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-[700px] h-[220px] bg-radial from-[#F5A623]/30 via-[#F5A623]/5 to-transparent rounded-full blur-2xl pointer-events-none" />

        {/* 2. Drifting Multi-Depth Clouds */}
        <CloudLayer />

        {/* 3. Static Detailed Port Quay Crane on Far Right */}
        <div className="absolute right-0 bottom-16 w-36 sm:w-48 lg:w-64 h-auto opacity-75 z-10 pointer-events-none drop-shadow-md">
          <svg
            viewBox="0 0 200 240"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
          >
            {/* Gantry Crane Leg A-Frame */}
            <polygon points="120,230 135,110 145,110 160,230 152,230 140,125 128,230" fill="#0F2547" />
            <polygon points="155,230 170,110 180,110 195,230 187,230 175,125 163,230" fill="#1B3A6B" />
            {/* Cross Bracing */}
            <line x1="125" y1="180" x2="190" y2="180" stroke="#F5A623" strokeWidth="2.5" />
            <line x1="130" y1="140" x2="185" y2="140" stroke="#CBD5E1" strokeWidth="1.5" />
            <line x1="126" y1="180" x2="185" y2="140" stroke="#0F2547" strokeWidth="1.5" />
            <line x1="185" y1="180" x2="130" y2="140" stroke="#0F2547" strokeWidth="1.5" />
            {/* Horizontal Boom / Jib */}
            <polygon points="30,110 195,110 195,98 50,98" fill="#1B3A6B" />
            {/* Upper Machinery House */}
            <rect x="135" y="80" width="45" height="18" rx="2" fill="#F5A623" />
            {/* Tension Cables */}
            <line x1="155" y1="80" x2="35" y2="108" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3 2" />
            <line x1="155" y1="80" x2="190" y2="108" stroke="#E2E8F0" strokeWidth="1" />
            {/* Trolley & Spreader Cable */}
            <rect x="80" y="108" width="14" height="6" fill="#0F2547" />
            <line x1="87" y1="114" x2="87" y2="145" stroke="#CBD5E1" strokeWidth="1.5" />
            {/* Container being lifted */}
            <rect x="75" y="145" width="24" height="10" rx="1" fill="#F5A623" stroke="#D98A10" strokeWidth="0.5" />
          </svg>
        </div>

        {/* 4. Static Container Stacks on Far Left (Isometric Colorful Stack) */}
        <div className="absolute left-0 bottom-14 w-28 sm:w-44 lg:w-56 h-auto opacity-80 z-10 pointer-events-none drop-shadow-md">
          <svg
            viewBox="0 0 160 140"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
          >
            {/* Bottom Row */}
            {/* Navy Container */}
            <g transform="translate(10, 85)">
              <rect x="0" y="3" width="36" height="18" fill="#1B3A6B" rx="1" />
              <polygon points="0,3 6,0 42,0 36,3" fill="#2A4F8A" />
              <polygon points="36,3 42,0 42,15 36,18" fill="#0F2547" />
            </g>
            {/* Amber Container */}
            <g transform="translate(52, 85)">
              <rect x="0" y="3" width="36" height="18" fill="#F5A623" rx="1" />
              <polygon points="0,3 6,0 42,0 36,3" fill="#FFC766" />
              <polygon points="36,3 42,0 42,15 36,18" fill="#B36E05" />
            </g>
            {/* White Container */}
            <g transform="translate(94, 85)">
              <rect x="0" y="3" width="36" height="18" fill="#E2E8F0" rx="1" />
              <polygon points="0,3 6,0 42,0 36,3" fill="#FFFFFF" />
              <polygon points="36,3 42,0 42,15 36,18" fill="#94A3B8" />
            </g>
            {/* Middle Row */}
            {/* Amber Container */}
            <g transform="translate(20, 64)">
              <rect x="0" y="3" width="36" height="18" fill="#F5A623" rx="1" />
              <polygon points="0,3 6,0 42,0 36,3" fill="#FFC766" />
              <polygon points="36,3 42,0 42,15 36,18" fill="#B36E05" />
            </g>
            {/* Navy Container */}
            <g transform="translate(62, 64)">
              <rect x="0" y="3" width="36" height="18" fill="#1B3A6B" rx="1" />
              <polygon points="0,3 6,0 42,0 36,3" fill="#2A4F8A" />
              <polygon points="36,3 42,0 42,15 36,18" fill="#0F2547" />
            </g>
            {/* Top Row Single Box */}
            <g transform="translate(40, 43)">
              <rect x="0" y="3" width="36" height="18" fill="#0F2547" rx="1" />
              <polygon points="0,3 6,0 42,0 36,3" fill="#1B3A6B" />
              <polygon points="36,3 42,0 42,15 36,18" fill="#081426" />
            </g>
          </svg>
        </div>

        {/* 5. Animated Cargo Plane (Crossing Diagonally Top-Right) */}
        {/* On screens < 640px: hidden for mobile performance */}
        <div className="hidden sm:block absolute top-[10%] left-0 w-full z-20 pointer-events-none">
          <CargoPlane size={180} speed={22} />
        </div>

        {/* 6. Animated Cargo Ship (Sailing Left to Right across Ocean) */}
        <div className="absolute bottom-[42px] sm:bottom-[54px] lg:bottom-[64px] left-0 w-full z-15 pointer-events-none">
          <CargoShip
            size={280}
            speed={26}
            direction="right"
            className="w-[200px] sm:w-[280px] lg:w-[320px] h-auto"
          />
        </div>

        {/* 7. Ocean Waves Multi-Layer Background (Bottom 110px) */}
        <div className="absolute bottom-0 left-0 w-full z-20 pointer-events-none">
          <OceanWaves height={105} />
        </div>

        {/* 8. Subtle Port Road Strip & Animated Cargo Truck at Very Bottom */}
        {/* On screens < 640px: truck is hidden for mobile performance */}
        <div className="hidden sm:block absolute bottom-0 left-0 w-full z-30 pointer-events-none">
          {/* Road Asphalt Strip */}
          <div className="relative w-full h-[22px] bg-gradient-to-b from-[#1E293B] to-[#0F172A] border-t border-slate-700/60 shadow-lg">
            {/* Road Center Dashed Line */}
            <div className="absolute top-[9px] left-0 w-full h-[2px] border-b border-dashed border-amber-400/40" />
            {/* Animated Truck Driving Left */}
            <div className="absolute -top-[38px] left-0 w-full">
              <CargoTruck size={170} speed={15} direction="left" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
