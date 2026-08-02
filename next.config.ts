import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: isProd ? '/site_navigo' : '',
  assetPrefix: isProd ? '/site_navigo/' : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
