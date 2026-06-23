import React from 'react';

interface SectionTitleProps {
  children: React.ReactNode;
  subtitle?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ children, subtitle }) => {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold tracking-tight text-text-primary uppercase flex items-center gap-3">
        <span className="w-1.5 h-8 bg-primary rounded-full"></span>
        {children}
      </h2>
      {subtitle && (
        <p className="mt-1 text-xs text-text-secondary font-mono uppercase tracking-[0.2em] opacity-80 ml-[1.125rem]">
          {subtitle}
        </p>
      )}
    </div>
  );
};
