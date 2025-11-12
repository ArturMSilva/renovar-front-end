import { ButtonHTMLAttributes, ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  isLoading?: boolean;
  icon?: ReactNode;
}

export const Button = ({
  children,
  variant = 'primary',
  isLoading = false,
  icon,
  className = '',
  disabled,
  ...props
}: ButtonProps) => {
  const baseStyles = `
    w-full h-12 px-4 rounded-lg font-bold text-base
    transition-smooth cursor-pointer
    disabled:cursor-not-allowed disabled:opacity-60
    flex items-center justify-center gap-2
  `;

  const variants = {
    primary: `
      bg-[#0ea573] text-white shadow-[0_1px_3px_rgba(0,0,0,0.1)]
      hover:bg-[#097753] hover:shadow-[0_4px_6px_rgba(0,0,0,0.1)]
      active:bg-[#097753] active:shadow-[0_10px_15px_rgba(0,0,0,0.1)]
      disabled:bg-[#D1D5DB] disabled:text-[#9CA3AF]
    `,
    secondary: `
      bg-white text-[#1A1F36] border border-[#E5E7EB]
      hover:bg-[#F3F4F6] hover:border-[#D1D5DB]
      active:bg-[#E5E7EB] active:border-[#9CA3AF]
    `,
    outline: `
      bg-white text-[#10B981] border border-[#10B981]
      hover:bg-[#EFF6FF]
      active:bg-[#dbfce2]
    `,
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 size={20} className="animate-spin" />
      ) : (
        <>
          {icon && <span>{icon}</span>}
          <span>{children}</span>
        </>
      )}
    </button>
  );
};
