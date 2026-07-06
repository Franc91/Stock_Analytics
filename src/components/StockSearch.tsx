import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchStocks } from '../lib/stockApi';
import type { Stock } from '../types';

export default function StockSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Stock[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
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
      setError('');
      setShowDropdown(false);
      return;
    }

    const timer = setTimeout(async () => {
      const { stocks, error: err } = await searchStocks(query);
      setResults(stocks);
      setError(err || '');
      setShowDropdown(stocks.length > 0);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelect = (symbol: string) => {
    setQuery('');
    setShowDropdown(false);
    navigate(`/stock/${symbol}`);
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
      {error && (
        <div className="search-error">{error}</div>
      )}
      {!error && showDropdown && results.length > 0 && (
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
