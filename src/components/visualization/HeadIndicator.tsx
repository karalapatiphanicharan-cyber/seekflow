import React from 'react';

interface Props {
  position: number;
  diskSize: number;
  isMinimal?: boolean;
}

export const HeadIndicator: React.FC<Props> = ({ position, diskSize, isMinimal = false }) => {
  return (
    <div
      className="absolute flex flex-col items-center"
      style={{ left: !isMinimal ? `${(position / (diskSize - 1)) * 100}%` : '0' }}
    >
      <div className={`${isMinimal ? 'w-3 h-3 -mt-1.5' : 'w-5 h-5 -mt-2.5'} rounded-full bg-primary border-2 border-primary-hover shadow-[0_0_15px_rgba(217,119,6,0.6)]`} />
      <div className={`${isMinimal ? 'mt-1' : 'mt-2'} px-1.5 py-0.5 bg-primary/20 border border-primary/40 rounded-sm`}>
        <span className={`${isMinimal ? 'text-[8px]' : 'text-[10px]'} font-mono text-primary font-bold`}>{position}</span>
      </div>
    </div>
  );
};
