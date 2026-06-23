import React from 'react';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const RequestInput: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div className="space-y-2">
      <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-text-secondary">
        Request Sequence
      </label>
      <textarea
        className="w-full h-24 bg-surface border border-border rounded-sm px-3 py-2 text-sm font-mono focus:outline-none focus:border-primary transition-colors resize-none placeholder:text-text-secondary/60"
        placeholder="98, 183, 37, 122, 14, 124, 65, 67"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <p className="text-[10px] text-text-secondary italic">
        Comma-separated track numbers
      </p>
    </div>
  );
};
