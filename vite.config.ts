import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  assetsInclude: ['**/*.png'],
  build: {
    manifest: true,
    outDir: '_site/vite',
    assetsDir: 'assets/js',
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
