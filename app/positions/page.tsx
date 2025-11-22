'use client';

import PositionCard from '@/components/PositionCard';
import PageHeader from '@/components/PageHeader';
import Section from '@/components/Section';
import { mockPositions, Position } from '@/lib/mockData';
import { useState, useEffect } from 'react';
import { Loader2, AlertCircle, RefreshCw } from 'lucide-react';

interface KalshiPosition {
  id: string;
  marketTitle: string;
  ticker: string;
  side: 'Yes' | 'No' | 'Both';
  entryPrice: number;
  currentPrice: number;
  exposure: number;
  unrealizedPnl: number;
  category: string;
}

export default function Positions() {
  const [filter, setFilter] = useState<'all' | 'Polymarket' | 'Kalshi'>('all');
  const [kalshiPositions, setKalshiPositions] = useState<KalshiPosition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingMockData, setUsingMockData] = useState(false);

  // Fetch Kalshi positions on mount
  useEffect(() => {
    fetchKalshiPositions();
  }, []);

  const fetchKalshiPositions = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/kalshi/positions');
      const data = await response.json();

      if (data.positions && data.positions.length > 0) {
        setKalshiPositions(data.positions);
        setUsingMockData(false);
      } else if (data.error && data.error.includes('not configured')) {
        // Kalshi not configured, use mock data
        setUsingMockData(true);
      } else {
        // No positions found
        setKalshiPositions([]);
      }
    } catch (err) {
      console.error('Error fetching Kalshi positions:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch positions');
      setUsingMockData(true);
    } finally {
      setLoading(false);
    }
  };

  // Convert Kalshi positions to Position format for UI
  const convertedKalshiPositions: Position[] = kalshiPositions.map((kp) => ({
    id: kp.id,
    market: kp.marketTitle,
    side: kp.side === 'Both' ? 'Yes' : kp.side,
    entryPrice: kp.entryPrice,
    currentPrice: kp.currentPrice,
    exposure: kp.exposure,
    unrealizedPnl: kp.unrealizedPnl,
    category: kp.category,
    platform: 'Kalshi' as const,
  }));

  // Merge real Kalshi positions with mock Polymarket positions
  const allPositions = [
    ...convertedKalshiPositions,
    ...mockPositions.filter((p) => p.platform === 'Polymarket'),
  ];

  // Apply filter
  const filteredPositions = filter === 'all'
    ? allPositions
    : allPositions.filter((p) => p.platform === filter);

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      <PageHeader
        title="Positions"
        subtitle={
          usingMockData
            ? `${filteredPositions.length} open positions (using mock data)`
            : `${filteredPositions.length} open positions`
        }
      />

      {/* Status Banner */}
      {loading && (
        <div className="mb-6 bg-blue/10 border border-blue/30 rounded-lg p-4 flex items-center gap-3">
          <Loader2 className="w-5 h-5 text-blue animate-spin" />
          <span className="text-sm text-blue">Loading Kalshi positions...</span>
        </div>
      )}

      {error && (
        <div className="mb-6 bg-red/10 border border-red/30 rounded-lg p-4 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red" />
          <div className="flex-1">
            <div className="text-sm text-red font-medium">Failed to load Kalshi positions</div>
            <div className="text-xs text-red/80 mt-1">{error}</div>
          </div>
          <button
            onClick={fetchKalshiPositions}
            className="p-2 hover:bg-red/20 rounded-lg transition-colors"
          >
            <RefreshCw className="w-4 h-4 text-red" />
          </button>
        </div>
      )}

      {usingMockData && !loading && !error && (
        <div className="mb-6 bg-muted/10 border border-muted/30 rounded-lg p-4 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-muted" />
          <div className="flex-1 text-sm text-muted">
            Kalshi not configured. Showing mock data. Configure KALSHI_API_KEY_ID and KALSHI_PRIVATE_KEY_PEM to see real positions.
          </div>
        </div>
      )}

      {/* Filter Buttons */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {(['all', 'Polymarket', 'Kalshi'] as const).map((f) => {
          const count = f === 'all'
            ? allPositions.length
            : allPositions.filter((p) => p.platform === f).length;

          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                filter === f
                  ? 'bg-blue text-white'
                  : 'bg-card border border-border text-muted hover:text-white'
              }`}
            >
              {f === 'all' ? 'All' : f} ({count})
            </button>
          );
        })}
      </div>

      {/* Positions List */}
      <Section title="Open Positions">
        {filteredPositions.length === 0 ? (
          <div className="bg-card border border-border rounded-lg p-8 text-center">
            <div className="text-muted mb-2">No positions found</div>
            <div className="text-sm text-muted/70">
              {filter !== 'all' && `No ${filter} positions to display`}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {filteredPositions.map((position) => (
              <PositionCard
                key={position.id}
                position={position}
                onClick={() =>
                  alert(
                    `Position details for: ${position.market}\n\n` +
                    `Platform: ${position.platform}\n` +
                    `Entry: $${position.entryPrice.toFixed(2)}\n` +
                    `Current: $${position.currentPrice.toFixed(2)}\n` +
                    `Exposure: $${position.exposure.toLocaleString()}\n` +
                    `Unrealized PnL: $${position.unrealizedPnl.toLocaleString()}`
                  )
                }
              />
            ))}
          </div>
        )}
      </Section>
    </div>
  );
}
