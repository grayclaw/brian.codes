import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'art.pixilart.com',
      },
    ],
  },
  /* config options here */
};

export default nextConfig;
