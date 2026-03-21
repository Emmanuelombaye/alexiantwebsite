/**
 * Input sanitisation utilities.
 * Strips HTML / script tags, trims dangerous characters,
 * and validates common patterns to prevent XSS & injection.
 */

/** Remove all HTML / script / event-handler markup. */
export function stripHtml(value: string): string {
  return value
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/<[^>]+>/g, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+\s*=/gi, "")
    .trim();
}

/** Sanitise a free-text string (name, message, etc.). */
export function sanitizeText(value: unknown, maxLength = 1000): string {
  if (typeof value !== "string") return "";
  return stripHtml(value).slice(0, maxLength);
}

/** Validate and return a safe email address, or null. */
export function sanitizeEmail(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const stripped = stripHtml(value).toLowerCase().trim();
  // RFC 5322 simplified – good enough for server-side guard
  const emailRe = /^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/;
  if (!emailRe.test(stripped) || stripped.length > 254) return null;
  return stripped;
}

/** Validate and return a safe phone number string, or null. */
export function sanitizePhone(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const stripped = value.replace(/[^\d\s\+\-\(\)]/g, "").trim();
  if (stripped.length < 7 || stripped.length > 20) return null;
  return stripped;
}

/** Sanitise a URL slug (alphanumeric + hyphens only). */
export function sanitizeSlug(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const cleaned = value.replace(/[^a-z0-9\-]/gi, "").toLowerCase().trim();
  if (cleaned.length === 0 || cleaned.length > 100) return null;
  return cleaned;
}

/** Detect obvious SQL-injection patterns – flag, don't throw. */
export function hasSqlInjectionPattern(value: string): boolean {
  const patterns = [
    /(\bSELECT\b|\bINSERT\b|\bUPDATE\b|\bDELETE\b|\bDROP\b|\bUNION\b)/i,
    /--/,
    /;.*;/,
    /'\s*(OR|AND)\s*'?\d/i,
  ];
  return patterns.some((re) => re.test(value));
}

/** Returns true when a honeypot field is filled (bot behaviour). */
export function isHoneypotFilled(value: unknown): boolean {
  if (typeof value !== "string") return false;
  return value.trim().length > 0;
}
