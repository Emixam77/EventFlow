import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Autoriser ngrok en dev
  // @ts-ignore
  allowedDevOrigins: ['chemist-overlabor-darn.ngrok-free.dev'],
};

export default nextConfig;
