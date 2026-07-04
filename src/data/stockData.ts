import type { Stock, AnalysisResult } from '../types';

export function analyzeStock(stock: Stock): AnalysisResult {
  const symbol = stock.symbol;

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
