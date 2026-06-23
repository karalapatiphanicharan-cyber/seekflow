import React from 'react';

const ALGORITHMS = ['FCFS', 'SSTF', 'SCAN', 'C-SCAN', 'LOOK', 'C-LOOK'];

export const AlgorithmSelector: React.FC = () => {
  return (
    <div className="space-y-2">
      <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-text-secondary">
        Scheduling Algorithm
      </label>
      <select
        className="w-full bg-surface border border-border rounded-sm px-3 py-2 text-sm font-mono focus:outline-none focus:border-primary transition-colors appearance-none"
        defaultValue="FCFS"
      >
        {ALGORITHMS.map(algo => (
          <option key={algo} value={algo}>{algo}</option>
        ))}
      </select>
    </div>
  );
};
