import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface Props {
  label: string;
  value: string | number;
  unit?: string;
  icon: LucideIcon;
}

export const MetricCard: React.FC<Props> = ({ label, value, unit, icon: Icon }) => {
  return (
    <div className="bg-surface border border-border p-5 rounded-sm group hover:border-border-hover transition-colors">
      <div className="flex justify-between items-start mb-4">
        <span className="text-[10px] font-mono text-text-secondary uppercase tracking-[0.15em]">
          {label}
        </span>
        <div className="p-1.5 bg-background border border-border rounded-sm group-hover:border-primary/50 transition-colors">
          <Icon className="w-4 h-4 text-text-secondary group-hover:text-primary transition-colors" />
        </div>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-4xl font-bold text-text-primary tracking-tight">
          {value}
        </span>
        {unit && (
          <span className="text-xs font-mono text-text-secondary">
            {unit}
          </span>
        )}
      </div>
    </div>
  );
};
