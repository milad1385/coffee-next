/** @type {import('next').NextConfig} */
import withPWAInit from "@ducanh2912/next-pwa";

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000", // Add port as a separate field
        pathname: "/uploads/**",
      },
    ],
  },
  output: "standalone",
};

const withPWA = withPWAInit({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  disable: false,
  workboxOptions: {
    disableDevLogs: true,
  },
});

export default withPWA({
  ...nextConfig,
});