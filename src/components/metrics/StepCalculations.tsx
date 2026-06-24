import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Calculator } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { SimulationResult } from '../../algorithms/types';

interface Props {
  result: SimulationResult | null;
  playbackStep: number;
}

interface Calculation {
  step: number;
  source: number;
  destination: number;
  distance: number;
  runningTotal: number;
}

export const StepCalculations: React.FC<Props> = ({ result, playbackStep }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!result) return null;

  // We only show calculations up to the current playback step
  const calculations: Calculation[] = result.sequence.slice(0, playbackStep + 1).map((track, i) => {
    if (i === 0) return null;
    const source = result.sequence[i - 1];
    const destination = track;
    const distance = result.movements[i - 1];

    let runningTotal = 0;
    for (let j = 0; j < i; j++) {
        runningTotal += result.movements[j];
    }

    return {
      step: i,
      source,
      destination,
      distance,
      runningTotal
    };
  }).filter((c): c is Calculation => c !== null);

  return (
    <div className="mt-6">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 bg-surface/30 border border-border/50 rounded-sm hover:bg-surface/50 transition-colors group"
      >
        <div className="flex items-center gap-3">
          <Calculator size={18} className="text-primary" />
          <h3 className="text-sm font-mono font-bold uppercase tracking-widest text-text-primary">
            Step-by-Step Seek Calculations
          </h3>
          <span className="text-[10px] font-mono text-text-secondary bg-background/50 px-2 py-0.5 rounded-full opacity-60">
            {calculations.length} Steps Logged
          </span>
        </div>
        {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-4 space-y-4 border-x border-b border-border/50 bg-background/20 rounded-b-sm">
              {calculations.length === 0 ? (
                <p className="text-xs text-text-secondary font-mono italic p-4 text-center">
                  Start playback to see detailed calculations.
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {calculations.map((calc) => (
                    <div
                        key={calc.step}
                        className="p-3 bg-surface/20 border border-border/30 rounded-sm font-mono"
                    >
                      <div className="flex justify-between items-center mb-2 border-b border-border/20 pb-1">
                        <span className="text-[10px] text-primary font-bold">STEP {calc.step}</span>
                        <span className="text-[10px] text-text-secondary">{calc.source} → {calc.destination}</span>
                      </div>

                      <div className="space-y-1.5 text-[11px]">
                        <div>
                          <p className="text-text-secondary uppercase text-[8px] tracking-tighter">Formula</p>
                          <p className="text-text-primary">|{calc.destination} - {calc.source}| = {calc.distance}</p>
                        </div>
                        <div className="flex justify-between">
                          <div>
                            <p className="text-text-secondary uppercase text-[8px] tracking-tighter">Seek Distance</p>
                            <p className="text-text-primary font-bold">{calc.distance} tracks</p>
                          </div>
                          <div className="text-right">
                            <p className="text-text-secondary uppercase text-[8px] tracking-tighter">Running Total</p>
                            <p className="text-success font-bold">{calc.runningTotal} tracks</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
