import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental:{
    serverActions: {
      bodySizeLimit: '5mb', // Ajusta el límite de tamaño del cuerpo según tus necesidades
    },
  }
};

export default nextConfig;
