/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "http",
				hostname: "localhost",
				port: "",
			},
			{
				protocol: "https",
				hostname: "placeholder.com",
			},
		],
	},
	reactStrictMode: false,
};

export default nextConfig;
