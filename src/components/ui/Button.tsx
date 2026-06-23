import React from 'react';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-mono text-xs uppercase tracking-widest transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    primary: "bg-primary text-text-primary hover:bg-primary-hover",
    secondary: "bg-secondary text-text-primary hover:bg-secondary-hover",
    outline: "bg-transparent border border-border text-text-secondary hover:text-text-primary hover:border-text-secondary",
    danger: "bg-error text-text-primary hover:opacity-90",
  };

  const sizes = {
    sm: "px-3 py-1.5",
    md: "px-4 py-2",
    lg: "px-6 py-3",
  };

  // Filter out any custom props that shouldn't be passed to motion.button
  // but keep standard button props
  const { ...buttonProps } = props;

  return (
    <motion.button
      whileHover={{ scale: 0.98 }}
      whileTap={{ scale: 0.95 }}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...(buttonProps as HTMLMotionProps<"button">)}
    >
      {children}
    </motion.button>
  );
};
