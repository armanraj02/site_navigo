import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/site_navigo',
  assetPrefix: '/site_navigo/',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
