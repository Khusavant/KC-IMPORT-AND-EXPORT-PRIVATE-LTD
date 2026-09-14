// SECURITY: API key is server-side only. Never expose in client components.
// Add GROQ_API_KEY to .env.local before running.

import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import { RFQSummary, SalesEmailDraft } from "@/lib/ai-types";
import { Lead } from "@/lib/admin-types";
import { sanitizeInput } from "@/lib/input-validator";
import { logError } from "@/lib/error-logger";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { rfqData, leadData } = body as {
      rfqData: RFQSummary;
      leadData?: Partial<Lead>;
    };

    if (!rfqData || !rfqData.product) {
      return NextResponse.json(
        { error: "Valid RFQ data is required." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GROQ_API_KEY;

    const buyerName = sanitizeInput(
      rfqData.buyerName || leadData?.name || "Valued Trade Partner"
    );
    const company = sanitizeInput(
      rfqData.company || leadData?.company || "Procurement Team"
    );
    const product = sanitizeInput(rfqData.product);
    const quantity = sanitizeInput(rfqData.quantity || "1 FCL Container");
    const destination = sanitizeInput(
      rfqData.destination || "CIF Destination Port"
    );

    if (!apiKey) {
      const fallbackDraft: SalesEmailDraft = {
        subject: `KC Import & Export: Formal Quotation & Export Proposal for ${product}`,
        body: `Dear ${buyerName},\n\nThank you for connecting with KC Import and Export Private Limited regarding your requirement for ${product} (${quantity}) destined for ${destination}.\n\nOperating directly from Rajkot, Gujarat, within proximity to Mundra and Pipavav deep-water ports, we specialize in certified export shipments adhering to rigorous international standards.\n\nOur commercial engineering desk has reviewed your specifications. Attached please find our official Proforma Invoice detailing firm unit pricing under CIF / FOB terms, packing configurations, and SGS inspection parameters.\n\nWe look forward to facilitating a secure, seamless shipment.\n\nWarm regards,\n\nExport Commercial Desk\nKC Import and Export Private Limited\nRajkot, Gujarat, India\nWhatsApp: +91 98765 43210`,
        followUpDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
      };
      return NextResponse.json<SalesEmailDraft>(fallbackDraft);
    }

    const groq = new Groq({ apiKey });

    const prompt = `You are the Commercial Director of KC Import and Export Private Limited, a premier B2B export corporation based in Rajkot, Gujarat, India.
Draft a professional, concise, and persuasive B2B export sales follow-up email to this buyer.

Buyer Name: ${buyerName}
Company: ${company}
Product: ${product}
SKU: ${rfqData.sku || "N/A"}
Volume: ${quantity}
Destination Port: ${destination}
Target Timeline: ${rfqData.deliveryDate || "30 Days from LC"}
Specs: ${rfqData.specifications || "Standard Export Grade"}

Guidelines:
1. Reference their specific commodity or engineered part requirement.
2. Mention KC's western India logistics advantage (Mundra & Pipavav ports) and ISO/APEDA certifications.
3. Invite them to review the attached Proforma Invoice / test report.
4. Professional B2B trade tone. No system emojis.

Return JSON ONLY (no code fences, no extra text):
{
  "subject": "Compelling subject line",
  "body": "Formatted email body with line breaks (use \\n)",
  "followUpDate": "YYYY-MM-DD (calculated as 2 days from today)"
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
                "You are an international B2B sales automation engine. Output only valid raw JSON conforming to the requested schema.",
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
    const parsed = JSON.parse(rawJson) as SalesEmailDraft;

    const followUpDate =
      parsed.followUpDate ||
      new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0];

    return NextResponse.json<SalesEmailDraft>({
      subject: parsed.subject || `Export Proposal: ${product} to ${destination}`,
      body: parsed.body || `Dear ${buyerName},\n\nThank you for your inquiry...`,
      followUpDate,
    });
  } catch (error) {
    logError("/api/sales-email", error);
    return NextResponse.json(
      { error: "Failed to generate sales email draft." },
      { status: 500 }
    );
  }
}
