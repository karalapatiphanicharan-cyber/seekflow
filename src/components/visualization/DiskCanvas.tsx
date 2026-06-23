import React from 'react';
import { TrackMarkers } from './TrackMarkers';
import { HeadIndicator } from './HeadIndicator';

export const DiskCanvas: React.FC = () => {
  const diskSize = 200;
  const currentHead = 53;
  const requests = [98, 183, 37, 122, 14, 124, 65, 67];

  return (
    <div className="relative w-full h-48 bg-surface/50 border border-border rounded-sm overflow-visible mb-12">
      {/* Engineering Grid Background */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(to right, #2F3B4C 1px, transparent 1px),
            linear-gradient(to bottom, #2F3B4C 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}
      ></div>

      {/* Main Track Line */}
      <div className="absolute top-1/2 left-[2%] right-[2%] h-0.5 bg-border -translate-y-1/2"></div>

      {/* Request Markers */}
      {requests.map((req, i) => (
        <div
          key={i}
          className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-text-secondary rounded-full border border-background z-10"
          style={{ left: `${(req / diskSize) * 100}%` }}
          title={`Request: ${req}`}
        ></div>
      ))}

      {/* Head Indicator */}
      <HeadIndicator position={currentHead} diskSize={diskSize} />

      {/* Track Labels */}
      <TrackMarkers diskSize={diskSize} />
    </div>
  );
};
