import { defineConfig } from 'vite'
import Userscript from 'vite-plugin-tm-userscript'

export default defineConfig({
  plugins: [
    Userscript({
      entry: 'main.ts',
      headers: {
        'name': 'Baidu Clean',
        'namespace': 'https://www.nanoka.top',
        'author': 'asadahimeka',
        'description': '百度搜索页面样式修改、去广告、整体居中',
        'source': 'https://github.com/asadahimeka/userscripts',
        'supportURL': 'https://github.com/asadahimeka/userscripts/issues',
        'license': 'MIT',
        'match': [
          '*://www.baidu.com/s?*',
          '*://ipv6.baidu.com/s?*',
          '*://www.baidu.com/baidu?*',
          '*://ipv6.baidu.com/baidu?*',
        ],
        // 'require': 'https://lib.baomitu.com/arrive/2.4.1/arrive.min.js',
        'run-at': 'document-start',
        'noframes': true,
      },
    }),
  ],
})
