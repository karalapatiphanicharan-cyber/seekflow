import React from 'react';
import type { SimulationResult, Direction } from '../../algorithms/types';
import { HeadIndicator } from './HeadIndicator';
import { TrackMarkers } from './TrackMarkers';
import { motion } from 'framer-motion';

interface Props {
  head: number;
  requests: number[];
  diskSize: number;
  result: SimulationResult | null;
  direction: Direction;
  playbackStep: number;
}

export const DiskCanvas: React.FC<Props> = ({ head, requests, diskSize, result, direction, playbackStep }) => {
  const sequence = result?.sequence || [head];
  const algorithm = result?.algorithm || '';

  // Refined Jump Detection
  const isJump = (from: number, to: number) => {
    if (!algorithm.startsWith('C-')) return false;
    if (direction === 'right' && to < from) return true;
    if (direction === 'left' && to > from) return true;
    return false;
  };

  // Only show up to the current playback step
  const visibleSequence = sequence.slice(0, playbackStep + 1);

  return (
    <div className="relative w-full h-[450px] bg-surface/30 rounded-sm border border-border/50 overflow-hidden group">
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

      {/* Visualization Area */}
      <div className="absolute inset-x-12 inset-y-12">
        {/* Horizontal Axis (Top) */}
        <div className="absolute top-0 w-full h-px bg-border shadow-[0_0_10px_rgba(47,59,76,0.8)]" />

        {/* Axis Labels */}
        <div className="absolute -top-8 left-0 text-[11px] font-mono font-bold text-text-primary tracking-wider">0</div>
        <div className="absolute -top-8 right-0 text-[11px] font-mono font-bold text-text-primary tracking-wider">{diskSize - 1}</div>
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] font-mono text-text-secondary uppercase tracking-[0.2em] opacity-40">
          Track Position Axis
        </div>

        {/* Traversal Path */}
        {visibleSequence.length > 0 && (
           <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none">
             <defs>
                <linearGradient id="path-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#D97706" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#D97706" stopOpacity="1" />
                </linearGradient>
             </defs>

             {visibleSequence.map((pos, i) => {
               if (i === 0) return null;

               const totalSteps = result ? sequence.length : 1;
               const stepHeight = 100 / (totalSteps - 1);
               const y1Val = (i - 1) * stepHeight;
               const y2Val = i * stepHeight;
               const y1 = `${y1Val}%`;
               const y2 = `${y2Val}%`;

               const x1Val = (visibleSequence[i-1] / (diskSize - 1)) * 100;
               const x2Val = (pos / (diskSize - 1)) * 100;
               const x1 = `${x1Val}%`;
               const x2 = `${x2Val}%`;

               const jump = isJump(visibleSequence[i-1], pos);

               return (
                 <motion.g
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                 >
                   <motion.line
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      x1={x1} y1={y1}
                      x2={x2} y2={y2}
                      stroke={jump ? "rgba(156, 163, 175, 0.4)" : "url(#path-gradient)"}
                      strokeWidth={jump ? "1.5" : "2.5"}
                      strokeDasharray={jump ? "4,4" : "0"}
                      strokeLinecap="round"
                   />
                   {jump && (
                     <motion.text
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.7 }}
                        x={`${(x1Val + x2Val) / 2}%`}
                        y={`${(y1Val + y2Val) / 2}%`}
                        dy="-5"
                        textAnchor="middle"
                        className="fill-text-secondary text-[8px] font-mono uppercase tracking-tighter"
                     >
                       Logical Jump
                     </motion.text>
                   )}
                 </motion.g>
               );
             })}
           </svg>
        )}

        {/* Dynamic Markers & Head */}
        <TrackMarkers sequence={visibleSequence} diskSize={diskSize} totalSteps={sequence.length} />

        {visibleSequence.length > 0 && (
          <HeadIndicator
            track={visibleSequence[visibleSequence.length - 1]}
            diskSize={diskSize}
            stepIndex={visibleSequence.length - 1}
            totalSteps={sequence.length}
          />
        )}

        {/* Pending Requests on Axis */}
        <div className="absolute w-full h-full pointer-events-none">
            {requests.map((track, i) => {
                const isCompleted = visibleSequence.includes(track);
                const isCurrent = result && visibleSequence[visibleSequence.length - 1] === track;

                return (
                    <div
                        key={`pending-${track}-${i}`}
                        className={`absolute top-0 w-1.5 h-1.5 -ml-0.75 -mt-0.75 rounded-full border transition-all duration-300 ${
                            isCurrent
                                ? 'bg-primary border-primary scale-150 z-20 shadow-[0_0_8px_rgba(217,119,6,0.8)]'
                                : isCompleted
                                    ? 'bg-success/40 border-success/20 scale-100'
                                    : 'bg-text-secondary/20 border-border/50 scale-100'
                        }`}
                        style={{ left: `${(track / (diskSize - 1)) * 100}%` }}
                    />
                );
            })}
        </div>

        {/* Legend */}
        <div className="absolute -bottom-8 left-0 flex gap-6 opacity-80">
            <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-secondary" />
                <span className="text-[9px] font-mono uppercase tracking-wider text-text-secondary">Start</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                <span className="text-[9px] font-mono uppercase tracking-wider text-text-secondary">Current Head</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-4 h-px border-t border-dashed border-text-secondary/50" />
                <span className="text-[9px] font-mono uppercase tracking-wider text-text-secondary">Logical Jump</span>
            </div>
        </div>
      </div>
    </div>
  );
};
