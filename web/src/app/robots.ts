import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo/site-url";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getSiteUrl();
  return {
    rules: [
      // ── Allow legitimate search engines ─────────────────────────────────
      {
        userAgent: ["Googlebot", "Bingbot", "Slurp", "DuckDuckBot", "Baiduspider", "Yandexbot", "Applebot"],
        allow: "/",
        disallow: ["/admin", "/admin-login", "/api/"],
      },

      // ── Block known aggressive scrapers / data harvesters ───────────────
      {
        userAgent: [
          "AhrefsBot",
          "SemrushBot",
          "DotBot",
          "MJ12bot",
          "BLEXBot",
          "PetalBot",
          "Bytespider",
          "ClaudeBot",
          "GPTBot",
          "CCBot",
          "anthropic-ai",
          "ChatGPT-User",
          "cohere-ai",
          "DataForSeoBot",
          "PaperLiBot",
          "Scrapy",
          "python-requests",
          "curl",
          "wget",
          "HTTrack",
          "Teleport",
          "WebCopier",
          "SiteSnagger",
          "WebZIP",
          "NetAnts",
          "Offline Explorer",
          "Aqua_Products",
          "Zealbot",
          "MSIECrawler",
        ],
        disallow: "/",
      },

      // ── Default: allow public content, block sensitive routes ────────────
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/admin-login",
          "/api/",
          "/_next/",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
