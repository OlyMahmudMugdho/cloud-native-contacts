import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  photoUrl?: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  setAuth: (user: User, token: string) => void;
  clearAuth: () => void;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      setAuth: (user, token) => set({ token, user }),
      clearAuth: () => set({ token: null, user: null }),
      isAuthenticated: () => {
        const state = get();
        return !!(state.token && state.user);
      },
    }),
    {
      name: 'auth-storage',
      // Only persist token and user
      partialize: (state) => ({
        token: state.token,
        user: state.user,
      }),
    }
  )
); 