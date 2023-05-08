/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    GIPHY_API_KEY: process.env.GIPHY_API_KEY,
  },
  experimental: {
    newNextLinkBehavior: false,
  },
}

module.exports = nextConfig
