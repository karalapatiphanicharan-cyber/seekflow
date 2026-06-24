import React from 'react';
import { BarChart2, Github } from 'lucide-react';
import { PlaybackControls } from '../controls/PlaybackControls';

const SeekFlowLogo = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.5" strokeOpacity="0.2"/>
    <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    <circle cx="12" cy="12" r="3" fill="currentColor"/>
    <rect x="13" y="11" width="8" height="2" rx="1" fill="currentColor"/>
  </svg>
);

interface NavbarProps {
  currentPage: 'simulator' | 'compare';
  onPageChange: (page: 'simulator' | 'compare') => void;
  playback?: {
    isPlaying: boolean;
    onTogglePlay: () => void;
    onReset: () => void;
    onNext: () => void;
    onPrev: () => void;
    speed: number;
    onSpeedChange: (speed: number) => void;
    disabled: boolean;
  };
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onPageChange, playback }) => {
  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border shadow-sm">
      <div className="max-w-screen-2xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
        <div
          className="flex items-center gap-3 group cursor-pointer flex-shrink-0"
          onClick={() => onPageChange('simulator')}
        >
          <div className="text-primary transition-transform group-hover:scale-110 duration-300">
            <SeekFlowLogo />
          </div>
          <span className="text-xl font-bold tracking-tighter italic select-none hidden lg:inline">
            <span className="text-text-primary">Seek</span>
            <span className="text-primary">Flow</span>
          </span>
        </div>

        {/* Playback Controls Integrated into Navbar (Only for Simulator Page) */}
        {currentPage === 'simulator' && playback && (
          <div className="flex-1 max-w-xl hidden md:block">
            <PlaybackControls
              {...playback}
              compact
            />
          </div>
        )}

        {/* Navigation Area */}
        <div className="flex items-center gap-2 md:gap-4 text-sm font-mono flex-shrink-0">
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); onPageChange('simulator'); }}
            className={`px-3 py-2 rounded-sm transition-all duration-200 flex items-center gap-2 ${
                currentPage === 'simulator'
                ? 'text-primary bg-primary/10'
                : 'text-text-secondary hover:text-text-primary hover:bg-surface/50'
            }`}
          >
            <span className="font-medium">Simulator</span>
          </a>

          <a
            href="#"
            onClick={(e) => { e.preventDefault(); onPageChange('compare'); }}
            className={`px-3 py-2 rounded-sm transition-all duration-200 flex items-center gap-2 ${
                currentPage === 'compare'
                ? 'text-primary bg-primary/10'
                : 'text-text-secondary hover:text-text-primary hover:bg-surface/50'
            }`}
          >
            <BarChart2 size={18} className="opacity-80" />
            <span className="hidden xl:inline font-medium">Compare</span>
          </a>

          <div className="w-px h-6 bg-border mx-1 hidden lg:block" />

          <a
            href="https://github.com/karalapatiphanicharan-cyber/seekflow"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-text-secondary hover:text-text-primary hover:bg-surface/50 rounded-sm transition-all duration-200"
            aria-label="GitHub Repository"
          >
            <Github size={20} />
          </a>
        </div>
      </div>

      {/* Mobile Playback Controls */}
      {currentPage === 'simulator' && playback && (
        <div className="md:hidden border-t border-border px-4 py-2 bg-surface/10">
          <PlaybackControls
            {...playback}
            compact
          />
        </div>
      )}
    </nav>
  );
};
