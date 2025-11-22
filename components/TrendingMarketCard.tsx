'use client';

import { TrendingMarket } from '@/lib/mockData';
import Sparkline from './Sparkline';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface TrendingMarketCardProps {
  market: TrendingMarket;
}

export default function TrendingMarketCard({ market }: TrendingMarketCardProps) {
  const isPositive = market.change24h > 0;

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:border-blue transition-colors cursor-pointer">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <div className="text-sm font-medium mb-1">{market.title}</div>
          <div className="text-xs px-2 py-0.5 bg-border rounded inline-block text-muted">
            {market.category}
          </div>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold">${market.currentPrice.toFixed(2)}</div>
          <div className={`text-xs flex items-center gap-1 justify-end ${isPositive ? 'text-green' : 'text-red'}`}>
            {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
            {Math.abs(market.change24h).toFixed(1)}%
          </div>
        </div>
      </div>

      <div className="mb-2">
        <Sparkline data={market.sparklineData} color={isPositive ? '#4ade80' : '#f87171'} />
      </div>

      <div className="text-xs text-muted">
        Volume: ${(market.volume / 1000000).toFixed(2)}M
      </div>
    </div>
  );
}
