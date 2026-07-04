import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import type { Stock } from '../types';

interface Props {
  stock: Stock;
}

export default function StockChart({ stock }: Props) {
  const isPositive = stock.change >= 0;
  const color = isPositive ? '#22c55e' : '#ef4444';

  return (
    <div className="stock-chart">
      <ResponsiveContainer width="100%" height={350}>
        <AreaChart data={stock.history}>
          <defs>
            <linearGradient id={`gradient-${stock.symbol}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
          <XAxis
            dataKey="date"
            stroke="#718096"
            tick={{ fontSize: 12 }}
            interval="preserveStartEnd"
          />
          <YAxis
            domain={['auto', 'auto']}
            stroke="#718096"
            tick={{ fontSize: 12 }}
            tickFormatter={(v) => `$${v}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1a202c',
              border: '1px solid #2d3748',
              borderRadius: '8px',
              color: '#e2e8f0',
            }}
            formatter={(value: any) => [`$${Number(value).toFixed(2)}`, 'Cena']}
          />
          <Area
            type="monotone"
            dataKey="price"
            stroke={color}
            strokeWidth={2}
            fill={`url(#gradient-${stock.symbol})`}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
