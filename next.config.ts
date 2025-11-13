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
    optimizePackageImports: ['@radix-ui/react-icons', 'lucide-react', '@tabler/icons-react'],
  },
  images: {
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
  // Transpile packages que precisam ser processados
  transpilePackages: [
    '@react-three/fiber',
    '@react-three/drei',
    'three',
    'lottie-web',
  ],
  webpack: (config) => {
    // Configuração para shader files e outros assets
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      exclude: /node_modules/,
      use: ['raw-loader'],
    });
    
    return config;
  },
};

export default nextConfig;
