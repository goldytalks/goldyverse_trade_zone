'use client';

import { Trader } from '@/lib/mockData';
import { UserPlus } from 'lucide-react';

interface TraderCardProps {
  trader: Trader;
}

export default function TraderCard({ trader }: TraderCardProps) {
  const badgeColor = {
    Elite: 'bg-yellow-500/20 text-yellow-500',
    Pro: 'bg-blue/20 text-blue',
    Rising: 'bg-green/20 text-green',
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:border-blue transition-colors">
      <div className="flex items-center gap-3 mb-3">
        <div className="text-3xl">{trader.avatar}</div>
        <div className="flex-1">
          <div className="font-medium">{trader.name}</div>
          <div className={`text-xs px-2 py-0.5 rounded inline-block ${badgeColor[trader.badge]}`}>
            {trader.badge}
          </div>
        </div>
        <button className="px-3 py-1.5 bg-blue hover:bg-blue/80 text-white text-xs rounded-lg font-medium transition-colors flex items-center gap-1">
          <UserPlus className="w-3 h-3" />
          Tail
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2 text-sm">
        <div>
          <div className="text-muted text-xs">Win Rate</div>
          <div className="font-bold text-green">{trader.winRate}%</div>
        </div>
        <div>
          <div className="text-muted text-xs">ROI</div>
          <div className="font-bold text-blue">{trader.roi}%</div>
        </div>
        <div>
          <div className="text-muted text-xs">Trades</div>
          <div className="font-medium">{trader.trades}</div>
        </div>
      </div>
    </div>
  );
}
