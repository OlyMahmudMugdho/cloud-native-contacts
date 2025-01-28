export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  PROFILE: "/profile",
  CONTACTS: "/contacts",
} as const;

export const API = {
  BASE_URL: "http://localhost:8080",
  ENDPOINTS: {
    BASE: "/api/v1",
    AUTH: {
      LOGIN: "/auth/login",
      REGISTER: "/auth/register",
    },
    USERS: {
      ME: "/users/me",
      PHOTO: "/users/me/photo",
    },
    CONTACTS: "/contacts",
  },
} as const; 