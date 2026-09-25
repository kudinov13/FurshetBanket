import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  experimental: {
    serverActions: {
      bodySizeLimit: "30mb",
      allowedOrigins: [
        "furshetoria.ru",
        "www.furshetoria.ru",
        "127.0.0.1:59087",
        "localhost:3000",
        "127.0.0.1:3000",
      ],
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
