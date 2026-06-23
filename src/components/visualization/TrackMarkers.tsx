import React from 'react';

interface TrackMarkersProps {
  diskSize: number;
}

export const TrackMarkers: React.FC<TrackMarkersProps> = ({ diskSize }) => {
  const step = diskSize > 500 ? 100 : 50;
  const markers = [];
  for (let i = 0; i <= diskSize; i += step) {
    markers.push(i);
  }

  if (markers[markers.length - 1] !== diskSize) {
    markers.push(diskSize);
  }

  return (
    <div className="absolute inset-x-0 -bottom-10 flex justify-between px-[2%]">
      {markers.map((m) => (
        <div key={m} className="flex flex-col items-center">
          <div className="w-px h-3 bg-border"></div>
          <span className="text-xs font-mono text-text-secondary mt-1.5 font-medium">{m}</span>
        </div>
      ))}
    </div>
  );
};
