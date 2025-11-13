import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authApi, residenceApi, companyApi, decodeToken } from '../lib/api';

// Interface customizada para usuário
interface CustomUser {
  id: string;
  email: string;
  name: string;
  account_type?: 'residential' | 'business' | null;
  profileCompleted?: boolean;
}

interface AuthContextType {
  user: CustomUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, metadata: SignUpMetadata) => Promise<{ userId: string }>;
  signOut: () => Promise<void>;
  quickSignUp: (email: string, password: string, name: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  completeProfile: (metadata: CompleteProfileMetadata) => Promise<string>;
}

interface SignUpMetadata {
  name: string;
  accountType: 'residential' | 'business';
  phone: string;
  address: {
    cep: string;
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
  };
  companyName?: string;
}

interface CompleteProfileMetadata {
  accountType: 'residential' | 'business';
  phone: string;
  cpf?: string;
  residentsCount?: string;
  cnpj?: string;
  address: {
    cep: string;
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
  };
  companyName?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<CustomUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const savedUser = localStorage.getItem('currentUser');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else if (token) {
      const decoded = decodeToken(token);
      if (decoded) {
        setUser({
          id: decoded.sub || decoded.userId || decoded.id,
          email: decoded.email,
          name: decoded.name || decoded.username,
          account_type: null,
        });
      }
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const response = await authApi.login({ email, password });
      const decoded = decodeToken(response.token);
      
      if (decoded) {
        const accountType: 'residential' | 'business' | null = response.profileCompleted 
          ? (response.userType || 'business') 
          : null;
        
        const customUser: CustomUser = {
          id: decoded.sub || decoded.userId || decoded.id,
          email: decoded.email || email,
          name: decoded.name || decoded.username || '',
          account_type: accountType,
          profileCompleted: response.profileCompleted,
        };
        
        setUser(customUser);
        localStorage.setItem('currentUser', JSON.stringify(customUser));
      }
    } catch (error: any) {
      throw new Error(error.message || 'Email ou senha incorretos');
    }
  };

  const signUp = async (_email: string, _password: string, _metadata: SignUpMetadata) => {
    throw new Error('Use quickSignUp instead');
  };

  const signOut = async () => {
    setUser(null);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authToken');
  };

  const quickSignUp = async (email: string, password: string, name: string) => {
    try {
      await authApi.register({ email, password, name });
    } catch (error: any) {
      if (error.message?.includes('já está cadastrado') || error.message?.includes('already')) {
        throw new Error('Este email já está cadastrado');
      }
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    throw new Error('Google login not implemented for custom users');
  };

  const completeProfile = async (metadata: CompleteProfileMetadata): Promise<string> => {
    if (!user) throw new Error('User not authenticated');

    try {
      let clientId = '';
      
      if (metadata.accountType === 'residential') {
        await residenceApi.completeProfile({
          telefone: metadata.phone,
          cpf: metadata.cpf,
          numberResidents: metadata.residentsCount ? parseInt(metadata.residentsCount) : 1,
          addressRequest: {
            cep: metadata.address.cep,
            street: metadata.address.street,
            number: metadata.address.number,
            complement: metadata.address.complement,
            neighborhood: metadata.address.neighborhood,
            city: metadata.address.city,
            state: metadata.address.state,
          },
        });
        
        const idResponse = await residenceApi.getId();
        clientId = idResponse.id || '';
        
      } else if (metadata.accountType === 'business') {
        await companyApi.completeProfile({
          telefone: metadata.phone,
          cnpj: metadata.cnpj,
          addressRequest: {
            cep: metadata.address.cep,
            street: metadata.address.street,
            number: metadata.address.number,
            complement: metadata.address.complement,
            neighborhood: metadata.address.neighborhood,
            city: metadata.address.city,
            state: metadata.address.state,
          },
        });
        
        const idResponse = await companyApi.getId();
        clientId = idResponse.id || '';
      }

      const updatedUser = { 
        ...user, 
        account_type: metadata.accountType,
        profileCompleted: true,
      };
      setUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));

      return clientId;
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao completar perfil');
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      signIn, 
      signUp, 
      signOut,
      quickSignUp,
      signInWithGoogle,
      completeProfile,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
