import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Allow production builds to complete with warnings
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  // Performance optimizations
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // Compression
  compress: true,
  // Production optimizations
  productionBrowserSourceMaps: false,
  // React strict mode for better development
  reactStrictMode: true,
};

export default nextConfig;
