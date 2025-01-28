import axios from 'axios';
import { User, useAuthStore } from '@/store/auth';

export interface AuthResponse {
  user: User;
  token: string;
}

const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle unauthorized responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      // Clear auth state and redirect to login
      useAuthStore.getState().clearAuth();
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

interface LoginRequest {
  username: string;
  password: string;
}

interface RegisterRequest {
  username: string;
  name: string;
  email: string;
  password: string;
}

export const login = async (data: LoginRequest): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/login', data);
  return response.data;
};

export const register = async (data: RegisterRequest): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/register', data);
  return response.data;
};

export interface Contact {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  description?: string;
  photoUrl?: string;
}

export interface CreateContactRequest {
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  description?: string;
}

export interface ContactsResponse {
  content: Contact[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

export const getContacts = async (page = 0, size = 10): Promise<ContactsResponse> => {
  const response = await api.get<ContactsResponse>('/contacts', {
    params: { page, size },
  });
  return response.data;
};

export const getContact = async (id: string): Promise<Contact> => {
  const response = await api.get<Contact>(`/contacts/${id}`);
  return response.data;
};

export const createContact = async (data: CreateContactRequest): Promise<Contact> => {
  const response = await api.post<Contact>('/contacts', {
    name: data.name,
    phoneNumber: data.phoneNumber,
    email: data.email,
    address: data.address,
    description: data.description,
  });
  return response.data;
};

export const updateContact = async (id: string, data: Partial<CreateContactRequest>): Promise<Contact> => {
  const response = await api.put<Contact>(`/contacts/${id}`, data);
  return response.data;
};

export const deleteContact = async (id: string): Promise<void> => {
  await api.delete(`/contacts/${id}`);
};

export interface UpdateProfileRequest {
  username: string;
  name: string;
  email: string;
}

export const updateProfile = async (data: UpdateProfileRequest): Promise<User> => {
  const response = await api.put<User>('/users/me', data);
  return response.data;
};

export const updateProfilePhoto = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await api.put<string>('/users/me/photo', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export default api;