import type { TraderSentiment, TraderPosition, Trader } from '../types';
import { getTraderPositionsForSymbol, getTraderById } from './traderData';

/**
 * Analizuje sentyment traderów dla danej spółki.
 * Łączy dane od polskich i zagranicznych inwestorów,
 * oblicza zagregowany wskaźnik i generuje rekomendację. */
export function analyzeTraderSentiment(symbol: string): TraderSentiment | null {
  const positions = getTraderPositionsForSymbol(symbol);
  if (positions.length === 0) return null;

  // Rozdziel według akcji
  const bullishActions: TraderPosition[] = [];
  const bearishActions: TraderPosition[] = [];

  for (const pos of positions) {
    if (pos.action === 'buy' || pos.action === 'increase') {
      bullishActions.push(pos);
    } else if (pos.action === 'sell' || pos.action === 'reduce') {
      bearishActions.push(pos);
    }
    // 'hold' is neutral
  }

  // Oblicz net score (-100 do +100)
  const totalWeight = positions.filter(p => p.action !== 'hold').length || 1;
  const convictionMultiplier = { high: 1.5, medium: 1.0, low: 0.5 };

  let totalScore = 0;
  for (const pos of bullishActions) {
    totalScore += 100 * convictionMultiplier[pos.conviction];
  }
  for (const pos of bearishActions) {
    totalScore -= 100 * convictionMultiplier[pos.conviction];
  }
  // Neutral positions add a small positive bias for stability
  const neutralCount = positions.filter(p => p.action === 'hold').length;
  totalScore += neutralCount * 10;

  const maxPossibleScore = totalWeight * 150;
  const netScore = Math.round((totalScore / maxPossibleScore) * 100);
  const clampedNetScore = Math.max(-100, Math.min(100, netScore));

  // Określ konsensus
  let consensus: TraderSentiment['consensus'];
  if (clampedNetScore >= 60) consensus = 'strong_buy';
  else if (clampedNetScore >= 20) consensus = 'buy';
  else if (clampedNetScore > -20) consensus = 'neutral';
  else if (clampedNetScore > -60) consensus = 'sell';
  else consensus = 'strong_sell';

  // Przygotuj listę traderów z pozycjami
  const topTraders = positions
    .map((pos) => {
      const trader = getTraderById(pos.traderId);
      return trader ? { trader, position: pos } : null;
    })
    .filter((t): t is { trader: Trader; position: TraderPosition } => t !== null)
    // Sortuj: najpierw high conviction, potem według kwoty malejąco
    .sort((a, b) => {
      const convOrder = { high: 3, medium: 2, low: 1 };
      const diff = convOrder[b.position.conviction] - convOrder[a.position.conviction];
      if (diff !== 0) return diff;
      return b.position.amount - a.position.amount;
    });

  // Generuj "notable moves" – najciekawsze transakcje
  const notableMoves: string[] = [];
  for (const entry of topTraders.slice(0, 5)) {
    const { trader, position } = entry;
    const actionLabel = {
      buy: 'kupuje',
      sell: 'sprzedaje',
      hold: 'trzyma',
      increase: 'zwiększa pozycję',
      reduce: 'redukuje pozycję',
    }[position.action];

    const amountFormatted =
      position.amount >= 1_000_000
        ? `$${(position.amount / 1_000_000).toFixed(1)}M`
        : `$${(position.amount / 1_000).toFixed(0)}K`;

    const flag = trader.country === 'PL' ? '🇵🇱' : '🇺🇸';
    notableMoves.push(
      `${flag} **${trader.name}** ${actionLabel} ${symbol} (${amountFormatted}) – ${position.note || ''}`
    );
  }

  return {
    symbol,
    totalTradersTracking: positions.length,
    bullishCount: bullishActions.length,
    bearishCount: bearishActions.length,
    netScore: clampedNetScore,
    topTraders,
    consensus,
    notableMoves,
  };
}
