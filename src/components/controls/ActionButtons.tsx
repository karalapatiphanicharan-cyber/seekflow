import React from 'react';
import { Play, RotateCcw, Shuffle, FileInput } from 'lucide-react';
import { Button } from '../ui/Button';

export const ActionButtons: React.FC = () => {
  return (
    <div className="space-y-3 pt-4">
      <Button variant="primary" fullWidth className="gap-2">
        <Play size={16} /> Run Simulation
      </Button>

      <div className="grid grid-cols-2 gap-2">
        <Button variant="outline" className="gap-2 text-[10px]">
          <Shuffle size={14} /> Random
        </Button>
        <Button variant="outline" className="gap-2 text-[10px]">
          <FileInput size={14} /> Example
        </Button>
      </div>

      <Button variant="outline" fullWidth className="gap-2 text-error border-error/20 hover:bg-error/10 hover:border-error/50">
        <RotateCcw size={16} /> Reset
      </Button>
    </div>
  );
};
