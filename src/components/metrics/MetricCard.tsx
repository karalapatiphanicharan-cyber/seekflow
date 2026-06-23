import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isGood: boolean;
  };
}

export const MetricCard: React.FC<MetricCardProps> = ({ label, value, unit, icon: Icon, trend }) => {
  return (
    <div className="bg-surface border border-border p-4 rounded-sm flex flex-col justify-between">
      <div className="flex justify-between items-start">
        <span className="text-[10px] font-mono uppercase tracking-wider text-text-secondary">{label}</span>
        <Icon size={16} className="text-primary opacity-50" />
      </div>
      <div className="mt-2 flex items-baseline gap-1">
        <span className="text-2xl font-bold font-mono tracking-tighter text-text-primary">{value}</span>
        {unit && <span className="text-xs font-mono text-text-secondary">{unit}</span>}
      </div>
      {trend && (
        <div className={`mt-2 text-[10px] font-mono ${trend.isGood ? 'text-success' : 'text-error'}`}>
          {trend.value > 0 ? '+' : ''}{trend.value}% vs average
        </div>
      )}
    </div>
  );
};
