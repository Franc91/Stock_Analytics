import type { Trader, TraderPosition } from '../types';

// ============================================================
// Popularni inwestorzy i traderzy – Polscy i Zagraniczni
// ============================================================

export const traders: Trader[] = [
  // ---- POLSCY ----
  {
    id: 'michal-galas',
    name: 'Michał Galas',
    title: 'Inwestor, edukator rynkowy',
    country: 'PL',
    imageName: 'MG',
    style: 'value',
    description: 'Znany polski inwestor i edukator, autor kanału "Michał Galas – Inwestowanie". Stawia na wartość i długoterminowe trendy.',
  },
  {
    id: 'marek-moczulski',
    name: 'Marek Moczulski',
    title: 'Analityk BM BNP Paribas',
    country: 'PL',
    imageName: 'MM',
    style: 'growth',
    description: 'Główny analityk rynków finansowych w BM BNP Paribas. Specjalizuje się w analizie technicznej i trendach rynkowych.',
  },
  {
    id: 'piotr-kijek',
    name: 'Piotr Kijek',
    title: 'Ekspert rynków finansowych',
    country: 'PL',
    imageName: 'PK',
    style: 'macro',
    description: 'Niezależny ekspert rynków finansowych, analityk makroekonomiczny. Częsty gość programów biznesowych.',
  },
  {
    id: 'sobieslaw-kozlowski',
    name: 'Sobiesław Kozłowski',
    title: 'Dyrektor Cantor Fitzgerald',
    country: 'PL',
    imageName: 'SK',
    style: 'contrarian',
    description: 'Dyrektor w Cantor Fitzgerald, specjalista ds. rynków wschodzących. Znany z odważnych, kontrariańskich prognoz.',
  },
  {
    id: 'tomasz-hondo',
    name: 'Tomasz Hońdo',
    title: 'Analityk Quercus TFI',
    country: 'PL',
    imageName: 'TH',
    style: 'value',
    description: 'Starszy analityk w Quercus TFI. Specjalizuje się w rynku akcji i analizie fundamentalnej.',
  },
  {
    id: 'lukasz-wardyn',
    name: 'Łukasz Wardyn',
    title: 'Dyrektor Citi',
    country: 'PL',
    imageName: 'ŁW',
    style: 'macro',
    description: 'Dyrektor w Citi Handlowy, odpowiedzialny za strategie rynkowe. Ekspert od rynków walutowych i stóp procentowych.',
  },
  {
    id: 'przemyslaw-kwiecien',
    name: 'Przemysław Kwiecień',
    title: 'Ekonomista, Xelion',
    country: 'PL',
    imageName: 'PK',
    style: 'macro',
    description: 'Główny ekonomista Xelion. Ekspert od makroekonomii i rynków globalnych, były pracownik NBP.',
  },

  // ---- ZAGRANICZNI ----
  {
    id: 'warren-buffett',
    name: 'Warren Buffett',
    title: 'CEO Berkshire Hathaway',
    country: 'US',
    imageName: 'WB',
    style: 'value',
    description: 'Legenda inwestowania, znany jako "Wyrocznia z Omaha". Stawia na wartość i długoterminowe holdingi.',
  },
  {
    id: 'cathie-wood',
    name: 'Cathie Wood',
    title: 'CEO ARK Invest',
    country: 'US',
    imageName: 'CW',
    style: 'growth',
    description: 'Założycielka ARK Invest, inwestuje w innowacje: AI, biotech, fintech i blockchain.',
  },
  {
    id: 'bill-ackman',
    name: 'Bill Ackman',
    title: 'CEO Pershing Square',
    country: 'US',
    imageName: 'BA',
    style: 'contrarian',
    description: 'Znany inwestor aktywistyczny. Prowadzi Pershing Square Capital Management.',
  },
  {
    id: 'ray-dalio',
    name: 'Ray Dalio',
    title: 'Założyciel Bridgewater',
    country: 'US',
    imageName: 'RD',
    style: 'macro',
    description: 'Założyciel największego funduszu hedgingowego świata. Ekspert od cykli makroekonomicznych.',
  },
  {
    id: 'michael-burry',
    name: 'Michael Burry',
    title: 'Założyciel Scion Capital',
    country: 'US',
    imageName: 'MB',
    style: 'contrarian',
    description: 'Znany z przewidzenia kryzysu hipotecznego w 2008. Inwestuje przeciwko głównemu nurtowi.',
  },
  {
    id: 'ken-griffin',
    name: 'Ken Griffin',
    title: 'CEO Citadel',
    country: 'US',
    imageName: 'KG',
    style: 'momentum',
    description: 'Założyciel Citadel, jednego z największych funduszy hedgingowych. Ekspert od arbitrażu.',
  },
  {
    id: 'steve-cohen',
    name: 'Steve Cohen',
    title: 'CEO Point72 Asset Mgmt',
    country: 'US',
    imageName: 'SC',
    style: 'momentum',
    description: 'Założyciel Point72 Asset Management. Legenda tradingu momentum i short-sellingu.',
  },
  {
    id: 'david-tepper',
    name: 'David Tepper',
    title: 'CEO Appaloosa Mgmt',
    country: 'US',
    imageName: 'DT',
    style: 'contrarian',
    description: 'Założyciel Appaloosa Management. Znany z odważnych zakładów kontrariańskich.',
  },
  {
    id: 'george-soros',
    name: 'George Soros',
    title: 'Założyciel Soros Fund Mgmt',
    country: 'US',
    imageName: 'GS',
    style: 'macro',
    description: 'Legenda rynków finansowych, znany z "zerwania Banku Anglii" w 1992. Inwestuje makro.',
  },
  {
    id: 'nancy-pelosi',
    name: 'Nancy Pelosi',
    title: 'Była Speaker Izby Reprezentantów',
    country: 'US',
    imageName: 'NP',
    style: 'growth',
    description: 'Jedna z najbardziej śledzonych postaci na rynku. Jej transakcje są przedmiotem analizy "Pelosi Tracker".',
  },
];

