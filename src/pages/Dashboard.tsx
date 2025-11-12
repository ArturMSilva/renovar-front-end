import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/Button';
import { Recycle } from 'lucide-react';

export const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-[0_4px_6px_rgba(0,0,0,0.1)] p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#1da74b] rounded-full flex items-center justify-center">
                <Recycle size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#1A1F36]">Painel de Doações</h1>
                <p className="text-sm text-[#4A5568]">Projeto Renovar</p>
              </div>
            </div>
          </div>

          <div className="bg-[#EFF6FF] border border-[#3bf679] rounded-lg p-6 mb-6">
            <h2 className="text-lg font-bold text-[#1A1F36] mb-2">Seja Bem-vindo!</h2>
            <p className="text-sm text-[#4A5568] mb-4">
              Você está autenticado como: <strong>{user?.email}</strong>
            </p>
          </div>

          <div className="flex gap-3">
            <Button onClick={handleSignOut} variant="secondary">
              Sair
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
