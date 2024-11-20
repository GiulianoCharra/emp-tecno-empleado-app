"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Aquí deberías integrar la lógica de autenticación
    if (email && password) {
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen  dark:bg-gray-100">
      <div className="dark:bg-white shadow-md rounded px-8 py-6 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-green-700">
          Iniciar Sesión
        </h1>
        <Input
          type="email"
          placeholder="Correo electrónico"
          className="mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Contraseña"
          className="mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          className="w-full bg-green-700 hover:bg-green-800"
          onClick={handleLogin}
        >
          Entrar
        </Button>
      </div>
    </div>
  );
}
