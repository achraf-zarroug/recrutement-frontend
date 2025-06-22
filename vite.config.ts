import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import VueDevTools from 'vite-plugin-vue-devtools';
import { readdirSync } from 'fs';
import path from 'path';

// Dynamically create aliases for subfolders in `src`
const absolutePathAliases: Record<string, string> = {};
const srcPath = path.resolve('./src');
const srcRootContent = readdirSync(srcPath, { withFileTypes: true }).map((dirent) =>
  dirent.name.replace(/(\.ts|\.js|\.vue)$/, '')
);
srcRootContent.forEach((directory) => {
  absolutePathAliases[directory] = path.join(srcPath, directory);
});

export default defineConfig(({ mode }) => {
  // Load environment variables
  const env = loadEnv(mode, process.cwd());
  const processEnvValues = {
    'process.env': Object.entries(env).reduce((prev, [key, val]) => {
      return { ...prev, [key]: val };
    }, {}),
  };

  return {
    plugins: [vue(), VueDevTools()],
    server: {
      port: 4000,
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        ...absolutePathAliases,
      },
    },
    define: {
      ...processEnvValues,
    },
    optimizeDeps: {
      // Add dependencies you want pre-optimized by Vite
      include: [],
      exclude: [],
    },
    build: {
      outDir: 'dist',
      emptyOutDir: true,
    },
    base: '/',
  };
});
