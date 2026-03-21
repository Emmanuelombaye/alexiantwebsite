/**
 * In-memory rate limiter — fast and dependency-free.
 * Stores per-key hit counts in a sliding-window map.
 * (For multi-instance deployments, swap the store for Redis / Upstash.)
 */

interface RateLimitEntry {
  count: number;
  windowStart: number;
}

const store = new Map<string, RateLimitEntry>();

// Scrub stale entries every 5 minutes
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of store.entries()) {
      if (now - entry.windowStart > 60_000 * 10) store.delete(key);
    }
  }, 5 * 60_000);
}

interface RateLimitOptions {
  /** How many requests are allowed in the window */
  limit: number;
  /** Window length in milliseconds */
  windowMs: number;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
}

export function checkRateLimit(
  key: string,
  options: RateLimitOptions,
): RateLimitResult {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now - entry.windowStart > options.windowMs) {
    // Fresh window
    store.set(key, { count: 1, windowStart: now });
    return {
      allowed: true,
      remaining: options.limit - 1,
      resetAt: now + options.windowMs,
    };
  }

  entry.count += 1;
  const remaining = Math.max(0, options.limit - entry.count);
  return {
    allowed: entry.count <= options.limit,
    remaining,
    resetAt: entry.windowStart + options.windowMs,
  };
}

// --- Pre-configured profiles ---

/** API leads form: 5 per minute per IP */
export function checkLeadsRateLimit(ip: string): RateLimitResult {
  return checkRateLimit(`leads:${ip}`, { limit: 5, windowMs: 60_000 });
}

/** Admin login: 10 attempts per 15 minutes per IP */
export function checkLoginRateLimit(ip: string): RateLimitResult {
  return checkRateLimit(`login:${ip}`, { limit: 10, windowMs: 15 * 60_000 });
}

/** General API: 120 requests per minute per IP */
export function checkGeneralApiRateLimit(ip: string): RateLimitResult {
  return checkRateLimit(`api:${ip}`, { limit: 120, windowMs: 60_000 });
}
