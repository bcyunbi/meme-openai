/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    GIPHY_API_KEY: process.env.GIPHY_API_KEY,
  },
  experimental: {
    newNextLinkBehavior: false,
  },
}

module.exports = nextConfig
