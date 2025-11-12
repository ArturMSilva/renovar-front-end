import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '../components/Button';

export const SignupSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state?.userId || '0001';



  return (
    <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-[0_4px_6px_rgba(0,0,0,0.1)] p-8 sm:p-10 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-[#ECFDF5] rounded-full flex items-center justify-center">
            <CheckCircle2 size={40} className="text-[#10B981]" />
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-[#1A1F36] mb-2">
          Cadastro Realizado com Sucesso!
        </h1>

        <p className="text-sm text-[#4A5568] mb-8">Bem-vindo ao Projeto Renovar</p>

        <div className="mb-8">
          <p className="text-xs font-bold text-[#4A5568] mb-2">Seu ID do Cliente:</p>
          <div className="bg-[#F3F4F6] border border-[#E5E7EB] rounded-lg p-4">
            <p className="text-2xl sm:text-3xl font-bold text-[#10B981] font-mono tracking-wider break-all">
              {userId}
            </p>
          </div>

          <p className="text-xs text-[#4A5568] mt-4">
            Use este ID para identificar suas doações
          </p>
        </div>

        <Button onClick={() => navigate('/dashboard')}>Ir para Painel de Doações</Button>
      </div>    
    </div>
  );
};
