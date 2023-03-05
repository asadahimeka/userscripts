function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function q(sel, cb) {
  const el = document.querySelector(sel)
  el && cb?.(el)
}

function waitArrive(sel, cb) {
  document.arrive(sel, { existing: true }, element => {
    cb(element)
  })
}

function request(url, { headers, body, method } = {}) {
  return new Promise((resolve, reject) => {
    GM_xmlhttpRequest({
      url,
      method,
      data: body,
      headers,
      onload: xhr => resolve(JSON.parse(xhr.responseText)),
      onerror: reject,
    })
  })
}

async function getNovelText(id) {
  return request(`https://hibi2.cocomi.cf/api/pixiv/novel_text?id=${id}`)
}

function downloadText(id, text) {
  const url = window.URL.createObjectURL(new Blob([text], { type: 'text/plain' }))
  GM_download({
    url,
    name: `${id}.txt`,
    onload: () => window.URL.revokeObjectURL(url),
    onerror: () => window.URL.revokeObjectURL(url),
  })
}

async function doPxvNovelTranslate() {
  if (/pixiv\.pics|pixiv\.kanata/i.test(location.href)) {
    sessionStorage.setItem('__pnt_installed', '1')
    return
  }
  await sleep(1000)
  const id = location.href.match(/__pn_id__=(\d+)/i)?.[1]
  if (!id) return
  const { novel_text } = await getNovelText(id)
  console.log('novel_text: ', novel_text.length)
  if (!novel_text) return
  const arr = novel_text.replace(/\n+/g, '\n').split('')
  console.log('arr: ', arr.length)
  const indexes = []
  for (let i = 0, j = 1000; i < arr.length; i++) {
    if (/\n/.test(arr[i]) && i > j) {
      indexes.push(i)
      j += 1000
    }
  }
  indexes.push(arr.length)
  const splitTextArr = indexes.reduce((acc, cur) => {
    const last = acc.at(-1)
    acc.push({
      v: arr.slice(last.i, cur + 1).join(''),
      i: cur,
    })
    return acc
  }, [{ v: '', i: 0 }]).map(e => e.v).slice(1)

  const resText = []
  let curr = 0
  const sid = setInterval(() => {
    if (curr != resText.length) return
    if (curr >= splitTextArr.length) {
      clearInterval(sid)
      downloadText(id, resText.join(''))
      return
    }
    q('#js_fanyi_input_outside_container', el => el.removeAttribute('disable-keydown-focus'))
    q('#js_fanyi_input', inp => {
      inp.focus()
      document.execCommand('insertText', false, splitTextArr[curr])
      curr += 1
      waitArrive('#js_fanyi_output_resultOutput', async el => {
        document.unbindArrive()
        await sleep(500)
        const text = el.innerText.replace(/\n+/g, '\n')
        q('.clearBtn', el => {
          el.click()
          resText.push(text)
        })
      })
    })
  }, 1000)
}

addEventListener('load', doPxvNovelTranslate)
