import React from 'react';

interface SidebarProps {
  children: React.ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  return (
    <aside className="w-full lg:w-[340px] flex-shrink-0 border-r border-border bg-surface/30 p-5 space-y-6 overflow-y-auto">
      {children}
    </aside>
  );
};
