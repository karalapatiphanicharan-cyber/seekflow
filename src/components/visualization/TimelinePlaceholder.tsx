import React from 'react';
import type { SimulationResult } from '../../algorithms/types';

interface Props {
  result: SimulationResult | null;
}

export const TimelinePlaceholder: React.FC<Props> = ({ result }) => {
  if (!result) {
    return (
      <div className="p-8 flex flex-col items-center justify-center text-text-secondary border-2 border-dashed border-border/50 m-4 rounded-sm">
        <p className="font-mono text-xs uppercase tracking-widest">Awaiting Simulation</p>
        <p className="text-[10px] mt-2 opacity-50">Configure parameters and click "Run Simulation"</p>
      </div>
    );
  }

  return (
    <div className="p-8 overflow-x-auto">
      <div className="flex items-center min-w-max gap-4">
        {result.sequence.map((track, i) => (
          <React.Fragment key={`${track}-${i}`}>
            <div className="flex flex-col items-center gap-2">
              <div
                className={`w-12 h-12 flex items-center justify-center rounded-sm border-2 font-mono text-sm font-bold transition-colors ${
                  i === 0
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border bg-background text-text-primary'
                }`}
              >
                {track}
              </div>
              <span className="text-[10px] font-mono uppercase text-text-secondary">
                {i === 0 ? 'Start' : `Pos ${i}`}
              </span>
            </div>
            {i < result.sequence.length - 1 && (
              <div className="flex flex-col items-center pt-6">
                <div className="w-12 h-[1px] bg-border relative">
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-surface px-1 text-[8px] font-mono text-text-secondary">
                     {result.movements[i]}
                   </div>
                </div>
              </div>
            )}
          </React.Fragment>
        ))}
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 flex items-center justify-center rounded-sm border-2 border-dashed border-border/50 text-text-secondary font-mono text-[8px] uppercase text-center px-1">
            End
          </div>
        </div>
      </div>
    </div>
  );
};
