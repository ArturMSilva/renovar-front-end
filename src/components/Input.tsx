import { useState, forwardRef, InputHTMLAttributes } from 'react';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
  isLoading?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, icon, isLoading, type, className = '', ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const inputType = isPassword && showPassword ? 'text' : type;

    return (
      <div className="w-full">
        <label className="block text-sm font-medium text-[#1A1F36] mb-2">
          {label}
        </label>
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A5568]">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            type={inputType}
            className={`
              w-full h-12 px-3 ${icon ? 'pl-10' : ''} ${isPassword ? 'pr-10' : ''}
              bg-white border rounded-lg
              text-[#1A1F36] text-base
              transition-smooth
              focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent
              disabled:bg-[#F3F4F6] disabled:text-[#9CA3AF] disabled:cursor-not-allowed
              ${error ? 'border-[#EF4444] bg-[#FEE2E2]' : 'border-[#E5E7EB]'}
              ${className}
            `}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4A5568] hover:text-[#1A1F36] transition-smooth cursor-pointer"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          )}
          {isLoading && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <Loader2 size={20} className="animate-spin text-[#3B82F6]" />
            </div>
          )}
        </div>
        {helperText && !error && (
          <p className="mt-1 text-xs text-[#4A5568]">{helperText}</p>
        )}
        {error && (
          <p className="mt-1 text-xs text-[#EF4444] flex items-center gap-1 animate-in fade-in duration-300">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
