import withNextIntl from 'next-intl/plugin';
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    mdxRs: true,
  },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'vibecodr.ai',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'vibecodr.ai',
        pathname: '/**',
      }
    ],
  },
  /* config options here */
};

export default withNextIntl('./src/i18n.ts')(nextConfig);
