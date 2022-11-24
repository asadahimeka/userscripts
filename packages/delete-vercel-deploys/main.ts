declare const GM_addElement: any
declare const Notyf: any

GM_addElement('link', { rel: 'stylesheet', href: 'https://unpkg.com/notyf@3.10.0/notyf.min.css' })
GM_addElement('script', { src: 'https://unpkg.com/notyf@3.10.0/notyf.min.js' })

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

let notyf: any

const deleteDeploys = async function (id: string) {
  try {
    return fetch(`https://vercel.com/api/v2/deployments/dpl_${id}`, {
      method: 'DELETE',
      mode: 'cors',
      credentials: 'include',
    })
  } catch (e) {
    notyf.open({ type: 'error', message: `Delete error: ${e}`, duration: 0 })
  }
}

GM_registerMenuCommand('Delete deploys', async () => {
  // eslint-disable-next-line no-alert
  const answer = confirm('Confirm delete?')
  if (!answer) return
  notyf = new Notyf({
    duration: 0,
    position: { x: 'right', y: 'top' },
    types: [{ type: 'info', background: 'blueviolet', icon: false }],
  })

  const arr = document.querySelectorAll('.deployment-entity')
  if (!arr) return
  for (const it of arr) {
    const h = it.innerHTML
    if (h.includes('(Current)')) continue
    const id = h.match(/<a.*href=".*\/(\w+)">.*<\/a>/)?.[1]
    notyf.open({ type: 'info', message: `Deleting ${id}` })
    if (id) await deleteDeploys(id)
    await sleep(1000)
    notyf.dismissAll()
  }

  notyf.open({ type: 'success', message: 'Delete finished.', duration: 1000 })

  setTimeout(() => {
    location.reload()
  }, 1000)
})
