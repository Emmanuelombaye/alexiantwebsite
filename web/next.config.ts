import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ── Disable the "X-Powered-By: Next.js" header ──────────────────────────
  poweredByHeader: false,

  // ── Experimental: compress responses ───────────────────────────────────
  compress: true,

  images: {
    // Limit formats to what browsers actually need — narrows attack surface
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "chdpzfeuxcphzpyahrlh.supabase.co",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.transparenttextures.com",
        port: "",
        pathname: "/**",
      },
    ],
  },

  // ── HTTP response headers applied at the Next.js server level ───────────
  // These act as a fallback / second layer when middleware is bypassed
  // (e.g. during static export or Vercel Edge caching).
  async headers() {
    return [
      {
        // Apply to all routes
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=(), payment=(), usb=()",
          },
        ],
      },
      {
        // HSTS only for actual HTML pages (not API)
        source: "/((?!api).*)",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
        ],
      },
      {
        // Prevent any caching of admin pages
        source: "/admin/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, no-cache, must-revalidate, proxy-revalidate",
          },
          { key: "Pragma", value: "no-cache" },
          { key: "Expires", value: "0" },
        ],
      },
      {
        // Prevent any caching of API responses
        source: "/api/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, no-cache, must-revalidate",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
