import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <div className="w-full h-auto min-h-[40px] bg-[#FEE2E2] border border-[#FECACA] border-l-4 border-l-[#EF4444] rounded-md p-3 mb-4 animate-in fade-in duration-300">
      <div className="flex items-center gap-2">
        <AlertCircle size={16} className="text-[#EF4444] flex-shrink-0" />
        <p className="text-sm text-[#DC2626]">{message}</p>
      </div>
    </div>
  );
};
