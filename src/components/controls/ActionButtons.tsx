import React from 'react';
import { Play, RotateCcw, Shuffle, FileInput } from 'lucide-react';
import { Button } from '../ui/Button';

export const ActionButtons: React.FC = () => {
  return (
    <div className="space-y-4 pt-6">
      <Button variant="primary" fullWidth size="lg" className="gap-3 font-bold text-sm shadow-[0_4px_20px_rgba(217,119,6,0.15)]">
        <Play size={18} fill="currentColor" /> Run Simulation
      </Button>

      <div className="grid grid-cols-2 gap-2">
        <Button variant="outline" className="gap-2 text-[10px] bg-surface/50">
          <Shuffle size={14} /> Random
        </Button>
        <Button variant="outline" className="gap-2 text-[10px] bg-surface/50">
          <FileInput size={14} /> Example
        </Button>
      </div>

      <Button variant="outline" fullWidth className="gap-2 text-[11px] text-error/80 border-error/10 hover:bg-error/5 hover:border-error/30 transition-all uppercase tracking-[0.2em] mt-2">
        <RotateCcw size={14} /> Reset
      </Button>
    </div>
  );
};
