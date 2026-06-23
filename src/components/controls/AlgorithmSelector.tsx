import React from 'react';
import type { AlgorithmType } from '../../hooks/useSimulation';
import { ALGORITHMS } from '../../hooks/useSimulation';

interface Props {
  value: AlgorithmType;
  onChange: (value: AlgorithmType) => void;
}

export const AlgorithmSelector: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div className="space-y-2">
      <label
        htmlFor="algo-selector"
        className="block text-[10px] font-mono uppercase tracking-[0.2em] text-text-secondary"
      >
        Scheduling Algorithm
      </label>
      <select
        id="algo-selector"
        className="w-full bg-surface border border-border rounded-sm px-3 py-2 text-sm font-mono focus:outline-none focus:border-primary transition-colors appearance-none"
        value={value}
        onChange={(e) => onChange(e.target.value as AlgorithmType)}
      >
        {ALGORITHMS.map(algo => (
          <option key={algo} value={algo}>{algo}</option>
        ))}
      </select>
    </div>
  );
};
