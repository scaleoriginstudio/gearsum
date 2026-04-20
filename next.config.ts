import type { NextConfig } from "next";

// Next.js configuration object
const nextConfig: NextConfig = {
  images: {
    // Allow next/image to fetch and optimise images hosted on Pexels CDN
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },
};

export default nextConfig;
