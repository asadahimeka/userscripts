/*! Modified from: https://greasyfork.org/zh-CN/scripts/406336 */
/*! Copyright © Tsing */

import style from './style.css?inline'

function kill_baidu_ad() {
  $(document).ajaxSuccess(() => {
    GM_addStyle(style)
    $('#content_left>div').has('span:contains("广告")').remove()
    setTimeout(() => {
      $('.c-container').has('.f13>span:contains("广告")').remove()
    }, 2100)
  })
}

function run() {
  if (self != top) return
  GM_addStyle(style)
  document.addEventListener('DOMContentLoaded', kill_baidu_ad)
}

run()
