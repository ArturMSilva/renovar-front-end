import { useNavigate, useLocation } from "react-router-dom";
import { BadgeCheck, Lightbulb} from "lucide-react";
import { Button } from "../components/Button";
import { formatUserId } from "../utils/validation";

export const FinalConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const rawUserId = location.state?.userId || "0000";
  const userId = formatUserId(rawUserId);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#10B981] to-[#059669]">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-[#10B981] rounded-full flex items-center justify-center mb-6">
            <BadgeCheck size={48} className="text-[#ffffff]" />
          </div>

          <h1 className="text-3xl font-bold text-[#1A1F36] mb-4">
            Cadastro Concluído!
          </h1>

          <p className="text-[#4A5568] mb-6">
            Parabéns! Seu cadastro foi concluído com sucesso. Esse é seu código
            de usuário:
          </p>

          <div className="w-full bg-[#f3f6f4] rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center ">
              <p className="font-mono text-[#1A1F36] font-semibold">{userId}</p>
            </div>
          </div>

          <div className="bg-[#effff6] border border-[#6ff43a]/20 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-2">
              <Lightbulb size={20} className="text-[#179b49] flex-shrink-0" />
              <p className="text-sm text-[#179b49]">
                <strong>Dica:</strong> Você poderá visualizar seu código de usuário a qualquer momento quando estiver logado.
              </p>
            </div>
          </div>

          <p className="text-sm text-[#4A5568] mb-8">
            Agora você pode acessar o painel de doações e começar a fazer a
            diferença!
          </p>

          <Button onClick={() => navigate("/painel")} className="w-full">
            Ir para Painel de Doações
          </Button>
        </div>
      </div>
    </div>
  );
};
