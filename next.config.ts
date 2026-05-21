import type { NextConfig } from "next";
import withPWA from "next-pwa";
const nextConfig: NextConfig = {
  turbopack: {},
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  images: {
   unoptimized: true,
  },
}; 
export default withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: false,
})(nextConfig);
