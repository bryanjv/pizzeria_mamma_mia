import { createContext } from "react";

export const UserContext = createContext({
  token: null,
  email: null,
  login: async () => ({ ok: false, message: "No provider" }),
  register: async () => ({ ok: false, message: "No provider" }),
  logout: () => {},
  getProfile: async () => ({ ok: false, message: "No provider" }),
});
