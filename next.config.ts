import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'api.ethanecom.com',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        pathname: '/**',
      },
    ],
    // Thêm cấu hình tối ưu hóa image loading
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp'],
    minimumCacheTTL: 31536000, // 1 year cache
  },
  // Tối ưu build performance
  experimental: {
    optimizePackageImports: ['framer-motion', 'react-icons'],
    // Turbopack configuration
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  // Move serverComponentsExternalPackages to top level
  serverExternalPackages: ['@studio-freight/lenis'],
  // Compress output
  compress: true,
  // Bundle splitting for better performance (only in production)
  ...(process.env.NODE_ENV === 'production' && {
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.optimization.splitChunks = {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            // vendor chunk
            vendor: {
              chunks: 'all',
              test: /node_modules/,
              name: 'vendor',
            },
            // framer motion chunk
            framerMotion: {
              chunks: 'all',
              test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
              name: 'framer-motion',
              priority: 30,
            },
            // gsap chunk  
            gsap: {
              chunks: 'all',
              test: /[\\/]node_modules[\\/]gsap[\\/]/,
              name: 'gsap',
              priority: 30,
            }
          }
        }
      }
      return config
    }
  }),
  // Cải thiện performance
  poweredByHeader: false,
  async rewrites() {
  return [
    {
      source: "/sitemap.xml",
      destination: "/api/sitemap", // alias tới route động
    },
  ];
},
  async headers() {
    return [
      {
        source: "/(.*)",
        
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "https://api.ethanecom.com",
          },
          // Thêm cache headers
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Tối ưu cho static assets
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
