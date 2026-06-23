import React from 'react';

interface Props {
  requests: number[];
  diskSize: number;
  sequence?: number[];
}

export const TrackMarkers: React.FC<Props> = ({ requests, diskSize, sequence }) => {
  // Use a set for quick lookup of request tracks
  const requestSet = new Set(requests);

  // Identify boundary visits or jump points that aren't in original requests
  const auxiliaryPoints = sequence
    ? sequence.filter(track => !requestSet.has(track))
    : [];

  return (
    <>
      {/* Original Requests */}
      {requests.map((track, i) => (
        <div
          key={`req-${track}-${i}`}
          className="absolute w-2.5 h-2.5 -ml-1.25 -mt-1.25 rounded-full bg-text-primary/40 border border-white/20 shadow-[0_0_5px_rgba(255,255,255,0.2)] z-10"
          style={{ left: `${(track / (diskSize - 1)) * 100}%` }}
        />
      ))}

      {/* Auxiliary points like boundary visits or jumps */}
      {auxiliaryPoints.map((track, i) => (
        <div
          key={`aux-${track}-${i}`}
          className="absolute w-1.5 h-1.5 -ml-0.75 -mt-0.75 rounded-full bg-border border border-border/50 z-0 opacity-50"
          style={{ left: `${(track / (diskSize - 1)) * 100}%` }}
        />
      ))}
    </>
  );
};
