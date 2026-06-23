import React from 'react';

interface SidebarProps {
  children: React.ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  return (
    <aside className="w-full lg:w-80 flex-shrink-0 border-r border-border bg-surface/30 p-6 space-y-8 overflow-y-auto">
      {children}
    </aside>
  );
};
