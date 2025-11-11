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
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
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
