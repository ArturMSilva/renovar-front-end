import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { ErrorMessage } from '../components/ErrorMessage';
import { useAuth } from '../contexts/AuthContext';
import { validateEmail } from '../utils/validation';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { signIn, signInWithGoogle } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !validateEmail(email)) {
      setError('Por favor, insira um e-mail válido');
      return;
    }

    if (!password) {
      setError('Por favor, insira sua senha');
      return;
    }

    try {
      setLoading(true);
      await signIn(email, password);
    } catch (err: any) {
      setError('E-mail ou senha inválidos');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      setError('');
      if (credentialResponse.credential) {
        await signInWithGoogle(credentialResponse.credential);
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao entrar com Google');
    }
  };

  const handleGoogleError = () => {
    setError('Falha ao autenticar com Google');
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#1da74b] to-[#025326] items-center justify-center p-12">
        <div className="text-center text-white max-w-md flex flex-col items-center">
          <div className="flex justify-center mb-6 w-[50%] h-auto bg-white rounded-full p-4">
            <img src="/logo-renovar.png" alt="Logo" className="text-white" />  
          </div>
          <h1 className="text-4xl font-bold mb-4">Projeto Renovar</h1>
          <p className="text-xl text-white/90">
            Doe materiais recicláveis e acompanhe seu impacto
          </p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex justify-center mb-6">
            <div className="w-[50%] h-auto bg-transparent rounded-full flex items-center justify-center">
              <img src="/logo-renovar.png" alt="Logo" className="text-white" /> 
            </div>
          </div>

          <div className="mb-6 lg:mb-8">
            <h2 className="text-3xl font-bold text-[#1A1F36]">Entrar</h2>
            <p className="text-sm text-[#4A5568] mt-2">Acesse sua conta</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <ErrorMessage message={error} />}

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

            <Button type="submit" isLoading={loading} className="mt-6">
              Entrar
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => navigate('/cadastro')}
                className="text-sm text-[#3B82F6] hover:underline transition-smooth"
              >
                Não tem conta? Criar Conta
              </button>
            </div>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#E5E7EB]"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-white text-[#4A5568]">OU</span>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                text="continue_with"
                shape="rectangular"
                size="large"
                locale="pt-BR"
              />
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs text-[#9CA3AF]">© 2025 Renovar</p>
          </div>
        </div>
      </div>
    </div>
  );
};
