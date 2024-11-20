import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EcoHuella - Analizador de Huella de Carbono",
  description: "Analiza y gestiona la huella de carbono de tu empresa",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        className={cn(
          inter.className,
          "bg-gray-50 dark:bg-gray-900 dark:text-gray-200 h-screen overflow-hidden"
        )}
      >
        {children}
      </body>
    </html>
  );
}
