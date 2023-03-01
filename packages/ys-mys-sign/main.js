/*!
 * Forked from https://greasyfork.org/zh-CN/scripts/432059
 * Copyright © 苏芣苡 (https://space.bilibili.com/52159566)
 * License MIT
 */

/* global md5 */

const APP_VERSION = '2.33.1'
const CLIENT_TYPE = '4'
const USER_AGENT = `Mozilla/5.0 (iPhone; CPU iPhone OS 14_0_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) miHoYoBBS/${APP_VERSION}`
const REFERER = 'https://webstatic.mihoyo.com/bbs/event/signin-ys/index.html?bbs_auth_required=true&act_id=e202009291139501&utm_source=bbs&utm_medium=mys&utm_campaign=icon'
const HOST = 'api-takumi.mihoyo.com'
const GET_ROLE_URL = 'https://api-takumi.mihoyo.com/binding/api/getUserGameRolesByCookie?game_biz=hk4e_cn'
const SIGN_URL = 'https://api-takumi.mihoyo.com/event/bbs_sign_reward/sign'
const DEVICE_ID = '7ab3bc70b846186b9da1e816e6c6f08d'

function getDS() {
  const s = '1OUn34iIy84ypu9cpXyun2VaQ2zuFeLm'
  const t = Math.floor(Date.now() / 1000)
  const r = Math.random().toString(36).slice(-6)
  const c = `salt=${s}&t=${t}&r=${r}`
  const ds = `${t},${r},${md5(c)}`
  return ds
}

function getHeaders() {
  return {
    'User-Agent': USER_AGENT,
    'Referer': REFERER,
    'Host': HOST,
    'DS': getDS(),
    'x-rpc-app_version': APP_VERSION,
    'x-rpc-client_type': CLIENT_TYPE,
    'x-rpc-device_id': DEVICE_ID,
    'Cookie': localStorage.MYS_COOKIE || document.cookie,
  }
}

function request(url, { headers, body, method } = {}) {
  return new Promise((resolve, reject) => {
    GM_xmlhttpRequest({
      url,
      method,
      data: body,
      headers,
      onload: xhr => resolve({ json: () => JSON.parse(xhr.responseText) }),
      onerror: reject,
    })
  })
}

async function getUserGameRolesByCookie() {
  const resp = await request(GET_ROLE_URL, {
    headers: getHeaders(),
    method: 'GET',
  })
  const { retcode, data, message } = await resp.json()
  if (retcode != 0) throw new Error(message)
  return data.list
}

async function sign({ region, game_uid: uid, region_name, nickname, level }) {
  const resp = await request(SIGN_URL, {
    headers: getHeaders(),
    body: JSON.stringify({ act_id: 'e202009291139501', region, uid }),
    method: 'POST',
  })
  const { message } = await resp.json()
  const now = new Date().toLocaleString('zh-cn-u-hc-h23')
  if (message !== 'OK') localStorage.removeItem('MYS_COOKIE')
  const tips = `${now}\n【${region_name}】— ${nickname}\n【Lv : ${level}】— ${uid}\n签到结果：${message}`
  return tips
}

async function pushNotice(content) {
  // eslint-disable-next-line no-alert
  alert(content)
}

async function runCommand() {
  try {
    if (!document.cookie.includes('cookie_token=') && !localStorage.MYS_COOKIE) {
      // eslint-disable-next-line no-alert
      localStorage.MYS_COOKIE = prompt('输入米游社 Cookie') || ''
    }
    const list = await getUserGameRolesByCookie()
    for (const item of list) {
      const tips = await sign(item)
      await pushNotice(tips)
    }
  } catch (error) {
    localStorage.removeItem('MYS_COOKIE')
    await pushNotice(`签到失败：${error.message}`)
  }
}

GM_registerMenuCommand('签到', runCommand)
