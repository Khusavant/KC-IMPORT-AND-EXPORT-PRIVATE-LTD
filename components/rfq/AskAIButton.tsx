"use client";

import React from "react";
import { MessageSquare, Bot } from "lucide-react";

interface AskAIButtonProps {
  productName?: string;
  sku?: string;
  className?: string;
}

export default function AskAIButton({
  productName,
  sku,
  className = "",
}: AskAIButtonProps) {
  const handleClick = () => {
    window.dispatchEvent(
      new CustomEvent("open-ai-chat", {
        detail: { productName, sku },
      })
    );
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border-2 border-[#F5A623] text-[#1B3A6B] hover:bg-amber-50/70 font-bold text-sm transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:ring-offset-2 ${className}`}
      aria-label="Ask AI about this product"
    >
      <Bot className="w-4 h-4 text-[#F5A623]" />
      <MessageSquare className="w-4 h-4 text-[#F5A623]" />
      <span>Ask AI About This Product</span>
    </button>
  );
}
