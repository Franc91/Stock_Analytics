'use client';

import { useState, useRef, useEffect } from 'react';
import { useCurrency } from './CurrencyProvider';

export default function CurrencySelector() {
  const { currency, setCurrency, availableCurrencies } = useCurrency();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="currency-selector" ref={ref}>
      <button
        className="currency-selector-trigger"
        onClick={() => setOpen((p) => !p)}
        title="Zmień walutę"
      >
        <span className="currency-trigger-flag">{currency.flag}</span>
        <span className="currency-trigger-code">{currency.code}</span>
        <svg
          className={`currency-chevron ${open ? 'open' : ''}`}
          viewBox="0 0 24 24"
          width="14"
          height="14"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div className="currency-dropdown">
          <div className="currency-dropdown-header">Wybierz walutę</div>
          {availableCurrencies.map((c) => (
            <button
              key={c.code}
              className={`currency-option ${c.code === currency.code ? 'active' : ''}`}
              onClick={() => {
                setCurrency(c.code);
                setOpen(false);
              }}
            >
              <span className="currency-option-flag">{c.flag}</span>
              <div className="currency-option-info">
                <span className="currency-option-code">{c.code}</span>
                <span className="currency-option-name">{c.name}</span>
              </div>
              <span className="currency-option-symbol">{c.symbol}</span>
              {c.code === currency.code && (
                <svg className="currency-check" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
