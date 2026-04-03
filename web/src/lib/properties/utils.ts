import type { PropertyImage } from "@/types/property";

export function getImageUrl(image: string | PropertyImage): string {
  const url = typeof image === "string" ? image : (image?.url || "");
  return url.replace(/%250D|%250A|%0D|%0A|\r|\n/gi, '');
}

/**
 * Returns SEO-optimised alt text.
 * Priority: image.slug (admin-entered) → fallback title
 * The slug is used directly as alt text — descriptive, keyword-rich.
 */
export function getImageAlt(image: string | PropertyImage, fallback: string): string {
  if (typeof image !== "string" && image?.slug && image.slug.trim()) {
    // Convert slug to readable alt: "beachfront-villa-pool" → "beachfront villa pool"
    return image.slug.trim().replace(/-/g, " ") + " - Alexiant Real Estate Diani";
  }
  return `${fallback} - Real Estate Property in Diani Beach Area`;
}
