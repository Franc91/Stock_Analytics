import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchStocks } from '../data/stockData';
import type { Stock } from '../types';

export default function StockSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Stock[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
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

  const handleChange = (value: string) => {
    setQuery(value);
    if (value.length >= 1) {
      setResults(searchStocks(value));
      setShowDropdown(true);
    } else {
      setResults([]);
      setShowDropdown(false);
    }
  };

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
          onChange={(e) => handleChange(e.target.value)}
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
                <span className="result-price">${stock.price.toFixed(2)}</span>
                <span className={`result-change ${stock.change >= 0 ? 'positive' : 'negative'}`}>
                  {stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
