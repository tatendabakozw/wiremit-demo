import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ["via.placeholder.com", "https://fastly.picsum.photos"], // allow this host
  },
};

export default nextConfig;
