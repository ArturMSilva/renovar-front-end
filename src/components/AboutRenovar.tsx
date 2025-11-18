import { Info, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AboutRenovar = () => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate('/onboarding')}
      className="bg-white rounded-3xl p-6 cursor-pointer hover:shadow-lg transition-all duration-300 group"
    >
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <Info size={24} className="text-blue-600" />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-gray-900 mb-1">Sobre o Renovar</h3>
          <p className="text-sm text-gray-500">Rever tutorial e informações</p>
        </div>

        <ChevronRight size={20} className="text-gray-400 group-hover:text-emerald-600 transition-colors" />
      </div>
    </div>
  );
};
