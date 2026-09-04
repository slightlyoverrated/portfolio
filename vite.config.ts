import tailwindcss from '@tailwindcss/postcss';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            { name: 'animation', test: /node_modules[\\/](gsap|lenis)/ },
            {
              name: 'ui',
              test: /node_modules[\\/](@base-ui|cmdk|lucide-react)/,
            },
            {
              name: 'react',
              test: /node_modules[\\/](react|react-dom|scheduler)/,
            },
          ],
        },
      },
    },
  },
  css: { postcss: { plugins: [tailwindcss()] } },
  plugins: [react()],
  resolve: {
    tsconfigPaths: true,
  },
});
