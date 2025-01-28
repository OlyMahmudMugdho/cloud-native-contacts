import { create } from 'zustand';
import type { Contact } from '@/lib/api';

interface ContactsState {
  contacts: Contact[];
  totalPages: number;
  currentPage: number;
  setContacts: (contacts: Contact[], totalPages: number) => void;
  setCurrentPage: (page: number) => void;
  addContact: (contact: Contact) => void;
  updateContact: (contact: Contact) => void;
  deleteContact: (id: string) => void;
}

export const useContactsStore = create<ContactsState>((set) => ({
  contacts: [],
  totalPages: 0,
  currentPage: 0,
  setContacts: (contacts, totalPages) => set({ contacts, totalPages }),
  setCurrentPage: (currentPage) => set({ currentPage }),
  addContact: (contact) =>
    set((state) => ({ contacts: [...state.contacts, contact] })),
  updateContact: (updatedContact) =>
    set((state) => ({
      contacts: state.contacts.map((contact) =>
        contact.id === updatedContact.id ? updatedContact : contact
      ),
    })),
  deleteContact: (id) =>
    set((state) => ({
      contacts: state.contacts.filter((contact) => contact.id !== id),
    })),
})); 