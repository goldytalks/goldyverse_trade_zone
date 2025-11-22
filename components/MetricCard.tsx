'use client';

interface MetricCardProps {
  label: string;
  value: string;
  change?: string;
  positive?: boolean;
}

export default function MetricCard({ label, value, change, positive }: MetricCardProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:border-blue/50 transition-colors">
      <div className="text-sm text-muted mb-1">{label}</div>
      <div className="text-2xl font-bold">{value}</div>
      {change && (
        <div className={`text-sm mt-1 ${positive ? 'text-green' : 'text-red'}`}>
          {change}
        </div>
      )}
    </div>
  );
}
