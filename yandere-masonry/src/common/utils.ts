export function loadScript(src: string) {
  return new Promise<void>(resolve => {
    const script = document.createElement('script')
    script.src = src
    script.addEventListener('load', () => { resolve() }, false)
    document.head.appendChild(script)
  })
}

export function snakeCaseToCamelCase(str: string) {
  return str
    .split('_')
    .map((word, index) => {
      if (index === 0) return word
      return word.slice(0, 1).toUpperCase() + word.slice(1).toLowerCase()
    })
    .join('')
}

export function getSizeText(size: number) {
  if (size > 1024 * 1024) {
    return (size / (1024 * 1024)).toFixed(2) + 'MB'
  }
  if (size > 1024) {
    return (size / 1024).toFixed(2) + 'KB'
  }
  return size.toFixed(2) + 'B'
}
