import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-svh py-2">
      <h1 className="text-4xl font-bold text-green-700 mb-8">
        Bienvenido a EcoHuella
      </h1>
      <Button asChild>
        <Link href="/login">Loguear</Link>
      </Button>
    </div>
  );
}
