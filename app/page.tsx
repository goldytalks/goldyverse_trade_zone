'use client';

import MetricCard from '@/components/MetricCard';
import PositionCard from '@/components/PositionCard';
import PageHeader from '@/components/PageHeader';
import Section from '@/components/Section';
import { mockPositions, mockPnLHistory, calculateMetrics, mockTrendingMarkets } from '@/lib/mockData';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import TrendingMarketCard from '@/components/TrendingMarketCard';

export default function Dashboard() {
  const metrics = calculateMetrics();

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      <PageHeader
        title="Dashboard"
        subtitle="Track all your trades and gambles in one place"
      />

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
        <MetricCard
          label="Total PnL"
          value={`$${metrics.totalPnl.toLocaleString()}`}
          change="+15.2% 30d"
          positive={true}
        />
        <MetricCard
          label="ROI"
          value={`${metrics.roi.toFixed(2)}%`}
          change="+3.8% 30d"
          positive={true}
        />
        <MetricCard
          label="Realized PnL"
          value={`$${metrics.realizedPnl.toLocaleString()}`}
        />
        <MetricCard
          label="Unrealized PnL"
          value={`$${metrics.unrealizedPnl.toLocaleString()}`}
          positive={metrics.unrealizedPnl > 0}
        />
      </div>

      {/* 30-Day PnL Chart */}
      <Section title="30-Day Performance">
        <div className="bg-card border border-border rounded-lg p-4">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={mockPnLHistory}>
              <XAxis
                dataKey="date"
                tick={{ fill: '#6b7280', fontSize: 12 }}
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              />
              <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1a1a1a',
                  border: '1px solid #2a2a2a',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: '#fff' }}
              />
              <Line
                type="monotone"
                dataKey="pnl"
                stroke="#60a5fa"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Section>

      {/* Two Column Layout on Desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Positions Snapshot */}
        <div>
          <Section title="Positions Snapshot">
            <div className="space-y-3">
              {mockPositions.slice(0, 3).map((position) => (
                <PositionCard key={position.id} position={position} />
              ))}
            </div>
          </Section>
        </div>

        {/* Market Movers */}
        <div>
          <Section title="Market Movers">
            <div className="space-y-3">
              {mockTrendingMarkets.slice(0, 3).map((market) => (
                <TrendingMarketCard key={market.id} market={market} />
              ))}
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}
