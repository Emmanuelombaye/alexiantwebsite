export function formatKes(amount: number, currency: string = "KES") {
  const formatted = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(amount);
  
  if (currency === "USD") return `$${formatted}`;
  if (currency === "EUR") return `€${formatted}`;
  if (currency === "GBP") return `£${formatted}`;
  if (currency === "AED") return `AED ${formatted}`;
  return `KES ${formatted}`;
}

export function formatPropertyPrice(amount: number, suffix?: string | null, forceCurrency?: string) {
  let currency = forceCurrency || "KES";
  let displaySuffix = suffix || "";

  if (suffix && suffix.includes("|")) {
    const parts = suffix.split("|");
    if (!forceCurrency) currency = parts[0] || "KES";
    displaySuffix = parts[1] || "";
  }

  return displaySuffix ? `${formatKes(amount, currency)} ${displaySuffix}` : formatKes(amount, currency);
}

export function titleCase(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}