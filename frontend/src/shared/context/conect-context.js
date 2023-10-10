import { createContext } from "react";

export const AutentificareContext = createContext({
  isLoggedIn: false,
  userId: null,
  token: null,
  rol: null,
  name: null,
  autentificare: () => {},
  dezautentificare: () => {},
});
