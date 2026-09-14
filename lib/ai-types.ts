// TypeScript definitions for KC Import and Export AI Sales Assistant & Intelligence Modules

export type ChatMessageRole = "user" | "assistant";

export type ChatMessage = {
  id: string;
  role: ChatMessageRole;
  content: string;
  timestamp: string;
};

export type LeadIntentLevel = "low" | "medium" | "high";

export type RFQSummary = {
  product: string;
  sku?: string;
  quantity: string;
  destination: string;
  deliveryDate?: string;
  specifications?: string;
  buyerName?: string;
  company?: string;
  email?: string;
  phone?: string;
  targetPrice?: string;
  intentLevel: LeadIntentLevel;
};

export type AIResponse = {
  reply: string;
  rfqDetected: boolean;
  rfqData?: RFQSummary;
  detectedLanguage?: string;
};

export type KnowledgeChunkType =
  | "company"
  | "product"
  | "process"
  | "faq"
  | "certification"
  | "market";

export type KnowledgeChunk = {
  id: string;
  type: KnowledgeChunkType;
  title: string;
  content: string;
  keywords: string[];
  productId?: string;
};

export type LeadScoreResult = {
  intent: LeadIntentLevel;
  reason: string;
  signals?: string[];
};

export type SalesEmailDraft = {
  subject: string;
  body: string;
  followUpDate: string;
};

export type DocQAResult = {
  answer: string;
  confidence: "high" | "medium" | "low";
};

export type FollowupSuggestionsResult = {
  suggestions: string[];
  urgency: "low" | "medium" | "high";
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  publishedAt: string;
  readTime: string;
  tags: string[];
  coverImage: string;
};
