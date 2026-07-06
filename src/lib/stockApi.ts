import type { Stock } from '../types';

// Yahoo Finance API przez darmowe proxy CORS (Yahoo blokuje bezpośrednie zapytania)
const CORS_PROXY = 'https://api.allorigins.win/raw?url=';

function yahooFetch(path: string): Promise<Response> {
  return fetch(CORS_PROXY + encodeURIComponent(path), {
    signal: AbortSignal.timeout(8000),
  });
}

export async function searchStocks(query: string): Promise<Stock[]> {
  if (!query || query.length < 1) return [];

  try {
    const url = `https://query1.finance.yahoo.com/v1/finance/search?q=${encodeURIComponent(query)}&lang=pl-PL&region=PL`;
    const res = await yahooFetch(url);
    if (!res.ok) return [];
    const data = await res.json();
    return (data.quotes || [])
      .filter((q: any) => q.quoteType === 'EQUITY' || q.quoteType === 'ETF')
      .slice(0, 10)
      .map((q: any) => ({
        symbol: q.symbol,
        name: q.longname || q.shortname || q.symbol,
        sector: q.sector || q.exchDisp || 'Giełda',
        price: 0,
        change: 0,
        changePercent: 0,
        history: [],
      }));
  } catch {
    return [];
  }
}

export async function fetchQuote(symbol: string): Promise<Stock | null> {
  try {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?range=1mo&interval=1d`;
    const res = await yahooFetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    const result = data?.chart?.result?.[0];
    if (!result) return null;
    const meta = result.meta;
    const price = meta.regularMarketPrice ?? 0;
    const prevClose = meta.regularMarketPreviousClose ?? price;
    const change = meta.regularMarketChange ?? (price - prevClose);
    const changePercent = meta.regularMarketChangePercent ?? (prevClose > 0 ? (change / prevClose) * 100 : 0);
    return {
      symbol: meta.symbol, name: meta.longName || meta.shortName || meta.symbol,
      sector: '', price: Math.round(price * 100) / 100,
      change: Math.round(change * 100) / 100, changePercent: Math.round(changePercent * 100) / 100,
      history: [],
    };
  } catch { return null; }
}

export async function fetchHistory(symbol: string): Promise<{ date: string; price: number }[]> {
  try {
    const now = Math.floor(Date.now() / 1000);
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?period1=${now - 45 * 24 * 60 * 60}&period2=${now}&interval=1d`;
    const res = await yahooFetch(url);
    if (!res.ok) return [];
    const data = await res.json();
    const result = data?.chart?.result?.[0];
    if (!result) return [];
    const timestamps: number[] = result.timestamp || [];
    const closes = result.indicators?.quote?.[0]?.close || [];
    return timestamps
      .map((ts: number, i: number) => ({
        date: new Date(ts * 1000).toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit' }),
        price: closes[i] ? Math.round(closes[i] * 100) / 100 : 0,
      }))
      .filter((h) => h.price > 0);
  } catch { return []; }
}

export async function fetchQuotesForWatchlist(symbols: string[]): Promise<Stock[]> {
  const results = await Promise.allSettled(symbols.map((s) => fetchQuote(s)));
  return results
    .filter((r) => r.status === 'fulfilled' && r.value !== null)
    .map((r) => (r as PromiseFulfilledResult<Stock>).value);
}
