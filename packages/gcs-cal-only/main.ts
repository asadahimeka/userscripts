import './style.less'

function run() {
  const cols = document.querySelectorAll<HTMLElement>('.cal-pc__row--event .cal-pc__col .cal-pc__col:not(.cal-pc__col--event)')
  for (const el of cols) {
    const w = parseFloat(el.style.width)
    if (w) el.style.width = `${w * 2.6041666666666665}px`
  }
  const right = document.querySelector('.home-channel--calendar .home-channel__title .home-channel__right')
  if (!right) return
  right.innerHTML = '<a href="https://bbs.mihoyo.com/ys/obc/" class="channel-more">更多<span>内容</span></a>'
}

addEventListener('load', run)
