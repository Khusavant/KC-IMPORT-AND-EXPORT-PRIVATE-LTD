"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Bot,
  X,
  Minus,
  MessageCircle,
  ExternalLink,
  Sparkles,
  AlertCircle,
  RotateCcw,
  Maximize2,
  Minimize2,
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
  const reduced = useReducedMotion();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Resize state (Desktop only)
  const MIN_WIDTH = 380;
  const MIN_HEIGHT = 480;
  const DEFAULT_WIDTH = 420;
  const DEFAULT_HEIGHT = 590;

  const [isDesktop, setIsDesktop] = useState(false);
  const [dimensions, setDimensions] = useState({ width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT });
  const [isMaximized, setIsMaximized] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const resizeRef = useRef<{
    startX: number;
    startY: number;
    startWidth: number;
    startHeight: number;
    direction: "top" | "left" | "top-left";
  } | null>(null);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 640);
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  const startResize = (
    e: React.PointerEvent,
    direction: "top" | "left" | "top-left"
  ) => {
    if (!isDesktop) return;
    e.preventDefault();
    e.stopPropagation();
    if (isMaximized) setIsMaximized(false);
    setIsResizing(true);
    resizeRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startWidth: dimensions.width,
      startHeight: dimensions.height,
      direction,
    };
  };

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (!resizeRef.current) return;
      const { startX, startY, startWidth, startHeight, direction } = resizeRef.current;

      const deltaX = startX - e.clientX; // Dragging left increases width
      const deltaY = startY - e.clientY; // Dragging up increases height

      const maxWidth =
        typeof window !== "undefined" ? Math.min(window.innerWidth - 32, 920) : 800;
      const maxHeight =
        typeof window !== "undefined" ? Math.min(window.innerHeight - 48, 880) : 850;

      let newWidth = startWidth;
      let newHeight = startHeight;

      if (direction === "left" || direction === "top-left") {
        newWidth = Math.max(MIN_WIDTH, Math.min(maxWidth, startWidth + deltaX));
      }
      if (direction === "top" || direction === "top-left") {
        newHeight = Math.max(MIN_HEIGHT, Math.min(maxHeight, startHeight + deltaY));
      }

      setDimensions({ width: newWidth, height: newHeight });
    };

    const handlePointerUp = () => {
      if (resizeRef.current) {
        resizeRef.current = null;
        setIsResizing(false);
      }
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, []);

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

  // Listen for global open-ai-chat event from Navbar and AskAIButton
  useEffect(() => {
    const handleOpenChat = (event: Event) => {
      const customEvent = event as CustomEvent<{ productName?: string; sku?: string }>;
      setIsOpen(true);
      if (customEvent.detail?.productName) {
        const timestamp = new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        setMessages((prev) => [
          ...prev,
          {
            id: `seed-${Date.now()}`,
            role: "assistant",
            content: `Hello! I see you're inquiring about **${customEvent.detail.productName}**${
              customEvent.detail.sku ? ` (SKU: ${customEvent.detail.sku})` : ""
            }. Would you like to review technical specifications, discuss container packaging & MOQ, or get a formal FOB/CIF quote?`,
            timestamp,
          },
        ]);
      }
    };

    window.addEventListener("open-ai-chat", handleOpenChat);
    return () => window.removeEventListener("open-ai-chat", handleOpenChat);
  }, []);

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
            "Our AI assistant is temporarily unavailable. Please contact our export sales desk directly on WhatsApp at **+91 99999 99999** or email **exports@kcimportexport.com**.",
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
      <AnimatePresence>
        {!isOpen && (
          <motion.aside
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <motion.button
              onClick={() => setIsOpen(true)}
              aria-label="Open AI Sales Assistant"
              whileHover={reduced ? undefined : { scale: 1.1 }}
              whileTap={reduced ? undefined : { scale: 0.9 }}
              className="pulse-ring btn-glow flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-[#F5A623] to-amber-500 hover:from-amber-500 hover:to-amber-600 text-gray-950 font-bold text-sm rounded-full shadow-lg border-2 border-white/80 group"
            >
              <div className="relative">
                <Bot className="w-5 h-5 text-gray-950 transition-transform group-hover:rotate-12" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#1B3A6B] border border-white"></span>
              </div>
              <span>Ask AI</span>
              <span className="text-[10px] uppercase font-semibold bg-[#1B3A6B] text-white px-1.5 py-0.5 rounded-sm">
                B2B
              </span>
            </motion.button>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Expanded Chat Panel with smooth scale & opacity transition */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: reduced ? 0.01 : 0.22, ease: "easeOut" }}
            style={{
              transformOrigin: "bottom right",
              ...(isDesktop && !isMaximized
                ? {
                    width: `${dimensions.width}px`,
                    height: `${dimensions.height}px`,
                  }
                : {}),
            }}
            className={`fixed z-50 bg-white flex flex-col overflow-hidden shadow-2xl border border-gray-200 ${
              isDesktop
                ? `bottom-6 right-6 rounded-2xl max-w-[calc(100vw-24px)] max-h-[calc(100vh-48px)] ${
                    isMaximized ? "w-[min(92vw,920px)] h-[min(88vh,860px)]" : ""
                  } ${
                    isResizing
                      ? "select-none transition-none"
                      : "transition-[width,height] duration-200"
                  }`
                : "inset-0 w-full h-full rounded-none border-none bottom-0 right-0 max-h-full"
            }`}
          >
            {/* Resizable Handles (Desktop only) */}
            {isDesktop && (
              <>
                {/* Resizable Corner Handle */}
                <div
                  onPointerDown={(e) => startResize(e, "top-left")}
                  className="absolute top-0 left-0 w-6 h-6 cursor-nwse-resize z-30 items-start justify-start p-1 group touch-none flex"
                  title="Drag corner to resize"
                >
                  <div className="w-2.5 h-2.5 border-t-2 border-l-2 border-white/50 group-hover:border-amber-400 transition-colors rounded-tl-sm" />
                </div>

                {/* Top Border Resize Handle */}
                <div
                  onPointerDown={(e) => startResize(e, "top")}
                  className="absolute top-0 left-6 right-0 h-2 cursor-ns-resize z-20 hover:bg-amber-400/30 transition-colors touch-none"
                  title="Drag edge to resize height"
                />

                {/* Left Border Resize Handle */}
                <div
                  onPointerDown={(e) => startResize(e, "left")}
                  className="absolute top-6 left-0 bottom-0 w-2 cursor-ew-resize z-20 hover:bg-amber-400/30 transition-colors touch-none"
                  title="Drag edge to resize width"
                />
              </>
            )}

            {/* Header */}
            <div className="px-4 py-3 bg-[#1B3A6B] text-white flex items-center justify-between shrink-0 shadow-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                  <Bot className="w-4 h-4 text-[#F5A623]" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-bold tracking-tight">
                      KC AI Sales Assistant
                    </p>
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
                  aria-label="Restart conversation"
                  className="p-1.5 text-blue-200 hover:text-white hover:bg-white/10 rounded-lg transition"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                {isDesktop && (
                  <button
                    onClick={() => setIsMaximized(!isMaximized)}
                    title={isMaximized ? "Restore size" : "Maximize chat"}
                    aria-label={isMaximized ? "Restore size" : "Maximize chat"}
                    className="p-1.5 text-blue-200 hover:text-white hover:bg-white/10 rounded-lg transition"
                  >
                    {isMaximized ? (
                      <Minimize2 className="w-4 h-4" />
                    ) : (
                      <Maximize2 className="w-4 h-4" />
                    )}
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  title="Minimize chat"
                  aria-label="Minimize chat"
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
                    href="https://wa.me/919999999999?text=Hello%20KC%20Export%20Desk%2C%20I%20am%20chatting%20with%20your%20AI%20and%20need%20a%20commercial%20quote."
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
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit RFQ Modal Hand-off */}
      <RFQModal
        isOpen={isRFQModalOpen}
        onClose={() => setIsRFQModalOpen(false)}
        product={currentProduct}
      />
    </>
  );
}
