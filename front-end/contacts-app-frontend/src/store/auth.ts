import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/types';
import { useContactsStore } from './contacts';
import { useQueryClient } from '@tanstack/react-query';

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
      user: null,
      token: null,
      setAuth: (user, token) => set({ user, token }),
      clearAuth: () => {
        // Clear contacts from the contacts store
        const contactsStore = useContactsStore.getState();
        contactsStore.clearContacts();
        
        // Clear auth state
        set({ user: null, token: null });
      },
      isAuthenticated: () => {
        const state = get();
        return !!state.token && !!state.user;
      },
    }),
    {
      name: 'auth-storage',
    }
  )
); 