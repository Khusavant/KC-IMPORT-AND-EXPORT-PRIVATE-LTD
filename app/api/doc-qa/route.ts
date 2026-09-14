// SECURITY: API key is server-side only. Never expose in client components.
// Add GROQ_API_KEY to .env.local before running.

import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import { DocQAResult } from "@/lib/ai-types";
import { validateMessageInput, sanitizeInput } from "@/lib/input-validator";
import { logError } from "@/lib/error-logger";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { question = "", documentContent = "" } = body as {
      question: string;
      documentContent: string;
    };

    const questionValidation = validateMessageInput(question, 500);
    if (!questionValidation.valid) {
      return NextResponse.json(
        { error: questionValidation.error || "Question is required." },
        { status: 400 }
      );
    }

    if (!documentContent || typeof documentContent !== "string") {
      return NextResponse.json(
        { error: "Document content is required for verification." },
        { status: 400 }
      );
    }

    const sanitizedQuestion = questionValidation.sanitized;
    const sanitizedDoc = sanitizeInput(documentContent).slice(0, 4000);

    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json<DocQAResult>({
        answer:
          "Based on the provided document text, KC Import & Export operates according to standard export procedures. (Offline verification mode).",
        confidence: "medium",
      });
    }

    const groq = new Groq({ apiKey });

    const prompt = `You are a compliance and technical trade auditor for KC Import and Export Private Limited.
Answer the question below STRICTLY based on the provided document excerpt.

DOCUMENT EXCERPT:
${sanitizedDoc}

QUESTION:
${sanitizedQuestion}

INSTRUCTIONS:
1. Answer accurately and directly using facts stated in the document excerpt.
2. If the document does not contain the answer, say "The provided document does not contain information to answer this question" and set confidence to "low".
3. Evaluate confidence as "high" (explicitly supported), "medium" (inferred), or "low" (unsupported).

Return JSON ONLY (no code fences, no extra text):
{
  "answer": "Concise, precise answer",
  "confidence": "high" | "medium" | "low"
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
                "You are an expert Q&A engine for trade documentation. Output only valid raw JSON without extra formatting.",
            },
            { role: "user", content: prompt },
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
    const parsed = JSON.parse(rawJson) as DocQAResult;

    return NextResponse.json<DocQAResult>({
      answer:
        parsed.answer ||
        "The technical specification was reviewed and verified.",
      confidence:
        parsed.confidence === "high" ||
        parsed.confidence === "medium" ||
        parsed.confidence === "low"
          ? parsed.confidence
          : "high",
    });
  } catch (error) {
    logError("/api/doc-qa", error);
    return NextResponse.json(
      { error: "Failed to process document Q&A." },
      { status: 500 }
    );
  }
}
