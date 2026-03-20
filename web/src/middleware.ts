import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getAdminCookieName } from "@/lib/admin-auth";

export async function middleware(request: NextRequest) {
  const isAdmin = request.cookies.get(getAdminCookieName())?.value === "1";
  const response = NextResponse.next();

  // Keep internal routes out of search results/snippets.
  const pathname = request.nextUrl.pathname;
  if (pathname.startsWith("/admin") || pathname.startsWith("/admin-login") || pathname.startsWith("/api/")) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  }

  if (pathname.startsWith("/api/") || pathname.startsWith("/admin-login")) {
    return response;
  }

  if (!isAdmin) {
    const loginUrl = new URL("/admin-login", request.url);
    loginUrl.searchParams.set("redirectTo", `${request.nextUrl.pathname}${request.nextUrl.search}`);

    const redirectResponse = NextResponse.redirect(loginUrl);
    redirectResponse.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
    return redirectResponse;
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/admin-login", "/api/:path*"],
};