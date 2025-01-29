export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  PROFILE: "/profile",
  CONTACTS: "/contacts",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
} as const;

export const API = {
  BASE_URL: "",
  ENDPOINTS: {
    BASE: "/api/v1",
    AUTH: {
      LOGIN: "/auth/login",
      REGISTER: "/auth/register",
      FORGOT_PASSWORD: "/auth/forgot-password",
      RESET_PASSWORD: "/auth/reset-password",
    },
    USERS: {
      ME: "/users/me",
      PHOTO: "/users/me/photo",
    },
    CONTACTS: "/contacts",
    CONTACTS_EXPORT: "/contacts/export/vcf",
  },
} as const; 