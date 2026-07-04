import { NextRequest, NextResponse } from 'next/server';

const YAHOO_CHART_URL = 'https://query1.finance.yahoo.com/v8/finance/chart';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get('symbol');

  if (!symbol) {
    return NextResponse.json({ error: 'Symbol is required' }, { status: 400 });
  }

  try {
    const now = Math.floor(Date.now() / 1000);
    const oneMonthAgo = now - 45 * 24 * 60 * 60; // 45 days for enough trading days

    const url = `${YAHOO_CHART_URL}/${encodeURIComponent(symbol)}?period1=${oneMonthAgo}&period2=${now}&interval=1d`;
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
    const result = data?.chart?.result?.[0];

    if (!result) {
      return NextResponse.json({ error: 'History not found' }, { status: 404 });
    }

    const timestamps: number[] = result.timestamp || [];
    const quotes = result.indicators?.quote?.[0];
    const closes: (number | null)[] = quotes?.close || [];

    const history = timestamps
      .map((ts: number, i: number) => ({
        date: new Date(ts * 1000).toLocaleDateString('pl-PL', {
          day: '2-digit',
          month: '2-digit',
        }),
        price: closes[i] ? Math.round(closes[i] * 100) / 100 : 0,
      }))
      .filter((h: { price: number }) => h.price > 0);

    return NextResponse.json({ history });
  } catch (err) {
    console.error('History error:', err);
    return NextResponse.json(
      { error: 'Failed to fetch history' },
      { status: 500 }
    );
  }
}
