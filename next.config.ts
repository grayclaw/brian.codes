import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        domains: ['art.pixilart.com'], // ✅ allow external image domain
    },
};

export default nextConfig;
