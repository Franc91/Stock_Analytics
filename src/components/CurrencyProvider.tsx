'use client';

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { currencies, getCurrency, formatPrice, formatChange, CURRENCY_STORAGE_KEY, type CurrencyInfo } from '../lib/currency';

interface CurrencyContextValue {
  currency: CurrencyInfo;
  setCurrency: (code: string) => void;
  formatPrice: (usdPrice: number, decimals?: number) => string;
  formatChange: (changeValue: number, decimals?: number) => string;
  availableCurrencies: CurrencyInfo[];
}

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currencyCode, setCurrencyCode] = useState('USD');

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CURRENCY_STORAGE_KEY);
      if (stored && currencies.some((c) => c.code === stored)) {
        setCurrencyCode(stored);
      }
    } catch {
      // localStorage not available
    }
  }, []);

  const setCurrency = useCallback((code: string) => {
    setCurrencyCode(code);
    try {
      localStorage.setItem(CURRENCY_STORAGE_KEY, code);
    } catch {
      // localStorage not available
    }
  }, []);

  const currency = getCurrency(currencyCode);

  const value: CurrencyContextValue = {
    currency,
    setCurrency,
    formatPrice: (usdPrice: number, decimals = 2) => formatPrice(usdPrice, currency, { decimals }),
    formatChange: (changeValue: number, decimals = 2) => formatChange(changeValue, currency, decimals),
    availableCurrencies: currencies,
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency(): CurrencyContextValue {
  const ctx = useContext(CurrencyContext);
  if (!ctx) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return ctx;
}
