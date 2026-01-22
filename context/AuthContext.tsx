'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import Cookies from "js-cookie";

// 1. se define como se va a ver el usuario (null si no hay)
type User = {
  name: string;
} | null;

// 2. Se define la forma del contexto: datos y funciones

interface userContextType {
  user: User; // estado actual
  isInitialized: boolean; // 22/01/2026 estado de inicializacion de user
  login: (name: string) => void; // funcion para iniciar sesion
  logout: () => void; // funcion para cerrar sesion
}

// 3. Se crea el contexto (analogía a tablero de anuncios)
const AuthContext = createContext<userContextType>({
  user: null,
  isInitialized: false, // 22/01/2026 estado de inicializacion de user
  login: () => { }, // funciones vacias por defecto (para evitar errores de compilacion)
  logout: () => { },
});

// 4. Se crea el provider: (encargado de mantener el tablero actualizado)
export function AuthProvider({ children }: { children: ReactNode }) {
  // se define el estado inicial del usuario (el que todos vana ver)
  const [user, setUser] = useState<User>(null);
  const [isInitialized, setIsInitialized] = useState<boolean>(false); // 22/01/2026 estado de inicializacion de user

  useEffect(() => {
    const savedUser = Cookies.get('user');
    console.log("cookie leida:", savedUser);
    if (savedUser) {
      setUser({ name: savedUser });
    }
    setIsInitialized(true); // 22/01/2026 estado de inicializacion de user
  }, []);

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
    <AuthContext.Provider value={{ user, isInitialized, login, logout }} >
      {children}
    </AuthContext.Provider>
  );
}
// 5. hook personalizado para usar el contexto (analogía a llamar al tablero de anuncios)
export const useAuth = () => useContext(AuthContext);
