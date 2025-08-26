/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config options go here
  images: {

    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        pathname: '/**',
      }
    ],
     minimumCacheTTL: 60 * 60 * 24 * 30, // Cache for 30 days
  },
};

const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin();

module.exports = withNextIntl(nextConfig);