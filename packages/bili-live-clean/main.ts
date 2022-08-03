import './style.less'

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function formatFans(n: number) {
  return n < 10000 ? n.toString() : `${(n / 10000).toFixed(1)}万`
}

function setFansNum(el: HTMLElement, num: number) {
  el.innerText = formatFans(num)
  el.title = num.toString()
}

async function getFansCount(id: string) {
  const resp = await fetch(`https://api.bilibili.com/x/relation/stat?vmid=${id}`)
  const result = await resp.json()
  return result.data.follower
}

function q(parent: HTMLElement, sel: string, cb: (el: HTMLElement) => void) {
  const el = parent.querySelector<HTMLElement>(sel)
  el && cb(el)
}

declare const __STORE__: any
declare const BilibiliLive: any

async function run() {
  await sleep(2000)
  const ctnr = document.querySelector('.follow-ctnr')
  if (!ctnr) return
  const vm = (ctnr as any).__vue__
  await vm.$nextTick()
  if (vm.curButtonType == 'unFollow') return
  const clone = ctnr.cloneNode(true) as HTMLElement
  ctnr.parentNode!.appendChild(clone)
  q(clone, '.follow-text', el => el.innerText = 'FANS')
  q(clone, '.left-part', el => el.title = '')
  q(clone, '.right-part', el => {
    setFansNum(el, __STORE__.baseInfoAnchor.fansCount)
    el.addEventListener('click', async function () {
      const num = await getFansCount(BilibiliLive.ANCHOR_UID)
      setFansNum(this, num)
    })
  })
}

addEventListener('load', run)
