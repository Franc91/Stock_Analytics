'use client';

import { useParams, useRouter } from 'next/navigation';
import { getStockBySymbol, analyzeStock } from '../../../src/data/stockData';
import StockChart from '../../../src/components/StockChart';
import AnalysisCard from '../../../src/components/AnalysisCard';
import { useWatchlist } from '../../../src/components/Watchlist';

export default function StockDetailPage() {
  const { symbol } = useParams<{ symbol: string }>();
  const router = useRouter();
  const { isInWatchlist, add, remove } = useWatchlist();

  if (!symbol) {
    return (
      <div className="error-page">
        <h2>Nie znaleziono spółki</h2>
        <button onClick={() => router.push('/')}>Wróć do strony głównej</button>
      </div>
    );
  }

  const stock = getStockBySymbol(symbol);
  if (!stock) {
    return (
      <div className="error-page">
        <h2>Nie znaleziono spółki {symbol}</h2>
        <p>Sprawdź, czy symbol jest poprawny.</p>
        <button onClick={() => router.push('/')}>Wróć do strony głównej</button>
      </div>
    );
  }

  const analysis = analyzeStock(symbol);
  const watched = isInWatchlist(symbol);

  const isPositive = stock.change >= 0;

  return (
    <div className="detail-page">
      <header className="detail-header">
        <button className="back-btn" onClick={() => router.push('/')}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Powrót
        </button>

        <div className="detail-title-section">
          <div className="detail-title-left">
            <h1>{stock.symbol}</h1>
            <span className="detail-name">{stock.name}</span>
            <span className="detail-sector">{stock.sector}</span>
          </div>
          <div className="detail-title-right">
            <div className="detail-price-section">
              <span className="detail-price">${stock.price.toFixed(2)}</span>
              <span className={`detail-change ${isPositive ? 'positive' : 'negative'}`}>
                {isPositive ? '+' : ''}{stock.change.toFixed(2)} ({isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%)
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
          </div>
        </div>
      </main>
    </div>
  );
}
