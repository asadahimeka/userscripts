import * as Booru from 'booru'

export function loadScript(src: string) {
  return new Promise<void>(resolve => {
    const script = document.createElement('script')
    script.src = src
    script.addEventListener('load', () => { resolve() }, false)
    document.head.appendChild(script)
  })
}

export async function searchBooru(page: number) {
  return Booru.search('yandere', ['rating:safe'], { page, limit: 20 })
}

export function isURL(s: string) {
  return /^https?:\/\/.*/.test(s)
}

export function downloadFile(url: string, name: string) {
  const a = document.createElement('a')
  a.href = url
  a.target = '_blank'
  a.rel = 'noopener noreferrer'
  a.style.display = 'none'
  a.setAttribute('download', name)
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}
