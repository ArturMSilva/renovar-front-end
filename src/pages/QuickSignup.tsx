import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock } from 'lucide-react';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { ErrorMessage } from '../components/ErrorMessage';
import { useAuth } from '../contexts/AuthContext';
import { validateEmail } from '../utils/validation';
import logoRenovar from '../assets/images/logo-renovar.png';

export const QuickSignup = () => {
  const navigate = useNavigate();
  const { quickSignUp } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Por favor, insira seu nome');
      return;
    }

    if (!email.trim() || !validateEmail(email)) {
      setError('Por favor, insira um e-mail válido');
      return;
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    try {
      setLoading(true);
      await quickSignUp(email, password, name);
      navigate('/confirmacao-inicial');
    } catch (err: any) {
      setError(err.message || 'Erro ao criar conta. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#1da74b] to-[#025326] items-center justify-center p-12">
        <div className="text-center text-white max-w-md">
          <div className="flex justify-center mb-6">
            <div className="flex justify-center mb-6 w-[50%] h-auto bg-white rounded-full p-4">
              <img src={logoRenovar} alt="Logo" className="text-white" /> 
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4">Projeto Renovar</h1>
          <p className="text-xl text-white/90">
            Comece sua jornada de impacto ambiental
          </p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex justify-center mb-6">
            <div className="w-[50%] h-auto bg-transparent rounded-full flex items-center justify-center">
              <img src={logoRenovar} alt="Logo" className="text-white" /> 
            </div>
          </div>

          <div className="mb-6 lg:mb-8">
            <h2 className="text-3xl font-bold text-[#1A1F36]">Criar Conta</h2>
            <p className="text-sm text-[#4A5568] mt-2">Cadastro rápido em apenas alguns passos</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <ErrorMessage message={error} />}

            <Input
              label="Nome Completo"
              type="text"
              placeholder="João Silva"
              value={name}
              onChange={(e) => setName(e.target.value)}
              icon={<User size={20} />}
            />

            <Input
              label="E-mail"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail size={20} />}
            />

            <Input
              label="Senha"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Lock size={20} />}
            />

            <Input
              label="Confirmar Senha"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              icon={<Lock size={20} />}
            />

            <Button type="submit" isLoading={loading} className="mt-6">
              Criar Conta
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="text-sm text-[#3B82F6] hover:underline transition-smooth"
              >
                Já tem conta? Fazer Login
              </button>
            </div>
          </form>

          <div className="mt-8 text-center">
            <p className="text-xs text-[#9CA3AF]">© 2025 Renovar</p>
          </div>
        </div>
      </div>
    </div>
  );
};
