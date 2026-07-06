import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { analyzeStock } from '../data/stockData';
import { analyzeTraderSentiment } from '../data/traderAnalysis';
import { fetchQuote, fetchHistory } from '../lib/stockApi';
import StockChart from '../components/StockChart';
import AnalysisCard from '../components/AnalysisCard';
import TraderSentimentCard from '../components/TraderSentimentCard';
import CurrencySelector from '../components/CurrencySelector';
import { useCurrency } from '../components/CurrencyProvider';
import { useWatchlist } from '../components/Watchlist';
import type { Stock, AnalysisResult, TraderSentiment } from '../types';

export default function StockDetailPage() {
  const { symbol } = useParams<{ symbol: string }>();
  const navigate = useNavigate();
  const { isInWatchlist, add, remove } = useWatchlist();
  const { formatPrice, formatChange } = useCurrency();
  const [stock, setStock] = useState<Stock | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [traderSentiment, setTraderSentiment] = useState<TraderSentiment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!symbol) return;

    let cancelled = false;
    setLoading(true);
    setError('');

    Promise.all([
      fetchQuote(symbol),
      fetchHistory(symbol),
    ]).then(([quote, history]) => {
      if (cancelled) return;

      if (!quote) {
        setError(`Nie znaleziono spółki ${symbol}`);
        setLoading(false);
        return;
      }

      const fullStock: Stock = {
        ...quote,
        history: history.length > 0 ? history : [],
      };

      setStock(fullStock);
      setAnalysis(analyzeStock(fullStock));
      setTraderSentiment(analyzeTraderSentiment(symbol));
      setLoading(false);
    }).catch(() => {
      if (!cancelled) {
        setError('Nie udało się pobrać danych. Spróbuj ponownie.');
        setLoading(false);
      }
    });

    return () => { cancelled = true; };
  }, [symbol]);

  if (!symbol || error) {
    return (
      <div className="error-page">
        <h2>{error || 'Nie znaleziono spółki'}</h2>
        <p>{!error && 'Sprawdź, czy symbol jest poprawny.'}</p>
        <button onClick={() => navigate('/')}>Wróć do strony głównej</button>
      </div>
    );
  }

  if (loading || !stock || !analysis) {
    return (
      <div className="detail-page">
        <div className="loading-page">
          <div className="loading-spinner" />
          <p>Ładowanie danych dla {symbol}...</p>
        </div>
      </div>
    );
  }

  const watched = isInWatchlist(symbol);
  const isPositive = stock.change >= 0;

  return (
    <div className="detail-page">
      <header className="detail-header">
        <div className="detail-header-top">
          <button className="back-btn" onClick={() => navigate('/')}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Powrót
          </button>
          <CurrencySelector />
        </div>

        <div className="detail-title-section">
          <div className="detail-title-left">
            <h1>{stock.symbol}</h1>
            <span className="detail-name">{stock.name}</span>
            {stock.sector && <span className="detail-sector">{stock.sector}</span>}
          </div>
          <div className="detail-title-right">
            <div className="detail-price-section">
              <span className="detail-price">{formatPrice(stock.price)}</span>
              <span className={`detail-change ${isPositive ? 'positive' : 'negative'}`}>
                {formatChange(stock.change)} ({isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%)
              </span>
            </div>
            <button
              className={`watchlist-btn ${watched ? 'watched' : ''}`}
              onClick={() => (watched ? remove(symbol) : add(symbol))}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill={watched ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z" />
              </svg>
              {watched ? 'Obserwowane' : 'Obserwuj'}
            </button>
          </div>
        </div>
      </header>

      <main className="detail-main">
        <div className="detail-grid">
          <div className="detail-chart-section">
            <h2>Wykres ceny (ostatnie 30 dni)</h2>
            <StockChart stock={stock} />
          </div>
          <div className="detail-analysis-section">
            <AnalysisCard analysis={analysis} />
            {traderSentiment && (
              <TraderSentimentCard sentiment={traderSentiment} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
