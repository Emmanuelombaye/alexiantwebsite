export function formatKes(amount: number) {
  const formatted = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(amount);
  return `KES ${formatted}`;
}

export function formatPropertyPrice(amount: number, suffix?: string) {
  return suffix ? `${formatKes(amount)} ${suffix}` : formatKes(amount);
}

export function titleCase(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}