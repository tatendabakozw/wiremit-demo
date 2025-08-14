export function toCents(input: string): number {
  const n = Number(input);
  if (!Number.isFinite(n)) return 0;
  return Math.ceil(n * 100);
}

export function centsToDisplay(cents: number) {
  return (cents / 100).toFixed(2);
}

export function calcFeeCents(amountCents: number, feeBps: number): number {
  return Math.ceil((amountCents * feeBps) / 10000);
}

export function convertCentsUSDTo(usdCents: number, fxRate: number): number {
  const major = (usdCents / 100) * fxRate;
  return Math.ceil(major * 100);
}