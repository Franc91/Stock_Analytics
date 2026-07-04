import type { AnalysisResult } from '../types';

interface Props {
  analysis: AnalysisResult;
}

export default function AnalysisCard({ analysis }: Props) {
  const colorMap = {
    'Kupuj': '#22c55e',
    'Sprzedaj': '#ef4444',
    'Trzymaj': '#f59e0b',
  };

  const scoreColor =
    analysis.score >= 60 ? '#22c55e' : analysis.score <= 40 ? '#ef4444' : '#f59e0b';

  return (
    <div className="analysis-card">
      <div className="analysis-header">
        <h2>Analiza techniczna – {analysis.symbol}</h2>
        <div
          className="recommendation-badge"
          style={{ backgroundColor: colorMap[analysis.recommendation] }}
        >
          {analysis.recommendation}
        </div>
      </div>

      <div className="score-section">
        <div className="score-ring">
          <svg viewBox="0 0 120 120" width="120" height="120">
            <circle cx="60" cy="60" r="54" fill="none" stroke="#2d3748" strokeWidth="8" />
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke={scoreColor}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${(analysis.score / 100) * 339.292} 339.292`}
              transform="rotate(-90 60 60)"
            />
            <text x="60" y="55" textAnchor="middle" fill="#e2e8f0" fontSize="28" fontWeight="bold">
              {analysis.score}
            </text>
            <text x="60" y="75" textAnchor="middle" fill="#718096" fontSize="12">
              / 100
            </text>
          </svg>
        </div>
        <div className="score-label">
          <span style={{ color: scoreColor }}>
            {analysis.score >= 60
              ? 'Sygnał zakupu'
              : analysis.score <= 40
              ? 'Sygnał sprzedaży'
              : 'Neutralny'}
          </span>
        </div>
      </div>

      <div className="indicators-section">
        <h3>Wskaźniki techniczne</h3>
        <div className="indicators-grid">
          {analysis.indicators.map((indicator, i) => (
            <div key={i} className={`indicator-item signal-${indicator.signal}`}>
              <div className="indicator-name">{indicator.name}</div>
              <div className="indicator-value">{indicator.value}</div>
              <div className="indicator-signal">
                <span className={`signal-dot ${indicator.signal}`} />
                {indicator.signal.charAt(0).toUpperCase() + indicator.signal.slice(1)}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="reasons-section">
        <h3>Uzasadnienie</h3>
        <ul>
          {analysis.reasons.map((reason, i) => (
            <li key={i}>{reason}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
