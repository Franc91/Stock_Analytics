import type { Stock } from '../types';

const API_BASE = '/api';

export async function searchStocks(query: string): Promise<Stock[]> {
  if (!query || query.length < 1) return [];

  try {
    const res = await fetch(`${API_BASE}/search?q=${encodeURIComponent(query)}`, {
      signal: AbortSignal.timeout(5000),
    });

    if (!res.ok) return [];

    const data = await res.json();
    return data.results || [];
  } catch {
    return [];
  }
}

export async function fetchQuote(symbol: string): Promise<Stock | null> {
  try {
    const res = await fetch(`${API_BASE}/quote?symbol=${encodeURIComponent(symbol)}`, {
      signal: AbortSignal.timeout(5000),
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data.stock || null;
  } catch {
    return null;
  }
}

export async function fetchHistory(symbol: string): Promise<{ date: string; price: number }[]> {
  try {
    const res = await fetch(`${API_BASE}/history?symbol=${encodeURIComponent(symbol)}`, {
      signal: AbortSignal.timeout(5000),
    });

    if (!res.ok) return [];

    const data = await res.json();
    return data.history || [];
  } catch {
    return [];
  }
}

export async function fetchQuotesForWatchlist(symbols: string[]): Promise<Stock[]> {
  const results = await Promise.allSettled(
    symbols.map((s) => fetchQuote(s))
  );

  return results
    .filter((r) => r.status === 'fulfilled' && r.value !== null)
    .map((r) => (r as PromiseFulfilledResult<Stock>).value);
}
