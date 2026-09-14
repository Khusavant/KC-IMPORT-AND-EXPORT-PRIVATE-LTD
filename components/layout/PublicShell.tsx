"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import AIChatWidget from "@/components/ai/AIChatWidget";
import CookieBanner from "@/components/ui/CookieBanner";

interface PublicShellProps {
  children: React.ReactNode;
}

export default function PublicShell({ children }: PublicShellProps) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  // Admin routes render in isolation with their own shell (no public navbar, footer, or floating WhatsApp/AI widget)
  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      {/* Accessibility Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-[#1B3A6B] text-white font-bold rounded-lg shadow-lg border-2 border-amber-400 outline-none"
      >
        Skip to main content
      </a>

      {/* Public Header */}
      <Navbar />

      {/* Public Main Body */}
      <main id="main-content" className="flex-grow">
        {children}
      </main>

      {/* Public Footer */}
      <Footer />

      {/* Privacy & Cookie Notice */}
      <CookieBanner />

      {/* Public Floating WhatsApp CTA */}
      <WhatsAppButton variant="floating" />

      {/* Public AI Sales Assistant Widget */}
      <AIChatWidget />
    </>
  );
}
