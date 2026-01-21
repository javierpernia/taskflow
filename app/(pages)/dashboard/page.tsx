'use client';

import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push('/login');
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="flex h-screen items-center justify-center p-4 text-black bg-[#141414]">
      <section className="bg-[#1f1f1f] text-white w-[400px] max-w-md rounded-xl p-8 flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-center">Bienvenido, {user.name}!</h1>
        <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-red-600 transition-colors">Cerrar sesion</button>
        <button onClick={toggleTheme} className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600 transition-colors">Cambiar tema a modo {theme}</button>
      </section>
    </div>
  );
}
