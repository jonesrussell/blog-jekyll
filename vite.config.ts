import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  assetsInclude: ['**/*.png'],
  build: {
    outDir: 'assets',
    assetsDir: 'js',
    assetsInlineLimit: 0,
    rollupOptions: {
      input: resolve(__dirname, 'src/app.js')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "${resolve(__dirname, '_sass/app.scss')}";`
      }
    }
  }
})
