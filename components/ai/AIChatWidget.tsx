"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import {
  Bot,
  X,
  Minus,
  MessageCircle,
  ExternalLink,
  Sparkles,
  AlertCircle,
  RotateCcw,
} from "lucide-react";
import { ChatMessage as ChatMessageType, RFQSummary, LeadIntentLevel } from "@/lib/ai-types";
import { PRODUCTS, Product } from "@/lib/products";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import AITypingIndicator from "./AITypingIndicator";
import RFQSummaryCard from "./RFQSummaryCard";
import LeadScoreBadge from "./LeadScoreBadge";
import RFQModal from "@/components/rfq/RFQModal";

const MAX_MESSAGES = 20;

export default function AIChatWidget() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [activeRFQ, setActiveRFQ] = useState<RFQSummary | null>(null);
  const [leadIntent, setLeadIntent] = useState<LeadIntentLevel | null>(null);
  const [intentReason, setIntentReason] = useState<string>("");
  const [isRFQModalOpen, setIsRFQModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [detectedLang, setDetectedLang] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Detect if user is on a product detail page
  useEffect(() => {
    if (pathname && pathname.startsWith("/products/")) {
      const slug = pathname.replace("/products/", "").split("/")[0];
      const matched = PRODUCTS.find((p) => p.slug === slug);
      if (matched) {
        setCurrentProduct(matched);
      } else {
        setCurrentProduct(null);
      }
    } else {
      setCurrentProduct(null);
    }
  }, [pathname]);

  // Seed initial welcome message
  useEffect(() => {
    const timestamp = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    let welcomeText =
      "Hi! I'm KC's AI Assistant. Ask me about our export products, specifications, MOQs, or shipping schedules — or share your requirement to get an immediate quote.";

    if (currentProduct) {
      welcomeText = `Hello! I see you're looking at **${currentProduct.name}** (SKU: ${currentProduct.sku}). Would you like to review specifications, check MOQ requirements, or request a commercial quote?`;
    }

    setMessages([
      {
        id: "welcome-1",
        role: "assistant",
        content: welcomeText,
        timestamp,
      },
    ]);
  }, [currentProduct]);

  // Scroll to bottom when messages update
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, isOpen]);

  const handleSendMessage = async (userText: string) => {
    if (!userText.trim() || isTyping) return;

    const userTimestamp = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const userMessage: ChatMessageType = {
      id: `usr-${Date.now()}`,
      role: "user",
      content: userText,
      timestamp: userTimestamp,
    };

    const updatedHistory = [...messages, userMessage];
    setMessages(updatedHistory);
    setIsTyping(true);

    try {
      // 1. Post to /api/chat
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedHistory,
          userMessage: userText,
        }),
      });

      const data = await res.json();
      if (data.detectedLanguage) {
        setDetectedLang(data.detectedLanguage);
      }
      const replyTimestamp = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      const assistantMsg: ChatMessageType = {
        id: `ast-${Date.now()}`,
        role: "assistant",
        content:
          data.reply ||
          "Thank you for your requirement. Our commercial desk is reviewing it.",
        timestamp: replyTimestamp,
      };

      setMessages((prev) => [...prev, assistantMsg]);

      // 2. If RFQ is detected, call /api/rfq-summary to extract structured fields
      if (data.rfqDetected && !activeRFQ) {
        try {
          const rfqRes = await fetch("/api/rfq-summary", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              conversation: [...updatedHistory, assistantMsg],
            }),
          });
          if (rfqRes.ok) {
            const rfqData: RFQSummary = await rfqRes.json();
            setActiveRFQ(rfqData);
            if (rfqData.intentLevel) {
              setLeadIntent(rfqData.intentLevel);
            }
          }
        } catch (rfqErr) {
          console.warn("Could not fetch structured RFQ summary:", rfqErr);
        }
      }

      // 3. Evaluate lead intent after 3+ total messages
      if (updatedHistory.length >= 3 && !leadIntent) {
        try {
          const scoreRes = await fetch("/api/lead-score", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              conversation: [...updatedHistory, assistantMsg],
            }),
          });
          if (scoreRes.ok) {
            const scoreData = await scoreRes.json();
            setLeadIntent(scoreData.intent);
            setIntentReason(scoreData.reason || "");
          }
        } catch (scoreErr) {
          console.warn("Could not score lead intent:", scoreErr);
        }
      }
    } catch (err) {
      console.error("Chat communication failed:", err);
      const errorTimestamp = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      setMessages((prev) => [
        ...prev,
        {
          id: `ast-err-${Date.now()}`,
          role: "assistant",
          content:
            "Our AI assistant is temporarily unavailable. Please contact our export sales desk directly on WhatsApp at **+91 98765 43210** or email **exports@kcimportexport.com**.",
          timestamp: errorTimestamp,
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const resetChat = () => {
    const timestamp = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: "assistant",
        content: currentProduct
          ? `Conversation reset. How can I assist you with **${currentProduct.name}** today?`
          : "Conversation reset. Feel free to ask about our export catalog, specs, or shipping schedule.",
        timestamp,
      },
    ]);
    setActiveRFQ(null);
    setLeadIntent(null);
    setDetectedLang(null);
  };

  const userMessagesCount = messages.filter((m) => m.role === "user").length;

  return (
    <>
      {/* Floating Launcher Button */}
      {!isOpen && (
        <aside className="fixed bottom-6 right-6 z-50">
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open AI Sales Assistant"
            className="pulse-ring btn-glow flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-[#F5A623] to-amber-500 hover:from-amber-500 hover:to-amber-600 text-gray-950 font-bold text-sm rounded-full shadow-lg border-2 border-white/80 group transform transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <div className="relative">
              <Bot className="w-5 h-5 text-gray-950 transition-transform group-hover:rotate-12" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#1B3A6B] border border-white"></span>
            </div>
            <span>Ask AI</span>
            <span className="text-[10px] uppercase font-semibold bg-[#1B3A6B] text-white px-1.5 py-0.5 rounded-sm">
              B2B
            </span>
          </button>
        </aside>
      )}

      {/* Expanded Chat Panel with smooth scale & opacity transition */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[410px] max-w-[calc(100vw-24px)] h-[580px] max-h-[calc(100vh-48px)] max-sm:inset-0 max-sm:w-full max-sm:h-full max-sm:max-h-full max-sm:bottom-0 max-sm:right-0 bg-white rounded-2xl max-sm:rounded-none shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="px-4 py-3 bg-[#1B3A6B] text-white flex items-center justify-between shrink-0 shadow-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                <Bot className="w-4 h-4 text-[#F5A623]" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-sm font-bold tracking-tight">
                    KC AI Sales Assistant
                  </h3>
                  {leadIntent && (
                    <LeadScoreBadge
                      intent={leadIntent}
                      reason={intentReason}
                      size="sm"
                    />
                  )}
                  {detectedLang && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30">
                      Responding in {detectedLang}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-blue-200 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#F5A623]" />
                  Powered by Groq Llama 3.3
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={resetChat}
                title="Restart conversation"
                className="p-1.5 text-blue-200 hover:text-white hover:bg-white/10 rounded-lg transition"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Minimize chat"
                className="p-1.5 text-blue-200 hover:text-white hover:bg-white/10 rounded-lg transition"
              >
                <Minus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chat Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-1 bg-gradient-to-b from-gray-50/50 to-white">
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}

            {/* Structured RFQ Card when detected */}
            {activeRFQ && (
              <RFQSummaryCard
                rfq={activeRFQ}
                onEdit={() => setIsRFQModalOpen(true)}
              />
            )}

            {/* Typing indicator */}
            {isTyping && <AITypingIndicator />}

            {/* WhatsApp Handoff CTA (Appears after 3 user messages) */}
            {userMessagesCount >= 3 && (
              <div className="p-3 my-3 rounded-xl bg-emerald-50 border border-emerald-200/90 text-emerald-950 flex items-center justify-between gap-3 text-xs animate-in fade-in">
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Need an immediate Proforma or custom packing?</span>
                </div>
                <a
                  href="https://wa.me/919876543210?text=Hello%20KC%20Export%20Desk%2C%20I%20am%20chatting%20with%20your%20AI%20and%20need%20a%20commercial%20quote."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg inline-flex items-center gap-1 transition"
                >
                  WhatsApp
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}

            {/* Limit Warning when 20 reached */}
            {userMessagesCount >= MAX_MESSAGES && (
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  You have reached the session limit. For detailed orders,
                  please contact our commercial export desk directly.
                </span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Bottom Chat Input */}
          <ChatInput
            onSendMessage={handleSendMessage}
            disabled={isTyping || userMessagesCount >= MAX_MESSAGES}
          />
        </div>
      )}

      {/* Edit RFQ Modal Hand-off */}
      <RFQModal
        isOpen={isRFQModalOpen}
        onClose={() => setIsRFQModalOpen(false)}
        product={currentProduct}
      />
    </>
  );
}
