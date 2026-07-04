import { useNavigate } from 'react-router-dom';
import type { Stock } from '../types';

interface Props {
  stock: Stock;
  onRemove?: () => void;
}

export default function StockCard({ stock, onRemove }: Props) {
  const navigate = useNavigate();
  const isPositive = stock.change >= 0;

  return (
    <div className="stock-card" onClick={() => navigate(`/stock/${stock.symbol}`)}>
      <div className="stock-card-header">
        <div>
          <h3>{stock.symbol}</h3>
          <span className="stock-sector">{stock.sector}</span>
        </div>
        {onRemove && (
          <button
            className="remove-btn"
            onClick={(e) => { e.stopPropagation(); onRemove(); }}
            title="Usuń z listy"
          >
            ✕
          </button>
        )}
      </div>
      <div className="stock-card-body">
        <span className="stock-fullname">{stock.name}</span>
      </div>
      <div className="stock-card-footer">
        <span className="stock-price">${stock.price.toFixed(2)}</span>
        <span className={`stock-change ${isPositive ? 'positive' : 'negative'}`}>
          <svg viewBox="0 0 10 10" width="10" height="10">
            <path d={isPositive ? 'M5 1L9 9H1z' : 'M5 9L1 1h8z'} fill="currentColor" />
          </svg>
          {isPositive ? '+' : ''}{stock.change.toFixed(2)} ({isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%)
        </span>
      </div>
    </div>
  );
}
