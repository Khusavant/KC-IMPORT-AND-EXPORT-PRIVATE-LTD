// Client-side and server-side keyword-overlap retrieval (Mock RAG)
// Simulates vector search until pgvector database is connected in Phase 5

import { KnowledgeChunk } from "./ai-types";
import { KC_KNOWLEDGE_BASE } from "./knowledge-base";

const STOP_WORDS = new Set([
  "a",
  "an",
  "the",
  "and",
  "or",
  "but",
  "is",
  "are",
  "was",
  "were",
  "be",
  "in",
  "on",
  "at",
  "to",
  "for",
  "with",
  "by",
  "about",
  "against",
  "between",
  "into",
  "through",
  "during",
  "before",
  "after",
  "above",
  "below",
  "from",
  "up",
  "down",
  "of",
  "off",
  "over",
  "under",
  "again",
  "further",
  "then",
  "once",
  "here",
  "there",
  "when",
  "where",
  "why",
  "how",
  "all",
  "any",
  "both",
  "each",
  "few",
  "more",
  "most",
  "other",
  "some",
  "such",
  "no",
  "nor",
  "not",
  "only",
  "own",
  "same",
  "so",
  "than",
  "too",
  "very",
  "s",
  "t",
  "can",
  "will",
  "just",
  "don",
  "should",
  "now",
  "i",
  "me",
  "my",
  "we",
  "us",
  "our",
  "you",
  "your",
  "he",
  "she",
  "it",
  "they",
  "them",
  "want",
  "need",
  "give",
  "tell",
  "please",
]);

/**
 * Tokenize a text string into normalized query keywords
 */
export function extractKeywords(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 2 && !STOP_WORDS.has(word));
}

/**
 * Retrieve top relevant knowledge chunks based on keyword overlap
 */
export function retrieveRelevantChunks(
  query: string,
  topK: number = 5
): KnowledgeChunk[] {
  const queryLower = query.toLowerCase();
  const queryTokens = extractKeywords(query);

  if (queryTokens.length === 0) {
    // If query is empty or only stop words, return foundational chunks
    return KC_KNOWLEDGE_BASE.slice(0, topK);
  }

  const scoredChunks = KC_KNOWLEDGE_BASE.map((chunk) => {
    let score = 0;
    const titleLower = chunk.title.toLowerCase();
    const contentLower = chunk.content.toLowerCase();

    // Direct phrase match bonus
    if (titleLower.includes(queryLower)) {
      score += 10;
    }
    if (contentLower.includes(queryLower)) {
      score += 5;
    }

    // Token match scoring
    for (const token of queryTokens) {
      // Title match (weight: 4)
      if (titleLower.includes(token)) {
        score += 4;
      }

      // Keyword array match (weight: 3)
      for (const kw of chunk.keywords) {
        if (kw.toLowerCase().includes(token)) {
          score += 3;
        }
      }

      // Content match (weight: 1)
      if (contentLower.includes(token)) {
        score += 1;
      }
    }

    return { chunk, score };
  });

  // Sort descending by score
  scoredChunks.sort((a, b) => b.score - a.score);

  // If top scored chunk has zero matches, fallback to default overview chunks
  if (scoredChunks[0].score === 0) {
    return KC_KNOWLEDGE_BASE.slice(0, topK);
  }

  return scoredChunks.slice(0, topK).map((item) => item.chunk);
}