// ============================================================
// Symulowane pozycje traderów – mapowane na popularne spółki
// ============================================================

export const traderPositions: TraderPosition[] = [
  // ---- Michał Galas ----
  { traderId: 'michal-galas', symbol: 'AAPL', action: 'buy', amount: 500000, conviction: 'high', date: '2026-06-15', note: 'Silne fundamenty, ekosystem usług' },
  { traderId: 'michal-galas', symbol: 'MSFT', action: 'hold', amount: 350000, conviction: 'medium', date: '2026-06-10', note: 'AI to kluczowy driver' },
  { traderId: 'michal-galas', symbol: 'CDR.WA', action: 'buy', amount: 200000, conviction: 'high', date: '2026-06-01', note: 'Polska perełka gamingowa' },

  // ---- Marek Moczulski ----
  { traderId: 'marek-moczulski', symbol: 'NVDA', action: 'buy', amount: 800000, conviction: 'high', date: '2026-06-20', note: 'Hossa AI napędza popyt' },
  { traderId: 'marek-moczulski', symbol: 'TSLA', action: 'reduce', amount: 300000, conviction: 'medium', date: '2026-06-12', note: 'Ostrożnie przy wycenach' },
  { traderId: 'marek-moczulski', symbol: 'PZU.WA', action: 'buy', amount: 150000, conviction: 'medium', date: '2026-05-28', note: 'Dywidenda + stabilność' },

  // ---- Piotr Kijek ----
  { traderId: 'piotr-kijek', symbol: 'GOOGL', action: 'buy', amount: 400000, conviction: 'high', date: '2026-06-18', note: 'AI i reklama napędzają wyniki' },
  { traderId: 'piotr-kijek', symbol: 'AMZN', action: 'hold', amount: 450000, conviction: 'medium', date: '2026-06-05', note: 'AWS i AI to silniki wzrostu' },
  { traderId: 'piotr-kijek', symbol: 'PKO.WA', action: 'buy', amount: 180000, conviction: 'high', date: '2026-06-08', note: 'Niskie wyceny banków' },

  // ---- Sobiesław Kozłowski ----
  { traderId: 'sobieslaw-kozlowski', symbol: 'META', action: 'sell', amount: 500000, conviction: 'high', date: '2026-06-14', note: 'Przewartościowane po rajdzie' },
  { traderId: 'sobieslaw-kozlowski', symbol: 'XOM', action: 'buy', amount: 350000, conviction: 'medium', date: '2026-06-02', note: 'Energia wraca do łask' },
  { traderId: 'sobieslaw-kozlowski', symbol: 'JPM', action: 'buy', amount: 280000, conviction: 'high', date: '2026-05-30', note: 'Banki zyskają na wyższych stopach' },

  // ---- Tomasz Hońdo ----
  { traderId: 'tomasz-hondo', symbol: 'KO', action: 'buy', amount: 250000, conviction: 'medium', date: '2026-06-10', note: 'Stabilna spółka defensywna' },
  { traderId: 'tomasz-hondo', symbol: 'PG', action: 'hold', amount: 220000, conviction: 'high', date: '2026-06-01', note: 'Siła marki i dywidenda' },
  { traderId: 'tomasz-hondo', symbol: 'PEP', action: 'buy', amount: 180000, conviction: 'medium', date: '2026-05-25', note: 'Dobra dywersyfikacja' },

  // ---- Łukasz Wardyn ----
  { traderId: 'lukasz-wardyn', symbol: 'TSLA', action: 'buy', amount: 600000, conviction: 'medium', date: '2026-06-19', note: 'Momentum techniczne sprzyja' },
  { traderId: 'lukasz-wardyn', symbol: 'AAPL', action: 'hold', amount: 400000, conviction: 'medium', date: '2026-06-10', note: 'Czekam na nowe produkty' },
  { traderId: 'lukasz-wardyn', symbol: 'PZU.WA', action: 'increase', amount: 200000, conviction: 'high', date: '2026-06-05', note: 'Zwiększam pozycję' },

  // ---- Przemysław Kwiecień ----
  { traderId: 'przemyslaw-kwiecien', symbol: 'MSFT', action: 'buy', amount: 350000, conviction: 'high', date: '2026-06-16', note: 'Cloud + AI = dominacja' },
  { traderId: 'przemyslaw-kwiecien', symbol: 'XOM', action: 'sell', amount: 150000, conviction: 'low', date: '2026-06-07', note: 'Ryzyko regulacyjne' },

  // ---- Warren Buffett ----
  { traderId: 'warren-buffett', symbol: 'AAPL', action: 'buy', amount: 50000000, conviction: 'high', date: '2026-06-10', note: 'Największa pozycja Berkshire – ekosystem Apple' },
  { traderId: 'warren-buffett', symbol: 'KO', action: 'buy', amount: 30000000, conviction: 'high', date: '2026-05-20', note: 'Klasyczna defensywa, siła marki' },
  { traderId: 'warren-buffett', symbol: 'BAC', action: 'hold', amount: 25000000, conviction: 'high', date: '2026-06-01', note: 'Bank Americ przy atrakcyjnej wycenie' },
  { traderId: 'warren-buffett', symbol: 'AXP', action: 'increase', amount: 20000000, conviction: 'high', date: '2026-06-15', note: 'Zwiększam – American Express ma potencjał' },
  { traderId: 'warren-buffett', symbol: 'PG', action: 'buy', amount: 18000000, conviction: 'medium', date: '2026-05-30', note: 'Procter & Gamble – stabilność i dywidenda' },

  // ---- Cathie Wood ----
  { traderId: 'cathie-wood', symbol: 'TSLA', action: 'buy', amount: 15000000, conviction: 'high', date: '2026-06-18', note: 'Tesla to AI + robotyka + EV' },
  { traderId: 'cathie-wood', symbol: 'NVDA', action: 'buy', amount: 12000000, conviction: 'high', date: '2026-06-20', note: 'NVIDIA to centrum rewolucji AI' },
  { traderId: 'cathie-wood', symbol: 'RDDT', action: 'buy', amount: 5000000, conviction: 'high', date: '2026-06-12', note: 'Reddit – społecznościowa AI' },
  { traderId: 'cathie-wood', symbol: 'META', action: 'sell', amount: 8000000, conviction: 'medium', date: '2026-06-05', note: 'Przeszacowane vs. innowacje' },
  { traderId: 'cathie-wood', symbol: 'AMD', action: 'buy', amount: 7000000, conviction: 'high', date: '2026-06-08', note: 'AMD dogania NVIDIA w AI' },

  // ---- Bill Ackman ----
  { traderId: 'bill-ackman', symbol: 'META', action: 'buy', amount: 10000000, conviction: 'high', date: '2026-06-17', note: 'Widzę wartość po przecenie' },
  { traderId: 'bill-ackman', symbol: 'GOOGL', action: 'buy', amount: 8000000, conviction: 'medium', date: '2026-06-03', note: 'Alphabet – niedocenione AI' },
  { traderId: 'bill-ackman', symbol: 'JPM', action: 'hold', amount: 5000000, conviction: 'medium', date: '2026-05-27', note: 'Solidny bank w dobrych rękach' },

  // ---- Ray Dalio ----
  { traderId: 'ray-dalio', symbol: 'GOOGL', action: 'buy', amount: 20000000, conviction: 'high', date: '2026-06-14', note: 'Alphabet – monopol wyszukiwania' },
  { traderId: 'ray-dalio', symbol: 'NVDA', action: 'reduce', amount: 15000000, conviction: 'medium', date: '2026-06-07', note: 'Zmniejszam – cykl hype' },
  { traderId: 'ray-dalio', symbol: 'XOM', action: 'buy', amount: 12000000, conviction: 'high', date: '2026-05-29', note: 'Energia – dywersyfikacja portfela' },
  { traderId: 'ray-dalio', symbol: 'JPM', action: 'increase', amount: 10000000, conviction: 'high', date: '2026-06-11', note: 'Zwiększam – cykl stóp procentowych' },

  // ---- Michael Burry ----
  { traderId: 'michael-burry', symbol: 'META', action: 'sell', amount: 5000000, conviction: 'high', date: '2026-06-16', note: 'Korekta nadchodzi' },
  { traderId: 'michael-burry', symbol: 'TSLA', action: 'sell', amount: 4000000, conviction: 'high', date: '2026-06-09', note: 'Bąbel spekulacyjny' },
  { traderId: 'michael-burry', symbol: 'NVDA', action: 'reduce', amount: 3000000, conviction: 'high', date: '2026-06-02', note: 'Zmniejszam – euphoria AI' },
  { traderId: 'michael-burry', symbol: 'XOM', action: 'buy', amount: 6000000, conviction: 'medium', date: '2026-05-26', note: 'Bezpieczna przystań' },

  // ---- Ken Griffin ----
  { traderId: 'ken-griffin', symbol: 'AAPL', action: 'increase', amount: 25000000, conviction: 'high', date: '2026-06-19', note: 'Zwiększam – siła ekosystemu' },
  { traderId: 'ken-griffin', symbol: 'MSFT', action: 'buy', amount: 22000000, conviction: 'high', date: '2026-06-11', note: 'Azure AI to game-changer' },
  { traderId: 'ken-griffin', symbol: 'AMZN', action: 'buy', amount: 18000000, conviction: 'medium', date: '2026-06-04', note: 'AWS dominuje cloud' },
  { traderId: 'ken-griffin', symbol: 'NVDA', action: 'buy', amount: 20000000, conviction: 'high', date: '2026-05-28', note: 'Momentum AI – krótkoterminowo' },

  // ---- Steve Cohen ----
  { traderId: 'steve-cohen', symbol: 'NVDA', action: 'buy', amount: 18000000, conviction: 'high', date: '2026-06-17', note: 'Momentum AI – long' },
  { traderId: 'steve-cohen', symbol: 'AMD', action: 'buy', amount: 12000000, conviction: 'high', date: '2026-06-10', note: 'AMD – momentum, goni NVDA' },
  { traderId: 'steve-cohen', symbol: 'META', action: 'sell', amount: 10000000, conviction: 'medium', date: '2026-06-03', note: 'Short-term reversal' },

  // ---- David Tepper ----
  { traderId: 'david-tepper', symbol: 'BA', action: 'buy', amount: 8000000, conviction: 'high', date: '2026-06-15', note: 'Boeing – kontrariański zakład' },
  { traderId: 'david-tepper', symbol: 'JPM', action: 'buy', amount: 6000000, conviction: 'high', date: '2026-06-05', note: 'Banki – odwrotność strachu' },
  { traderId: 'david-tepper', symbol: 'MSFT', action: 'sell', amount: 5000000, conviction: 'medium', date: '2026-05-22', note: 'Częściowa realizacja zysku' },

  // ---- George Soros ----
  { traderId: 'george-soros', symbol: 'TSLA', action: 'sell', amount: 10000000, conviction: 'high', date: '2026-06-13', note: 'Ryzyko bąbla' },
  { traderId: 'george-soros', symbol: 'GOOGL', action: 'buy', amount: 15000000, conviction: 'medium', date: '2026-06-06', note: 'AI zmienia grę' },
  { traderId: 'george-soros', symbol: 'PKO.WA', action: 'buy', amount: 5000000, conviction: 'medium', date: '2026-05-25', note: 'Polski rynek niedoceniony' },

  // ---- Nancy Pelosi ----
  { traderId: 'nancy-pelosi', symbol: 'NVDA', action: 'buy', amount: 5000000, conviction: 'high', date: '2026-06-20', note: 'Stała ekspozycja na AI' },
  { traderId: 'nancy-pelosi', symbol: 'MSFT', action: 'buy', amount: 3000000, conviction: 'high', date: '2026-06-14', note: 'Call options na Microsoft' },
  { traderId: 'nancy-pelosi', symbol: 'AAPL', action: 'buy', amount: 2000000, conviction: 'medium', date: '2026-06-07', note: 'Solidna pozycja long' },
  { traderId: 'nancy-pelosi', symbol: 'AMZN', action: 'increase', amount: 2500000, conviction: 'high', date: '2026-05-31', note: 'Zwiększam – przed Prime Day' },
];

// ============================================================
// Helper functions
// ============================================================

export function getTraderPositionsForSymbol(symbol: string): TraderPosition[] {
  return traderPositions.filter((p) => p.symbol === symbol);
}

export function getTraderById(id: string): Trader | undefined {
  return traders.find((t) => t.id === id);
}

export function getTradersByCountry(country: 'PL' | 'US' | 'OTHER'): Trader[] {
  return traders.filter((t) => t.country === country);
}
