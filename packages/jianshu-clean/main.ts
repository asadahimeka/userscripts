import './style.less'

type TestFn = (el: HTMLElement) => boolean | null | undefined
type Callback = (el: HTMLElement) => void
function waitArriveTest(sel: string, test: TestFn, cb: Callback) {
  document.arrive(sel, { existing: true }, element => {
    const el = element as HTMLElement
    test(el) && cb(el)
  })
}
function waitArrive(sel: string, cb: Callback) {
  document.arrive(sel, { existing: true }, element => {
    cb(element as HTMLElement)
  })
}

waitArrive('button[type="button"]', el => {
  if (el.textContent?.includes('阅读全文')) {
    el.click()
  }
  if (el.innerText.includes('关注')) {
    el.remove()
  }
})
waitArriveTest('div[role=button]', el => el.innerText.includes('抽奖'), el => el.remove())
waitArrive('h3', el => {
  if (el.innerText.includes('推荐阅读')) {
    el.style.display = 'none'
    el.nextElementSibling?.setAttribute('style', 'display:none')
  }
})
