import tailwindcss from '@tailwindcss/postcss';
import react from '@vitejs/plugin-react';
import { existsSync } from 'node:fs';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';

function githubPagesBase() {
  if (process.env.GITHUB_ACTIONS !== 'true') return '/';

  const repository = process.env.GITHUB_REPOSITORY?.split('/')[1];
  const hasCustomDomain = existsSync(fileURLToPath(new URL('./public/CNAME', import.meta.url)));

  if (!repository || repository.endsWith('.github.io') || hasCustomDomain) return '/';
  return `/${repository}/`;
}

export default defineConfig({
  base: githubPagesBase(),
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            { name: 'animation', test: /node_modules[\\/](gsap|lenis)/ },
            { name: 'ui', test: /node_modules[\\/](@base-ui|cmdk|lucide-react)/ },
            { name: 'react', test: /node_modules[\\/](react|react-dom|scheduler)/ },
          ],
        },
      },
    },
  },
  css: { postcss: { plugins: [tailwindcss()] } },
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('.', import.meta.url)),
    },
  },
});
