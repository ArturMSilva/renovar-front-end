import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { AboutRenovar } from '../components/AboutRenovar';
import { Sidebar } from '../components/Sidebar';
import { ArrowLeft, BookOpen, Target, Users, Leaf } from 'lucide-react';

export const InformationPage = () => {
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

  const onboardingTopics = [
    {
      title: 'Como Funciona',
      description: 'Entenda o processo de doação e reciclagem',
      icon: BookOpen,
      path: '/introducao',
    },
    {
      title: 'Nossos Objetivos',
      description: 'Conheça as metas do Projeto Renovar',
      icon: Target,
      path: '/introducao',
    },
    {
      title: 'Comunidade',
      description: 'Faça parte da mudança',
      icon: Users,
      path: '/introducao',
    },
    {
      title: 'Impacto Ambiental',
      description: 'Veja a diferença que você faz',
      icon: Leaf,
      path: '/introducao',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-emerald-50/30">
      <Sidebar
        userName={user?.name || 'Usuário'}
        userCode={user?.userCode || user?.id?.substring(0, 8).toUpperCase() || 'N/A'}
        onLogout={handleSignOut}
      />

      <div className="lg:pl-64 pt-16 lg:pt-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => navigate('/painel')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="text-sm font-medium">Voltar ao Painel</span>
            </button>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Informações</h1>
            <p className="text-gray-600">Saiba mais sobre o Projeto Renovar</p>
          </div>

          {/* About Renovar */}
          <div className="mb-8">
            <AboutRenovar />
          </div>

          {/* Onboarding Topics */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Aprenda Mais</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {onboardingTopics.map((topic) => {
                const Icon = topic.icon;
                return (
                  <button
                    key={topic.title}
                    onClick={() => navigate(topic.path)}
                    className="flex items-start gap-4 p-6 bg-white rounded-xl border border-gray-200 hover:border-emerald-500 hover:shadow-md transition-all duration-200 text-left group"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Icon size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors">
                        {topic.title}
                      </h3>
                      <p className="text-sm text-gray-600">{topic.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
