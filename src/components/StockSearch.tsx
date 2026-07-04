'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { searchStocks } from '../lib/stockApi';
import type { Stock } from '../types';

export default function StockSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Stock[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.length < 1) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    const timer = setTimeout(async () => {
      const res = await searchStocks(query);
      setResults(res);
      setShowDropdown(res.length > 0);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelect = (symbol: string) => {
    setQuery('');
    setShowDropdown(false);
    router.push(`/stock/${symbol}`);
  };

  return (
    <div className="stock-search" ref={wrapperRef}>
      <div className="search-input-wrapper">
        <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
        <input
          type="text"
          placeholder="Wyszukaj spółkę (np. Apple, MSFT, Tesla)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => { if (results.length > 0) setShowDropdown(true); }}
        />
      </div>
      {showDropdown && results.length > 0 && (
        <ul className="search-results">
          {results.map((stock) => (
            <li key={stock.symbol} onClick={() => handleSelect(stock.symbol)}>
              <div className="result-left">
                <span className="result-symbol">{stock.symbol}</span>
                <span className="result-name">{stock.name}</span>
              </div>
              <div className="result-right">
                <span className="result-sector">{stock.sector}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
