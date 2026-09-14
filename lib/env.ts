// Runtime Environment Variable Validator

export function validateEnv() {
  const isServer = typeof window === "undefined";
  if (!isServer) return;

  const requiredServerVars = ["GROQ_API_KEY"];
  const missingVars = requiredServerVars.filter((v) => !process.env[v]);

  if (missingVars.length > 0) {
    console.warn(
      `\x1b[33m[KC EXPORT CONFIG WARNING]\x1b[0m Missing environment variables: ${missingVars.join(
        ", "
      )}. AI assistant endpoints will run in graceful fallback mode. Please configure .env.local with GROQ_API_KEY.`
    );
  }
}

export const env = {
  GROQ_API_KEY: process.env.GROQ_API_KEY || "",
  SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || "https://www.kcimportexport.com",
  NODE_ENV: process.env.NODE_ENV || "development",
};
