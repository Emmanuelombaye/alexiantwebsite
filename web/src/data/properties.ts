import type { Property } from "@/types/property";

export const properties: Property[] = [];

export function getFeaturedProperties() {
  return properties.filter((property) => property.featured);
}

export function getPropertyBySlug(slug: string) {
  return properties.find((property) => property.slug === slug);
}
