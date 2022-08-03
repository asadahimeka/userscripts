// ==UserScript==
// @name              B 站番剧播放页面显示封面
// @version           0.0.1
// @description       在 bilibili 番剧播放页集数选择下面显示封面，并添加全屏与弹幕开关快捷键
// @author            asadahimeka
// @namespace         https://www.nanoka.top
// @license           MIT
// @match             https://www.bilibili.com/bangumi/play/*
// @require           https://lib.baomitu.com/arrive/2.4.1/arrive.min.js
// @source            https://github.com/asadahimeka/userscripts
// @supportURL        https://github.com/asadahimeka/userscripts/issues
// @run-at            document-end
// ==/UserScript==

(function() {
  "use strict";
  ;
  function waitArrive(sel, cb) {
    document.arrive(sel, { existing: true }, (element) => {
      cb(element);
    });
  }
  function onKeypress(ev) {
    ev.code == "Digit1" && $(".bui-switch-input").trigger("click");
    ev.code == "Backquote" && $(".squirtle-video-fullscreen").trigger("click");
  }
  function run() {
    addEventListener("keypress", onKeypress);
    waitArrive("#eplist_module", () => {
      $("#eplist_module").after(`<img id="_ep_info_cover_" src="${__INITIAL_STATE__.epInfo.cover}" style="width:320px;margin-bottom:20px">`);
      $("#eplist_module ul").on("click", "li", function() {
        $("#_ep_info_cover_").attr("src", this.__vue__.epInfo.cover);
      });
    });
  }
  addEventListener("load", run);
})();
