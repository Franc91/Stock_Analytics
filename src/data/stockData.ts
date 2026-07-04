import type { Stock, AnalysisResult } from '../types';

function generateHistory(basePrice: number, volatility: number, days: number = 30) {
  const history: { date: string; price: number }[] = [];
  let price = basePrice;
  const now = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    if (date.getDay() === 0 || date.getDay() === 6) continue; // skip weekends

    const change = (Math.random() - 0.48) * volatility * price;
    price = Math.max(price + change, price * 0.5);
    history.push({
      date: date.toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit' }),
      price: Math.round(price * 100) / 100,
    });
  }
  return history;
}

export const stocks: Stock[] = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    sector: 'Technologia',
    price: 198.50,
    change: 3.20,
    changePercent: 1.64,
    history: generateHistory(198.50, 0.025),
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    sector: 'Technologia',
    price: 425.30,
    change: -2.10,
    changePercent: -0.49,
    history: generateHistory(425.30, 0.02),
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc. (Google)',
    sector: 'Technologia',
    price: 175.80,
    change: 1.50,
    changePercent: 0.86,
    history: generateHistory(175.80, 0.022),
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    sector: 'Technologia / E-commerce',
    price: 205.40,
    change: -1.80,
    changePercent: -0.87,
    history: generateHistory(205.40, 0.028),
  },
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    sector: 'Półprzewodniki',
    price: 950.20,
    change: 15.30,
    changePercent: 1.64,
    history: generateHistory(950.20, 0.035),
  },
  {
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    sector: 'Motoryzacja / Technologia',
    price: 245.60,
    change: -5.40,
    changePercent: -2.15,
    history: generateHistory(245.60, 0.04),
  },
  {
    symbol: 'META',
    name: 'Meta Platforms Inc.',
    sector: 'Technologia / Media',
    price: 512.80,
    change: 8.20,
    changePercent: 1.62,
    history: generateHistory(512.80, 0.03),
  },
  {
    symbol: 'JPM',
    name: 'JPMorgan Chase & Co.',
    sector: 'Bankowość',
    price: 198.75,
    change: 0.85,
    changePercent: 0.43,
    history: generateHistory(198.75, 0.018),
  },
  {
    symbol: 'V',
    name: 'Visa Inc.',
    sector: 'Finanse',
    price: 275.40,
    change: -1.20,
    changePercent: -0.43,
    history: generateHistory(275.40, 0.015),
  },
  {
    symbol: 'JNJ',
    name: 'Johnson & Johnson',
    sector: 'Opieka zdrowotna',
    price: 162.30,
    change: 0.60,
    changePercent: 0.37,
    history: generateHistory(162.30, 0.012),
  },
  {
    symbol: 'WMT',
    name: 'Walmart Inc.',
    sector: 'Handel detaliczny',
    price: 178.90,
    change: 1.10,
    changePercent: 0.62,
    history: generateHistory(178.90, 0.014),
  },
  {
    symbol: 'PG',
    name: 'Procter & Gamble Co.',
    sector: 'Dobra konsumenckie',
    price: 168.50,
    change: -0.30,
    changePercent: -0.18,
    history: generateHistory(168.50, 0.01),
  },
  {
    symbol: 'XOM',
    name: 'Exxon Mobil Corporation',
    sector: 'Energia',
    price: 118.20,
    change: 2.10,
    changePercent: 1.81,
    history: generateHistory(118.20, 0.025),
  },
  {
    symbol: 'BA',
    name: 'The Boeing Company',
    sector: 'Lotnictwo / Obronność',
    price: 185.40,
    change: -3.80,
    changePercent: -2.01,
    history: generateHistory(185.40, 0.032),
  },
  {
    symbol: 'DIS',
    name: 'The Walt Disney Company',
    sector: 'Rozrywka / Media',
    price: 112.80,
    change: 1.40,
    changePercent: 1.26,
    history: generateHistory(112.80, 0.028),
  },
  {
    symbol: 'NFLX',
    name: 'Netflix Inc.',
    sector: 'Rozrywka / Streaming',
    price: 685.50,
    change: 12.30,
    changePercent: 1.83,
    history: generateHistory(685.50, 0.03),
  },
  {
    symbol: 'CRM',
    name: 'Salesforce Inc.',
    sector: 'Technologia / CRM',
    price: 298.60,
    change: -4.20,
    changePercent: -1.39,
    history: generateHistory(298.60, 0.025),
  },
  {
    symbol: 'INTC',
    name: 'Intel Corporation',
    sector: 'Półprzewodniki',
    price: 44.80,
    change: 0.90,
    changePercent: 2.05,
    history: generateHistory(44.80, 0.035),
  },
  {
    symbol: 'AMD',
    name: 'Advanced Micro Devices Inc.',
    sector: 'Półprzewodniki',
    price: 178.30,
    change: -2.70,
    changePercent: -1.49,
    history: generateHistory(178.30, 0.038),
  },
  {
    symbol: 'PYPL',
    name: 'PayPal Holdings Inc.',
    sector: 'Finanse / Technologia',
    price: 72.40,
    change: 1.50,
    changePercent: 2.11,
    history: generateHistory(72.40, 0.03),
  },
];

