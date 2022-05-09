import ykStyle from '@/styles/style.css?inline'
import knStyle from '@/styles/konachan.css?inline'
import loadingStyle from '@/styles/loading.css?inline'

export function prepareApp(callback?: () => void) {
  addSiteStyle()
  bindDbclick()
  GM_registerMenuCommand('瀑布流模式', async () => {
    replaceHead()
    replaceBody()
    await loadDeps()
    callback?.()
  })
}

function addSiteStyle() {
  if (location.href.includes('yande.re')) {
    GM_addStyle(ykStyle)
  }
  if (location.href.includes('konachan')) {
    GM_addStyle(ykStyle + knStyle)
  }
}

function bindDbclick() {
  if (['yande.re', 'konachan'].some(e => location.href.includes(e))) {
    document.addEventListener('dblclick', e => {
      const prev = document.querySelector('a.previous_page') as HTMLAnchorElement
      const next = document.querySelector('a.next_page') as HTMLAnchorElement
      const w = document.documentElement.offsetWidth || document.body.offsetWidth
      const clickX = e.clientX
      clickX > w / 2 ? next?.click() : prev?.click()
    })
  }
}

const cspSites = ['gelbooru']
function loadScript(src: string) {
  return new Promise<void>(resolve => {
    let script: HTMLScriptElement
    if (cspSites.some(e => location.href.includes(e))) {
      script = GM_addElement('script', { src })
      script.addEventListener('load', () => { resolve() }, false)
    } else {
      script = document.createElement('script')
      script.src = src
      script.addEventListener('load', () => { resolve() }, false)
      document.head.appendChild(script)
    }
  })
}

function loadDeps() {
  return Promise.all([
    loadScript('https://lib.baomitu.com/vue/2.6.14/vue.min.js'),
    loadScript('https://npm.elemecdn.com/@vue/composition-api@1.6.0'),
    loadScript('https://lib.baomitu.com/vuetify/2.6.4/vuetify.min.js'),
    loadScript('https://npm.elemecdn.com/vue-masonry-css@1.0.3/dist/vue-masonry.min.js')
  ])
}

function replaceHead() {
  const el = document.querySelector('[name="csrf-token"]')
  const token = el?.getAttribute('content')
  token && sessionStorage.setItem('csrf-token', token)
  document.head.innerHTML = /* html */`
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui">
    <meta name="referrer" content="no-referrer">
    <title>Booru Masonry</title>
    <link rel="stylesheet" href="https://npm.elemecdn.com/normalize.css/normalize.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900">
    <link rel="stylesheet" href="https://npm.elemecdn.com/@mdi/font@5.9.55/css/materialdesignicons.min.css">
    <link rel="stylesheet" href="https://lib.baomitu.com/vuetify/2.5.0/vuetify.min.css">
    <style>${loadingStyle}::-webkit-scrollbar {display: none;width: 0px !important;}</style>
  `
}

function replaceBody() {
  document.body.innerHTML = /* html */`
    <div id="app">
      <div id="loading">
        <div id="loading-center">
          <div id="loading-center-absolute">
            <div class="loading-object" id="loading-object_one"></div>
            <div class="loading-object" id="loading-object_two"></div>
            <div class="loading-object" id="loading-object_three"></div>
            <p>&nbsp;読み込み中</p>
          </div>
        </div>
      </div>
    </div>
  `
}
/*! prepare end */
