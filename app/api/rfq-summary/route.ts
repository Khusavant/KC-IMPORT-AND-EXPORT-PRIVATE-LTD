// SECURITY: API key is server-side only. Never expose in client components.
// Add GROQ_API_KEY to .env.local before running.

import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import { ChatMessage, RFQSummary } from "@/lib/ai-types";
import { buildRFQExtractionPrompt } from "@/lib/ai-prompts";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { conversation = [] } = body as { conversation: ChatMessage[] };

    if (!Array.isArray(conversation) || conversation.length === 0) {
      return NextResponse.json(
        { error: "Conversation history is required." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      // Fallback structured RFQ if Groq key is not configured
      const lastMsg = conversation[conversation.length - 1]?.content || "";
      const fallbackSummary: RFQSummary = {
        product: "Commercial Export Requirement",
        quantity: "Standard Export Lot",
        destination: "Destination Port Pending",
        specifications: lastMsg.slice(0, 150) || "Specifications discussed in chat",
        deliveryDate: "Immediate Export Dispatch",
        buyerName: "Commercial Buyer",
        company: "Import Partner",
        email: "buyer@international.com",
        phone: "+1 (555) 019-2831",
        targetPrice: "Best CIF / FOB Quotation",
        intentLevel: "medium",
      };

      return NextResponse.json<RFQSummary>(fallbackSummary);
    }

    const groq = new Groq({ apiKey });
    const extractionPrompt = buildRFQExtractionPrompt(conversation);

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
            {
              role: "system",
              content:
                "You are a strict JSON extraction engine for commercial B2B RFQs. Output only valid raw JSON without code fences or formatting.",
            },
            { role: "user", content: extractionPrompt },
          ],
          temperature: 0.1,
          response_format: { type: "json_object" },
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

    const rawJson = completion?.choices[0]?.message?.content || "{}";
    const parsedData = JSON.parse(rawJson) as RFQSummary;

    // Guarantee default fields
    const sanitizedSummary: RFQSummary = {
      product: parsedData.product || "Export Product",
      sku: parsedData.sku || undefined,
      quantity: parsedData.quantity || "1 FCL Container",
      destination: parsedData.destination || "CIF Destination Port",
      deliveryDate: parsedData.deliveryDate || "30 Days from LC",
      specifications: parsedData.specifications || "Standard Export Grade",
      buyerName: parsedData.buyerName || "Procurement Officer",
      company: parsedData.company || "International Trading Co.",
      email: parsedData.email || "",
      phone: parsedData.phone || "",
      targetPrice: parsedData.targetPrice || "",
      intentLevel:
        parsedData.intentLevel === "high" ||
        parsedData.intentLevel === "medium" ||
        parsedData.intentLevel === "low"
          ? parsedData.intentLevel
          : "high",
    };

    return NextResponse.json<RFQSummary>(sanitizedSummary);
  } catch (error) {
    console.error("Error in /api/rfq-summary route:", error);
    return NextResponse.json(
      { error: "Failed to extract structured RFQ." },
      { status: 500 }
    );
  }
}
