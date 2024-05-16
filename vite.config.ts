import vue from '@vitejs/plugin-vue';
import path from 'path';
import { defineConfig } from 'vite';

function resolve(dir:any) {
  return path.resolve(__dirname, dir);
}

export default defineConfig({
  root: './',
  base: '/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: process.env.outputDir || 'dist',
    emptyOutDir: true,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        },
      },
    },
  },
  server: {
    open: true,
    host: 'localhost',
    port: 8080,
    proxy: {
      // Proxy options if needed
    },
  },
});
