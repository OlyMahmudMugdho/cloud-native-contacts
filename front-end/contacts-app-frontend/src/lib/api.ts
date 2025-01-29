import axios from 'axios';
import { useAuthStore } from '@/store/auth';
import { User } from '@/types';
import { API } from './constants';

export interface AuthResponse {
  user: User;
  token: string;
}

const api = axios.create({
  baseURL: `${API.BASE_URL}${API.ENDPOINTS.BASE}`,
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
      // Clear auth state
      useAuthStore.getState().clearAuth();
      
      // Only redirect if we're in the browser
      if (typeof window !== 'undefined') {
        // Don't redirect if already on login page
        if (!window.location.pathname.includes('/login')) {
          window.location.href = '/login';
        }
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
  const response = await api.post<AuthResponse>(API.ENDPOINTS.AUTH.LOGIN, data);
  return response.data;
};

export const register = async (data: RegisterRequest): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>(API.ENDPOINTS.AUTH.REGISTER, data);
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
  const response = await api.get<ContactsResponse>(API.ENDPOINTS.CONTACTS, {
    params: { page, size },
  });
  return response.data;
};

export const getContact = async (id: string): Promise<Contact> => {
  const response = await api.get<Contact>(`${API.ENDPOINTS.CONTACTS}/${id}`);
  return response.data;
};

export const createContact = async (data: CreateContactRequest): Promise<Contact> => {
  const response = await api.post<Contact>(API.ENDPOINTS.CONTACTS, data);
  return response.data;
};

export const updateContact = async (id: string, data: Partial<CreateContactRequest>): Promise<Contact> => {
  const response = await api.put<Contact>(`${API.ENDPOINTS.CONTACTS}/${id}`, data);
  return response.data;
};

export const deleteContact = async (id: string): Promise<void> => {
  await api.delete(`${API.ENDPOINTS.CONTACTS}/${id}`);
};

export interface UpdateProfileRequest {
  username: string;
  name: string;
  email: string;
}

export const updateProfile = async (data: UpdateProfileRequest): Promise<User> => {
  const response = await api.put<User>(API.ENDPOINTS.USERS.ME, data);
  return response.data;
};

export const updateProfilePhoto = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await api.put<string>(API.ENDPOINTS.USERS.PHOTO, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const getImageUrl = (path: string | null | undefined): string | undefined => {
  if (!path) return undefined;
  
  // If it's a Cloudinary URL or any other full URL, return as is
  if (path.startsWith('http')) return path;
  
  // For any other path, assume it's a relative path and add base URL
  return `${API.BASE_URL}${path}`;
};

interface ForgotPasswordRequest {
  email: string;
}

export const forgotPassword = async (data: ForgotPasswordRequest): Promise<void> => {
  await api.post(API.ENDPOINTS.AUTH.FORGOT_PASSWORD, data);
};

interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

export const resetPassword = async (data: ResetPasswordRequest): Promise<void> => {
  await api.post(API.ENDPOINTS.AUTH.RESET_PASSWORD, data);
};

export const exportContactsToVcf = async (): Promise<Blob> => {
  const response = await api.get(API.ENDPOINTS.CONTACTS_EXPORT, {
    responseType: 'blob'
  });
  return response.data;
};

export default api;