/**
 * Bot / scraper detection helpers.
 *
 * Checks User-Agent strings against known bad-bot signatures and
 * validates that legitimate browsers send typical request headers.
 */

/** Known bad-bot / scraper User-Agent fingerprints */
const BAD_BOT_PATTERNS = [
  /python-requests/i,
  /httpx/i,
  /aiohttp/i,
  /scrapy/i,
  /curl\//i,
  /wget\//i,
  /libwww-perl/i,
  /go-http-client/i,
  /java\//i,
  /okhttp/i,
  /axios/i,
  /node-fetch/i,
  /got\//i,
  /fetch\//i,
  /http\.rb/i,
  /mechanize/i,
  /htmlunit/i,
  /php-curl/i,
  /ruby/i,
  /lwp::/i,
  /zgrab/i,
  /masscan/i,
  /nikto/i,
  /nmap/i,
  /sqlmap/i,
  /nessus/i,
  /openvas/i,
  /burpsuite/i,
  /hydra/i,
  /dirbuster/i,
  /gobuster/i,
  /wfuzz/i,
  /nuclei/i,
  /semrush/i,
  /ahrefsbot/i,
  /dotbot/i,
  /mj12bot/i,
  /blexbot/i,
  /petalbot/i,
  /bytespider/i,
  /claudebot/i,
];

/** Allowed search-engine crawlers — never block these */
const GOOD_BOT_PATTERNS = [
  /googlebot/i,
  /bingbot/i,
  /slurp/i,
  /duckduckbot/i,
  /baiduspider/i,
  /yandexbot/i,
  /applebot/i,
  /facebookexternalhit/i,
  /twitterbot/i,
  /linkedinbot/i,
  /whatsapp/i,
];

export function isGoodBot(userAgent: string): boolean {
  return GOOD_BOT_PATTERNS.some((re) => re.test(userAgent));
}

export function isBadBot(userAgent: string): boolean {
  if (!userAgent || userAgent.trim().length < 5) return true; // empty UA = bot
  if (isGoodBot(userAgent)) return false;
  return BAD_BOT_PATTERNS.some((re) => re.test(userAgent));
}

/**
 * Heuristic check — "does this request look like it comes from a real browser?"
 * Real browsers always send Accept and Accept-Language headers.
 */
export function looksLikeBrowser(headers: Headers): boolean {
  const accept = headers.get("accept") ?? "";
  const acceptLanguage = headers.get("accept-language");
  // Browsers always accept HTML. Scrapers often send */* only or nothing.
  const acceptsHtml = accept.includes("text/html") || accept.includes("*/*");
  return acceptsHtml && !!acceptLanguage;
}

/**
 * Returns an IP address string from a Next.js / Vercel request.
 * Falls back to "127.0.0.1" when running locally.
 */
export function getClientIp(headers: Headers): string {
  return (
    headers.get("cf-connecting-ip") ??          // Cloudflare
    headers.get("x-real-ip") ??                 // Nginx proxy
    headers.get("x-forwarded-for")?.split(",")[0].trim() ?? // Generic proxy
    "127.0.0.1"
  );
}

/**
 * CSRF / Origin check.
 * Verifies that the request comes from our own site.
 */
export function isSameHost(headers: Headers): boolean {
  const origin = headers.get("origin");
  const host = headers.get("host");

  if (!origin || !host) return true; // Standard browsers might not send them on some requests

  try {
    const originUrl = new URL(origin);
    // If they match, it's same-origin
    return originUrl.host === host;
  } catch {
    return false;
  }
}
