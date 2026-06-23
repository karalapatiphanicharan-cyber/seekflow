import React from 'react';
import { motion } from 'framer-motion';

interface HeadIndicatorProps {
  position: number;
  diskSize: number;
}

export const HeadIndicator: React.FC<HeadIndicatorProps> = ({ position, diskSize }) => {
  const leftPercentage = (position / diskSize) * 100;

  return (
    <motion.div
      className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center z-20"
      initial={{ left: `${leftPercentage}%` }}
      animate={{ left: `${leftPercentage}%` }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {/* Head icon/shape */}
      <div className="w-5 h-5 bg-primary rounded-full border-2 border-background shadow-[0_0_15px_rgba(217,119,6,0.6)]"></div>

      {/* Label */}
      <div className="mt-3 bg-primary/20 border border-primary/40 px-2 py-1 rounded-sm backdrop-blur-sm">
        <span className="text-xs font-mono font-bold text-primary">{position}</span>
      </div>

      {/* Vertical line through track */}
      <div className="absolute top-1/2 -translate-y-1/2 w-0.5 h-24 bg-primary/30 -z-10"></div>
    </motion.div>
  );
};
