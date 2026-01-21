'use client';

import Image from "next/image";
import { useAuth } from "@/context/AuthContext"; // 1. se importa el hook personalizado

export default function HomePage() {

  // 2. se usa el hook para obtener los datos del contexto (se mira el tablero de anuncios)
  const { user, login, logout } = useAuth();

  return (
    <div className="flex h-screen items-center justify-center p-4 text-black bg-[#141414]">
      <section className="bg-[#1f1f1f] text-white w-[400px] max-w-md rounded-xl p-8">
        <h1 className="text-2xl font-bold text-center">Bienvenido a TaskFlow</h1>
        {/* 3. Se muestra el nombre del usuario logeado */}
        {user ? (
          <div>
            <p>Hola <strong>{user.name}</strong></p>
            <button onClick={logout}>Cerrar sesion</button>
          </div>
        ) : (
          <>
            <p className="text-center text-gray-500">Nadie ha entrado aún... ¿Quieres ser el primero?</p>
            <div className="flex flex-col gap-4 mt-4">
              <button onClick={() => login('Javier')}>
                Iniciar sesion como Javier
              </button>
              <button onClick={() => login('Maria')}>
                Iniciar sesion como Maria
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
