import type { PropertyImage } from "@/types/property";

export function getImageUrl(image: string | PropertyImage): string {
  const url = typeof image === "string" ? image : (image?.url || "");
  // Sanitize the URL: Strips raw and URL-encoded newlines (\r\n) accidentally stored in DB
  // This prevents Next.js image optimizer 400 Bad Request errors.
  return url.replace(/%250D|%250A|%0D|%0A|\r|\n/gi, '');
}

export function getImageAlt(image: string | PropertyImage, fallback: string): string {
  const baseAlt = typeof image === "string" ? fallback : (image.slug || fallback);
  return `${baseAlt} - Real Estate Property in Diani Beach Area`;
}
