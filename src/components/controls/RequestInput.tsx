import React from 'react';

export const RequestInput: React.FC = () => {
  return (
    <div className="space-y-2">
      <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-text-secondary">
        Request Sequence
      </label>
      <textarea
        placeholder="98,183,37,122,14,124,65,67"
        rows={4}
        className="w-full bg-surface border border-border rounded-sm px-3 py-2 text-sm font-mono focus:outline-none focus:border-primary transition-colors resize-none"
      />
      <p className="text-[10px] text-text-secondary italic">
        Comma-separated track numbers
      </p>
    </div>
  );
};
