'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import Cookies from "js-cookie";

interface ThemeContextType {
  theme: 'Light' | 'Dark' | undefined;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({ theme: 'Light', toggleTheme: () => { } });

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeContextType['theme']>('Light');

  useEffect(() => {
    const savedTheme = Cookies.get('theme') as ThemeContextType['theme'];
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === 'Light' ? 'Dark' : 'Light';
      Cookies.set('theme', newTheme);
      return newTheme;
    });
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )

}

export const useTheme = () => useContext(ThemeContext);