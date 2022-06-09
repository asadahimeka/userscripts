import { defineConfig } from 'vite';
import Userscript from 'vite-plugin-tm-userscript';

export default defineConfig({
  plugins: [
    Userscript({ entry: 'main.js' })
  ]
});
