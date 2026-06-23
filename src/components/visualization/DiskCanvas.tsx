import React from 'react';
import { HeadIndicator } from './HeadIndicator';
import type { SimulationResult } from '../../algorithms/types';

interface Props {
  head: number;
  requests: number[];
  diskSize: number;
  result: SimulationResult | null;
}

export const DiskCanvas: React.FC<Props> = ({ head, requests, diskSize, result }) => {
  const sequence = result?.sequence || [];

  return (
    <div className="relative w-full h-80 bg-surface/30 rounded-sm border border-border/50 overflow-hidden">
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

      {/* Track Boundary Area */}
      <div className="absolute inset-x-10 inset-y-10">
        {/* Physical Track Guide (Top) */}
        <div className="absolute top-0 w-full h-0.5 bg-border/20 rounded-full" />

        {/* Request Markers on Top Guide (Static) */}
        {requests.map((track, i) => (
            <div
                key={`static-${track}-${i}`}
                className="absolute w-1 h-3 -ml-0.5 -mt-1.5 bg-border/40"
                style={{ left: `${(track / (diskSize - 1)) * 100}%` }}
            />
        ))}

        {/* Traversal Path (Zigzag) */}
        {result && (
           <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none">
             {sequence.map((pos, i) => {
               if (i === 0) return null;

               const stepHeight = 100 / (sequence.length - 1);
               const y1 = `${(i - 1) * stepHeight}%`;
               const y2 = `${i * stepHeight}%`;

               const x1 = `${(sequence[i-1] / (diskSize - 1)) * 100}%`;
               const x2 = `${(pos / (diskSize - 1)) * 100}%`;

               return (
                 <line
                    key={i}
                    x1={x1} y1={y1}
                    x2={x2} y2={y2}
                    stroke="#D97706"
                    strokeWidth="1.5"
                    strokeOpacity={0.6}
                 />
               );
             })}
           </svg>
        )}

        {/* Dynamic Markers on Path */}
        {result && sequence.map((track, i) => {
            const stepHeight = 100 / (sequence.length - 1);
            const isFinal = i === sequence.length - 1;
            const isStart = i === 0;

            return (
                <div
                    key={`step-${i}`}
                    className="absolute"
                    style={{
                        left: `${(track / (diskSize - 1)) * 100}%`,
                        top: `${i * stepHeight}%`
                    }}
                >
                    {isFinal ? (
                        <div className="-translate-y-1/2">
                           <HeadIndicator position={track} diskSize={diskSize} isMinimal />
                        </div>
                    ) : (
                        <div className={`w-2 h-2 -ml-1 -mt-1 rounded-full border transition-colors ${
                            isStart
                                ? 'bg-secondary border-secondary-hover shadow-[0_0_5px_rgba(37,99,235,0.5)]'
                                : 'bg-text-primary/40 border-white/10'
                        }`} />
                    )}

                    {/* Step label */}
                    {!isFinal && (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[8px] font-mono text-text-secondary opacity-40 whitespace-nowrap">
                            {isStart ? 'START' : `STEP ${i}`}
                        </div>
                    )}
                </div>
            );
        })}

        {/* Initial state (no simulation) */}
        {!result && (
            <div
                className="absolute"
                style={{ left: `${(head / (diskSize - 1)) * 100}%`, top: '0' }}
            >
                <HeadIndicator position={head} diskSize={diskSize} />
            </div>
        )}

        {/* Boundary Labels */}
        <div className="absolute -top-7 left-0 text-[10px] font-mono text-text-secondary">0</div>
        <div className="absolute -top-7 right-0 text-[10px] font-mono text-text-secondary">{diskSize - 1}</div>
      </div>
    </div>
  );
};