export function getStockBySymbol(symbol: string): Stock | undefined {
  return stocks.find((s) => s.symbol === symbol);
}

export function searchStocks(query: string): Stock[] {
  const q = query.toLowerCase();
  return stocks.filter(
    (s) =>
      s.symbol.toLowerCase().includes(q) ||
      s.name.toLowerCase().includes(q) ||
      s.sector.toLowerCase().includes(q)
  );
}

export function analyzeStock(symbol: string): AnalysisResult {
  const stock = getStockBySymbol(symbol);
  if (!stock) throw new Error(`Stock ${symbol} not found`);

  const reasons: string[] = [];
  const indicators: AnalysisResult['indicators'] = [];

  // Technical indicators based on price history
  const prices = stock.history.map((h) => h.price);
  const currentPrice = prices[prices.length - 1];

  // RSI (simplified)
  const gains: number[] = [];
  const losses: number[] = [];
  for (let i = 1; i < prices.length; i++) {
    const diff = prices[i] - prices[i - 1];
    if (diff >= 0) gains.push(diff);
    else losses.push(Math.abs(diff));
  }
  const avgGain = gains.length > 0 ? gains.reduce((a, b) => a + b, 0) / gains.length : 0;
  const avgLoss = losses.length > 0 ? losses.reduce((a, b) => a + b, 0) / losses.length : 1;
  const rs = avgGain / avgLoss;
  const rsi = 100 - 100 / (1 + rs);

  // Moving averages (simplified)
  const sma5 = prices.slice(-5).reduce((a, b) => a + b, 0) / 5;
  const sma10 = prices.slice(-10).reduce((a, b) => a + b, 0) / 10;
  const sma20 = prices.slice(-20).reduce((a, b) => a + b, 0) / 20;

  // MACD trend
  const ema12 = prices.slice(-12).reduce((a, b) => a + b, 0) / 12;
  const ema26 = prices.slice(-26).reduce((a, b) => a + b, 0) / 26;
  const macd = ema12 - ema26;

  // Volatility
  const returns: number[] = [];
  for (let i = 1; i < prices.length; i++) {
    returns.push((prices[i] - prices[i - 1]) / prices[i - 1]);
  }
  const avgReturn = returns.reduce((a, b) => a + b, 0) / returns.length;
  const variance =
    returns.reduce((a, b) => a + (b - avgReturn) ** 2, 0) / returns.length;
  const volatility = Math.sqrt(variance);

  // RSI indicator
  if (rsi < 30) {
    indicators.push({ name: 'RSI (14)', value: rsi.toFixed(1), signal: 'pozytywny' });
    reasons.push('RSI wskazuje na wyprzedanie – potencjalny moment do zakupu.');
  } else if (rsi > 70) {
    indicators.push({ name: 'RSI (14)', value: rsi.toFixed(1), signal: 'negatywny' });
    reasons.push('RSI wskazuje na wykupienie – możliwa korekta spadkowa.');
  } else {
    indicators.push({ name: 'RSI (14)', value: rsi.toFixed(1), signal: 'neutralny' });
  }

  // MACD
  if (macd > 0) {
    indicators.push({ name: 'MACD', value: macd.toFixed(2), signal: 'pozytywny' });
    reasons.push('MACD jest dodatni – trend wzrostowy.');
  } else {
    indicators.push({ name: 'MACD', value: macd.toFixed(2), signal: 'negatywny' });
    reasons.push('MACD jest ujemny – trend spadkowy.');
  }

  // SMA comparison
  if (currentPrice > sma20) {
    indicators.push({ name: 'SMA(20)', value: `$${sma20.toFixed(2)}`, signal: 'pozytywny' });
    reasons.push('Cena powyżej średniej kroczącej SMA(20) – trend wzrostowy.');
  } else {
    indicators.push({ name: 'SMA(20)', value: `$${sma20.toFixed(2)}`, signal: 'negatywny' });
    reasons.push('Cena poniżej średniej kroczącej SMA(20) – trend spadkowy.');
  }

  // Bollinger Bands (simplified)
  const stdDev = Math.sqrt(variance) * currentPrice;
  const upperBand = sma20 + 2 * stdDev;
  const lowerBand = sma20 - 2 * stdDev;
  if (currentPrice > upperBand) {
    indicators.push({ name: 'Górne pasmo Bollingera', value: `$${upperBand.toFixed(2)}`, signal: 'negatywny' });
    reasons.push('Cena powyżej górnego pasma Bollingera – możliwe wykupienie.');
  } else if (currentPrice < lowerBand) {
    indicators.push({ name: 'Dolne pasmo Bollingera', value: `$${lowerBand.toFixed(2)}`, signal: 'pozytywny' });
    reasons.push('Cena poniżej dolnego pasma Bollingera – możliwe wyprzedanie.');
  } else {
    indicators.push({ name: 'Pasmo Bollingera (środek)', value: `$${sma20.toFixed(2)}`, signal: 'neutralny' });
  }

  // Volatility
  if (volatility > 0.03) {
    indicators.push({ name: 'Zmienność', value: `${(volatility * 100).toFixed(2)}%`, signal: 'negatywny' });
    reasons.push('Wysoka zmienność – ryzyko inwestycji jest podwyższone.');
  } else if (volatility < 0.015) {
    indicators.push({ name: 'Zmienność', value: `${(volatility * 100).toFixed(2)}%`, signal: 'pozytywny' });
    reasons.push('Niska zmienność – stabilna inwestycja.');
  } else {
    indicators.push({ name: 'Zmienność', value: `${(volatility * 100).toFixed(2)}%`, signal: 'neutralny' });
  }

  // Trend strength
  const trend = currentPrice > sma5 && sma5 > sma10 && sma10 > sma20 ? 1 : -1;
  indicators.push({ name: 'Trend (krótko-terminowy)', value: trend > 0 ? 'Wzrostowy' : 'Spadkowy', signal: trend > 0 ? 'pozytywny' : 'negatywny' });

  // Calculate score
  let score = 50;

  // RSI contribution
  if (rsi < 30) score += 15;
  else if (rsi < 40) score += 8;
  else if (rsi > 70) score -= 15;
  else if (rsi > 60) score -= 8;

  // MACD contribution
  if (macd > 0) score += 10;
  else score -= 10;

  // SMA contribution
  if (currentPrice > sma20) score += 10;
  else score -= 10;

  // Bollinger contribution
  if (currentPrice < lowerBand) score += 10;
  else if (currentPrice > upperBand) score -= 10;

  // Volatility contribution
  if (volatility < 0.015) score += 5;
  else if (volatility > 0.03) score -= 5;

  // Trend contribution
  if (trend > 0) score += 10;
  else score -= 10;

  // Momentum
  const momentum = (currentPrice - prices[0]) / prices[0] * 100;
  if (momentum > 5) score += 5;
  else if (momentum < -5) score -= 5;

  // Clamp score
  score = Math.max(0, Math.min(100, score));

  let recommendation: 'Kupuj' | 'Sprzedaj' | 'Trzymaj';
  if (score >= 60) {
    recommendation = 'Kupuj';
    reasons.push('Ogólna ocena techniczna sugeruje, że to dobry moment na zakup.');
  } else if (score <= 40) {
    recommendation = 'Sprzedaj';
    reasons.push('Ogólna ocena techniczna sugeruje, że warto rozważyć sprzedaż.');
  } else {
    recommendation = 'Trzymaj';
    reasons.push('Sygnały są mieszane – zalecane jest utrzymanie pozycji.');
  }

  return {
    symbol,
    recommendation,
    score,
    reasons,
    indicators,
  };
}
