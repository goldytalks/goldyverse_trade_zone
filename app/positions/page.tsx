'use client';

import PositionCard from '@/components/PositionCard';
import PageHeader from '@/components/PageHeader';
import Section from '@/components/Section';
import { mockPositions } from '@/lib/mockData';
import { useState } from 'react';

export default function Positions() {
  const [filter, setFilter] = useState<'all' | 'Polymarket' | 'Kalshi'>('all');

  const filteredPositions = filter === 'all'
    ? mockPositions
    : mockPositions.filter((p) => p.platform === filter);

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      <PageHeader
        title="Positions"
        subtitle={`${filteredPositions.length} open positions`}
      />

      {/* Filter Buttons */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {(['all', 'Polymarket', 'Kalshi'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              filter === f
                ? 'bg-blue text-white'
                : 'bg-card border border-border text-muted hover:text-white'
            }`}
          >
            {f === 'all' ? 'All' : f}
          </button>
        ))}
      </div>

      {/* Positions List */}
      <Section title="Open Positions">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {filteredPositions.map((position) => (
            <PositionCard
              key={position.id}
              position={position}
              onClick={() => alert(`Position details for: ${position.market}\n\nEntry: $${position.entryPrice}\nCurrent: $${position.currentPrice}\nExposure: $${position.exposure}\nUnrealized PnL: $${position.unrealizedPnl}`)}
            />
          ))}
        </div>
      </Section>
    </div>
  );
}
