/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config options go here
};

const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin();

module.exports = withNextIntl(nextConfig);