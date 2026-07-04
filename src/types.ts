export interface Stock {
  symbol: string;
  name: string;
  sector: string;
  price: number;
  change: number;
  changePercent: number;
  history: { date: string; price: number }[];
}

export interface AnalysisResult {
  symbol: string;
  recommendation: 'Kupuj' | 'Sprzedaj' | 'Trzymaj';
  score: number; // 0-100
  reasons: string[];
  indicators: {
    name: string;
    value: string;
    signal: 'pozytywny' | 'negatywny' | 'neutralny';
  }[];
}

export interface WatchlistItem {
  symbol: string;
  addedAt: string;
}

// --- Trader Sentiment Types ---

export interface Trader {
  id: string;
  name: string;
  title: string;
  country: 'PL' | 'US' | 'OTHER';
  imageName: string; // initials or emoji placeholder
  style: 'value' | 'growth' | 'contrarian' | 'momentum' | 'macro';
  description: string;
}

export interface TraderPosition {
  traderId: string;
  symbol: string;
  action: 'buy' | 'sell' | 'hold' | 'increase' | 'reduce';
  amount: number; // approximate position value in $
  entryPrice?: number;
  date: string; // ISO date
  conviction: 'low' | 'medium' | 'high';
  note?: string;
}

export interface TraderSentiment {
  symbol: string;
  totalTradersTracking: number;
  bullishCount: number;
  bearishCount: number;
  netScore: number; // -100 to +100
  topTraders: {
    trader: Trader;
    position: TraderPosition;
  }[];
  consensus: 'strong_buy' | 'buy' | 'neutral' | 'sell' | 'strong_sell';
  notableMoves: string[];
}
