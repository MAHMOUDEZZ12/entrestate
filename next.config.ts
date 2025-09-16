import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
       {
        protocol: 'https',
        hostname: 'dxboffplan.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.propertyfinder.ae',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/admin',
        destination: '/',
        permanent: true,
      },
       {
        source: '/wb',
        destination: '/',
        permanent: true,
      },
       {
        source: '/wb-admin',
        destination: '/',
        permanent: true,
      },
       {
        source: '/system',
        destination: '/',
        permanent: true,
      },
      {
        source: '/wp-admin',
        destination: '/',
        permanent: true,
      },
      {
        source: '/wp-login.php',
        destination: '/',
        permanent: true,
      },
      {
        source: '/xmlrpc.php',
        destination: '/',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
