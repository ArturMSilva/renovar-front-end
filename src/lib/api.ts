const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

interface ResidenceProfileRequest {
  telefone: string;
  cpf?: string;
  numberResidents: number;
  addressRequest: {
    cep: string;
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
  };
}

interface ProfileResponse {
  id?: string;
  clientId?: string;
  userId?: string;
  message?: string;
}

interface CompanyProfileRequest {
  telefone: string;
  cnpj?: string;
  addressRequest: {
    cep: string;
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
  };
}

// Helper para fazer requisições
const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const token = localStorage.getItem('authToken');
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Erro na requisição: ${response.status}`);
  }

  // Verifica se a resposta tem conteúdo antes de tentar fazer o parse do JSON
  const text = await response.text();
  if (!text || text.trim() === '') {
    return {} as T; // Retorna objeto vazio se não houver conteúdo
  }
  
  try {
    return JSON.parse(text);
  } catch (error) {
    console.error('Erro ao fazer parse do JSON:', text);
    return {} as T; // Retorna objeto vazio se o JSON for inválido
  }
};

// Autenticação
export const authApi = {
  register: async (data: RegisterRequest) => {
    const response = await apiRequest<{ message: string }>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response;
  },

  login: async (data: LoginRequest) => {
    const response = await apiRequest<LoginResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    
    // Salva o token no localStorage
    localStorage.setItem('authToken', response.token);
    
    return response;
  },
};

// Perfil de Residência
export const residenceApi = {
  completeProfile: async (data: ResidenceProfileRequest) => {
    const response = await apiRequest<ProfileResponse>('/api/residence/complete-profile', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response;
  },
};

// Perfil de Empresa
export const companyApi = {
  completeProfile: async (data: CompanyProfileRequest) => {
    const response = await apiRequest<ProfileResponse>('/api/company/complete-profile', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response;
  },
};

// Decodifica o JWT para obter informações do usuário
export const decodeToken = (token: string) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Erro ao decodificar token:', error);
    return null;
  }
};
