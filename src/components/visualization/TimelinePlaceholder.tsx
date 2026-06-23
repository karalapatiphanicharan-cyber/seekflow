import React from 'react';
import { motion } from 'framer-motion';

export const TimelinePlaceholder: React.FC = () => {
  const steps = [
    { track: 53, type: 'head', label: 'Start' },
    { track: 98, type: 'request', label: 'Req 1' },
    { track: 183, type: 'request', label: 'Req 2' },
    { track: 37, type: 'request', label: 'Req 3' },
    { track: 122, type: 'request', label: 'Req 4' },
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-text-secondary flex items-center gap-3">
        Execution Flow
        <span className="h-px flex-1 bg-border/50"></span>
      </h3>

      <div className="relative flex items-center px-6 py-4 overflow-x-auto no-scrollbar">
        {steps.map((step, i) => (
          <React.Fragment key={i}>
            <div className="flex flex-col items-center gap-2 flex-shrink-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1, duration: 0.3 }}
                className={`w-12 h-12 rounded-sm border-2 flex items-center justify-center text-xs font-mono font-bold transition-colors
                  ${step.type === 'head'
                    ? 'border-primary bg-primary/10 text-primary shadow-[0_0_10px_rgba(217,119,6,0.2)]'
                    : 'border-border bg-surface text-text-secondary hover:border-text-secondary/50'}
                `}
              >
                {step.track}
              </motion.div>
              <span className="text-[10px] font-mono text-text-secondary uppercase tracking-tighter opacity-70">
                {step.label}
              </span>
            </div>

            {i < steps.length - 1 && (
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: i * 0.1 + 0.1, duration: 0.4 }}
                className="w-16 h-px bg-border flex-shrink-0 origin-left mx-2 mb-6"
              ></motion.div>
            )}
          </React.Fragment>
        ))}

        <div className="flex-shrink-0 ml-8 mb-6 flex items-center gap-3">
          <div className="w-16 h-px border-t-2 border-dashed border-border/40"></div>
          <div className="px-4 py-2 border border-dashed border-border rounded-sm text-[10px] font-mono text-text-secondary italic uppercase tracking-wider">
            Processing...
          </div>
        </div>
      </div>
    </div>
  );
};
