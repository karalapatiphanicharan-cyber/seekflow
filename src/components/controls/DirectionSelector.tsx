import React from 'react';
import type { Direction } from '../../algorithms/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  value: Direction;
  onChange: (value: Direction) => void;
}

export const DirectionSelector: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div className="space-y-2">
      <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-text-secondary">
        Initial Direction
      </label>
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => onChange('left')}
          className={`flex items-center justify-center gap-2 px-3 py-2 rounded-sm border transition-all font-mono text-xs ${
            value === 'left'
              ? 'bg-secondary/10 border-secondary text-secondary'
              : 'bg-surface border-border text-text-secondary hover:border-border-hover'
          }`}
        >
          <ChevronLeft className="w-3 h-3" />
          Left
        </button>
        <button
          onClick={() => onChange('right')}
          className={`flex items-center justify-center gap-2 px-3 py-2 rounded-sm border transition-all font-mono text-xs ${
            value === 'right'
              ? 'bg-secondary/10 border-secondary text-secondary'
              : 'bg-surface border-border text-text-secondary hover:border-border-hover'
          }`}
        >
          Right
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
