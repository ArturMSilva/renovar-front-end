import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { Button } from '../components/Button';

export const InitialConfirmation = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#10B981] to-[#059669]">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-[#10B981] rounded-full flex items-center justify-center mb-6">
            <CheckCircle size={44} className="text-white" />
          </div>

          <h1 className="text-3xl font-bold text-[#1A1F36] mb-4">
            Conta Criada com Sucesso!
          </h1>

          <p className="text-[#4A5568] mb-8">
            Sua conta foi criada. Agora faça login para continuar e completar seu cadastro.
          </p>

          <Button
            onClick={() => navigate('/')}
            className="w-full"
          >
            Fazer Login
          </Button>
        </div>
      </div>
    </div>
  );
};
