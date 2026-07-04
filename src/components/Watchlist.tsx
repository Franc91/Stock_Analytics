'use client';

import { useEffect, useState } from 'react';
import { fetchQuotesForWatchlist } from '../lib/stockApi';
import StockCard from './StockCard';
import type { Stock } from '../types';

const WATCHLIST_KEY = 'stock-watchlist';

function getWatchlist(): string[] {
  try {
    const stored = localStorage.getItem(WATCHLIST_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveWatchlist(symbols: string[]) {
  localStorage.setItem(WATCHLIST_KEY, JSON.stringify(symbols));
}

export function useWatchlist() {
  const [watchlist, setWatchlist] = useState<string[]>(() => getWatchlist());

  useEffect(() => {
    saveWatchlist(watchlist);
  }, [watchlist]);

  const add = (symbol: string) => {
    setWatchlist((prev) => (prev.includes(symbol) ? prev : [...prev, symbol]));
  };

  const remove = (symbol: string) => {
    setWatchlist((prev) => prev.filter((s) => s !== symbol));
  };

  const isInWatchlist = (symbol: string) => watchlist.includes(symbol);

  return { watchlist, add, remove, isInWatchlist };
}

export default function WatchlistPanel({ watchlist, onRemove }: { watchlist: string[]; onRemove: (s: string) => void }) {
  const [stockList, setStockList] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (watchlist.length === 0) {
      setStockList([]);
      return;
    }

    let cancelled = false;
    setLoading(true);

    fetchQuotesForWatchlist(watchlist).then((results) => {
      if (!cancelled) {
        setStockList(results);
        setLoading(false);
      }
    });

    return () => { cancelled = true; };
  }, [watchlist]);

  if (stockList.length === 0) {
    return (
      <div className="watchlist-empty">
        <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#4a5568" strokeWidth="1.5">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
        <h3>Twoja lista obserwowanych jest pusta</h3>
        <p>Wyszukaj spółki powyżej i dodaj je do obserwowanych, aby śledzić ich wyniki.</p>
      </div>
    );
  }

  return (
    <div className="watchlist-grid">
      {stockList.map((stock) => (
        <StockCard key={stock.symbol} stock={stock} onRemove={() => onRemove(stock.symbol)} />
      ))}
    </div>
  );
}
