// SECURITY: API key is server-side only. Never expose in client components.
// Add GROQ_API_KEY to .env.local before running.

import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import { ChatMessage, AIResponse, RFQSummary } from "@/lib/ai-types";
import { retrieveRelevantChunks } from "@/lib/rag-retrieval";
import { buildSystemPrompt } from "@/lib/ai-prompts";
import { validateMessageInput, sanitizeInput } from "@/lib/input-validator";
import { logError } from "@/lib/error-logger";

export const runtime = "nodejs";

// Language detection heuristic (Script + Romanized Hindi/Gujarati keywords)
function detectLanguage(text: string): { language: string; code: string } {
  if (/[\u0A80-\u0AFF]/.test(text)) {
    return { language: "Gujarati", code: "gu" };
  }
  if (/[\u0900-\u097F]/.test(text)) {
    return { language: "Hindi", code: "hi" };
  }
  const lower = text.toLowerCase();
  if (/\b(kem cho|tamare|aapo|bhav|ketla|su che|tamari|aavse)\b/.test(lower)) {
    return { language: "Gujarati", code: "gu" };
  }
  if (
    /\b(namaste|kya|chahiye|kitna|daam|rate batao|aapka|hoga|bhejo|mulya)\b/.test(
      lower
    )
  ) {
    return { language: "Hindi", code: "hi" };
  }
  if (/\b(marhaba|shukran|kam|as-salamu|keif|ayna)\b/.test(lower)) {
    return { language: "Arabic", code: "ar" };
  }
  return { language: "English", code: "en" };
}

// Quick heuristic to detect whether buyer provided enough info for an RFQ
function detectRFQIntent(
  messages: ChatMessage[],
  latestUserMsg: string
): { isDetected: boolean; rfqPreview?: Partial<RFQSummary> } {
  const fullText = [...messages.map((m) => m.content), latestUserMsg]
    .join(" ")
    .toLowerCase();

  const hasQuantity =
    /\b(\d+)\s*(mt|metric ton|tons|tonnes|kg|pieces|pcs|containers?|fcl|lcl|sets|sqm|sq\.meters?)\b/i.test(
      fullText
    );
  const hasDestination =
    /\b(port|cif|fob|usa|united states|uae|dubai|germany|uk|saudi|qatar|oman|australia|canada|france|japan|houston|jebel ali|rotterdam|hamburg|singapore)\b/i.test(
      fullText
    );
  const hasContact =
    /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/.test(
      fullText
    );
  const hasKeyword =
    /\b(rfq|quote|quotation|proforma|inquiry|price|rate|order|buy|purchase)\b/i.test(
      fullText
    );

  const isDetected =
    (hasQuantity && hasDestination) ||
    (hasQuantity && hasKeyword) ||
    (hasContact && (hasQuantity || hasDestination));

  return { isDetected };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages = [], userMessage = "" } = body as {
      messages: ChatMessage[];
      userMessage: string;
    };

    // Input validation & sanitization
    const validation = validateMessageInput(userMessage, 1000);
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error || "Invalid user message." },
        { status: 400 }
      );
    }
    const sanitizedUserMsg = validation.sanitized;

    // Rate limiting: Maximum 20 messages per session
    if (messages.length >= 20) {
      return NextResponse.json<AIResponse>({
        reply:
          "You have reached the 20-message limit for this session. To proceed with your order or connect directly with our international export desk, please reach us on WhatsApp at +91 98765 43210 or email exports@kcimportexport.com.",
        rfqDetected: false,
      });
    }

    const apiKey = process.env.GROQ_API_KEY;

    // Check if API key is configured
    if (!apiKey) {
      console.warn("GROQ_API_KEY is not set in environment variables.");
      return NextResponse.json<AIResponse>({
        reply:
          "Our AI assistant is temporarily running in offline mode. Please contact our export sales desk directly via WhatsApp at +91 98765 43210 or email exports@kcimportexport.com for immediate quotes and technical documentation.",
        rfqDetected: false,
      });
    }

    // 1. Detect language
    const langInfo = detectLanguage(sanitizedUserMsg);

    // 2. RAG Retrieval: fetch top 5 relevant knowledge chunks
    const relevantChunks = retrieveRelevantChunks(sanitizedUserMsg, 5);

    // 3. Build system prompt with retrieved context and language directive
    let systemPrompt = buildSystemPrompt(relevantChunks);
    if (langInfo.code === "hi" || langInfo.code === "gu") {
      systemPrompt += `\n\nLANGUAGE DIRECTIVE: The user's query is in ${langInfo.language}. You MUST formulate your entire response in ${langInfo.language} (${langInfo.language} script or script matching user) while preserving exact numbers, MOQs, specifications, and commercial precision.`;
    }

    // 4. Initialize Groq SDK and construct conversation
    const groq = new Groq({ apiKey });

    const formattedHistory = messages.map((m) => ({
      role: m.role as "user" | "assistant",
      content: sanitizeInput(m.content),
    }));

    const candidateModels = [
      "openai/gpt-oss-120b",
      "llama-3.3-70b-versatile",
      "llama-3.1-70b-versatile",
      "qwen/qwen3.8-27b",
    ];

    let completion = null;
    let lastError = null;

    for (const model of candidateModels) {
      try {
        completion = await groq.chat.completions.create({
          model,
          messages: [
            { role: "system", content: systemPrompt },
            ...formattedHistory,
            { role: "user", content: sanitizedUserMsg },
          ],
          max_tokens: 1200,
          temperature: 0.3,
        });
        if (completion) break;
      } catch (err: unknown) {
        lastError = err;
        const errObj = err as { status?: number; error?: { code?: string } };
        if (
          errObj?.status === 404 ||
          errObj?.error?.code === "model_not_found"
        ) {
          continue;
        }
        throw err;
      }
    }

    if (!completion && lastError) {
      throw lastError;
    }

    const assistantReply =
      completion?.choices[0]?.message?.content ||
      "I apologize, but I could not formulate a response. Please connect with our sales team.";

    // 5. RFQ detection check
    const { isDetected } = detectRFQIntent(messages, sanitizedUserMsg);

    return NextResponse.json<AIResponse>({
      reply: assistantReply,
      rfqDetected: isDetected,
      detectedLanguage: langInfo.language !== "English" ? langInfo.language : undefined,
    });
  } catch (error) {
    logError("/api/chat", error);
    return NextResponse.json<AIResponse>(
      {
        reply:
          "Our AI is temporarily unavailable. Please contact our export team directly on WhatsApp (+91 98765 43210) or submit a formal inquiry via our Contact page.",
        rfqDetected: false,
      },
      { status: 500 }
    );
  }
}
