import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Sidebar } from '../components/Sidebar';
import suaDoacaoTransforma from '../assets/images/sua-doacao-transforma.png';
import oQueDoar from '../assets/images/o-que-doar.png';
import comoDoar from '../assets/images/como-doar.png';
import seuImpacto from '../assets/images/seu-impacto.png';

interface OnboardingSlide {
  id: number;
  title: string;
  description?: string;
  steps?: string[];
  image: string;
  bgGradient: string;
}

const slides: OnboardingSlide[] = [
  {
    id: 1,
    title: 'Sua Doação Transforma',
    description: 'Conectamos você aos pontos de coleta mais próximos e registramos o impacto positivo de cada quilo doado.',
    image: suaDoacaoTransforma,
    bgGradient: 'from-emerald-500 to-teal-600',
  },
  {
    id: 2,
    title: 'O que Doar',
    description: 'Aceitamos Latinhas de Alumínio, Papelão, Livros, Cadernos, Revistas e Folhas, Plásticos, Sucata de Ferro, Eletrônicos e Eletrodomésticos. Sua doação contribui para a economia circular e para a preservação ambiental.',
    image: oQueDoar,
    bgGradient: 'from-blue-500 to-cyan-600',
  },
  {
    id: 3,
    title: 'Como Doar: Passo a Passo',
    steps: [
      'Separe o material reciclável de acordo com as orientações de coleta (papel, plástico, metal, etc.)',
      'Embale o material de forma segura',
      'Cole no pacote o seu identificador único, utilizando fita adesiva, para garantir que sua doação seja registrada corretamente',
      'Encontre um ponto de coleta próximo ao seu endereço',
      'Entregue sua doação no local indicado',
      'Após a entrega, o registro ficará disponível para visualização no site'
    ],
    image: comoDoar,
    bgGradient: 'from-teal-500 to-emerald-600',
  },
  {
    id: 4,
    title: 'Acompanhe Seu Impacto',
    description: 'Visualize o total de quilos doados e acompanhe seu histórico completo no Painel de Doações.',
    image: seuImpacto,
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
          <div className="w-full aspect-square max-w-[320px] rounded-3xl flex items-center justify-center mb-8 shadow-lg overflow-hidden">
            <img 
              src={currentSlideData.image} 
              alt={currentSlideData.title}
              className="w-full h-full object-cover"
            />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 text-center mb-3">
            {currentSlideData.title}
          </h2>

          {currentSlideData.description && (
            <p className="text-sm text-gray-600 text-center leading-relaxed mb-12 px-4">
              {currentSlideData.description}
            </p>
          )}

          {currentSlideData.steps && (
            <ol className="text-sm text-gray-600 leading-relaxed mb-12 px-4 space-y-2 list-decimal list-inside text-left">
              {currentSlideData.steps.map((step, index) => (
                <li key={index} className="pl-2">
                  {step}
                </li>
              ))}
            </ol>
          )}

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
