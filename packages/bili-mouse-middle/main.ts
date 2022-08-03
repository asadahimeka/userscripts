/*!
 * Forked from https://greasyfork.org/scripts/439962
 * Copyright © 神代綺凛(https://github.com/Tsuk1ko)
 * License GPL-3.0
 */

document.addEventListener('mousedown', e => {
  if (e.button !== 1) return
  const parent = (e.target as HTMLElement).parentElement
  if (!parent || !parent.classList.contains('bpx-player-ending-related-item')) return
  const el = __INITIAL_STATE__.related.find((e: any) => parent.innerHTML.includes(e.title))
  el && window.open(`/video/${el.bvid}`, '_blank')
  e.preventDefault()
})
