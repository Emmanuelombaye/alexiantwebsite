export type JsonLd = Record<string, unknown>;

export function toJsonLdScript(json: JsonLd) {
  return {
    __html: JSON.stringify(json),
  };
}

export function buildBreadcrumbList(items: { name: string; url: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

