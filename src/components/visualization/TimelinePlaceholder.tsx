import React from 'react';
import { motion } from 'framer-motion';

export const TimelinePlaceholder: React.FC = () => {
  const steps = [
    { track: 53, type: 'head' },
    { track: 98, type: 'request' },
    { track: 183, type: 'request' },
    { track: 37, type: 'request' },
    { track: 122, type: 'request' },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-xs font-mono uppercase tracking-widest text-text-secondary flex items-center gap-2">
        Execution Timeline
        <span className="h-px flex-1 bg-border"></span>
      </h3>

      <div className="relative h-24 flex items-center px-4 overflow-x-auto">
        {steps.map((step, i) => (
          <React.Fragment key={i}>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className={`flex-shrink-0 w-10 h-10 rounded-full border-2 flex items-center justify-center text-[10px] font-mono font-bold
                ${step.type === 'head' ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-surface text-text-secondary'}
              `}
            >
              {step.track}
            </motion.div>

            {i < steps.length - 1 && (
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 40 }}
                transition={{ delay: i * 0.1 + 0.05 }}
                className="h-0.5 bg-border flex-shrink-0"
              ></motion.div>
            )}
          </React.Fragment>
        ))}

        <div className="flex-shrink-0 ml-4 px-4 py-2 border border-dashed border-border rounded-sm text-[10px] font-mono text-text-secondary italic">
          More steps will appear during simulation...
        </div>
      </div>
    </div>
  );
};
