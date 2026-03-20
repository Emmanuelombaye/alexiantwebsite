import type { PropertyImage } from "@/types/property";

export function getImageUrl(image: string | PropertyImage): string {
  if (typeof image === "string") {
    return image;
  }
  return image.url;
}

export function getImageAlt(image: string | PropertyImage, fallback: string): string {
  const baseAlt = typeof image === "string" ? fallback : (image.slug || fallback);
  return `${baseAlt} - Real Estate Property in Diani Beach Area`;
}
