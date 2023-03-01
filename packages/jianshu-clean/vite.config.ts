import { defineConfig } from 'vite'
import Userscript from 'vite-plugin-tm-userscript'

export default defineConfig({
  plugins: [
    Userscript({
      entry: 'main.ts',
      headers: {
        'name': '简书文章页面美化',
        'namespace': 'https://www.nanoka.top',
        'author': 'asadahimeka',
        'description': '简书文章页面样式美化、隐藏多余内容',
        'source': 'https://github.com/asadahimeka/userscripts',
        'supportURL': 'https://github.com/asadahimeka/userscripts/issues',
        'license': 'MIT',
        'match': 'https://www.jianshu.com/p/*',
        'require': 'https://lib.baomitu.com/arrive/2.4.1/arrive.min.js',
        'run-at': 'document-body',
      },
    }),
  ],
})
