import { Loader2 } from 'lucide-react';

export const LoadingSpinner = ({ size = 24 }: { size?: number }) => {
  return (
    <div className="flex items-center justify-center">
      <Loader2 size={size} className="animate-spin text-[#10B981]" />
    </div>
  );
};
