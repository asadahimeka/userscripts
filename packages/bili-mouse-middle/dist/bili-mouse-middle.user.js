// ==UserScript==
// @name              B 站鼠标中键辅助
// @version           0.0.1
// @description       视频结束后的推荐视频允许鼠标中键点击在新窗口打开
// @author            asadahimeka
// @namespace         https://www.nanoka.top
// @license           GPL-3.0
// @match             https://www.bilibili.com/video/*
// @match             https://www.bilibili.com/medialist/play/watchlater/*
// @source            https://github.com/asadahimeka/userscripts
// @supportURL        https://github.com/asadahimeka/userscripts/issues
// @run-at            document-end
// ==/UserScript==

(function() {
  "use strict";
  ;
  /*!
   * Forked from https://greasyfork.org/scripts/439962
   * Copyright © 神代綺凛(https://github.com/Tsuk1ko)
   * License GPL-3.0
   */
  document.addEventListener("mousedown", (e) => {
    if (e.button !== 1)
      return;
    const parent = e.target.parentElement;
    if (!parent || !parent.classList.contains("bpx-player-ending-related-item"))
      return;
    const el = __INITIAL_STATE__.related.find((e2) => parent.innerHTML.includes(e2.title));
    el && window.open(`/video/${el.bvid}`, "_blank");
    e.preventDefault();
  });
})();
