import { defineConfig } from 'vite'
import Userscript from 'vite-plugin-tm-userscript'

export default defineConfig({
  plugins: [
    Userscript({
      entry: 'main.js',
      headers: {
        name: '原神米游社签到',
        namespace: 'https://www.nanoka.top',
        author: 'asadahimeka',
        description: '在网页端执行米游社原神每日签到',
        source: 'https://github.com/asadahimeka/userscripts',
        supportURL: 'https://github.com/asadahimeka/userscripts/issues',
        license: 'MIT',
        match: 'https://bbs.mihoyo.com/ys*',
        connect: 'api-takumi.mihoyo.com',
        require: 'https://cdn.jsdelivr.net/npm/js-md5@0.7.3/build/md5.min.js',
        // 'run-at': 'document-start',
      },
    }),
  ],
})
