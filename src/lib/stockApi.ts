import type { Stock } from '../types';

// ── API 1: Finnhub.io (US stocks - real-time) ──────────
// Rejestracja: https://finnhub.io/register
// Limit: 3000 zapytań/dzień, 60/min, wspiera CORS
// Działa dla: US stocków w czasie rzeczywistym
// ── API 2: Alpha Vantage (global stocks - fallback) ────
// Rejestracja: https://www.alphavantage.co/support/#api-key
// Limit: 5 zapytań/min, 500/dzień, wspiera CORS

const FINNHUB_BASE = 'https://finnhub.io/api/v1';
const ALPHA_BASE = 'https://www.alphavantage.co';

function getFinnhubKey(): string {
  return import.meta.env.VITE_FINNHUB_API_KEY || '';
}

function getAlphaKey(): string {
  return import.meta.env.VITE_ALPHA_VANTAGE_KEY || '';
}

function finnhubFetch(path: string): Promise<Response> {
  const apiKey = getFinnhubKey();
  if (!apiKey) {
    return Promise.reject(
      new Error('Brak klucza API Finnhub. Dodaj VITE_FINNHUB_API_KEY do pliku .env')
    );
  }
  const separator = path.includes('?') ? '&' : '?';
  return fetch(`${FINNHUB_BASE}${path}${separator}token=${apiKey}`, {
    signal: AbortSignal.timeout(6000),
  });
}

function alphaFetch(path: string): Promise<Response> {
  const apiKey = getAlphaKey();
  if (!apiKey) return Promise.reject(new Error('Brak klucza Alpha Vantage'));
  return fetch(`${ALPHA_BASE}${path}&apikey=${apiKey}`, {
    signal: AbortSignal.timeout(8000),
  });
}

// ── Wyszukiwanie spółek (Finnhub) ──────────────────────
export async function searchStocks(
  query: string
): Promise<{ stocks: Stock[]; error?: string }> {
  if (!query || query.length < 1) return { stocks: [] };

  try {
    const res = await finnhubFetch(`/search?q=${encodeURIComponent(query)}`);
    if (!res.ok) return { stocks: [], error: 'Błąd serwera Finnhub. Spróbuj ponownie.' };
    const data = await res.json();
    const stocks = (data.result || [])
      .filter((r: any) => r.type === 'Common Stock' || r.type === 'ETF' || r.type === 'REIT')
      .slice(0, 10)
      .map((r: any) => ({
        symbol: r.symbol,
        name: r.description || r.displaySymbol || r.symbol,
        sector: r.type || 'Giełda',
        price: 0,
        change: 0,
        changePercent: 0,
        history: [],
      }));
    return { stocks };
  } catch (err: any) {
    if (err?.message?.includes('Brak klucza API Finnhub')) {
      return {
        stocks: [],
        error: '🔑 Brak klucza API Finnhub. Utwórz plik .env z VITE_FINNHUB_API_KEY (zobacz .env.example).',
      };
    }
    return { stocks: [], error: 'Nie udało się połączyć z API. Sprawdź internet.' };
  }
}

// ── Symulacja notowań (gdy żadne API nie ma danych dla danej giełdy) ──
function generateSimulatedQuote(symbol: string): Stock {
  // Generujemy realistyczną cenę w zakresie 10-500 PLN
  // używając symbolu jako ziarna, żeby ta sama spółka miała tę samą cenę
  let seed = 0;
  for (let i = 0; i < symbol.length; i++) seed += symbol.charCodeAt(i);
  const basePrice = 10 + (seed % 490); // 10-499
  const change = Math.round((Math.random() - 0.5) * 8 * 100) / 100; // -4..+4
  const changePercent = basePrice > 0
    ? Math.round((change / basePrice) * 10000) / 100
    : 0;

  return {
    symbol,
    name: '',
    sector: '',
    price: basePrice + change,
    change,
    changePercent,
    history: [],
  };
}

// ── Notowania (bieżąca cena, zmiana) ────────────────────
// Próba 1: Finnhub → próba 2: Alpha Vantage → symulacja
export async function fetchQuote(symbol: string): Promise<Stock | null> {
  // Próba 1: Finnhub
  const finnhubResult = await fetchQuoteFinnhub(symbol);
  if (finnhubResult) return finnhubResult;

  // Próba 2: Alpha Vantage
  const alphaResult = await fetchQuoteAlpha(symbol);
  if (alphaResult) return alphaResult;

  // Próba 3: symulacja (dla giełd nieobsługiwanych przez darmowe API, np. GPW)
  return generateSimulatedQuote(symbol);
}

async function fetchQuoteFinnhub(symbol: string): Promise<Stock | null> {
  try {
    const res = await finnhubFetch(`/quote?symbol=${encodeURIComponent(symbol)}`);
    if (!res.ok) return null;
    const data = await res.json();
    if (data.error) return null;
    const price = data.c ?? 0;
    const change = data.d ?? 0;
    const changePercent = data.dp ?? 0;
    if (price === 0 && change === 0) return null;
    return {
      symbol,
      name: '',
      sector: '',
      price: Math.round(price * 100) / 100,
      change: Math.round(change * 100) / 100,
      changePercent: Math.round(changePercent * 100) / 100,
      history: [],
    };
  } catch {
    return null;
  }
}

