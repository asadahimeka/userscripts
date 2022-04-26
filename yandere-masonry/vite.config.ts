import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from '@vuetify/vite-plugin'
import TMPlugin from 'vite-plugin-tm-userscript'

const resolveDir = (dir: string) => resolve(dirname(fileURLToPath(import.meta.url)), dir)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // https://github.com/vitejs/vite/tree/main/packages/plugin-vue
    vue(),
    // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
    vuetify({
      autoImport: true,
    }),
    // https://github.com/asadahimeka/vite-plugin-tm-userscript
    // TMPlugin(),
  ],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': resolveDir('src'),
    },
  },
})
