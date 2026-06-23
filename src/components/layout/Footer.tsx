import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border py-6 px-4 bg-surface/20">
      <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-text-secondary uppercase tracking-widest">
        <div>
          Built with React 19 + TypeScript
        </div>
        <div>
          &copy; {new Date().getFullYear()} SeekFlow &bull; Mission Control
        </div>
      </div>
    </footer>
  );
};
