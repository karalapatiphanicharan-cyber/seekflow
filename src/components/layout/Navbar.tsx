import React from 'react';
import { Disc, FileText, BarChart2, Github, Moon } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-screen-2xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-primary p-1.5 rounded-sm">
            <Disc className="w-5 h-5 text-text-primary" />
          </div>
          <span className="text-xl font-bold tracking-tighter uppercase italic">
            Seek<span className="text-primary">Flow</span>
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
