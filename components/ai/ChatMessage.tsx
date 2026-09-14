"use client";

import React, { useState } from "react";
import { Copy, Check, Bot, User } from "lucide-react";
import { ChatMessage as ChatMessageType } from "@/lib/ai-types";

interface ChatMessageProps {
  message: ChatMessageType;
}

/**
 * Basic markdown renderer for bold text, bullet points, and paragraphs
 */
function renderMarkdown(text: string) {
  const lines = text.split("\n");

  return (
    <div className="space-y-1.5 leading-relaxed">
      {lines.map((line, idx) => {
        const trimmed = line.trim();

        // Empty line
        if (!trimmed) {
          return <div key={idx} className="h-1" />;
        }

        // Bullet point
        if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
          const bulletContent = trimmed.substring(2);
          return (
            <div key={idx} className="flex items-start gap-2 pl-1">
              <span className="text-[#F5A623] font-bold text-xs mt-0.5">•</span>
              <span
                dangerouslySetInnerHTML={{
                  __html: formatInlineMarkdown(bulletContent),
                }}
              />
            </div>
          );
        }

        // Regular line
        return (
          <p
            key={idx}
            dangerouslySetInnerHTML={{
              __html: formatInlineMarkdown(line),
            }}
          />
        );
      })}
    </div>
  );
}

function formatInlineMarkdown(text: string): string {
  // Convert **bold** to <strong>bold</strong>
  let formatted = text.replace(
    /\*\*(.*?)\*\*/g,
    '<strong class="font-semibold text-gray-900">$1</strong>'
  );
  // Convert *italic* to <em>italic</em>
  formatted = formatted.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');
  return formatted;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Ignore clipboard failure
    }
  };

  return (
    <div
      className={`group flex flex-col my-3 animate-fade-in-up ${
        isUser ? "items-end" : "items-start"
      }`}
    >
      <div
        className={`flex items-start gap-2 max-w-[88%] sm:max-w-[82%] ${
          isUser ? "flex-row-reverse" : "flex-row"
        }`}
      >
        {/* Avatar */}
        <div
          className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 shadow-xs text-xs font-semibold ${
            isUser
              ? "bg-[#F5A623] text-gray-900"
              : "bg-[#1B3A6B] text-white"
          }`}
        >
          {isUser ? (
            <User className="w-4 h-4 text-gray-900" />
          ) : (
            <Bot className="w-4 h-4 text-[#F5A623]" />
          )}
        </div>

        {/* Bubble */}
        <div
          className={`relative text-xs sm:text-sm rounded-2xl px-4 py-3 shadow-xs ${
            isUser
              ? "bg-amber-100/90 text-amber-950 font-medium rounded-tr-xs border border-amber-200/80"
              : "bg-white text-gray-800 rounded-tl-xs border border-gray-200/80 border-l-4 border-l-[#1B3A6B]"
          }`}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
          ) : (
            renderMarkdown(message.content)
          )}

          {/* Copy button on hover for assistant messages */}
          {!isUser && (
            <button
              onClick={handleCopy}
              className="absolute -bottom-2.5 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white border border-gray-200 rounded-md p-1 shadow-xs hover:bg-gray-50 text-gray-500 hover:text-gray-800"
              title="Copy message"
            >
              {copied ? (
                <Check className="w-3 h-3 text-emerald-600" />
              ) : (
                <Copy className="w-3 h-3" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Timestamp */}
      <span className="text-[10px] text-gray-400 mt-1 px-9 select-none">
        {message.timestamp}
      </span>
    </div>
  );
}
