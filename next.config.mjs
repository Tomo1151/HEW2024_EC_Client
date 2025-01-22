/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.miseba.syntck.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
      },
      {
        protocol: "https",
        hostname: "placehold.jp",
      },
    ],
  },
  reactStrictMode: false,
};

export default nextConfig;
