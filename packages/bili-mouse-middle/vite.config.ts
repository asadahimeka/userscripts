import { defineConfig } from 'vite'
import Userscript from 'vite-plugin-tm-userscript'

export default defineConfig({
  plugins: [
    Userscript({
      entry: 'main.ts',
      headers: {
        'name': 'B 站鼠标中键辅助',
        'namespace': 'https://www.nanoka.top',
        'author': 'asadahimeka',
        'description': '视频结束后的推荐视频允许鼠标中键点击在新窗口打开',
        'source': 'https://github.com/asadahimeka/userscripts',
        'supportURL': 'https://github.com/asadahimeka/userscripts/issues',
        'license': 'GPL-3.0',
        'match': [
          'https://www.bilibili.com/video/*',
          'https://www.bilibili.com/medialist/play/watchlater/*',
        ],
        // 'require': 'https://lib.baomitu.com/arrive/2.4.1/arrive.min.js',
        'run-at': 'document-end',
      },
    }),
  ],
})
