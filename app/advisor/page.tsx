'use client';

import TraderCard from '@/components/TraderCard';
import TrendingMarketCard from '@/components/TrendingMarketCard';
import PageHeader from '@/components/PageHeader';
import Section from '@/components/Section';
import { mockTraders, mockTrendingMarkets, mockSignals } from '@/lib/mockData';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function Advisor() {
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      <PageHeader
        title="Trade Advisor"
        subtitle="Insights from top traders and market signals"
      />

      {/* Top Traders */}
      <Section title="Top Traders to Follow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {mockTraders.map((trader) => (
            <TraderCard key={trader.id} trader={trader} />
          ))}
        </div>
      </Section>

      {/* Trending Markets */}
      <Section title="Trending Markets">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {mockTrendingMarkets.map((market) => (
            <TrendingMarketCard key={market.id} market={market} />
          ))}
        </div>
      </Section>

      {/* Signals */}
      <Section title="Market Signals">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {mockSignals.map((signal) => (
            <div
              key={signal.id}
              className="bg-card border border-border rounded-lg p-4 hover:border-blue transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  {signal.type === 'bullish' ? (
                    <TrendingUp className="w-5 h-5 text-green" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-red" />
                  )}
                  <span className="font-medium text-sm">{signal.market}</span>
                </div>
                <div className="text-xs text-muted">{signal.timestamp}</div>
              </div>
              <div className="text-sm text-muted mb-2">{signal.reason}</div>
              <div className="flex items-center gap-2">
                <div className="text-xs px-2 py-1 bg-blue/20 text-blue rounded">
                  {signal.confidence}% confidence
                </div>
                <div className={`text-xs px-2 py-1 rounded ${
                  signal.type === 'bullish'
                    ? 'bg-green/20 text-green'
                    : 'bg-red/20 text-red'
                }`}>
                  {signal.type.toUpperCase()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Tail Trade Section */}
      <Section title="Tail Trade">
        <div className="bg-gradient-to-br from-blue/20 to-purple-500/20 border border-blue/50 rounded-lg p-6 md:p-8 text-center">
          <div className="text-3xl md:text-4xl mb-3">🎯</div>
          <div className="text-xl md:text-2xl font-bold mb-2">Copy Top Traders Automatically</div>
          <div className="text-sm md:text-base text-muted mb-4 max-w-2xl mx-auto">
            Mirror trades from elite performers in real-time. Set your budget, pick your traders, and let the algorithm follow their moves.
          </div>
          <button className="bg-blue hover:bg-blue/80 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            Enable Tail Trading
          </button>
        </div>
      </Section>
    </div>
  );
}
