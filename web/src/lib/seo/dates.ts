export function toIsoDate(value: string) {
  // Accepts:
  // - "March 10, 2026"
  // - ISO strings
  // Falls back to "now" if parsing fails to avoid invalid JSON-LD.
  const parsed = new Date(value);
  if (!Number.isNaN(parsed.getTime())) {
    return parsed.toISOString();
  }
  return new Date().toISOString();
}

export function toDate(value: string) {
  const parsed = new Date(value);
  if (!Number.isNaN(parsed.getTime())) return parsed;
  return new Date();
}

