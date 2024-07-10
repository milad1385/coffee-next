/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "coffee-next-eta.vercel.app",
        pathname: "/uploads/**",
      },
    ],
  },
  output: "standalone",
};

export default nextConfig;
