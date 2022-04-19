import { multiply } from './1.js'

function square(x: number) {
  const c = multiply(x, x) ?? 1
  console.log(c)
}

function sleep(ms: number) {
  return new Promise(res => setTimeout(res, ms))
}

async function fun() {
  await sleep(100)
}

square(1)
fun?.()
