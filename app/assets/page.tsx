'use client';

import PageHeader from '@/components/PageHeader';
import Section from '@/components/Section';
import { mockAssets } from '@/lib/mockData';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function Assets() {
  const totalValue = mockAssets.reduce((sum, asset) => sum + asset.currentValue, 0);
  const totalCostBasis = mockAssets.reduce((sum, asset) => sum + asset.costBasis, 0);
  const totalPnl = totalValue - totalCostBasis;
  const totalRoi = ((totalPnl / totalCostBasis) * 100).toFixed(2);

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      <PageHeader
        title="Crypto & Assets"
        subtitle="Track your memecoins and crypto positions"
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="text-sm text-muted mb-1">Total Value</div>
          <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="text-sm text-muted mb-1">Cost Basis</div>
          <div className="text-2xl font-bold">${totalCostBasis.toLocaleString()}</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="text-sm text-muted mb-1">Total PnL</div>
          <div className={`text-2xl font-bold ${totalPnl >= 0 ? 'text-green' : 'text-red'}`}>
            ${totalPnl.toLocaleString()}
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="text-sm text-muted mb-1">ROI</div>
          <div className={`text-2xl font-bold ${totalPnl >= 0 ? 'text-green' : 'text-red'}`}>
            {totalRoi}%
          </div>
        </div>
      </div>

      {/* Assets List */}
      <Section title="Holdings">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {mockAssets.map((asset) => {
            const isProfitable = asset.unrealizedPnl > 0;
            const roi = ((asset.unrealizedPnl / asset.costBasis) * 100).toFixed(2);
            const change24hPositive = asset.change24h > 0;

            return (
              <div
                key={asset.id}
                className="bg-card border border-border rounded-lg p-4 hover:border-blue transition-colors cursor-pointer"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <div className="font-medium mb-1">{asset.name}</div>
                    <div className="text-xs px-2 py-0.5 bg-border rounded inline-block text-muted">
                      {asset.symbol}
                    </div>
                  </div>
                  <div className={`text-xs flex items-center gap-1 ${change24hPositive ? 'text-green' : 'text-red'}`}>
                    {change24hPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {Math.abs(asset.change24h).toFixed(1)}%
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <div className="text-muted text-xs">Size</div>
                    <div className="font-medium">{asset.size.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-muted text-xs">Cost Basis</div>
                    <div className="font-medium">${asset.costBasis.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-muted text-xs">Current Value</div>
                    <div className="font-medium">${asset.currentValue.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-muted text-xs">Unrealized PnL</div>
                    <div className={`font-bold flex items-center gap-1 ${isProfitable ? 'text-green' : 'text-red'}`}>
                      {isProfitable ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                      ${Math.abs(asset.unrealizedPnl).toLocaleString()} ({roi}%)
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Coming Soon Notice */}
      <div className="mt-6 bg-gradient-to-br from-purple-500/20 to-blue/20 border border-purple-500/50 rounded-lg p-6 text-center">
        <div className="text-2xl mb-2">🚀</div>
        <div className="font-bold mb-2">More Features Coming Soon</div>
        <div className="text-sm text-muted">
          Connect your wallet to automatically track real-time memecoin prices, portfolio balance, and more.
        </div>
      </div>
    </div>
  );
}
