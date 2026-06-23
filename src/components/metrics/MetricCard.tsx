import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

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
    <motion.div
      whileHover={{ y: -2, borderColor: 'var(--color-primary)', transition: { duration: 0.2 } }}
      className="bg-surface border border-border p-5 rounded-sm flex flex-col justify-between group transition-colors"
    >
      <div className="flex justify-between items-center mb-4">
        <span className="text-[11px] font-mono uppercase tracking-[0.15em] text-text-secondary group-hover:text-text-primary transition-colors">{label}</span>
        <div className="p-2 bg-background/50 rounded-sm border border-border/50">
          <Icon size={18} className="text-primary opacity-70 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-4xl font-bold font-mono tracking-tighter text-text-primary leading-none">{value}</span>
        {unit && <span className="text-sm font-mono text-text-secondary uppercase tracking-wider">{unit}</span>}
      </div>
      {trend && (
        <div className={`mt-4 text-[11px] font-mono ${trend.isGood ? 'text-success' : 'text-error'}`}>
          {trend.value > 0 ? '+' : ''}{trend.value}% vs average
        </div>
      )}
    </motion.div>
  );
};
