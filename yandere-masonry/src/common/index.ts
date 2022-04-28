import style from '@/styles/style.css?inline'
import knStyle from '@/styles/konachan.css?inline'

export function prepareApp() {
  addSiteClass()
}

function addSiteClass() {
  if (location.href.includes('yande.re')) {
    GM_addStyle(style)
  }
  if (location.href.includes('konachan')) {
    GM_addStyle(style + knStyle)
  }
}
