import { create } from "zustand"

export interface Contact {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  imageUrl?: string
  userId: string
}

interface ContactsState {
  contacts: Contact[]
  totalPages: number
  currentPage: number
  setContacts: (contacts: Contact[], totalPages: number) => void
  setCurrentPage: (page: number) => void
  addContact: (contact: Contact) => void
  updateContact: (contact: Contact) => void
  deleteContact: (id: string) => void
}

export const useContactsStore = create<ContactsState>()((set) => ({
  contacts: [],
  totalPages: 0,
  currentPage: 0,
  setContacts: (contacts, totalPages) => set({ contacts, totalPages }),
  setCurrentPage: (currentPage) => set({ currentPage }),
  addContact: (contact) =>
    set((state) => ({ contacts: [...state.contacts, contact] })),
  updateContact: (contact) =>
    set((state) => ({
      contacts: state.contacts.map((c) => (c.id === contact.id ? contact : c)),
    })),
  deleteContact: (id) =>
    set((state) => ({
      contacts: state.contacts.filter((c) => c.id !== id),
    })),
})) 