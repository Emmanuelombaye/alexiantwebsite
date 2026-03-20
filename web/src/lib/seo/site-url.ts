export function getSiteUrl() {
  const envUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    process.env.VERCEL_URL ||
    "";

  if (envUrl) {
    const normalized = envUrl.startsWith("http") ? envUrl : `https://${envUrl}`;
    return normalized.replace(/\/+$/, "");
  }

  return "https://alexiantrealestate.co.ke";
}

