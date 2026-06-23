import React from 'react';

interface Props {
  position: number;
  diskSize: number;
}

export const HeadIndicator: React.FC<Props> = ({ position, diskSize }) => {
  return (
    <div
      className="absolute flex flex-col items-center"
      style={{ left: `${(position / (diskSize - 1)) * 100}%` }}
    >
      <div className="w-5 h-5 -mt-2.5 rounded-full bg-primary border-2 border-primary-hover shadow-[0_0_15px_rgba(217,119,6,0.6)]" />
      <div className="mt-2 px-1.5 py-0.5 bg-primary/20 border border-primary/40 rounded-sm">
        <span className="text-[10px] font-mono text-primary font-bold">{position}</span>
      </div>
    </div>
  );
};
