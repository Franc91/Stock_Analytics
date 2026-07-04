import type { TraderSentiment } from '../types';

interface Props {
  sentiment: TraderSentiment;
}

const consensusLabels: Record<string, string> = {
  strong_buy: 'Silny sygnał kupna',
  buy: 'Sygnał kupna',
  neutral: 'Neutralny',
  sell: 'Sygnał sprzedaży',
  strong_sell: 'Silny sygnał sprzedaży',
};

const consensusColors: Record<string, string> = {
  strong_buy: '#22c55e',
  buy: '#86efac',
  neutral: '#f59e0b',
  sell: '#fca5a5',
  strong_sell: '#ef4444',
};

const actionLabels: Record<string, string> = {
  buy: 'Kupuje',
  sell: 'Sprzedaje',
  hold: 'Trzyma',
  increase: 'Zwiększa',
  reduce: 'Redukuje',
};

function formatAmount(amount: number): string {
  if (amount >= 1_000_000) return `$${(amount / 1_000_000).toFixed(1)}M`;
  return `$${(amount / 1_000).toFixed(0)}K`;
}

export default function TraderSentimentCard({ sentiment }: Props) {
  const color = consensusColors[sentiment.consensus];
  const isPositive = sentiment.netScore >= 0;

  // Podziel traderów na polskich i zagranicznych
  const plTraders = sentiment.topTraders.filter((t) => t.trader.country === 'PL');
  const foreignTraders = sentiment.topTraders.filter((t) => t.trader.country !== 'PL');

  return (
    <div className="trader-sentiment-card">
      <div className="trader-header">
        <h2>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          Sentyment traderów
        </h2>
        <span className="trader-badge" style={{ backgroundColor: color }}>
          {consensusLabels[sentiment.consensus]}
        </span>
      </div>

      {/* Score bar */}
      <div className="trader-score-section">
        <div className="trader-score-bar">
          <div className="trader-score-track">
            <div
              className="trader-score-fill"
              style={{
                width: `${Math.abs(sentiment.netScore)}%`,
                background: isPositive
                  ? 'linear-gradient(90deg, #22c55e, #16a34a)'
                  : 'linear-gradient(90deg, #ef4444, #dc2626)',
                marginLeft: isPositive ? '50%' : `${50 - Math.abs(sentiment.netScore)}%`,
              }}
            />
          </div>
          <div className="trader-score-labels">
            <span className="trader-score-label bearish">Bearish</span>
            <span className="trader-score-value" style={{ color }}>
              {sentiment.netScore > 0 ? '+' : ''}{sentiment.netScore}
            </span>
            <span className="trader-score-label bullish">Bullish</span>
          </div>
        </div>
        <div className="trader-counts">
          <span className="trader-count bullish">
            <span className="count-dot bullish" />
            {sentiment.bullishCount} byczych
          </span>
          <span className="trader-count neutral">
            <span className="count-dot neutral" />
            {sentiment.totalTradersTracking - sentiment.bullishCount - sentiment.bearishCount} neutralnych
          </span>
          <span className="trader-count bearish">
            <span className="count-dot bearish" />
            {sentiment.bearishCount} niedźwiedzich
          </span>
        </div>
      </div>

      {/* Notable moves */}
      <div className="trader-moves-section">
        <h3>Najciekawsze ruchy</h3>
        <ul className="trader-moves-list">
          {sentiment.notableMoves.map((move, i) => (
            <li key={i} className="trader-move-item">
              <span
                className="move-sentiment-icon"
                style={{
                  color: move.includes('kupuje') || move.includes('zwiększa')
                    ? '#22c55e'
                    : move.includes('sprzedaje') || move.includes('redukuje')
                    ? '#ef4444'
                    : '#f59e0b',
                }}
              >
                {move.includes('kupuje') || move.includes('zwiększa') ? '▲' : move.includes('sprzedaje') || move.includes('redukuje') ? '▼' : '●'}
              </span>
              <div
                className="move-text"
                dangerouslySetInnerHTML={{ __html: move }}
              />
            </li>
          ))}
        </ul>
      </div>

      {/* Polscy traderzy */}
      {plTraders.length > 0 && (
        <div className="trader-section">
          <h3 className="trader-section-title">
            <span className="flag">🇵🇱</span> Polscy inwestorzy
          </h3>
          <div className="trader-list">
            {plTraders.map(({ trader, position }) => (
              <div key={trader.id} className="trader-row">
                <div className="trader-avatar" title={trader.description}>
                  {trader.imageName}
                </div>
                <div className="trader-info">
                  <span className="trader-name">{trader.name}</span>
                  <span className="trader-title">{trader.title}</span>
                </div>
                <div className="trader-action">
                  <span
                    className={`action-label ${
                      position.action === 'buy' || position.action === 'increase'
                        ? 'bullish'
                        : position.action === 'sell' || position.action === 'reduce'
                        ? 'bearish'
                        : 'neutral'
                    }`}
                  >
                    {actionLabels[position.action]}
                  </span>
                  <span className="trader-amount">{formatAmount(position.amount)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Zagraniczni traderzy */}
      {foreignTraders.length > 0 && (
        <div className="trader-section">
          <h3 className="trader-section-title">
            <span className="flag">🇺🇸</span> Zagraniczni inwestorzy
          </h3>
          <div className="trader-list">
            {foreignTraders.map(({ trader, position }) => (
              <div key={trader.id} className="trader-row">
                <div className="trader-avatar" title={trader.description}>
                  {trader.imageName}
                </div>
                <div className="trader-info">
                  <span className="trader-name">{trader.name}</span>
                  <span className="trader-title">{trader.title}</span>
                </div>
                <div className="trader-action">
                  <span
                    className={`action-label ${
                      position.action === 'buy' || position.action === 'increase'
                        ? 'bullish'
                        : position.action === 'sell' || position.action === 'reduce'
                        ? 'bearish'
                        : 'neutral'
                    }`}
                  >
                    {actionLabels[position.action]}
                  </span>
                  <span className="trader-amount">{formatAmount(position.amount)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
