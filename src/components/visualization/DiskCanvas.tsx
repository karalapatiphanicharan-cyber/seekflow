import React from 'react';
import { TrackMarkers } from './TrackMarkers';
import { HeadIndicator } from './HeadIndicator';

export const DiskCanvas: React.FC = () => {
  const diskSize = 200;
  const currentHead = 53;
  const requests = [98, 183, 37, 122, 14, 124, 65, 67];

  return (
    <div className="relative w-full h-64 bg-surface/40 border border-border/60 rounded-sm overflow-visible mb-12">
      {/* Engineering Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #2F3B4C 1px, transparent 1px),
            linear-gradient(to bottom, #2F3B4C 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px'
        }}
      ></div>

      {/* Main Track Line */}
      <div className="absolute top-1/2 left-[2%] right-[2%] h-1 bg-border/40 rounded-full -translate-y-1/2"></div>

      {/* Request Markers */}
      {requests.map((req, i) => (
        <div
          key={i}
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-text-secondary hover:bg-text-primary transition-colors cursor-help rounded-full border-2 border-background z-10 shadow-sm"
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
