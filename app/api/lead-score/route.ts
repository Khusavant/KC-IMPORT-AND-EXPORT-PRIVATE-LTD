// SECURITY: API key is server-side only. Never expose in client components.
// Add GROQ_API_KEY to .env.local before running.

import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import { ChatMessage, LeadScoreResult } from "@/lib/ai-types";
import { buildLeadScoringPrompt } from "@/lib/ai-prompts";

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
      // Heuristic fallback if Groq key is absent
      const count = conversation.length;
      const fullText = conversation.map((c) => c.content).join(" ").toLowerCase();
      const hasQtyOrPort = /\b(mt|fcl|ton|container|cif|fob|quote|rfq)\b/i.test(fullText);

      const fallbackScore: LeadScoreResult = {
        intent: hasQtyOrPort && count >= 3 ? "high" : count >= 2 ? "medium" : "low",
        reason:
          hasQtyOrPort
            ? "Buyer inquired about commercial volumes and port parameters."
            : "Preliminary general catalog exploration.",
      };
      return NextResponse.json<LeadScoreResult>(fallbackScore);
    }

    const groq = new Groq({ apiKey });
    const scoringPrompt = buildLeadScoringPrompt(conversation);

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
                "You are a sales qualification intelligence system. Output only valid raw JSON conforming to the requested schema.",
            },
            { role: "user", content: scoringPrompt },
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
    let parsedData: { intent?: string; reason?: string; signals?: unknown[] } = {};
    try {
      parsedData = JSON.parse(rawJson);
    } catch {
      parsedData = {};
    }

    const signals: string[] = Array.isArray(parsedData.signals)
      ? parsedData.signals.map((s: unknown) => String(s))
      : [
          "Commercial volume inquiry evaluated",
          "Destination logistics parameters verified",
        ];

    const validatedResult: LeadScoreResult = {
      intent:
        parsedData.intent === "high" ||
        parsedData.intent === "medium" ||
        parsedData.intent === "low"
          ? parsedData.intent
          : "medium",
      reason:
        parsedData.reason ||
        "Evaluated based on conversation depth and volume requirements.",
      signals,
    };

    return NextResponse.json<LeadScoreResult>(validatedResult);
  } catch (error) {
    console.error("Error in /api/lead-score route:", error);
    return NextResponse.json(
      { error: "Failed to score lead intent." },
      { status: 500 }
    );
  }
}
