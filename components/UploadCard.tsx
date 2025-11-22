'use client';

import { UploadedSlip } from '@/lib/mockData';
import { Upload, CheckCircle2 } from 'lucide-react';

interface UploadCardProps {
  onUploadClick: () => void;
}

export function UploadButton({ onUploadClick }: UploadCardProps) {
  return (
    <button
      onClick={onUploadClick}
      className="w-full bg-card border-2 border-dashed border-border hover:border-blue rounded-lg p-6 transition-colors flex flex-col items-center gap-3"
    >
      <div className="w-12 h-12 bg-blue/20 rounded-full flex items-center justify-center">
        <Upload className="w-6 h-6 text-blue" />
      </div>
      <div className="text-center">
        <div className="font-medium mb-1">Upload Pick Screenshot</div>
        <div className="text-sm text-muted">Underdog, PrizePicks, or other slips</div>
      </div>
    </button>
  );
}

interface SlipListProps {
  slips: UploadedSlip[];
}

export function SlipList({ slips }: SlipListProps) {
  return (
    <div className="space-y-3">
      {slips.map((slip) => (
        <div
          key={slip.id}
          className="bg-card border border-border rounded-lg p-4 hover:border-blue transition-colors cursor-pointer"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-sm">{slip.source}</span>
                <span className="text-xs px-2 py-0.5 bg-green/20 text-green rounded flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  {slip.status}
                </span>
              </div>
              <div className="text-xs text-muted">{slip.date}</div>
            </div>
            <div className="text-xs px-2 py-0.5 bg-border rounded text-muted">
              {slip.picks} picks
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <div className="text-muted text-xs">Amount</div>
              <div className="font-medium">${slip.amount}</div>
            </div>
            <div>
              <div className="text-muted text-xs">Potential Payout</div>
              <div className="font-bold text-green">${slip.potentialPayout}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
