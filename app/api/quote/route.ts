import { NextRequest, NextResponse } from 'next/server';

const YAHOO_QUOTE_URL = 'https://query1.finance.yahoo.com/v8/finance/chart';

interface YahooChartResult {
  meta: {
    regularMarketPrice: number;
    regularMarketPreviousClose: number;
    regularMarketChange: number;
    regularMarketChangePercent: number;
    symbol: string;
    longName?: string;
    shortName?: string;
  };
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get('symbol');

  if (!symbol) {
    return NextResponse.json({ error: 'Symbol is required' }, { status: 400 });
  }

  try {
    const url = `${YAHOO_QUOTE_URL}/${encodeURIComponent(symbol)}?range=1mo&interval=1d`;
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/json',
      },
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      throw new Error(`Yahoo API error: ${response.status}`);
    }

    const data = await response.json();
    const result = data?.chart?.result?.[0] as YahooChartResult | undefined;

    if (!result) {
      return NextResponse.json({ error: 'Stock not found' }, { status: 404 });
    }

    const meta = result.meta;
    const price = meta.regularMarketPrice ?? 0;
    const prevClose = meta.regularMarketPreviousClose ?? price;
    const change = meta.regularMarketChange ?? (price - prevClose);
    const changePercent = meta.regularMarketChangePercent ?? (prevClose > 0 ? (change / prevClose) * 100 : 0);

    return NextResponse.json({
      stock: {
        symbol: meta.symbol,
        name: meta.longName || meta.shortName || meta.symbol,
        sector: '',
        price: Math.round(price * 100) / 100,
        change: Math.round(change * 100) / 100,
        changePercent: Math.round(changePercent * 100) / 100,
      },
    });
  } catch (err) {
    console.error('Quote error:', err);
    return NextResponse.json(
      { error: 'Failed to fetch quote' },
      { status: 500 }
    );
  }
}
