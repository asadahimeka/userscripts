declare const __INITIAL_STATE__: any

type Callback = (el: HTMLElement) => void
function waitArrive(sel: string, cb: Callback) {
  document.arrive(sel, { existing: true }, element => {
    cb(element as HTMLElement)
  })
}

function onKeypress(ev: KeyboardEvent) {
  ev.code == 'Digit1' && $('.bui-switch-input').trigger('click')
  ev.code == 'Backquote' && $('.squirtle-video-fullscreen').trigger('click')
}

function run() {
  addEventListener('keypress', onKeypress)
  waitArrive('#eplist_module', () => {
    $('#eplist_module').after(`<img id="_ep_info_cover_" src="${__INITIAL_STATE__.epInfo.cover}" style="width:320px;margin-bottom:20px">`)
    $('#eplist_module ul').on('click', 'li', function () {
      $('#_ep_info_cover_').attr('src', this.__vue__.epInfo.cover)
    })
  })
}

addEventListener('load', run)
