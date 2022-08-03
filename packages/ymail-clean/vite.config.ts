import { defineConfig } from 'vite'
import Userscript from 'vite-plugin-tm-userscript'

export default defineConfig({
  plugins: [
    Userscript({
      entry: 'main.ts',
      headers: {
        'name': 'Y!メール 样式美化',
        'namespace': 'https://kanata.ml',
        'author': 'asadahimeka',
        'description': 'Yahoo! Japan 邮箱页面样式修改、隐藏多余内容',
        'source': 'https://github.com/asadahimeka/userscripts',
        'supportURL': 'https://github.com/asadahimeka/userscripts/issues',
        'license': 'MIT',
        'match': 'https://mail.yahoo.co.jp/u/pc*',
        'require': 'https://lib.baomitu.com/arrive/2.4.1/arrive.min.js',
        'run-at': 'document-start',
      },
    }),
  ],
})
