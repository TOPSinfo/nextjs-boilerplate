/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    staticPageGenerationTimeout: 2000,
    images: {
        domains: ["localhost", "lh3.googleusercontent.com"],
    },
};

module.exports = nextConfig;
