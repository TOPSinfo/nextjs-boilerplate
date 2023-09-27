/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['example.com', 'localhost', "robohash.org"],
  },
}

module.exports = nextConfig
