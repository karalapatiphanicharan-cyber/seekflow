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
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border shadow-sm">
      <div className="max-w-screen-2xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3 group cursor-default">
          <div className="text-primary transition-transform group-hover:scale-110 duration-300">
            <SeekFlowLogo />
          </div>
          <span className="text-xl font-bold tracking-tighter italic select-none">
            <span className="text-text-primary">Seek</span>
            <span className="text-primary">Flow</span>
          </span>
        </div>

        <div className="flex items-center gap-2 md:gap-4 text-sm font-mono">
          <a
            href="#"
            className="px-3 py-2 text-text-secondary hover:text-text-primary hover:bg-surface/50 rounded-sm transition-all duration-200 flex items-center gap-2"
          >
            <FileText size={18} className="opacity-80" />
            <span className="hidden sm:inline font-medium">Documentation</span>
          </a>

          <a
            href="#"
            className="px-3 py-2 text-text-secondary hover:text-text-primary hover:bg-surface/50 rounded-sm transition-all duration-200 flex items-center gap-2"
          >
            <BarChart2 size={18} className="opacity-80" />
            <span className="hidden sm:inline font-medium">Compare</span>
          </a>

          <div className="w-px h-6 bg-border mx-1 hidden sm:block" />

          <a
            href="#"
            className="p-2 text-text-secondary hover:text-text-primary hover:bg-surface/50 rounded-sm transition-all duration-200"
            aria-label="GitHub Repository"
          >
            <Github size={20} />
          </a>

          <button
            className="p-2 text-text-secondary hover:text-text-primary hover:bg-surface/50 rounded-sm transition-all duration-200"
            aria-label="Toggle Theme"
          >
            <Moon size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
};
