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
