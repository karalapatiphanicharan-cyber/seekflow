import React from 'react';

export const DiskSizeInput: React.FC = () => {
  return (
    <div className="space-y-2">
      <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-text-secondary">
        Disk Size (Tracks)
      </label>
      <input
        type="number"
        placeholder="200"
        className="w-full bg-surface border border-border rounded-sm px-3 py-2 text-sm font-mono focus:outline-none focus:border-primary transition-colors"
      />
    </div>
  );
};
