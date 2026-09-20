"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Sparkles, CornerDownLeft } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export default function ChatInput({
  onSendMessage,
  disabled = false,
  placeholder = "Ask about products, export specs, or request a quote...",
}: ChatInputProps) {
  const [text, setText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!disabled) {
      inputRef.current?.focus();
    }
  }, [disabled]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || disabled) return;
    onSendMessage(text.trim());
    setText("");
  };

  const handleQuickPrompt = (promptText: string) => {
    if (disabled) return;
    onSendMessage(promptText);
  };

  return (
    <div className="border-t border-gray-200 bg-white p-3 space-y-2">
      {/* Quick query chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] scrollbar-none">
        <button
          type="button"
          disabled={disabled}
          onClick={() =>
            handleQuickPrompt("What are the payment terms and MOQ for cumin seeds?")
          }
          className="shrink-0 px-2 py-0.5 rounded-full bg-gray-100 hover:bg-gray-200/80 text-gray-700 transition disabled:opacity-50"
        >
          Cumin Seeds MOQ
        </button>
        <button
          type="button"
          disabled={disabled}
          onClick={() =>
            handleQuickPrompt(
              "I need 20,000 pcs brass inserts to Houston. Can I get a quote?"
            )
          }
          className="shrink-0 px-2 py-0.5 rounded-full bg-gray-100 hover:bg-gray-200/80 text-gray-700 transition disabled:opacity-50"
        >
          Brass Inserts Quote
        </button>
        <button
          type="button"
          disabled={disabled}
          onClick={() =>
            handleQuickPrompt("What export documents and certifications do you provide?")
          }
          className="shrink-0 px-2 py-0.5 rounded-full bg-gray-100 hover:bg-gray-200/80 text-gray-700 transition disabled:opacity-50"
        >
          Certifications & Docs
        </button>
      </div>

      {/* Main input bar */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <div className="relative flex-1">
          <input
            ref={inputRef}
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={disabled}
            placeholder={placeholder}
            className="w-full pl-3 pr-8 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#1B3A6B] focus:border-transparent transition disabled:opacity-60"
          />
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
            <CornerDownLeft className="w-3.5 h-3.5" />
          </div>
        </div>

        <button
          type="submit"
          disabled={!text.trim() || disabled}
          className="p-2.5 rounded-xl bg-[#1B3A6B] hover:bg-[#152e55] text-white disabled:opacity-40 disabled:hover:bg-[#1B3A6B] transition shadow-xs shrink-0 flex items-center justify-center"
          title="Send message"
          aria-label="Send message"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

      <div className="flex items-center justify-between text-[10px] text-gray-400 px-1">
        <span className="flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-[#F5A623]" />
          Grounded on verified KC export catalog
        </span>
        <span>Enter to send</span>
      </div>
    </div>
  );
}
