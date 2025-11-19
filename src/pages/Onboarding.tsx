import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Recycle, Package, ClipboardList, BarChart3 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Sidebar } from '../components/Sidebar';

interface OnboardingSlide {
  id: number;
  title: string;
  description: string;
  icon: typeof Recycle;
  bgGradient: string;
}

const slides: OnboardingSlide[] = [
  {
    id: 1,
    title: 'Sua Doação Transforma',
    description: 'Conectamos você aos pontos de coleta mais próximos e registramos o impacto positivo de cada quilo doado.',
    icon: Recycle,
    bgGradient: 'from-emerald-500 to-teal-600',
  },
  {
    id: 2,
    title: 'O que Doar',
    description: 'Aceitamos Plástico, Eletrônico, Papelão, Vidro e Metal. Sua doação contribui para a economia circular e preservação ambiental.',
    icon: Package,
    bgGradient: 'from-blue-500 to-cyan-600',
  },
  {
    id: 3,
    title: 'Como Doar: Passo a Passo',
    description: 'Separe o material, encontre um ponto de coleta próximo, entregue sua doação e registre com seu código de identificação.',
    icon: ClipboardList,
    bgGradient: 'from-teal-500 to-emerald-600',
  },
  {
    id: 4,
    title: 'Acompanhe Seu Impacto',
    description: 'Visualize o total de quilos doados e acompanhe seu histórico completo no Painel de Doações.',
    icon: BarChart3,
    bgGradient: 'from-green-500 to-teal-600',
  },
];

export const Onboarding = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      localStorage.setItem('onboarding-completed', 'true');
      navigate('/painel');
    }
  };

  const currentSlideData = slides[currentSlide];
  const Icon = currentSlideData.icon;
  const isLastSlide = currentSlide === slides.length - 1;

  return (
    <div className="min-h-screen bg-white">
      <Sidebar
        userName={user?.name || 'Usuário'}
        userCode={user?.userCode || user?.id?.substring(0, 8).toUpperCase() || 'N/A'}
        onLogout={handleSignOut}
      />
      
      <div className="lg:pl-64 pt-16 lg:pt-0 min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="flex flex-col items-center">
          <div className={`w-full aspect-square max-w-[320px] bg-gradient-to-br ${currentSlideData.bgGradient} rounded-3xl flex items-center justify-center mb-8 shadow-lg`}>
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Icon size={64} className="text-white" strokeWidth={1.5} />
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 text-center mb-3">
            {currentSlideData.title}
          </h2>

          <p className="text-sm text-gray-600 text-center leading-relaxed mb-12 px-4">
            {currentSlideData.description}
          </p>

          <div className="w-full flex items-center justify-between px-4">
            <div className="flex items-center gap-2">
              {slides.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? 'w-8 bg-emerald-600'
                      : 'w-8 bg-gray-300'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="text-emerald-600 font-medium text-sm hover:text-emerald-700 transition-colors"
            >
              {isLastSlide ? 'Começar' : 'Próximo'}
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};
