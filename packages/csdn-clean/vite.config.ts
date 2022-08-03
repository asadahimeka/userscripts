import { defineConfig } from 'vite'
import Userscript from 'vite-plugin-tm-userscript'

export default defineConfig({
  plugins: [
    Userscript({
      entry: 'main.ts',
      headers: {
        'name': 'CSDN 文章页面美化',
        'namespace': 'https://www.nanoka.top',
        'author': 'asadahimeka',
        'description': 'CSDN 文章页面样式美化、隐藏多余内容',
        'source': 'https://github.com/asadahimeka/userscripts',
        'supportURL': 'https://github.com/asadahimeka/userscripts/issues',
        'license': 'MIT',
        'match': 'https://blog.csdn.net/*/article/details/*',
        'run-at': 'document-body',
      },
    }),
  ],
})
