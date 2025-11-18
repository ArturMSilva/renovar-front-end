import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || `Erro na requisição: ${error.response?.status || 'Desconhecido'}`;
    throw new Error(message);
  }
);

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
  registered: boolean; 
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
  Id?: string;  
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

export const authApi = {
  register: async (data: RegisterRequest) => {
    const response = await axiosInstance.post<{ message: string }>('/api/auth/register', data);
    return response.data;
  },

  login: async (data: LoginRequest) => {
    const response = await axiosInstance.post<LoginResponse>('/api/auth/login', data);
    localStorage.setItem('authToken', response.data.token);
    return response.data;
  },
};

export const residenceApi = {
  completeProfile: async (data: ResidenceProfileRequest) => {
    const response = await axiosInstance.post<ProfileResponse>('/api/residence/complete-profile', data);
    return response.data;
  },
};

export const companyApi = {
  completeProfile: async (data: CompanyProfileRequest) => {
    const response = await axiosInstance.post<ProfileResponse>('/api/company/complete-profile', data);
    return response.data;
  },
};

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
