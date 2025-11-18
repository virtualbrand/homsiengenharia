import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    // Aviso: Isso permite que o build de produção seja concluído com sucesso mesmo com erros de ESLint.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Aviso: Isso permite que o build de produção seja concluído com sucesso mesmo com erros de TypeScript.
    ignoreBuildErrors: true,
  },
  // Otimizações de performance
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: [
      '@radix-ui/react-icons',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-popover',
      '@radix-ui/react-tooltip',
      'lucide-react', 
      '@tabler/icons-react', 
      'sonner', 
      'embla-carousel-react',
      'framer-motion',
      'react-leaflet',
      'leaflet',
      'lottie-web',
      'gsap',
      '@gsap/react',
    ],
  },
  // Code splitting otimizado (removido swcMinify - deprecated no Next.js 15)
  // Otimizar CSS com PostCSS
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  // Redirect /blog to /artigos
  async redirects() {
    return [
      {
        source: '/blog',
        destination: '/artigos',
        permanent: true,
      },
      {
        source: '/blog/:slug*',
        destination: '/artigos/:slug*',
        permanent: true,
      },
    ];
  },
  // Headers de cache para recursos estáticos
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // Early Hints (103) para resource hints críticos
          {
            key: 'Link',
            value: '</fonts/Satoshi-Regular.woff2>; rel=preload; as=font; type=font/woff2; crossorigin=anonymous, </fonts/Satoshi-Bold.woff2>; rel=preload; as=font; type=font/woff2; crossorigin=anonymous',
          },
        ],
      },
      {
        source: '/sw.js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
          {
            key: 'Service-Worker-Allowed',
            value: '/',
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*.css',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Content-Type',
            value: 'text/css; charset=utf-8',
          },
        ],
      },
      {
        source: '/videos/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  // Transpile packages que precisam ser processados
  transpilePackages: [
    '@react-three/fiber',
    '@react-three/drei',
    'three',
    'lottie-web',
  ],
  webpack: (config, { isServer }) => {
    // Configuração para shader files e outros assets
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      exclude: /node_modules/,
      use: ['raw-loader'],
    });
    
    // Otimizações de bundle size no cliente
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          ...config.optimization.splitChunks,
          cacheGroups: {
            ...config.optimization.splitChunks?.cacheGroups,
            // Chunk separado para framer-motion (biblioteca pesada)
            framerMotion: {
              name: 'framer-motion',
              test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
              priority: 30,
              reuseExistingChunk: true,
            },
            // Chunk para leaflet e mapa
            leaflet: {
              name: 'leaflet',
              test: /[\\/]node_modules[\\/](leaflet|react-leaflet)[\\/]/,
              priority: 30,
              reuseExistingChunk: true,
            },
            // Chunk para carousel
            carousel: {
              name: 'carousel',
              test: /[\\/]node_modules[\\/]embla-carousel[\\/]/,
              priority: 30,
              reuseExistingChunk: true,
            },
          },
        },
      };
    }
    
    return config;
  },
};

export default nextConfig;
