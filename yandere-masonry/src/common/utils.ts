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
