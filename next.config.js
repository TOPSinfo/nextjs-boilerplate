/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  staticPageGenerationTimeout: 2000,
  images: {
    domains: ['example.com', 'localhost'],
  },
}

module.exports = nextConfig
