const { defineTmHeader } = require('vite-plugin-tm-userscript')

module.exports = defineTmHeader({
  "name": "Ymail Clean",
  "namespace": "https://kanata.ml",
  "author": "asadahimeka",
  "description": "Y!メール 界面清理",
  "source": "https://github.com/asadahimeka/userscripts",
  "supportURL": "https://github.com/asadahimeka/userscripts/issues",
  "license": "MIT",
  "match": "https://mail.yahoo.co.jp/u/pc*",
  "require": "https://lib.baomitu.com/arrive/2.4.1/arrive.min.js",
  "run-at": "document-start",
})
