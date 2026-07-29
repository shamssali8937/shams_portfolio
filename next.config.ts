import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Needed for react-three/fiber and drei to work correctly
  transpilePackages: ["three"],
  experimental: {
    // Turbopack-friendly
  },
};

export default nextConfig;
