'use client';

import StockSearch from '../src/components/StockSearch';
import CurrencySelector from '../src/components/CurrencySelector';
import WatchlistPanel, { useWatchlist } from '../src/components/Watchlist';

export default function HomePage() {
  const { watchlist, remove } = useWatchlist();

  return (
    <div className="home-page">
      <header className="home-header">
        <div className="header-content">
          <div className="header-top">
            <div className="logo-section">
              <div className="logo-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
              <div>
                <h1>Analizator Akcji</h1>
                <p className="subtitle">Inteligentna analiza techniczna i rekomendacje inwestycyjne</p>
              </div>
            </div>
            <div className="header-top-right">
              <div className="header-stats">
                <div className="stat">
                  <span className="stat-value">20</span>
                  <span className="stat-label">Obserwowane spółki</span>
                </div>
                <div className="stat">
                  <span className="stat-value">Technologia</span>
                  <span className="stat-label">Najliczniejszy sektor</span>
                </div>
              </div>
              <CurrencySelector />
            </div>
          </div>
          <StockSearch />
        </div>
      </header>

      <main className="home-main">
        <section className="watchlist-section">
          <div className="section-header">
            <h2>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
              Obserwowane spółki
            </h2>
            <span className="section-count">{watchlist.length} spółek</span>
          </div>
          <WatchlistPanel watchlist={watchlist} onRemove={remove} />
        </section>

        <section className="info-section">
          <div className="info-card">
            <div className="info-icon" style={{ backgroundColor: 'rgba(34,197,94,0.15)', color: '#22c55e' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <h3>Jak to działa?</h3>
            <p>Analizujemy dane techniczne każdej spółki: RSI, MACD, średnie kroczące, pasma Bollingera i zmienność, aby wygenerować rekomendację.</p>
          </div>
          <div className="info-card">
            <div className="info-icon" style={{ backgroundColor: 'rgba(59,130,246,0.15)', color: '#3b82f6' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
            </div>
            <h3>Kiedy aktualizować?</h3>
            <p>Sprawdzaj analizę codziennie przed otwarciem sesji, aby być na bieżąco z aktualnymi sygnałami i zmianami trendów.</p>
          </div>
          <div className="info-card">
            <div className="info-icon" style={{ backgroundColor: 'rgba(245,158,11,0.15)', color: '#f59e0b' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h3>Zastrzeżenie</h3>
            <p>Aplikacja służy wyłącznie do celów edukacyjnych. Nie jest to porada inwestycyjna. Przed podjęciem decyzji skonsultuj się z doradcą finansowym.</p>
          </div>
        </section>
      </main>
    </div>
  );
}
