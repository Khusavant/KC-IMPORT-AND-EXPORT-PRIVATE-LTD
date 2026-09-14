// SECURITY: API key is server-side only. Never expose in client components.
// Add GROQ_API_KEY to .env.local before running.

import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import { FollowupSuggestionsResult } from "@/lib/ai-types";
import { Lead, RFQ } from "@/lib/admin-types";
import { sanitizeInput } from "@/lib/input-validator";
import { logError } from "@/lib/error-logger";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { lead, rfq } = body as { lead: Partial<Lead>; rfq?: Partial<RFQ> };

    if (!lead || !lead.name) {
      return NextResponse.json(
        { error: "Valid lead details required." },
        { status: 400 }
      );
    }

    const leadName = sanitizeInput(lead.name);
    const company = sanitizeInput(lead.company || "International Buyer");
    const product = sanitizeInput(lead.productInterest || rfq?.product || "Export Product");
    const volume = sanitizeInput(lead.quantity || rfq?.quantity || "Commercial Volume");
    const destination = sanitizeInput(lead.destination || rfq?.destination || "Destination Port");
    const status = sanitizeInput(lead.status || "new");
    const intent = sanitizeInput(lead.intent || "medium");

    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      const fallback: FollowupSuggestionsResult = {
        suggestions: [
          `Prepare formal Proforma Invoice (PI) for ${product} (${volume}) with FOB Mundra and CIF ${destination} options.`,
          `Verify laboratory Certificate of Analysis (COA) and SGS pre-shipment audit availability.`,
          `Send direct WhatsApp introduction to ${leadName} (${company}) confirming production timeline.`,
        ],
        urgency: intent === "high" ? "high" : "medium",
      };
      return NextResponse.json<FollowupSuggestionsResult>(fallback);
    }

    const groq = new Groq({ apiKey });

    const prompt = `You are the Head of Global Trade Strategy for KC Import and Export Private Limited in Rajkot, Gujarat.
Based on this buyer lead and RFQ dossier, formulate exactly 3 high-impact, concrete sales follow-up actions for our commercial desk.

BUYER DOSSIER:
- Buyer Name: ${leadName}
- Company: ${company}
- Target Product: ${product}
- Quantity / Volume: ${volume}
- Destination Port: ${destination}
- Current Pipeline Stage: ${status}
- Purchase Intent Level: ${intent}

INSTRUCTIONS:
1. Provide exactly 3 actionable, specific trade recommendations (e.g. issuing proforma invoice, scheduling container stuffing, sending courier samples, or proposing LC terms).
2. Rate urgency as "high", "medium", or "low".

Return JSON ONLY (no markdown fences, no extra text):
{
  "suggestions": [
    "Action item 1",
    "Action item 2",
    "Action item 3"
  ],
  "urgency": "low" | "medium" | "high"
}`;

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
                "You are an expert international trade advisor. Output only valid raw JSON without extra formatting.",
            },
            { role: "user", content: prompt },
          ],
          temperature: 0.2,
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
    const parsed = JSON.parse(rawJson) as FollowupSuggestionsResult;

    const validatedResult: FollowupSuggestionsResult = {
      suggestions:
        Array.isArray(parsed.suggestions) && parsed.suggestions.length > 0
          ? parsed.suggestions.slice(0, 4)
          : [
              `Issue detailed Proforma Invoice for ${product} under CIF ${destination} terms.`,
              `Confirm container loading schedule from Mundra Port with Maersk/MSC liners.`,
              `Follow up via corporate WhatsApp to review technical test parameters.`,
            ],
      urgency:
        parsed.urgency === "high" ||
        parsed.urgency === "medium" ||
        parsed.urgency === "low"
          ? parsed.urgency
          : "medium",
    };

    return NextResponse.json<FollowupSuggestionsResult>(validatedResult);
  } catch (error) {
    logError("/api/followup-suggestions", error);
    return NextResponse.json(
      { error: "Failed to generate follow-up recommendations." },
      { status: 500 }
    );
  }
}
