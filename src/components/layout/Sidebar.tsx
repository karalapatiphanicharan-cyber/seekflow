import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  children: React.ReactNode;
  isCollapsed: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ children, isCollapsed }) => {
  return (
    <motion.aside
      initial={false}
      animate={{
        width: isCollapsed ? 0 : 340,
        opacity: isCollapsed ? 0 : 1,
      }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="relative flex-shrink-0 bg-surface/30 border-r border-border overflow-hidden flex flex-col"
    >
      <div className="w-[340px] flex-1 p-5 space-y-6 overflow-y-auto">
        <AnimatePresence initial={false}>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.aside>
  );
};
