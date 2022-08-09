import { defineConfig } from 'vite'
import Userscript from 'vite-plugin-tm-userscript'

export default defineConfig({
  plugins: [
    Userscript({
      entry: 'main.ts',
      headers: {
        'name': 'Pixiv 排行榜宽屏展示',
        'namespace': 'https://www.nanoka.top',
        'author': 'asadahimeka',
        'description': 'Pixiv 排行榜页面图片列表加宽，图片紧凑展示',
        'source': 'https://github.com/asadahimeka/userscripts',
        'supportURL': 'https://github.com/asadahimeka/userscripts/issues',
        'license': 'MIT',
        'match': 'https://www.pixiv.net/ranking.php*',
        // 'require': 'https://lib.baomitu.com/arrive/2.4.1/arrive.min.js',
        'run-at': 'document-start',
      },
    }),
  ],
})
