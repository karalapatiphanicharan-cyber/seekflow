import React from 'react';
import { Github } from 'lucide-react';
import { Page } from './Navbar';

interface FooterProps {
  onPageChange?: (page: Page) => void;
}

export const Footer: React.FC<FooterProps> = ({ onPageChange }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-surface border-t border-border py-12 px-6">
      <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold tracking-tighter italic">
              <span className="text-text-primary">Seek</span>
              <span className="text-primary">Flow</span>
            </span>
          </div>
          <p className="text-xs text-text-secondary font-mono max-w-xs leading-relaxed opacity-70">
            © {currentYear} SeekFlow — Interactive Disk Scheduling Simulator.
            Educational platform for visualizing spatial and temporal storage I/O.
          </p>
          <div className="flex items-center gap-4 pt-2">
            <a
              href="https://github.com/karalapatiphanicharan-cyber/seekflow"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-text-primary transition-colors"
              aria-label="GitHub Repository"
            >
              <Github size={18} />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-12 gap-y-6">
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold text-text-primary uppercase tracking-[0.2em] opacity-50">Platform</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onPageChange?.('simulator')} className="text-xs text-text-secondary hover:text-primary transition-colors">Simulator</button>
              </li>
              <li>
                <button onClick={() => onPageChange?.('compare')} className="text-xs text-text-secondary hover:text-primary transition-colors">Comparison</button>
              </li>
              <li>
                <button onClick={() => onPageChange?.('algorithms')} className="text-xs text-text-secondary hover:text-primary transition-colors">Algorithms</button>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-[10px] font-bold text-text-primary uppercase tracking-[0.2em] opacity-50">Information</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onPageChange?.('about')} className="text-xs text-text-secondary hover:text-primary transition-colors">About Us</button>
              </li>
              <li>
                <button onClick={() => onPageChange?.('contact')} className="text-xs text-text-secondary hover:text-primary transition-colors">Contact</button>
              </li>
              <li>
                <a href="https://github.com/karalapatiphanicharan-cyber/seekflow" target="_blank" rel="noopener noreferrer" className="text-xs text-text-secondary hover:text-primary transition-colors">Source Code</a>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-[10px] font-bold text-text-primary uppercase tracking-[0.2em] opacity-50">Legal</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onPageChange?.('privacy')} className="text-xs text-text-secondary hover:text-primary transition-colors">Privacy Policy</button>
              </li>
              <li>
                <button onClick={() => onPageChange?.('terms')} className="text-xs text-text-secondary hover:text-primary transition-colors">Terms of Service</button>
              </li>
              <li>
                <button onClick={() => onPageChange?.('disclaimer')} className="text-xs text-text-secondary hover:text-primary transition-colors">Disclaimer</button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto mt-12 pt-8 border-t border-border/30 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-[10px] font-mono text-text-secondary uppercase tracking-widest opacity-50">
          Built with React 19 + TypeScript • Mission Control Dashboard
        </p>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
          <span className="text-[10px] font-mono text-text-secondary uppercase tracking-widest opacity-50">Systems Operational</span>
        </div>
      </div>
    </footer>
  );
};
