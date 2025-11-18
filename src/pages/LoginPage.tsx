import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { ErrorMessage } from '../components/ErrorMessage';
import { useAuth } from '../contexts/AuthContext';
import { validateEmail } from '../utils/validation';
import logoRenovar from '../assets/images/logo-renovar.png'

export const LoginPage = () => {
  const navigate = useNavigate();
  const { signIn, signInWithGoogle } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

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

  const handleGoogleSignIn = async () => {
    try {
      setGoogleLoading(true);
      setError('');
      await signInWithGoogle();
    } catch (err: any) {
      setError(err.message || 'Erro ao entrar com Google');
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#1da74b] to-[#025326] items-center justify-center p-12">
        <div className="text-center text-white max-w-md flex flex-col items-center">
          <div className="flex justify-center mb-6 w-[50%] h-auto bg-white rounded-full p-4">
            <img src={logoRenovar} alt="Logo" className="text-white" />  
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
              <img src={logoRenovar} alt="Logo" className="text-white" /> 
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

            <Button
              type="button"
              variant="secondary"
              className="mt-6"
              isLoading={googleLoading}
              onClick={handleGoogleSignIn}
              icon={
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M19.8 10.2273C19.8 9.51819 19.7364 8.83637 19.6182 8.18182H10.2V12.05H15.5818C15.3364 13.3 14.5909 14.3591 13.4864 15.0682V17.5773H16.7818C18.7091 15.8364 19.8 13.2727 19.8 10.2273Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M10.2 20C12.9 20 15.1727 19.1045 16.7818 17.5773L13.4864 15.0682C12.5636 15.6682 11.4 16.0227 10.2 16.0227C7.59545 16.0227 5.38182 14.2636 4.56364 11.9H1.16364V14.4909C2.76364 17.6591 6.22727 20 10.2 20Z"
                    fill="#34A853"
                  />
                  <path
                    d="M4.56364 11.9C4.35455 11.3 4.23636 10.6591 4.23636 10C4.23636 9.34091 4.35455 8.7 4.56364 8.1V5.50909H1.16364C0.490909 6.85909 0.1 8.38636 0.1 10C0.1 11.6136 0.490909 13.1409 1.16364 14.4909L4.56364 11.9Z"
                    fill="#FBBC04"
                  />
                  <path
                    d="M10.2 3.97727C11.5227 3.97727 12.7091 4.43182 13.6364 5.31818L16.5545 2.4C15.1682 1.11364 12.8955 0 10.2 0C6.22727 0 2.76364 2.34091 1.16364 5.50909L4.56364 8.1C5.38182 5.73636 7.59545 3.97727 10.2 3.97727Z"
                    fill="#EA4335"
                  />
                </svg>
              }
            >
              Entrar com Google
            </Button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs text-[#9CA3AF]">© 2025 Renovar</p>
          </div>
        </div>
      </div>
    </div>
  );
};
