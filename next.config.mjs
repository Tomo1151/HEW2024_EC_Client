/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
      },
      {
        protocol: "https",
        hostname: "placeholder.com",
      },
    ],
  },
  env: {
    NEXT_PUBLIC_FETCH_BASE_URL: process.env.NEXT_PUBLIC_FETCH_BASE_URL,
  },
  reactStrictMode: false,
};

export default nextConfig;
