import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  selected?: boolean;
}

export const Card = ({ children, className = '', onClick, selected }: CardProps) => {
  const baseStyles = `
    bg-white rounded-lg transition-smooth
  `;

  const clickableStyles = onClick
    ? `cursor-pointer hover:shadow-[0_1px_3px_rgba(0,0,0,0.1)] ${
        selected
          ? 'border-2 border-[#3af447] bg-[#EFF6FF]'
          : 'border-2 border-[#E5E7EB] hover:border-[#10B981]'
      }`
    : 'shadow-[0_4px_6px_rgba(0,0,0,0.1)]';

  return (
    <div className={`${baseStyles} ${clickableStyles} ${className}`} onClick={onClick}>
      {children}
    </div>
  );
};
