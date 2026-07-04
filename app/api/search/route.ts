import { NextRequest, NextResponse } from 'next/server';

const YAHOO_SEARCH_URL = 'https://query1.finance.yahoo.com/v1/finance/search';

interface YahooSearchResult {
  symbol: string;
  longname?: string;
  shortname?: string;
  quoteType?: string;
  sector?: string;
  industry?: string;
  exchDisp?: string;
}

interface YahooSearchResponse {
  quotes: YahooSearchResult[];
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query || query.length < 1) {
    return NextResponse.json({ results: [] });
  }

  try {
    const url = `${YAHOO_SEARCH_URL}?q=${encodeURIComponent(query)}&lang=pl-PL&region=PL`;
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

    const data: YahooSearchResponse = await response.json();

    const results = (data.quotes || [])
      .filter((q) => q.quoteType === 'EQUITY' || q.quoteType === 'ETF')
      .slice(0, 10)
      .map((q) => ({
        symbol: q.symbol,
        name: q.longname || q.shortname || q.symbol,
        sector: q.sector || q.exchDisp || 'Giełda',
        price: 0,
        change: 0,
        changePercent: 0,
      }));

    return NextResponse.json({ results });
  } catch {
    return NextResponse.json(
      { error: 'Failed to search stocks', results: [] },
      { status: 500 }
    );
  }
}
