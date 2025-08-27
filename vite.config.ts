import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import ViteSitemap from 'vite-plugin-sitemap';
import { createHtmlPlugin } from 'vite-plugin-html';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ViteSitemap({
      generateRobotsTxt: true,
    }),
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          title: 'Default Title',
          description: 'Default Description',
        },
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
});
