"use client";

import Link from "next/link";
import { Home, Activity, Settings } from "lucide-react"; // Iconos para el menú

export default function MenuPrincipal() {
  return (
    <nav className="bg-white shadow-md rounded-lg p-4 mt-4 ">
      <div className="flex justify-around items-center">
        <Link
          href="/dashboard"
          className="flex flex-col items-center"
        >
          <Home className="h-6 w-6 text-green-700" />
          <span className="text-sm text-gray-700">Inicio</span>
        </Link>
        <Link
          href="/dashboard/datos-cotidianos"
          className="flex flex-col items-center"
        >
          <Activity className="h-6 w-6 text-green-700" />
          <span className="text-sm text-gray-700">Actividades</span>
        </Link>
        <Link
          href="/dashboard/configuracion"
          className="flex flex-col items-center"
        >
          <Settings className="h-6 w-6 text-green-700" />
          <span className="text-sm text-gray-700">Configuración</span>
        </Link>
      </div>
    </nav>
  );
}
