import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  track: number;
  diskSize: number;
  stepIndex: number;
  totalSteps: number;
  isStart?: boolean;
}

export const TrackMarker: React.FC<Props> = ({ track, diskSize, stepIndex, totalSteps, isStart }) => {
  const left = `${(track / (diskSize - 1)) * 100}%`;
  const stepHeight = 100 / (totalSteps - 1);
  const top = `${stepIndex * stepHeight}%`;

  if (isStart) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        className="absolute z-20"
        style={{ left, top }}
      >
        <div className="relative flex flex-col items-center">
            <div className="w-4 h-4 -ml-2 -mt-2 rounded-full bg-secondary border-2 border-secondary-hover shadow-[0_0_15px_rgba(37,99,235,0.4)]" />
            <div className="absolute -top-6 whitespace-nowrap px-1.5 py-0.5 bg-secondary/10 border border-secondary/30 rounded-sm">
                <span className="text-[9px] font-mono text-secondary font-bold uppercase tracking-wider">Start {track}</span>
            </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div
      className="absolute z-10"
      style={{ left, top }}
    >
        <div className="w-2.5 h-2.5 -ml-1.25 -mt-1.25 rounded-full bg-text-primary/30 border border-white/10 hover:bg-text-primary/60 transition-colors cursor-help group/marker">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover/marker:opacity-100 transition-opacity whitespace-nowrap bg-background/90 px-1.5 py-0.5 rounded border border-border pointer-events-none shadow-xl z-50">
                <span className="text-[9px] font-mono text-text-secondary">Track {track} <span className="text-text-primary/50 mx-1">|</span> Step {stepIndex}</span>
            </div>
        </div>
    </div>
  );
};

interface TrackMarkersProps {
  sequence: number[];
  diskSize: number;
}

export const TrackMarkers: React.FC<TrackMarkersProps> = ({ sequence, diskSize }) => {
  // We only render intermediate and start markers here.
  // The final head is handled by HeadIndicator.
  return (
    <>
      {sequence.map((track, i) => {
        if (i === sequence.length - 1) return null; // Final head
        return (
          <TrackMarker
            key={`marker-${i}`}
            track={track}
            diskSize={diskSize}
            stepIndex={i}
            totalSteps={sequence.length}
            isStart={i === 0}
          />
        );
      })}
    </>
  );
};
