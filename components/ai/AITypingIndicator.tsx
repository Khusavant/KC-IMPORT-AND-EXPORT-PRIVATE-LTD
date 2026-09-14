import React from "react";
import { Bot } from "lucide-react";

export default function AITypingIndicator() {
  return (
    <div className="flex items-start gap-2.5 my-2">
      <div className="w-7 h-7 rounded-full bg-[#1B3A6B] text-white flex items-center justify-center shrink-0 shadow-xs">
        <Bot className="w-4 h-4 text-[#F5A623]" />
      </div>
      <div className="bg-white border border-gray-200/90 rounded-2xl rounded-tl-sm px-4 py-3 shadow-xs flex items-center gap-1.5">
        <span className="text-xs text-gray-500 font-medium mr-1">
          KC AI is thinking
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#1B3A6B] animate-bounce [animation-delay:-0.3s]"></span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623] animate-bounce [animation-delay:-0.15s]"></span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#1B3A6B] animate-bounce"></span>
      </div>
    </div>
  );
}
