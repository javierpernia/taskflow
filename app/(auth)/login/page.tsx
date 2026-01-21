'use client';

import { User } from "@/types";
import { useState } from "react";

export default function LoginPage() {

  return (
    <div className="flex h-screen items-center justify-center p-4 text-black bg-[#141414]">
      <section className="bg-[#1f1f1f] text-white w-[400px] max-w-md rounded-xl p-8">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <p className="text-center text-gray-500">Don't have an account? <a href="/register" className="text-blue-500">Register</a></p>
        <form className="flex flex-col gap-4 mt-4">
          <input type="email" placeholder="Email" className="bg-white text-black p-2 rounded-lg" />
          <input type="password" placeholder="Password" className="bg-white text-black p-2 rounded-lg" />
          <button type="submit" className="p-2 rounded-lg bg-green-900 text-white">Login</button>
        </form>
      </section>
    </div>
  );
}