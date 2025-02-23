import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/welcome/ff535484-6880-4653-b06e-89983ecf4ed5',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
