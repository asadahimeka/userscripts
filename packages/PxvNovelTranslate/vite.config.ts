import { defineConfig } from 'vite'
import Userscript from 'vite-plugin-tm-userscript'

export default defineConfig({
  plugins: [
    Userscript({
      entry: 'main.js',
      headers: {
        'name': 'PxvNovelTranslate',
        'namespace': 'https://www.nanoka.top',
        'author': 'asadahimeka',
        'description': '',
        'source': 'https://github.com/asadahimeka/userscripts',
        'supportURL': 'https://github.com/asadahimeka/userscripts/issues',
        'license': 'MIT',
        'match': [
          'https://fanyi.youdao.com/index.html*',
          'https://pixiv.pics*',
          'https://pixiv.kanata.ml*',
        ],
        'require': 'https://lib.baomitu.com/arrive/2.4.1/arrive.min.js',
        'connect': 'hibi2.cocomi.cf',
        'run-at': 'document-end',
      },
    }),
  ],
})
