import './style.css'

function setParentStyle(selector: string, callback?: (style: CSSStyleDeclaration) => void) {
  const style = document.querySelector(selector)?.parentElement?.style
  style && callback?.(style)
}

function setBasicStyle() {
  setParentStyle('#switchTab', s => s.width = '255px')
  setParentStyle('#tagYadsListTop', s => s.display = 'none')
  setParentStyle('#tagYadsSideColumn', s => s.display = 'none')
  setParentStyle('#tagYadsDetail', s => s.display = 'none')
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
