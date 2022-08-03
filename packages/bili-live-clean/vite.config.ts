import { defineConfig } from 'vite'
import Userscript from 'vite-plugin-tm-userscript'

export default defineConfig({
  plugins: [
    Userscript({
      entry: 'main.ts',
      headers: {
        'name': 'B 站直播间页面清理',
        'namespace': 'https://www.nanoka.top',
        'author': 'asadahimeka',
        'description': 'bilibili 直播间页面清理、隐藏多余内容、显示已关注 UP 主的粉丝数',
        'source': 'https://github.com/asadahimeka/userscripts',
        'supportURL': 'https://github.com/asadahimeka/userscripts/issues',
        'license': 'MIT',
        'match': '*://live.bilibili.com/*',
        // 'require': 'https://lib.baomitu.com/arrive/2.4.1/arrive.min.js',
        'run-at': 'document-end',
      },
    }),
  ],
})
