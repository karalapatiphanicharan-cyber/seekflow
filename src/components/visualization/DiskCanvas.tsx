import React from 'react';
import { TrackMarkers } from './TrackMarkers';
import { HeadIndicator } from './HeadIndicator';
import type { SimulationResult } from '../../algorithms/types';

interface Props {
  head: number;
  requests: number[];
  diskSize: number;
  result: SimulationResult | null;
}

export const DiskCanvas: React.FC<Props> = ({ head, requests, diskSize, result }) => {
  return (
    <div className="relative w-full h-48 bg-surface/30 rounded-sm border border-border/50 overflow-hidden">
      {/* Engineering Grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(to right, #2F3B4C 1px, transparent 1px),
            linear-gradient(to bottom, #2F3B4C 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}
      />

      {/* Track Line */}
      <div className="absolute inset-x-10 top-1/2 -translate-y-1/2 h-1 bg-border rounded-full shadow-[0_0_10px_rgba(47,59,76,0.5)]">
        {/* Dynamic Track Path (Phase 2: static lines between sequence) */}
        {result && (
           <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none">
             {result.sequence.map((pos, i) => {
               if (i === 0) return null;
               const x1 = `${(result.sequence[i-1] / (diskSize - 1)) * 100}%`;
               const x2 = `${(pos / (diskSize - 1)) * 100}%`;
               return (
                 <line
                   key={i}
                   x1={x1} y1="50%"
                   x2={x2} y2="50%"
                   stroke="rgba(217, 119, 6, 0.3)"
                   strokeWidth="2"
                 />
               );
             })}
           </svg>
        )}

        {/* Labels */}
        <div className="absolute -bottom-12 left-0 text-[10px] font-mono text-text-secondary">0</div>
        <div className="absolute -bottom-12 left-1/4 -translate-x-1/2 text-[10px] font-mono text-text-secondary opacity-50">
          {Math.floor(diskSize * 0.25)}
        </div>
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-[10px] font-mono text-text-secondary opacity-50">
          {Math.floor(diskSize * 0.5)}
        </div>
        <div className="absolute -bottom-12 left-3/4 -translate-x-1/2 text-[10px] font-mono text-text-secondary opacity-50">
          {Math.floor(diskSize * 0.75)}
        </div>
        <div className="absolute -bottom-12 right-0 text-[10px] font-mono text-text-secondary">
          {diskSize - 1}
        </div>
      </div>

      {/* Markers Container */}
      <div className="absolute inset-x-10 top-1/2 -translate-y-1/2 h-0">
        <TrackMarkers requests={requests} diskSize={diskSize} />
        <HeadIndicator position={result ? result.sequence[result.sequence.length - 1] : head} diskSize={diskSize} />
      </div>
    </div>
  );
};
