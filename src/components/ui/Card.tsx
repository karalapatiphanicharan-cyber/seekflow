import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '', title }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`bg-surface border border-border rounded-sm overflow-hidden ${className}`}
    >
      {title && (
        <div className="px-4 py-2 border-b border-border bg-background/50 text-xs font-mono uppercase tracking-wider text-text-secondary">
          {title}
        </div>
      )}
      <div className="p-4">
        {children}
      </div>
    </motion.div>
  );
};
