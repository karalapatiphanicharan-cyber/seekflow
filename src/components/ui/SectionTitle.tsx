import React from 'react';

interface SectionTitleProps {
  children: React.ReactNode;
  subtitle?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ children, subtitle }) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold tracking-tight text-text-primary uppercase flex items-center gap-2">
        <span className="w-1 h-6 bg-primary"></span>
        {children}
      </h2>
      {subtitle && (
        <p className="mt-1 text-sm text-text-secondary font-mono">
          {subtitle}
        </p>
      )}
    </div>
  );
};
