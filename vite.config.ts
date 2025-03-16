import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    hmr: {
      overlay: false,
    },
  },
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@assets': '/src/assets',
      '@styles': '/src/styles',
      '@utils': '/src/utils',
      '@constants': '/src/constants',
      '@types': '/src/types',
    },
  },
  optimizeDeps: {
    include: ['zustand']
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/],
    },
    rollupOptions: {
      onwarn(warning, warn) {
        // Ignore certain warnings
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE' || 
            warning.message.includes('zustand')) {
          return;
        }
        warn(warning);
      }
    }
  }
});
