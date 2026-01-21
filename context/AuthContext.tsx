'use client';

import { createContext, useContext, useState, ReactNode } from "react";
import Cookies from "js-cookie";

// 1. se define como se va a ver el usuario (null si no hay)
type User = {
  name: string;
} | null;

// 2. Se define la forma del contexto: datos y funciones

interface userContextType {
  user: User; // estado actual
  login: (name: string) => void; // funcion para iniciar sesion
  logout: () => void; // funcion para cerrar sesion
}

// 3. Se crea el contexto (analogía a tablero de anuncios)
const AuthContext = createContext<userContextType>({
  user: null,
  login: () => { }, // funciones vacias por defecto (para evitar errores de compilacion)
  logout: () => { },
});

// 4. Se crea el provider: (encargado de mantener el tablero actualizado)
export function AuthProvider({ children }: { children: ReactNode }) {
  // se define el estado inicial del usuario (el que todos vana ver)
  const [user, setUser] = useState<User>(null);

  // se definie la funcion login
  const login = (name: string) => {
    setUser({ name }); // se actualiza el usuario
    Cookies.set('user', name);
  }

  // se definie la funcion logout
  const logout = () => {
    setUser(null); // se borra el usuario
    Cookies.remove('user');
  }


  return (
    <AuthContext.Provider value={{ user, login, logout }} >
      {children}
    </AuthContext.Provider>
  );
}
// 5. hook personalizado para usar el contexto (analogía a llamar al tablero de anuncios)
export const useAuth = () => useContext(AuthContext);
