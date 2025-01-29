export interface User {
    id: number;
    username: string;
    name: string;
    email: string;
    photoUrl?: string;
}

export interface Contact {
    id: string;
    name: string;
    email?: string;
    phoneNumber: string;
    address?: string;
    description?: string;
    photoUrl?: string;
} 