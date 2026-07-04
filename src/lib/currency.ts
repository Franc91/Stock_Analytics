export interface CurrencyInfo {
  code: string;
  symbol: string;
  name: string;
  flag: string;
  rate: number; // multiplier from USD
}

export const currencies: CurrencyInfo[] = [
  { code: 'USD', symbol: '$', name: 'Dolar amerykański', flag: '🇺🇸', rate: 1 },
  { code: 'PLN', symbol: 'zł', name: 'Złoty polski', flag: '🇵🇱', rate: 4.05 },
  { code: 'EUR', symbol: '€', name: 'Euro', flag: '🇪🇺', rate: 0.92 },
  { code: 'GBP', symbol: '£', name: 'Funt szterling', flag: '🇬🇧', rate: 0.79 },
  { code: 'CHF', symbol: 'Fr', name: 'Frank szwajcarski', flag: '🇨🇭', rate: 0.89 },
  { code: 'JPY', symbol: '¥', name: 'Jen japoński', flag: '🇯🇵', rate: 157.0 },
  { code: 'CAD', symbol: 'C$', name: 'Dolar kanadyjski', flag: '🇨🇦', rate: 1.37 },
  { code: 'AUD', symbol: 'A$', name: 'Dolar australijski', flag: '🇦🇺', rate: 1.52 },
  { code: 'NOK', symbol: 'kr', name: 'Korona norweska', flag: '🇳🇴', rate: 10.65 },
  { code: 'SEK', symbol: 'kr', name: 'Korona szwedzka', flag: '🇸🇪', rate: 10.50 },
];

export function getCurrency(code: string): CurrencyInfo {
  return currencies.find((c) => c.code === code) || currencies[0];
}

export function convertPrice(usdPrice: number, targetCurrency: CurrencyInfo): number {
  return usdPrice * targetCurrency.rate;
}

export function formatPrice(
  usdPrice: number,
  currency: CurrencyInfo,
  options?: { decimals?: number; showSymbol?: boolean }
): string {
  const { decimals = 2, showSymbol = true } = options || {};
  const converted = convertPrice(usdPrice, currency);

  if (currency.code === 'JPY') {
    // JPY doesn't use decimals
    return showSymbol ? `${currency.symbol}${Math.round(converted).toLocaleString()}` : Math.round(converted).toLocaleString();
  }

  const formatted = converted.toFixed(decimals);

  if (currency.code === 'PLN') {
    // PLN format: 1 234,56 zł
    return showSymbol
      ? `${Number(formatted).toLocaleString('pl-PL', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })} ${currency.symbol}`
      : Number(formatted).toLocaleString('pl-PL', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  }

  if (currency.code === 'EUR' || currency.code === 'GBP') {
    // EUR: 1 234,56 € (use locale)
    return showSymbol
      ? `${Number(formatted).toLocaleString('de-DE', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })} ${currency.symbol}`
      : Number(formatted).toLocaleString('de-DE', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  }

  // Default USD style: $1,234.56
  return showSymbol
    ? `${currency.symbol}${Number(formatted).toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}`
    : Number(formatted).toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

export function formatChange(
  changeValue: number,
  currency: CurrencyInfo,
  decimals = 2
): string {
  const converted = convertPrice(changeValue, currency);
  const sign = changeValue >= 0 ? '+' : '';
  const formatted = converted.toFixed(decimals);

  if (currency.code === 'PLN') {
    return `${sign}${Number(formatted).toLocaleString('pl-PL', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })} ${currency.symbol}`;
  }
  if (currency.code === 'EUR' || currency.code === 'GBP') {
    return `${sign}${Number(formatted).toLocaleString('de-DE', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })} ${currency.symbol}`;
  }
  return `${sign}${currency.symbol}${Number(formatted).toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}`;
}

export const CURRENCY_STORAGE_KEY = 'preferred-currency';
