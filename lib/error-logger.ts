// Structured server-side error logger for KC Import and Export API routes

export function logError(route: string, error: unknown): void {
  const timestamp = new Date().toISOString();
  let message = "Unknown error";
  let stack = "";

  if (error instanceof Error) {
    message = error.message;
    stack = error.stack || "";
  } else if (typeof error === "string") {
    message = error;
  } else if (error && typeof error === "object") {
    message = JSON.stringify(error);
  }

  console.error(
    `[KC-ERROR] ${timestamp} | ${route} | ${message}${
      stack ? `\nStack: ${stack}` : ""
    }`
  );
}
