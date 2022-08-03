import { defineConfig } from 'vite'
import Userscript from 'vite-plugin-tm-userscript'

export default defineConfig({
  plugins: [
    Userscript({
      entry: 'main.ts',
      headers: {
        'name': 'B 站番剧播放页面显示封面',
        'namespace': 'https://www.nanoka.top',
        'author': 'asadahimeka',
        'description': '在 bilibili 番剧播放页集数选择下面显示封面，并添加全屏与弹幕开关快捷键',
        'source': 'https://github.com/asadahimeka/userscripts',
        'supportURL': 'https://github.com/asadahimeka/userscripts/issues',
        'license': 'MIT',
        'match': 'https://www.bilibili.com/bangumi/play/*',
        'require': 'https://lib.baomitu.com/arrive/2.4.1/arrive.min.js',
        'run-at': 'document-end',
      },
    }),
  ],
})
