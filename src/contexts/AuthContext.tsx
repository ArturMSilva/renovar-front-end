import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authApi, residenceApi, companyApi, decodeToken } from '../lib/api';

interface CustomUser {
  id: string;
  email: string;
  name: string;
  userCode?: string;
  account_type?: 'residential' | 'business' | null;
  profileCompleted?: boolean;
}

interface AuthContextType {
  user: CustomUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  quickSignUp: (email: string, password: string, name: string) => Promise<void>;
  signInWithGoogle: (googleToken: string) => Promise<void>;
  completeProfile: (metadata: CompleteProfileMetadata) => Promise<string>;
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
        const customUser: CustomUser = {
          id: decoded.sub || decoded.userId || decoded.id,
          email: decoded.email || email,
          name: response.name || response.user?.name || decoded.name || decoded.username || '',
          account_type: response.registered ? (decoded.userType || null) : null,
          profileCompleted: response.registered,
        };
        
        setUser(customUser);
        localStorage.setItem('currentUser', JSON.stringify(customUser));
      }
    } catch (error: any) {
      throw new Error(error.message || 'Email ou senha incorretos');
    }
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

  const signInWithGoogle = async (googleToken: string) => {
    try {
      const response = await authApi.googleAuth(googleToken);
      const decoded = decodeToken(response.token);
      
      if (decoded) {
        const customUser: CustomUser = {
          id: decoded.sub || decoded.userId || decoded.id,
          email: decoded.email || response.user?.email || '',
          name: response.user?.name || decoded.name || decoded.username || '',
          account_type: response.registered ? (decoded.userType || null) : null,
          profileCompleted: response.registered,
        };
        
        setUser(customUser);
        localStorage.setItem('currentUser', JSON.stringify(customUser));
      }
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao fazer login com Google');
    }
  };

  const completeProfile = async (metadata: CompleteProfileMetadata): Promise<string> => {
    if (!user) throw new Error('User not authenticated');

    try {
      let clientId = '';
      
      if (metadata.accountType === 'residential') {
        const response = await residenceApi.completeProfile({
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
        
        clientId = response.Id || response.clientId || response.userId || '';
        
      } else if (metadata.accountType === 'business') {
        const response = await companyApi.completeProfile({
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
        
        clientId = response.Id || response.clientId || response.userId || '';
      }

      const updatedUser = { 
        ...user, 
        userCode: clientId,
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
