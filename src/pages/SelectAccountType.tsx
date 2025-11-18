import { useNavigate } from 'react-router-dom';
import { Home, Building2 } from 'lucide-react';
import { Card } from '../components/Card';

export const SelectAccountType = () => {
  const navigate = useNavigate();

  const handleSelectResidential = () => {
    navigate('/completar-residencial');
  };

  const handleSelectBusiness = () => {
    navigate('/completar-empresa');
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] p-4 sm:p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1A1F36]">Selecione o Tipo de Conta</h1>
          <p className="text-base text-[#4A5568] mt-2">Escolha o tipo de conta para continuar</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card onClick={handleSelectResidential} className="p-4">
            <div className="flex flex-col items-start gap-3">
              <div className="w-12 h-12 bg-[#EFF6FF] rounded-lg flex items-center justify-center">
                <Home size={28} className="text-[#10B981]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#1a3628]">Residência</h3>
                <p className="text-sm text-[#4A5568] mt-1">
                  Para pessoas físicas que desejam doar materiais
                </p>
              </div>
            </div>
          </Card>

          <Card onClick={handleSelectBusiness} className="p-4">
            <div className="flex flex-col items-start gap-3">
              <div className="w-12 h-12 bg-[#EFF6FF] rounded-lg flex items-center justify-center">
                <Building2 size={28} className="text-[#10B981]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#1a3628]">Empresa</h3>
                <p className="text-sm text-[#4A5568] mt-1">
                  Para empresas que desejam participar do programa
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
