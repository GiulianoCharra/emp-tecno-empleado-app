"use client";

import MenuPrincipal from "./menu-principal/page";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col max-h-screen h-svh">
      {/* Contenedor del contenido dinámico */}
      <main className="w-full flex-grow flex justify-center  py-6 overflow-y-scroll">
        <div className="container mx-auto px-4">{children}</div>
      </main>
      {/* Menú de navegación persistente */}
      <div className=" w-full">
        <MenuPrincipal />
      </div>
    </div>
  );
}
