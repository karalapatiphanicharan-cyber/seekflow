import React from 'react';

interface Props {
  requests: number[];
  diskSize: number;
  sequence?: number[];
}

export const TrackMarkers: React.FC<Props> = ({ requests, diskSize, sequence = [] }) => {
  const servicedSet = new Set(sequence);

  return (
    <>
      {requests.map((track, i) => {
        const isServiced = servicedSet.has(track);

        return (
          <div
            key={`${track}-${i}`}
            className={`absolute w-1.5 h-1.5 -ml-0.75 -mt-0.75 rounded-full border transition-all duration-300 z-10 ${
              isServiced
                ? 'bg-text-primary/60 border-white/20'
                : 'bg-border border-border/50 opacity-40'
            }`}
            style={{ left: `${(track / (diskSize - 1)) * 100}%`, top: '0' }}
          />
        );
      })}
    </>
  );
};
