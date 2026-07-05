import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/work',
        destination: '/',
        permanent: false,
      },
    ];
  },
  images: {
    localPatterns: [
      {
        pathname: '/**',
      },
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
