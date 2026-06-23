import React from 'react';
import { Button } from '../ui/Button';
import { Play, RotateCcw, Dice5, Database } from 'lucide-react';

interface Props {
  onRun: () => void;
  onRandom: () => void;
  onExample: () => void;
  onReset: () => void;
}

export const ActionButtons: React.FC<Props> = ({ onRun, onRandom, onExample, onReset }) => {
  return (
    <div className="space-y-3 pt-2">
      <Button
        className="w-full py-2.5 text-sm uppercase tracking-widest font-bold"
        onClick={onRun}
      >
        <Play className="w-4 h-4 mr-2 fill-current" />
        Run Simulation
      </Button>

      <div className="grid grid-cols-2 gap-2">
        <Button
          variant="secondary"
          className="py-2 text-[10px] uppercase tracking-wider"
          onClick={onRandom}
        >
          <Dice5 className="w-3 h-3 mr-1.5" />
          Random
        </Button>
        <Button
          variant="secondary"
          className="py-2 text-[10px] uppercase tracking-wider"
          onClick={onExample}
        >
          <Database className="w-3 h-3 mr-1.5" />
          Example
        </Button>
      </div>

      <button
        onClick={onReset}
        className="w-full flex items-center justify-center gap-2 py-2 text-[10px] text-text-secondary hover:text-primary transition-colors uppercase tracking-widest font-mono group"
      >
        <RotateCcw className="w-3 h-3 group-hover:rotate-[-45deg] transition-transform" />
        Reset
      </button>
    </div>
  );
};
