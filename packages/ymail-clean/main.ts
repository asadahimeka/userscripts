import './style.css'

function setBasicStyle() {
  const style1 = document.querySelector('#switchTab')?.parentElement?.style
  if (style1) style1.width = '255px'
  const style2 = document.querySelector('#tagYadsListTop')?.parentElement?.style
  if (style2) style2.display = 'none'
}

function setTwimgStyle(el: HTMLIFrameElement) {
  setTimeout(() => {
    const d = el.contentWindow?.document
    if (!d) return
    const avatar = d.querySelector('img[src^="https://pbs.twimg.com/profile_images"')
    if (!avatar) return
    const tds = d.querySelectorAll('td[background^="https://pbs.twimg.com/media"]')
    for (const item of tds) {
      const bg = item.getAttribute('background')?.replace(':mosaic', '')
      bg && item.querySelector('img')?.setAttribute('src', bg)
    }
  }, 200)
}

function doClean() {
  const selector = 'div[data-cy="mailPreviewArea"]'
  document.arrive(selector, el => {
    setBasicStyle()
    el.arrive('iframe', ifr => setTwimgStyle(ifr as HTMLIFrameElement))
    document.unbindArrive(selector)
  })
}

addEventListener('load', () => { doClean() })
