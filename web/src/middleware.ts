import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getAdminCookieName, verifySession } from "@/lib/admin-auth";
import { applySecurityHeaders } from "@/lib/security/headers";
import { isBadBot, isGoodBot, looksLikeBrowser, getClientIp, isSameHost } from "@/lib/security/bot-detection";
import { checkGeneralApiRateLimit, checkLoginRateLimit } from "@/lib/security/rate-limiter";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** JSON 429 response with Retry-After */
function rateLimitResponse(resetAt: number) {
  const retryAfter = Math.ceil((resetAt - Date.now()) / 1000);
  return new NextResponse(
    JSON.stringify({ message: "Too many requests. Please try again later." }),
    {
      status: 429,
      headers: {
        "Content-Type": "application/json",
        "Retry-After": String(retryAfter),
      },
    },
  );
}

/** 403 for bots / scrapers */
function forbiddenResponse(reason = "Forbidden") {
  return new NextResponse(JSON.stringify({ message: reason }), {
    status: 403,
    headers: { "Content-Type": "application/json" },
  });
}

// ---------------------------------------------------------------------------
// Main middleware
// ---------------------------------------------------------------------------

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const headers = request.headers;
  const userAgent = headers.get("user-agent") ?? "";
  const ip = getClientIp(headers);

  // ── 1. Block bad bots on all routes (allow good crawlers) ──────────────────
  if (isBadBot(userAgent)) {
    // Still let good bots (Google, Bing) through for SEO
    if (!isGoodBot(userAgent)) {
      const res = forbiddenResponse("Automated access is not permitted.");
      applySecurityHeaders(res);
      return res;
    }
  }

  // ── 2. API-specific security ────────────────────────────────────────────────
  if (pathname.startsWith("/api/")) {
    // 2a. Block non-browser-like clients on non-bot API calls
    //     (Allow good bots to index public pages, but not hit internal APIs)
    if (!looksLikeBrowser(headers) && !isGoodBot(userAgent)) {
      const res = forbiddenResponse("Direct API access from automated clients is not permitted.");
      applySecurityHeaders(res);
      return res;
    }

    // 2b. General API rate limiting
    const apiLimit = checkGeneralApiRateLimit(ip);
    if (!apiLimit.allowed) {
      const res = rateLimitResponse(apiLimit.resetAt);
      applySecurityHeaders(res);
      return res;
    }

    // 2c. CSRF / Same-origin check for state-changing requests
    if (request.method !== "GET" && request.method !== "HEAD") {
      if (!isSameHost(headers)) {
        const res = forbiddenResponse("Invalid request origin. CSRF check failed.");
        applySecurityHeaders(res);
        return res;
      }
    }

    // 2d. Stricter rate limiting on login endpoint
    if (pathname.startsWith("/api/admin/login")) {
      const loginLimit = checkLoginRateLimit(ip);
      if (!loginLimit.allowed) {
        const res = rateLimitResponse(loginLimit.resetAt);
        applySecurityHeaders(res);
        return res;
      }
    }
  }

  // ── 3. Build the response ───────────────────────────────────────────────────
  const adminToken = request.cookies.get(getAdminCookieName())?.value;
  const isAdmin = (await verifySession(adminToken || "")) === "admin";
  const response = NextResponse.next();

  // ── 4. Apply all security headers to EVERY response ────────────────────────
  applySecurityHeaders(response);

  // ── 5. robots meta-tag – keep admin + API routes out of search indexes ──────
  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/admin-login") ||
    pathname.startsWith("/api/")
  ) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive, nosnippet");
  }

  // ── 6. Block unauthenticated access to /api/admin/* ─────────────────────────
  //    (login & logout are excluded so users can authenticate)
  if (
    pathname.startsWith("/api/admin/") &&
    !pathname.startsWith("/api/admin/login") &&
    !pathname.startsWith("/api/admin/logout")
  ) {
    if (!isAdmin) {
      const res = new NextResponse(
        JSON.stringify({ message: "Authentication required." }),
        { status: 401, headers: { "Content-Type": "application/json" } },
      );
      applySecurityHeaders(res);
      return res;
    }
  }

  // ── 7. Redirect unauthenticated users away from admin pages ─────────────────
  if (
    pathname.startsWith("/admin") &&
    !pathname.startsWith("/admin-login") &&
    !isAdmin
  ) {
    const loginUrl = new URL("/admin-login", request.url);
    loginUrl.searchParams.set(
      "redirectTo",
      `${request.nextUrl.pathname}${request.nextUrl.search}`,
    );
    const redirectResponse = NextResponse.redirect(loginUrl);
    applySecurityHeaders(redirectResponse);
    redirectResponse.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive, nosnippet");
    return redirectResponse;
  }

  // ── 8. Allow the request to proceed ─────────────────────────────────────────
  if (pathname.startsWith("/api/") || pathname.startsWith("/admin-login")) {
    return response;
  }

  return response;
}

export const config = {
  matcher: [
    // Protect admin pages and all API routes
    "/admin/:path*",
    "/admin-login",
    "/api/:path*",
    // Apply security headers to all HTML pages (skip static assets)
    "/((?!_next/static|_next/image|favicon.ico|logo.svg|logo.png|og-image.svg|sitemap.xml|robots.txt).*)",
  ],
};