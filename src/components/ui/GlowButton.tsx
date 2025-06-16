import { ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'default' | 'outline';

interface GlowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
}

export const GlowButton = ({ 
  children, 
  variant = 'default',
  className = '',
  ...props 
}: GlowButtonProps) => {
  const baseStyles = 'px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-lg font-medium relative group';
  
  const variants = {
    default: 'bg-gradient-to-r from-primary-light to-accent hover:from-primary hover:to-accent text-white',
    outline: 'bg-transparent border-2 border-primary text-primary hover:bg-primary/10',
  };

  return (
    <button
      {...props}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {variant === 'default' && (
        <div className="absolute inset-0 bg-gradient-to-r from-primary/50 to-accent/50 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
      )}
      <span className="relative z-10 flex items-center justify-center">{children}</span>
    </button>
  );
};