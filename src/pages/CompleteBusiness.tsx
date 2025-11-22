import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Building2, Phone, MapPin, Recycle, IdCard } from "lucide-react";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { ErrorMessage } from "../components/ErrorMessage";
import { useAuth } from "../contexts/AuthContext";
import {
  validatePhone,
  validateCEP,
  validateCNPJ,
  formatPhone,
  formatCEP,
  formatCNPJ,
} from "../utils/validation";
import { useAutoFetchCEP } from "../hooks/useAutoFetchCEP";

export const CompleteBusiness = () => {
  const navigate = useNavigate();
  const { completeProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [loadingCEP, setLoadingCEP] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    companyName: "",
    cnpj: "",
    phone: "",
    cep: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
    setError("");
  };

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhone(value);
    handleChange("phone", formatted);
  };

  const handleCNPJChange = (value: string) => {
    const formatted = formatCNPJ(value);
    handleChange("cnpj", formatted);
  };

  const handleCEPChange = (value: string) => {
    const formatted = formatCEP(value);
    handleChange("cep", formatted);
  };

  useAutoFetchCEP({
    cep: formData.cep,
    onSuccess: (data) => {
      setFormData((prev) => ({
        ...prev,
        street: data.street,
        neighborhood: data.neighborhood,
        city: data.city,
        state: data.state,
      }));
      setErrors((prev) => ({ ...prev, cep: "" }));
    },
    onError: (error) => {
      setErrors((prev) => ({ ...prev, cep: error }));
    },
    setLoading: setLoadingCEP,
  });

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (
      !formData.companyName.trim() ||
      formData.companyName.trim().length < 3
    ) {
      newErrors.companyName = "Razão social deve ter pelo menos 3 caracteres";
    }

    if (formData.cnpj && !validateCNPJ(formData.cnpj)) {
      newErrors.cnpj = "CNPJ inválido";
    }

    if (!validatePhone(formData.phone)) {
      newErrors.phone = "Telefone inválido";
    }

    if (!validateCEP(formData.cep)) {
      newErrors.cep = "CEP inválido";
    }

    if (!formData.number.trim()) {
      newErrors.number = "Número é obrigatório";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validate()) return;

    try {
      setLoading(true);
      const userId = await completeProfile({
        accountType: "business",
        reasonSocial: formData.companyName,
        cnpj: formData.cnpj || undefined,
        phone: formData.phone,
        address: {
          cep: formData.cep,
          street: formData.street,
          number: formData.number,
          complement: formData.complement,
          neighborhood: formData.neighborhood,
          city: formData.city,
          state: formData.state,
        },
      });

      navigate("/confirmacao-final", { state: { userId } });
    } catch (err: any) {
      setError(err.message || "Erro ao completar cadastro. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] p-4 sm:p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-[#10B981] rounded-full flex items-center justify-center">
              <Recycle size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#1A1F36]">
                Complete seu Cadastro
              </h1>
              <p className="text-base text-[#4A5568]">Empresa</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <ErrorMessage message={error} />}

            <div className="bg-[#F3F4F6] p-4 rounded-lg">
              <h2 className="text-lg font-bold text-[#1A1F36] mb-4">
                Dados da Empresa
              </h2>

              <div className="space-y-4">
                <Input
                  label="Razão Social"
                  type="text"
                  placeholder="Empresa de Reciclagem LTDA"
                  value={formData.companyName}
                  onChange={(e) => handleChange("companyName", e.target.value)}
                  icon={<Building2 size={20} className="text-[#10B981]" />}
                  error={errors.companyName}
                />

                <Input
                  label="CNPJ (Opcional)"
                  type="text"
                  placeholder="00.000.000/0000-00"
                  value={formData.cnpj}
                  onChange={(e) => handleCNPJChange(e.target.value)}
                  icon={<IdCard size={20} className="text-[#10B981]" />}
                  error={errors.cnpj}
                  helperText="Não é obrigatório, mas ajuda na identificação"
                />
              </div>
            </div>

            <div className="bg-[#F3F4F6] p-4 rounded-lg">
              <h2 className="text-lg font-bold text-[#1A1F36] mb-4">Contato</h2>

              <Input
                label="WhatsApp"
                type="tel"
                placeholder="(11) 99999-9999"
                value={formData.phone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                icon={<Phone size={20} className="text-[#10B981]" />}
                error={errors.phone}
              />
            </div>

            <div className="bg-[#F3F4F6] p-4 rounded-lg">
              <h2 className="text-lg font-bold text-[#1A1F36] mb-4">
                Endereço
              </h2>

              <div className="space-y-4">
                <Input
                  label="CEP"
                  type="text"
                  placeholder="00000-000"
                  value={formData.cep}
                  onChange={(e) => handleCEPChange(e.target.value)}
                  icon={<MapPin size={20} className="text-[#10B981]" />}
                  error={errors.cep}
                  disabled={loadingCEP}
                  isLoading={loadingCEP}
                />

                <Input
                  label="Rua"
                  type="text"
                  placeholder="Rua da Reciclagem"
                  value={formData.street}
                  onChange={(e) => handleChange("street", e.target.value)}
                  disabled
                />

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Número"
                    type="text"
                    placeholder="123"
                    value={formData.number}
                    onChange={(e) => handleChange("number", e.target.value)}
                    error={errors.number}
                  />

                  <Input
                    label="Complemento"
                    type="text"
                    placeholder="Sala 10"
                    value={formData.complement}
                    onChange={(e) => handleChange("complement", e.target.value)}
                  />
                </div>

                <Input
                  label="Bairro"
                  type="text"
                  placeholder="Centro"
                  value={formData.neighborhood}
                  onChange={(e) => handleChange("neighborhood", e.target.value)}
                  disabled
                />

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Cidade"
                    type="text"
                    placeholder="São Paulo"
                    value={formData.city}
                    onChange={(e) => handleChange("city", e.target.value)}
                    disabled
                  />

                  <Input
                    label="Estado"
                    type="text"
                    placeholder="SP"
                    value={formData.state}
                    onChange={(e) => handleChange("state", e.target.value)}
                    disabled
                  />
                </div>
              </div>
            </div>

            <Button type="submit" isLoading={loading}>
              Finalizar Cadastro
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
