import { defineConfig } from 'vite'
import Userscript from 'vite-plugin-tm-userscript'

export default defineConfig({
  plugins: [
    Userscript({
      entry: 'main.ts',
      headers: {
        'name': 'CsdnClean',
        'namespace': 'https://www.nanoka.top',
        'author': 'asadahimeka',
        'description': 'CSDN 文章页面界面清理',
        'source': 'https://github.com/asadahimeka/userscripts',
        'supportURL': 'https://github.com/asadahimeka/userscripts/issues',
        'license': 'MIT',
        'match': 'https://blog.csdn.net/*/article/details/*',
        'run-at': 'document-body',
      },
    }),
  ],
})
