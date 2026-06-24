import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  track: number;
  diskSize: number;
  stepIndex: number;
  totalSteps: number;
}

export const HeadIndicator: React.FC<Props> = ({ track, diskSize, stepIndex, totalSteps }) => {
  const left = `${(track / (diskSize - 1)) * 100}%`;
  const stepHeight = totalSteps > 1 ? 100 / (totalSteps - 1) : 0;
  const top = `${stepIndex * stepHeight}%`;

  return (
    <motion.div
      initial={false}
      animate={{ left, top }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        mass: 1
      }}
      className="absolute z-30"
      style={{ left, top }}
    >
      <div className="relative flex flex-col items-center">
        {/* Pulse effect */}
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.4, 0, 0.4]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute w-8 h-8 -ml-4 -mt-4 rounded-full bg-primary/30"
        />

        {/* Main Head Marker */}
        <div className="w-6 h-6 -ml-3 -mt-3 rounded-full bg-primary border-2 border-primary-hover shadow-[0_0_20px_rgba(217,119,6,0.6)] flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_5px_white]" />
        </div>

        {/* Label */}
        <div className="absolute top-5 whitespace-nowrap px-2 py-1 bg-primary border border-primary-hover rounded-sm shadow-lg">
            <span className="text-[11px] font-mono text-white font-bold tracking-tight">{track}</span>
        </div>

        {/* Vertical Guideline to Axis (Upwards) */}
        <div
          className="absolute bottom-3 w-px border-l border-primary/30 border-dashed -z-10"
          style={{ height: '500px', transform: 'translateY(-100%)' }}
        />
      </div>
    </motion.div>
  );
};