async function fetchQuoteAlpha(symbol: string): Promise<Stock | null> {
  try {
    if (!getAlphaKey()) return null;
    const res = await alphaFetch(`/query?function=GLOBAL_QUOTE&symbol=${encodeURIComponent(symbol)}`);
    if (!res.ok) return null;
    const data = await res.json();
    const q = data?.['Global Quote'];
    if (!q || !q['05. price']) return null;
    const price = parseFloat(q['05. price']);
    const change = parseFloat(q['09. change'] || '0');
    const changePercent = parseFloat((q['10. change percent'] || '0%').replace('%', ''));
    if (price === 0) return null;
    return {
      symbol,
      name: '',
      sector: '',
      price: Math.round(price * 100) / 100,
      change: Math.round(change * 100) / 100,
      changePercent: Math.round(changePercent * 100) / 100,
      history: [],
    };
  } catch {
    return null;
  }
}

// ── Symulacja historii cen (gdy API nie udostępnia świec) ──
function generateSimulatedHistory(
  currentPrice: number,
  days: number
): { date: string; price: number }[] {
  const today = new Date();
  const prices: number[] = [];
  let price = currentPrice;

  // Generujemy od najstarszej do najnowszej
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    // Pomijamy weekendy (sobota=6, niedziela=0)
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) continue;

    // Losowa zmiana: -3% do +3%, z lekkim dryfem
    const change = (Math.random() - 0.48) * 0.06;
    const prevPrice = price / (1 + change);
    prices.push(prevPrice);
  }
  prices.push(currentPrice);

  // Przeskalowanie, żeby ostatnia cena = currentPrice
  const result: { date: string; price: number }[] = [];
  let dayIndex = 0;

  for (let i = days; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    if (date.getDay() === 0 || date.getDay() === 6) continue;

    result.push({
      date: date.toLocaleDateString('pl-PL', {
        day: '2-digit',
        month: '2-digit',
      }),
      price: Math.round(prices[dayIndex] * 100) / 100,
    });
    dayIndex++;
  }

  return result;
}

// ── Historia cen (świece dzienne, ~45 dni wstecz) ─────
// Próbuje: 1) Finnhub candle → 2) Alpha Vantage → 3) symulacja
export async function fetchHistory(
  symbol: string,
  currentPrice?: number
): Promise<{ date: string; price: number }[]> {
  // Próba 1: Finnhub candle (US stocks)
  const finnhubHistory = await fetchHistoryFinnhub(symbol);
  if (finnhubHistory.length > 0) return finnhubHistory;

  // Próba 2: Alpha Vantage (global stocks)
  const alphaHistory = await fetchHistoryAlpha(symbol);
  if (alphaHistory.length > 0) return alphaHistory;

  // Próba 3: symulowana historia
  if (currentPrice && currentPrice > 0) {
    return generateSimulatedHistory(currentPrice, 45);
  }
  return [];
}

async function fetchHistoryFinnhub(symbol: string): Promise<{ date: string; price: number }[]> {
  try {
    const now = Math.floor(Date.now() / 1000);
    const from = now - 45 * 24 * 60 * 60;
    const res = await finnhubFetch(
      `/stock/candle?symbol=${encodeURIComponent(symbol)}&resolution=D&from=${from}&to=${now}`
    );
    if (!res.ok) return [];
    const data = await res.json();
    if (data.s !== 'ok' || !data.c?.length) return [];
    const timestamps: number[] = data.t || [];
    const closes: number[] = data.c || [];
    return timestamps
      .map((ts: number, i: number) => ({
        date: new Date(ts * 1000).toLocaleDateString('pl-PL', {
          day: '2-digit',
          month: '2-digit',
        }),
        price: closes[i] ? Math.round(closes[i] * 100) / 100 : 0,
      }))
      .filter((h) => h.price > 0);
  } catch {
    return [];
  }
}

async function fetchHistoryAlpha(symbol: string): Promise<{ date: string; price: number }[]> {
  try {
    if (!getAlphaKey()) return [];
    const res = await alphaFetch(
      `/query?function=TIME_SERIES_DAILY&symbol=${encodeURIComponent(symbol)}&outputsize=compact`
    );
    if (!res.ok) return [];
    const data = await res.json();
    const series = data?.['Time Series (Daily)'];
    if (!series) return [];

    const entries = Object.entries(series) as [string, any][];
    entries.sort(([a], [b]) => a.localeCompare(b)); // od najstarszej

    return entries
      .slice(-45)
      .map(([dateStr, vals]) => ({
        date: new Date(dateStr).toLocaleDateString('pl-PL', {
          day: '2-digit',
          month: '2-digit',
        }),
        price: Math.round(parseFloat(vals['4. close']) * 100) / 100,
      }))
      .filter((h) => h.price > 0);
  } catch {
    return [];
  }
}

// ── Zbiorcze notowania dla watchlisty ───────────────────
export async function fetchQuotesForWatchlist(symbols: string[]): Promise<Stock[]> {
  const results = await Promise.allSettled(symbols.map((s) => fetchQuote(s)));
  return results
    .filter((r) => r.status === 'fulfilled' && r.value !== null)
    .map((r) => (r as PromiseFulfilledResult<Stock>).value);
}
