'use client';

import Image from "next/image";
import { useAuth } from "@/context/AuthContext"; // 1. se importa el hook personalizado
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [name, setName] = useState<string>('');
  const router = useRouter();

  // 2. se usa el hook para obtener los datos del contexto (se mira el tablero de anuncios)
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.trim()) {
      login(name.trim());
      router.push('/dashboard');
    }
  };

  return (
    <div className="flex h-screen items-center justify-center p-4 text-black bg-[#141414]">
      <section className="bg-[#1f1f1f] text-white w-[400px] max-w-md rounded-xl p-8">
        <h1 className="text-2xl font-bold text-center">Bienvenido a TaskFlow</h1>
        {/* 3. Se muestra el nombre del usuario logeado */}
        <p className="text-center text-gray-500">Nadie ha entrado aún... ¿Quieres ser el primero?</p>
        <div className="flex flex-col gap-4 mt-4">
          <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Nombre" className="bg-white text-black p-2 rounded-lg" value={name} onChange={(e) => setName(e.target.value)} />
            <button type="submit" className="p-2 rounded-lg bg-green-900 text-white" disabled={!name.trim()}>Iniciar sesion</button>
          </form>
        </div>
      </section>
    </div>
  );
}
