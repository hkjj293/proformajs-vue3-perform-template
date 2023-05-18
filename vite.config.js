import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import vueDocsPlugin from './src/plugins/vue-docs-plugin'

// see https://github.com/vitejs/vite/issues/1579
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

// https://vitejs.dev/config/
export default defineConfig({
  base: '',
  esbuild: {
    keepNames: true,
    minifyIdentifiers: false
  },
  optimizeDeps: {
    esbuildOptions: {
      minifyIdentifiers: false,
      keepNames: true
    }
  },
  plugins: [vue(), vueDocsPlugin, cssInjectedByJsPlugin()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '~bootstrap': resolve(__dirname, 'node_modules/bootstrap')
    }
  },
  build: {
    outDir: './app/resources/dist'
  }
})
