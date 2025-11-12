import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Building2, Mail, Lock, Phone, MapPin } from 'lucide-react';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { ErrorMessage } from '../components/ErrorMessage';
import { useAuth } from '../contexts/AuthContext';
import { validateEmail, validatePassword, validatePhone, validateCEP, formatPhone, formatCEP } from '../utils/validation';
import { fetchCEP } from '../utils/cep';

export const SignupBusiness = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [loading, setLoading] = useState(false);
  const [loadingCEP, setLoadingCEP] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    cep: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
    setError('');
  };

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhone(value);
    handleChange('phone', formatted);
  };

  const handleCEPChange = (value: string) => {
    const formatted = formatCEP(value);
    handleChange('cep', formatted);
  };

  // Busca automática de CEP quando completo
  useEffect(() => {
    const fetchAddressAutomatically = async () => {
      if (validateCEP(formData.cep)) {
        setLoadingCEP(true);
        const data = await fetchCEP(formData.cep);
        setLoadingCEP(false);

        if (data) {
          setFormData((prev) => ({
            ...prev,
            street: data.logradouro,
            neighborhood: data.bairro,
            city: data.localidade,
            state: data.uf,
          }));
          setErrors((prev) => ({ ...prev, cep: '' }));
        } else {
          setErrors((prev) => ({ ...prev, cep: 'CEP não encontrado' }));
        }
      }
    };

    // Debounce: aguarda 500ms após o usuário parar de digitar
    const timeoutId = setTimeout(fetchAddressAutomatically, 500);
    return () => clearTimeout(timeoutId);
  }, [formData.cep]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim() || formData.name.trim().length < 3) {
      newErrors.name = 'Razão social deve ter pelo menos 3 caracteres';
    }

    if (!validateEmail(formData.email)) {
      newErrors.email = 'E-mail inválido';
    }

    if (!validatePassword(formData.password)) {
      newErrors.password = 'Senha deve ter 8+ caracteres, letras e números';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Senhas não coincidem';
    }

    if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Telefone inválido';
    }

    if (!validateCEP(formData.cep)) {
      newErrors.cep = 'CEP inválido';
    }

    if (!formData.number.trim()) {
      newErrors.number = 'Número é obrigatório';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validate()) return;

    try {
      setLoading(true);
      const { userId } = await signUp(formData.email, formData.password, {
        name: formData.name,
        accountType: 'business',
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

      navigate('/signup-success', { state: { userId } });
    } catch (err: any) {
      if (err.message?.includes('already registered')) {
        setError('E-mail já cadastrado');
      } else {
        setError('Erro ao criar conta. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] p-4 sm:p-6">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate('/select-account-type')}
          className="flex items-center gap-2 text-[#4A5568] hover:text-[#1A1F36] mb-6 transition-smooth"
        >
          <ArrowLeft size={24} />
        </button>

        <div className="bg-white rounded-xl shadow-[0_4px_6px_rgba(0,0,0,0.1)] p-6 sm:p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-[#1A1F36]">Criar Conta - Empresa</h1>
            <p className="text-sm text-[#4A5568] mt-2">Preencha os dados abaixo</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && <ErrorMessage message={error} />}

            <div>
              <h2 className="text-sm font-bold text-[#1A1F36] pb-3 border-b border-[#E5E7EB] mb-4">
                Dados da Empresa
              </h2>
              <div className="space-y-4">
                <Input
                  label="Razão Social"
                  type="text"
                  placeholder="Empresa de Reciclagem Ltda."
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  icon={<Building2 size={20} />}
                  error={errors.name}
                />

                <Input
                  label="E-mail"
                  type="email"
                  placeholder="contato@empresa.com"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  icon={<Mail size={20} />}
                  error={errors.email}
                />

                <Input
                  label="Senha"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  icon={<Lock size={20} />}
                  helperText="Mínimo 8 caracteres, letras e números"
                  error={errors.password}
                />

                <Input
                  label="Confirmar Senha"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange('confirmPassword', e.target.value)}
                  icon={<Lock size={20} />}
                  error={errors.confirmPassword}
                />
              </div>
            </div>

            <div>
              <h2 className="text-sm font-bold text-[#1A1F36] pb-3 border-b border-[#E5E7EB] mb-4">
                Contato
              </h2>
              <Input
                label="Número do WhatsApp"
                type="tel"
                placeholder="(11) 98765-4321"
                value={formData.phone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                icon={<Phone size={20} />}
                helperText="Essencial para receber notificações de doações"
                error={errors.phone}
              />
            </div>

            <div>
              <h2 className="text-sm font-bold text-[#1A1F36] pb-3 border-b border-[#E5E7EB] mb-4">
                Endereço
              </h2>
              <div className="space-y-4">
                <Input
                  label="CEP"
                  type="text"
                  placeholder="01310-100"
                  value={formData.cep}
                  onChange={(e) => handleCEPChange(e.target.value)}
                  icon={<MapPin size={20} />}
                  isLoading={loadingCEP}
                  error={errors.cep}
                />

                <Input
                  label="Rua"
                  type="text"
                  value={formData.street}
                  onChange={(e) => handleChange('street', e.target.value)}
                  disabled
                />

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Número"
                    type="text"
                    placeholder="1000"
                    value={formData.number}
                    onChange={(e) => handleChange('number', e.target.value)}
                    error={errors.number}
                  />

                  <Input
                    label="Complemento (Opcional)"
                    type="text"
                    placeholder="Sala 201"
                    value={formData.complement}
                    onChange={(e) => handleChange('complement', e.target.value)}
                  />
                </div>

                <Input
                  label="Bairro"
                  type="text"
                  value={formData.neighborhood}
                  onChange={(e) => handleChange('neighborhood', e.target.value)}
                  disabled
                />

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Cidade"
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleChange('city', e.target.value)}
                    disabled
                  />

                  <Input
                    label="UF"
                    type="text"
                    value={formData.state}
                    onChange={(e) => handleChange('state', e.target.value)}
                    disabled
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4">
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate('/select-account-type')}
              >
                Voltar
              </Button>
              <Button type="submit" isLoading={loading}>
                Criar Conta
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
