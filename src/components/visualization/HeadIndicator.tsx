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
      <div className="w-4 h-4 bg-primary rounded-full border-2 border-background shadow-[0_0_10px_rgba(217,119,6,0.5)]"></div>

      {/* Label */}
      <div className="mt-2 bg-primary/10 border border-primary/30 px-1.5 py-0.5 rounded-sm">
        <span className="text-[10px] font-mono font-bold text-primary">{position}</span>
      </div>

      {/* Vertical line through track */}
      <div className="absolute top-1/2 -translate-y-1/2 w-px h-16 bg-primary/40 -z-10"></div>
    </motion.div>
  );
};
