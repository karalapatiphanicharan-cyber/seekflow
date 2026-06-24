import React, { useEffect, useRef } from 'react';
import type { SimulationResult } from '../../algorithms/types';

interface Props {
  result: SimulationResult | null;
  playbackStep: number;
}

export const TimelinePlaceholder: React.FC<Props> = ({ result, playbackStep }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
        const activeNode = containerRef.current.querySelector('[data-active="true"]');
        if (activeNode) {
            activeNode.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
    }
  }, [playbackStep]);

  if (!result) {
    return (
      <div className="p-8 flex flex-col items-center justify-center text-text-secondary border-2 border-dashed border-border/50 m-4 rounded-sm">
        <p className="font-mono text-xs uppercase tracking-widest">Awaiting Simulation</p>
        <p className="text-[10px] mt-2 opacity-50">Configure parameters and click "Run Simulation"</p>
      </div>
    );
  }

  return (
    <div className="p-8 overflow-x-auto" ref={containerRef}>
      <div className="flex items-center min-w-max gap-4 pb-4">
        {result.sequence.map((track, i) => {
          const isCompleted = i < playbackStep;
          const isActive = i === playbackStep;

          return (
            <React.Fragment key={`${track}-${i}`}>
                <div
                    className="flex flex-col items-center gap-2"
                    data-active={isActive}
                >
                <div
                    className={`w-12 h-12 flex items-center justify-center rounded-sm border-2 font-mono text-sm font-bold transition-all duration-300 ${
                    isActive
                        ? 'border-primary bg-primary/20 text-primary scale-110 shadow-[0_0_15px_rgba(217,119,6,0.3)] z-10'
                        : isCompleted
                            ? 'border-success bg-success/10 text-success shadow-[0_0_10px_rgba(21,128,61,0.2)]'
                            : 'border-border bg-background text-text-primary/20'
                    }`}
                >
                    {track}
                </div>
                <span className={`text-[10px] font-mono uppercase transition-colors duration-300 ${
                    isActive ? 'text-primary font-bold' : isCompleted ? 'text-success' : 'text-text-secondary/40'
                }`}>
                    {i === 0 ? 'Start' : isCompleted ? 'Served' : isActive ? 'Active' : 'Pending'}
                </span>
                </div>
                {i < result.sequence.length - 1 && (
                <div className="flex flex-col items-center pt-6">
                    <div className={`w-12 h-[1px] relative transition-colors duration-300 ${
                        isCompleted ? 'bg-success/50' : 'bg-border/30'
                    }`}>
                    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-1 text-[8px] font-mono transition-colors duration-300 ${
                        isCompleted ? 'bg-surface text-success' : 'bg-surface text-text-secondary/30'
                    }`}>
                        {result.movements[i]}
                    </div>
                    </div>
                </div>
                )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
