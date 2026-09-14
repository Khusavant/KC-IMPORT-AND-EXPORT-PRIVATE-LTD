import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

// In-memory rate limiting map: ip -> { count, resetTime }
const rateLimitMap = new Map<string, RateLimitRecord>();

const WINDOW_MS = 60 * 1000; // 1 minute window
const MAX_REQUESTS_PER_WINDOW = 30; // Max 30 API calls per minute per IP

function cleanupStaleRecords(now: number) {
  // Prune expired records to prevent memory leak
  if (rateLimitMap.size > 2000) {
    rateLimitMap.forEach((record, ip) => {
      if (now > record.resetTime) {
        rateLimitMap.delete(ip);
      }
    });
  }
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Rate limiting applied specifically to AI and public API endpoints
  if (pathname.startsWith("/api/")) {
    const forwardedFor = request.headers.get("x-forwarded-for");
    const realIp = request.headers.get("x-real-ip");
    const ip = forwardedFor?.split(",")[0].trim() || realIp || "127.0.0.1";

    const now = Date.now();
    cleanupStaleRecords(now);

    const record = rateLimitMap.get(ip);

    if (!record || now > record.resetTime) {
      rateLimitMap.set(ip, {
        count: 1,
        resetTime: now + WINDOW_MS,
      });
    } else {
      record.count += 1;
      if (record.count > MAX_REQUESTS_PER_WINDOW) {
        const retryAfterSeconds = Math.ceil((record.resetTime - now) / 1000);
        return NextResponse.json(
          {
            error: "Too many requests. Please wait before submitting more queries.",
            retryAfter: retryAfterSeconds,
          },
          {
            status: 429,
            headers: {
              "Retry-After": retryAfterSeconds.toString(),
              "Content-Type": "application/json",
            },
          }
        );
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};
