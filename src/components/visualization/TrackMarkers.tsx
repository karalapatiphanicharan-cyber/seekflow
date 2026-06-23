import React from 'react';

interface TrackMarkersProps {
  diskSize: number;
}

export const TrackMarkers: React.FC<TrackMarkersProps> = ({ diskSize }) => {
  // Show markers every 20 or 50 tracks depending on size
  const step = diskSize > 500 ? 100 : 50;
  const markers = [];
  for (let i = 0; i <= diskSize; i += step) {
    markers.push(i);
  }

  // Ensure the last track is always marked
  if (markers[markers.length - 1] !== diskSize) {
    markers.push(diskSize);
  }

  return (
    <div className="absolute inset-x-0 -bottom-8 flex justify-between px-[2%]">
      {markers.map((m) => (
        <div key={m} className="flex flex-col items-center">
          <div className="w-px h-2 bg-border"></div>
          <span className="text-[10px] font-mono text-text-secondary mt-1">{m}</span>
        </div>
      ))}
    </div>
  );
};
