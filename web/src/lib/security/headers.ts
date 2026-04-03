/**
 * HTTP Security Headers builder.
 *
 * Call `applySecurityHeaders(response)` from middleware to attach
 * all security-related response headers to every page/API response.
 *
 * Policy choices:
 *  - CSP: strict allow-list that covers Next.js needs + Supabase + fonts
 *  - HSTS: 1 year, includeSubDomains, preload-ready
 *  - Referrer: strict-origin-when-cross-origin (safe for analytics)
 *  - Permissions: opt out of dangerous browser APIs
 */

/** Build the Content-Security-Policy value */
function buildCsp(): string {
  const policies: Record<string, string[]> = {
    "default-src": ["'self'"],
    "script-src": [
      "'self'",
      "'unsafe-inline'",
      "https://www.googletagmanager.com",
      "https://www.google-analytics.com",
      "https://translate.google.com",
      "https://translate.googleapis.com",
      "https://translate-pa.googleapis.com",
    ],
    "style-src": [
      "'self'",
      "'unsafe-inline'",
      "https://fonts.googleapis.com",
      "https://translate.googleapis.com",
      "https://www.gstatic.com",
    ],
    "font-src": [
      "'self'",
      "https://fonts.gstatic.com",
      "data:",
    ],
    "media-src": ["'self'", "data:"],
    "img-src": [
      "'self'",
      "data:",
      "blob:",
      "https://*.supabase.co",
      "https://images.unsplash.com",
      "https://i.pravatar.cc",
      "https://www.transparenttextures.com",
      "https://www.google-analytics.com",
      "https://translate.google.com",
      "https://www.gstatic.com",
      "https://fonts.gstatic.com",
    ],
    "connect-src": [
      "'self'",
      "https://*.supabase.co",
      "wss://*.supabase.co",
      "https://www.google-analytics.com",
      "https://www.googletagmanager.com",
      "https://translate.googleapis.com",
    ],
    "frame-src": ["https://www.google.com", "https://maps.google.com", "https://maps.googleapis.com"],
    "frame-ancestors": ["'none'"],
    "object-src": ["'none'"],
    "base-uri": ["'self'"],
    "form-action": ["'self'"],
    "upgrade-insecure-requests": [],
  };

  return Object.entries(policies)
    .map(([key, vals]) => (vals.length ? `${key} ${vals.join(" ")}` : key))
    .join("; ");
}

const CSP_VALUE = buildCsp();

const SECURITY_HEADERS: Record<string, string> = {
  // Prevent clickjacking
  "X-Frame-Options": "DENY",
  // Stop MIME-type sniffing
  "X-Content-Type-Options": "nosniff",
  // XSS auditor (legacy browsers)
  "X-XSS-Protection": "1; mode=block",
  // Referrer
  "Referrer-Policy": "strict-origin-when-cross-origin",
  // DNS prefetch control
  "X-DNS-Prefetch-Control": "on",
  // Disable unnecessary browser features
  "Permissions-Policy":
    "camera=(), microphone=(), geolocation=(), interest-cohort=(), payment=(), usb=(), bluetooth=()",
  // CSP
  "Content-Security-Policy": CSP_VALUE,
  // Hide server info
  "X-Powered-By": "", // will be deleted
};

// Note: HSTS is only set over HTTPS. Next.js on Vercel/Render enforces
// HTTPS automatically; we still emit the header for correctness.
const HSTS_VALUE = "max-age=31536000; includeSubDomains; preload";

/**
 * Attach all security headers to the supplied Next.js response.
 * Returns the mutated response.
 */
export function applySecurityHeaders(
  response: { headers: { set: (k: string, v: string) => void; delete: (k: string) => void } },
  isProduction = process.env.NODE_ENV === "production",
): void {
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    if (value === "") {
      response.headers.delete(key);
    } else {
      response.headers.set(key, value);
    }
  }

  if (isProduction) {
    response.headers.set("Strict-Transport-Security", HSTS_VALUE);
  }
}
