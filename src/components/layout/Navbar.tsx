import React from 'react';
import { FileText, BarChart2, Github, Moon } from 'lucide-react';

const SeekFlowLogo = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.5" strokeOpacity="0.2"/>
    <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    <circle cx="12" cy="12" r="3" fill="currentColor"/>
    <rect x="13" y="11" width="8" height="2" rx="1" fill="currentColor"/>
  </svg>
);

export const Navbar: React.FC = () => {
  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-screen-2xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-primary">
            <SeekFlowLogo />
          </div>
          <span className="text-xl font-bold tracking-tighter italic">
            <span className="text-text-primary">Seek</span>
            <span className="text-primary">Flow</span>
          </span>
        </div>

        <div className="flex items-center gap-3 md:gap-6 text-sm font-mono text-text-secondary">
          <a href="#" className="hover:text-text-primary transition-colors flex items-center gap-1">
            <FileText size={16} /> <span className="hidden sm:inline">Documentation</span>
          </a>
          <a href="#" className="hover:text-text-primary transition-colors flex items-center gap-1">
            <BarChart2 size={16} /> <span className="hidden sm:inline">Compare</span>
          </a>
          <a href="#" className="hover:text-text-primary transition-colors">
            <Github size={18} />
          </a>
          <button className="p-2 hover:bg-surface rounded-sm transition-colors text-text-secondary">
            <Moon size={18} />
          </button>
        </div>
      </div>
    </nav>
  );
};
