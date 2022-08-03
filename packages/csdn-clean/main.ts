import './style.less'

declare const csdn: any

addEventListener('load', () => {
  csdn.copyright.init('', '', '') // 去除剪贴板劫持
  localStorage.setItem('anonymousUserLimit', '') // 免登录
  $('#content_views').off('click') // 移除url拦截
  $('.look-more-preCode').trigger('click')
  const $btn = $('.hljs-button')
  $btn.removeClass('signin')
  $btn.off('click')
  $btn.each(function () {
    this.onclick = null
  })
  // 免登录复制
  $btn.attr('data-title', '复制')
  $btn.on('click', function () {
    GM_setClipboard((this.parentNode as HTMLElement).innerText)
    $btn.attr('data-title', '复制成功')
    setTimeout(() => {
      $btn.attr('data-title', '复制')
    }, 1000)
  })
})
