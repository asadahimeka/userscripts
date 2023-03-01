import { defineConfig } from 'vite'
import Userscript from 'vite-plugin-tm-userscript'

export default defineConfig({
  plugins: [
    Userscript({
      entry: 'main.ts',
      headers: {
        'name': 'Delete Vercel Non-Current Deployments',
        'namespace': 'https://www.nanoka.top',
        'author': 'asadahimeka',
        'description': '删除 Vercel 项目里多余的 Deployments',
        'source': 'https://github.com/asadahimeka/userscripts',
        'supportURL': 'https://github.com/asadahimeka/userscripts/issues',
        'license': 'MIT',
        'match': 'https://vercel.com/*/*/deployments',
        'run-at': 'document-end',
      },
    }),
  ],
})
