const packages = [
  '@lottiefiles/react-lottie-player',
  '@mantine/core',
  '@mantine/carousel',
  '@mantine/form',
  '@mantine/hooks',
  '@mantine/modals',
  '@mantine/notifications',
  '@tabler/icons-react',
  '@tanstack/react-query',
  'react-speech-kit',
  'framer-motion',
  'immer',
  'zustand',
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,

  logging: {
    fetches: {
      fullUrl: true,
    },
  },

  experimental: {
    optimizePackageImports: packages,
    serverComponentsExternalPackages: packages,
  },
};

module.exports = nextConfig;
