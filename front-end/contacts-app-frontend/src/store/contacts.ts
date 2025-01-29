import { create } from 'zustand';
import { Contact } from '@/types';

interface ContactsState {
  contacts: Contact[];
  totalPages: number;
  currentPage: number;
  setContacts: (contacts: Contact[], totalPages: number) => void;
  setCurrentPage: (page: number) => void;
  deleteContact: (id: string) => void;
  clearContacts: () => void;
}

export const useContactsStore = create<ContactsState>((set) => ({
  contacts: [],
  totalPages: 0,
  currentPage: 0,
  setContacts: (contacts, totalPages) => set({ contacts, totalPages }),
  setCurrentPage: (currentPage) => set({ currentPage }),
  deleteContact: (id) =>
    set((state) => ({
      contacts: state.contacts.filter((contact) => contact.id !== id),
    })),
  clearContacts: () => set({ contacts: [], totalPages: 0, currentPage: 0 }),
})); 