export type PropertyFilterState = {
  query?: string | string[];
  category?: string | string[];
  status?: string | string[];
  type?: string | string[];
};

const validCategories = new Set(["sale", "rent"]);
const validStatuses = new Set(["available", "sold", "rented"]);

export function normalizePropertyFilters(filters: PropertyFilterState) {
  const rawQuery = Array.isArray(filters.query) ? filters.query[0] : filters.query;
  const rawCategory = Array.isArray(filters.category) ? filters.category[0] : filters.category;
  const rawStatus = Array.isArray(filters.status) ? filters.status[0] : filters.status;
  const rawType = Array.isArray(filters.type) ? filters.type[0] : filters.type;

  const query = (rawQuery ?? "").trim();
  const category = validCategories.has(rawCategory ?? "") ? (rawCategory ?? "") : "";
  const status = validStatuses.has(rawStatus ?? "") ? (rawStatus ?? "") : "";
  const type = (rawType ?? "").trim();

  return { query, category, status, type };
}

export function countActivePropertyFilters(filters: PropertyFilterState) {
  const normalizedFilters = normalizePropertyFilters(filters);

  return [normalizedFilters.query, normalizedFilters.category, normalizedFilters.status, normalizedFilters.type].filter(Boolean).length;
}

export function getPropertyFilterBadges(filters: PropertyFilterState) {
  const normalizedFilters = normalizePropertyFilters(filters);
  const badges: string[] = [];

  if (normalizedFilters.query) {
    badges.push(`Keyword: ${normalizedFilters.query}`);
  }

  if (normalizedFilters.category) {
    badges.push(normalizedFilters.category === "sale" ? "For sale" : "For rent");
  }

  if (normalizedFilters.status) {
    badges.push(normalizedFilters.status.charAt(0).toUpperCase() + normalizedFilters.status.slice(1));
  }

  return badges;
}

export function buildPropertiesHref(filters: PropertyFilterState) {
  const normalizedFilters = normalizePropertyFilters(filters);
  const params = new URLSearchParams();

  if (normalizedFilters.query) {
    params.set("q", normalizedFilters.query);
  }

  if (normalizedFilters.category) {
    params.set("category", normalizedFilters.category);
  }

  if (normalizedFilters.status) {
    params.set("status", normalizedFilters.status);
  }

  if (normalizedFilters.type) {
    params.set("type", normalizedFilters.type);
  }

  const queryString = params.toString();

  return queryString ? `/properties?${queryString}` : "/properties";
}