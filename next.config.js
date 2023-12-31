const packages = [
  '@mantine/core',
  '@mantine/carousel',
  '@mantine/form',
  '@mantine/hooks',
  '@mantine/modals',
  '@mantine/notifications',
  '@tabler/icons-react',
  '@tanstack/react-query',
  'react-speech-kit',
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
  },
};

module.exports = nextConfig;
