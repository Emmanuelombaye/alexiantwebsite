export function getSiteUrl() {
  // Always use the production domain — never the Vercel preview URL
  const envUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    "";

  if (envUrl) {
    const normalized = envUrl.startsWith("http") ? envUrl : `https://${envUrl}`;
    return normalized.replace(/\/+$/, "");
  }

  return "https://alexiantrealestate.co.ke";
}

