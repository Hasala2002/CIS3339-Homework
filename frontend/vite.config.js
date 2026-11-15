import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  // so /api calls reach express while running vite dev
  server: { proxy: { '/api': 'http://localhost:3000' } },
});
