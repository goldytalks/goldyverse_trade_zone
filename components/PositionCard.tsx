'use client';

import { Position } from '@/lib/mockData';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface PositionCardProps {
  position: Position;
  onClick?: () => void;
}

export default function PositionCard({ position, onClick }: PositionCardProps) {
  const isProfitable = position.unrealizedPnl > 0;
  const pnlPercentage = ((position.unrealizedPnl / position.exposure) * 100).toFixed(2);

  return (
    <div
      onClick={onClick}
      className="bg-card border border-border rounded-lg p-4 cursor-pointer hover:border-blue transition-colors"
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <div className="text-sm font-medium mb-1 line-clamp-2">{position.market}</div>
          <div className="flex items-center gap-2">
            <span className="text-xs px-2 py-0.5 bg-blue/20 text-blue rounded">
              {position.side}
            </span>
            <span className="text-xs text-muted">{position.platform}</span>
          </div>
        </div>
        <div className="text-xs px-2 py-0.5 bg-border rounded text-muted">
          {position.category}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <div className="text-muted text-xs">Entry</div>
          <div className="font-medium">${position.entryPrice.toFixed(2)}</div>
        </div>
        <div>
          <div className="text-muted text-xs">Current</div>
          <div className="font-medium">${position.currentPrice.toFixed(2)}</div>
        </div>
        <div>
          <div className="text-muted text-xs">Exposure</div>
          <div className="font-medium">${position.exposure.toLocaleString()}</div>
        </div>
        <div>
          <div className="text-muted text-xs">Unrealized PnL</div>
          <div className={`font-bold flex items-center gap-1 ${isProfitable ? 'text-green' : 'text-red'}`}>
            {isProfitable ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
            ${Math.abs(position.unrealizedPnl).toLocaleString()} ({pnlPercentage}%)
          </div>
        </div>
      </div>
    </div>
  );
}
