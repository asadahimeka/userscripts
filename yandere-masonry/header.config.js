const { defineTmHeader } = require('vite-plugin-tm-userscript')

module.exports = defineTmHeader({
  "name": "Yande.re Masonry",
  "namespace": "me.asadahimeka.yandereMasonry",
  "version": "0.0.1",
  "author": "asadahimeka",
  "description": "Yande.re/Konachan Masonry Layout.Fork form yande-re-chinese-patch.",
  "homepage": "https://github.com/asadahimeka/userscripts/tree/master/yandere-masonry",
  "source": "https://github.com/coderzhaoziwei/yande-re-chinese-patch",
  "license": "MIT",
  "match": [
    "https://yande.re/post*",
    "https://konachan.com/post*",
    "https://konachan.net/post*"
  ],
  "supportURL": "https://github.com/asadahimeka/userscripts/issues",
  "grant": [
    "GM_addStyle",
    "GM_download"
  ]
})
