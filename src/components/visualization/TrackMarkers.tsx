import React from 'react';

interface Props {
  requests: number[];
  diskSize: number;
}

export const TrackMarkers: React.FC<Props> = ({ requests, diskSize }) => {
  return (
    <>
      {requests.map((track, i) => (
        <div
          key={`${track}-${i}`}
          className="absolute w-2.5 h-2.5 -ml-1.25 -mt-1.25 rounded-full bg-text-primary/40 border border-white/20 shadow-[0_0_5px_rgba(255,255,255,0.2)]"
          style={{ left: `${(track / (diskSize - 1)) * 100}%` }}
        />
      ))}
    </>
  );
};
