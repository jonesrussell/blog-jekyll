import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    manifest: true,
    outDir: '_site/vite',
    assetsDir: 'assets/js',
    assetsInlineLimit: 0,
    rollupOptions: {
      input: resolve(__dirname, 'src/app.js')
    }
  }
})
