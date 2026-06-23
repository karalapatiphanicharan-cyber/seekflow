import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const DirectionSelector: React.FC = () => {
  return (
    <div className="space-y-2">
      <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-text-secondary">
        Initial Direction
      </label>
      <div className="grid grid-cols-2 gap-2">
        <label className="relative cursor-pointer group">
          <input type="radio" name="direction" value="left" className="peer sr-only" defaultChecked />
          <div className="flex items-center justify-center gap-2 px-3 py-2 bg-surface border border-border rounded-sm text-xs font-mono peer-checked:border-primary peer-checked:text-primary transition-all group-hover:border-border/80">
            <ChevronLeft size={14} /> Left
          </div>
        </label>
        <label className="relative cursor-pointer group">
          <input type="radio" name="direction" value="right" className="peer sr-only" />
          <div className="flex items-center justify-center gap-2 px-3 py-2 bg-surface border border-border rounded-sm text-xs font-mono peer-checked:border-primary peer-checked:text-primary transition-all group-hover:border-border/80">
            Right <ChevronRight size={14} />
          </div>
        </label>
      </div>
    </div>
  );
};
