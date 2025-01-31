"use client";

import { signOutAction } from "@/actions/auth.action";
import { Button, Image } from "@nextui-org/react";

export const ContentNotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="max-w-md w-full space-y-8 flex flex-col  items-center text-center">
        <Image
          alt="NextUI hero Image"
          src='/login/denied.png'
          width={300}
        />

        <div className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tight">Acceso Denegado</h1>
          <p className="text-muted-foreground text-lg">
            Lo sentimos, no tienes permisos para acceder a esta página
          </p>
        </div>

        <Button onPress={signOutAction} className="w-full sm:w-auto">Volver al Inicio</Button>
      </div>
    </div>
  );
};
