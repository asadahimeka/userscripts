import { defineConfig } from 'vite'
import Userscript from 'vite-plugin-tm-userscript'

export default defineConfig({
  plugins: [
    Userscript({
      entry: 'main.ts',
      headers: {
        name: '{{pascalCase name}}',
        namespace: 'https://www.nanoka.top',
        author: 'asadahimeka',
        description: '',
        source: 'https://github.com/asadahimeka/userscripts',
        supportURL: 'https://github.com/asadahimeka/userscripts/issues',
        license: 'MIT',
        match: '',
        // 'require': 'https://lib.baomitu.com/arrive/2.4.1/arrive.min.js',
        // 'run-at': 'document-start',
      },
    }),
  ],
})
