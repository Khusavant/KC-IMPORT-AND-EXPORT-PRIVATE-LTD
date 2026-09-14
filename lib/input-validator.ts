// Input sanitization and validation utilities for KC API routes

/**
 * Strips HTML tags and script injections from user inputs
 */
export function sanitizeInput(input: string): string {
  if (!input || typeof input !== "string") return "";
  return input.replace(/<[^>]*>?/gm, "").trim();
}

/**
 * Validates message length and content
 */
export function validateMessageInput(message: string, maxLength: number = 1000): {
  valid: boolean;
  sanitized: string;
  error?: string;
} {
  if (!message || typeof message !== "string") {
    return { valid: false, sanitized: "", error: "Message is required." };
  }

  const sanitized = sanitizeInput(message);

  if (sanitized.length === 0) {
    return { valid: false, sanitized: "", error: "Message cannot be empty." };
  }

  if (sanitized.length > maxLength) {
    return {
      valid: false,
      sanitized: sanitized.slice(0, maxLength),
      error: `Message exceeds maximum allowed length of ${maxLength} characters.`,
    };
  }

  return { valid: true, sanitized };
}
