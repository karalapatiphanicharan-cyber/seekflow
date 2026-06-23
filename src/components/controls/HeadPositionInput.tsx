import React from 'react';

interface Props {
  value: number;
  onChange: (value: number) => void;
}

export const HeadPositionInput: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div className="space-y-2">
      <label
        htmlFor="head-position"
        className="block text-[10px] font-mono uppercase tracking-[0.2em] text-text-secondary"
      >
        Initial Head Position
      </label>
      <input
        id="head-position"
        type="number"
        className="w-full bg-surface border border-border rounded-sm px-3 py-2 text-sm font-mono focus:outline-none focus:border-primary transition-colors"
        placeholder="53"
        value={isNaN(value) ? '' : value}
        onChange={(e) => onChange(parseInt(e.target.value))}
      />
    </div>
  );
};
