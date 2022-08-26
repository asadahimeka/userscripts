import { defineConfig } from 'vite'
import Userscript from 'vite-plugin-tm-userscript'

export default defineConfig({
  plugins: [
    Userscript({
      entry: 'main.ts',
      headers: {
        'name': '原神观测枢日历放大',
        'namespace': 'https://www.nanoka.top',
        'author': 'asadahimeka',
        'description': '原神观测枢素材活动日历放大到整屏（1920*1080）',
        'source': 'https://github.com/asadahimeka/userscripts',
        'supportURL': 'https://github.com/asadahimeka/userscripts/issues',
        'license': 'MIT',
        'match': 'https://bbs.mihoyo.com/ys/obc/?bbs_presentation_style=no_header&cal=1',
        // 'require': 'https://lib.baomitu.com/arrive/2.4.1/arrive.min.js',
        'run-at': 'document-end',
      },
    }),
  ],
})
